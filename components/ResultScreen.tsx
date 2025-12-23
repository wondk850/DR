import React, { useMemo, useEffect, useState } from 'react';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';
import { UserProfile, AnswerRecord, ScoreBoard } from '../types';
import { QUESTIONS } from '../constants'; // Import QUESTIONS to look up explanations
import { GoogleGenAI } from "@google/genai";

interface Props {
  profile: UserProfile;
  records: AnswerRecord[];
  onRestart: () => void;
  onRetry: (wrongIds: number[]) => void;
}

// Helper component to parse **bold** text and apply styles
const HighlightedText: React.FC<{ text: string; colorClass?: string }> = ({ text, colorClass = "text-indigo-700 bg-indigo-50" }) => {
  if (!text) return null;
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return (
    <span className="leading-relaxed whitespace-pre-line">
      {parts.map((part, i) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return (
            <span key={i} className={`font-black mx-0.5 px-1.5 py-0.5 rounded ${colorClass} text-[0.95em]`}>
              {part.slice(2, -2)}
            </span>
          );
        }
        return <span key={i}>{part}</span>;
      })}
    </span>
  );
};

const ResultScreen: React.FC<Props> = ({ profile, records, onRestart, onRetry }) => {
  // --- Scoring Logic ---
  const scores = useMemo(() => {
    const board: ScoreBoard = { 
      total: 0, 
      maxTotal: records.length * 5, 
      vocab: 0, 
      structure: 0, 
      reading: 0, 
      grammar: 0, 
      syntax: 0 
    };
    const pointsPerQuestion = 5;

    records.forEach(r => {
      if (r.isCorrect) {
        board.total += pointsPerQuestion;
        if (r.category === 'Vocabulary') board.vocab += pointsPerQuestion;
        if (r.category === 'Structure') board.structure += pointsPerQuestion;
        if (r.category === 'Reading') board.reading += pointsPerQuestion;
        if (r.category === 'Grammar') board.grammar += pointsPerQuestion;
        if (r.category === 'Syntax') board.syntax += pointsPerQuestion;
      }
    });
    return board;
  }, [records]);

  const finalScore = Math.round((scores.total / Math.max(scores.maxTotal, 1)) * 100);
  
  // Wrong Answers Calculation
  const wrongRecords = useMemo(() => records.filter(r => !r.isCorrect), [records]);
  const wrongQuestionIds = wrongRecords.map(r => r.questionId);

  // Tier Calculation
  let tier = 'Bronze';
  let tierColor = 'text-amber-700 bg-amber-100 border-amber-300';
  if (finalScore >= 95) { tier = 'Diamond'; tierColor = 'text-cyan-600 bg-cyan-50 border-cyan-200'; }
  else if (finalScore >= 90) { tier = 'Platinum'; tierColor = 'text-indigo-600 bg-indigo-50 border-indigo-200'; }
  else if (finalScore >= 80) { tier = 'Gold'; tierColor = 'text-yellow-600 bg-yellow-50 border-yellow-200'; }
  else if (finalScore >= 70) { tier = 'Silver'; tierColor = 'text-gray-600 bg-gray-50 border-gray-200'; }

  // AI State
  const [aiAnalysis, setAiAnalysis] = useState<{diagnosis: string, weakness: string, prescription: string} | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // --- AI Automatic Analysis ---
  useEffect(() => {
    const generateAnalysis = async () => {
      if (!process.env.API_KEY) {
        setAiAnalysis({
          diagnosis: "API 키가 설정되지 않아 AI 분석을 건너뜁니다.",
          weakness: "**오답 노트**를 확인하여 스스로 약점을 파악해보세요.",
          prescription: "틀린 문제를 다시 풀어보는 것이 가장 좋은 공부입니다."
        });
        setIsLoading(false);
        return;
      }

      // Collect Wrong Tags
      const wrongTags = wrongRecords
        .flatMap(r => r.tags)
        .filter((value, index, self) => self.indexOf(value) === index)
        .join(', ');

      const wrongQuestionsSummary = wrongRecords.map(r => 
        `- [${r.category}] 문제유형: ${r.tags.join(', ')} / 오답: ${r.selectedOption}`
      ).slice(0, 15).join('\n');

      // --- DYNAMIC PERSONA SETTING BASED ON LEVEL ---
      let personaInstruction = "";
      if (profile.level === 'beginner') {
          personaInstruction = `
            [난이도 설정: Beginner(왕초보/기초반)]
            1. **페르소나**: 친절하고 따뜻한 멘토 선생님. (절대 혼내거나 겁주지 말 것)
            2. **톤앤매너**: "아직 기초가 부족하지만 할 수 있어!"라는 희망적인 메시지. 어려운 문법 용어 사용을 지양하고 쉽게 풀어서 설명.
            3. **진단 포인트**: 영어에 대한 흥미를 잃지 않도록 격려 위주.
            4. **처방**: 하루 10분 단어 외우기, 짧은 문장 읽어보기 등 아주 쉽고 구체적인 '작은 습관' 제시.
          `;
      } else if (profile.level === 'standard') {
          personaInstruction = `
            [난이도 설정: Standard(표준/내신대비반)]
            1. **페르소나**: 꼼꼼하고 체계적인 학교/학원 선생님.
            2. **톤앤매너**: 차분하게 잘한 점과 부족한 점을 짚어주는 객관적인 태도.
            3. **진단 포인트**: 학교 내신 시험에서 감점될 수 있는 실수들을 교정.
            4. **처방**: 교과서 본문 암기, 문법 개념 정리, 오답 노트 습관화 등 실질적인 학습법 제시.
          `;
      } else { // advanced
          personaInstruction = `
            [난이도 설정: Advanced(심화/특목고반)]
            1. **페르소나**: 대치동 1타 입시 컨설턴트 (Dr. English 본캐).
            2. **톤앤매너**: 매우 냉철하고 분석적이며 단호함. 충격요법 필요. "이대로는 특목고 힘듭니다" 같은 뼈 때리는 조언.
            3. **진단 포인트**: 고등 내신 1등급 및 수능 킬러 문항 대비를 위한 고차원적인 분석.
            4. **처방**: 구문 정밀 독해(Syntax), 고난도 어휘 확장, 논리적 추론 훈련 등 고강도 커리큘럼 제시.
          `;
      }

      const prompt = `
        System: 당신은 '닥터 잉글리시'라는 AI 영어 진단 전문가입니다. 아래 설정된 난이도별 페르소나에 완벽하게 빙의하여 분석 리포트를 작성하세요.

        ${personaInstruction}
        
        [학생 정보]
        - 이름: ${profile.name} (학년: ${profile.grade})
        - 선택 모드: ${profile.mode}
        - 종합 점수: ${finalScore}점 (백분위 추정 및 등급 컷 예측에 활용)
        - 약점 태그: ${wrongTags}
        - 오답 상세:
        ${wrongQuestionsSummary}

        [작성 필수 조건]
        1. **서식**: 중요한 키워드나 강조할 부분은 반드시 **이중 별표(**)**로 감싸서 강조하세요.
        2. JSON 포맷으로만 응답하세요.

        [JSON 출력 필드 설명]
        1. **diagnosis (종합 소견)**: 현재 학생의 위치와 상태를 설정된 페르소나의 말투로 진단.
        2. **weakness (취약점 분석)**: 왜 틀렸는지, 어떤 개념이 부족한지 구체적으로 지적. (난이도에 따라 설명 깊이 조절)
        3. **prescription (솔루션)**: [1단계], [2단계], [3단계]로 나누어 수준에 맞는 학습법 처방.

        [Output Format (JSON Only)]
        {
          "diagnosis": "...",
          "weakness": "...",
          "prescription": "..."
        }
      `;

      try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const response = await ai.models.generateContent({
          model: 'gemini-3-flash-preview',
          contents: prompt,
          config: { responseMimeType: "application/json", temperature: 0.7 }
        });
        
        const text = response.text || "{}";
        const json = JSON.parse(text);
        setAiAnalysis(json);
      } catch (e) {
        console.error(e);
        setAiAnalysis({
          diagnosis: "AI 분석 서버 연결 실패.",
          weakness: "잠시 후 다시 시도해주세요.",
          prescription: "오답 노트를 먼저 확인하세요."
        });
      } finally {
        setIsLoading(false);
      }
    };

    generateAnalysis();
  }, [records, profile, finalScore, wrongRecords]);

  // Chart Data
  const chartData = [
    { subject: '어휘', MyScore: (scores.vocab / Math.max(records.filter(r => r.category === 'Vocabulary').length * 5, 1)) * 100, Top10: 96 },
    { subject: '구조', MyScore: (scores.structure / Math.max(records.filter(r => r.category === 'Structure').length * 5, 1)) * 100, Top10: 92 },
    { subject: '독해', MyScore: (scores.reading / Math.max(records.filter(r => r.category === 'Reading').length * 5, 1)) * 100, Top10: 98 },
    { subject: '문법', MyScore: (scores.grammar / Math.max(records.filter(r => r.category === 'Grammar').length * 5, 1)) * 100, Top10: 95 },
    { subject: '구문', MyScore: (scores.syntax / Math.max(records.filter(r => r.category === 'Syntax').length * 5, 1)) * 100, Top10: 90 },
  ];

  const handlePrint = () => {
    window.print();
  };

  const today = new Date().toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <div className="max-w-4xl mx-auto bg-slate-50 min-h-screen pb-12 font-sans print:bg-white print:p-0">
       {/* CSS for printing */}
      <style>
        {`
          @media print {
            @page { margin: 10mm; }
            body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
            .no-break { break-inside: avoid; }
          }
        `}
      </style>

      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-10 print:static print:shadow-none print:border-b-2 print:border-black">
        <div className="max-w-4xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex flex-col">
            <h1 className="text-xl font-extrabold text-slate-800 flex items-center gap-2 tracking-tight">
              🏥 Dr. English <span className="text-xs bg-slate-800 text-white px-2 py-0.5 rounded shadow-sm print:hidden">Premium Report</span>
            </h1>
            <span className="text-xs text-slate-500 hidden print:block mt-1">발급일: {today} | 학생명: {profile.name}</span>
          </div>
          
          <div className="flex gap-2">
            <button 
              onClick={handlePrint} 
              className="text-sm font-bold bg-blue-100 text-blue-700 px-4 py-2 rounded-lg hover:bg-blue-200 transition flex items-center gap-2 print:hidden"
            >
              <span>📄 PDF 내보내기</span>
            </button>
            <button onClick={onRestart} className="text-sm text-slate-500 hover:text-slate-900 font-medium transition print:hidden">
              ✕ 닫기
            </button>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-8 print:p-0 print:space-y-6">
        {/* Score Card */}
        <section className="bg-white rounded-3xl shadow-xl p-8 border border-slate-100 flex flex-col md:flex-row items-center gap-10 relative overflow-hidden print:shadow-none print:border print:border-slate-300 no-break">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 print:hidden"></div>
          <div className="text-center md:text-left flex-1 z-10">
            <h2 className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-3">Diagnostic Result</h2>
            <div className="flex items-end justify-center md:justify-start gap-4">
              <span className="text-7xl font-black text-slate-900 tracking-tighter">{finalScore}</span>
              <span className="text-2xl text-slate-300 font-bold mb-3">/ 100</span>
            </div>
            <div className={`mt-5 inline-flex items-center gap-2 px-5 py-2 rounded-full border-2 ${tierColor} font-bold text-sm shadow-sm print:border-2`}>
              <span>🏆 {tier} Class</span>
            </div>
            <p className="text-xs text-slate-400 mt-3 font-medium print:text-slate-600">* 목동 학군 기준 백분위 추정</p>
          </div>
          {/* Added min-w-0 to prevent flexbox overflow issues for chart container */}
          <div className="w-full md:w-1/2 h-56 z-10 min-w-0">
             <ResponsiveContainer width="100%" height="100%">
               <BarChart data={chartData} layout="vertical" barSize={16} margin={{ left: 40, right: 20 }}>
                 <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
                 <XAxis type="number" domain={[0, 100]} hide />
                 <YAxis dataKey="subject" type="category" width={40} tick={{fontSize: 11, fontWeight: 'bold', fill: '#64748b'}} />
                 <Tooltip cursor={{fill: 'transparent'}} contentStyle={{borderRadius: '12px'}} />
                 <Legend />
                 <Bar dataKey="MyScore" name="내 점수" fill="#3b82f6" radius={[0, 6, 6, 0]} />
                 <Bar dataKey="Top10" name="상위 10%" fill="#cbd5e1" radius={[0, 6, 6, 0]} />
               </BarChart>
             </ResponsiveContainer>
          </div>
        </section>

        {/* Radar & AI Diagnosis */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 print:grid-cols-2 print:gap-4">
           <div className="bg-white rounded-3xl shadow-lg p-6 border border-slate-100 flex flex-col print:shadow-none print:border print:border-slate-300 no-break">
             <h3 className="text-sm font-bold text-slate-800 mb-6 flex items-center gap-2">📊 영역별 밸런스</h3>
             {/* Updated container with w-full and min-w-0 for Recharts stability */}
             <div className="flex-1 h-[250px] w-full min-w-0">
               <ResponsiveContainer width="100%" height="100%">
                 <RadarChart cx="50%" cy="50%" outerRadius="70%" data={chartData}>
                   <PolarGrid stroke="#e2e8f0" />
                   <PolarAngleAxis dataKey="subject" tick={{ fill: '#475569', fontSize: 11, fontWeight: 'bold' }} />
                   <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} />
                   <Radar name="My Score" dataKey="MyScore" stroke="#2563eb" strokeWidth={3} fill="#3b82f6" fillOpacity={0.2} />
                   <Legend />
                 </RadarChart>
               </ResponsiveContainer>
             </div>
           </div>

           <div className="bg-white rounded-3xl shadow-lg p-6 border border-slate-100 flex flex-col print:shadow-none print:border print:border-slate-300 no-break">
             <h3 className="text-sm font-bold text-slate-800 mb-4 flex items-center gap-2">🩺 Dr. English 소견</h3>
             {isLoading ? (
               <div className="flex-1 flex flex-col items-center justify-center text-slate-400 min-h-[200px]">
                 <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-3"></div>
                 <span className="text-sm font-medium animate-pulse">상위 1% 전문가가 분석 중...</span>
               </div>
             ) : (
               <div className="flex-1 bg-slate-50 rounded-2xl p-6 text-slate-700 text-[15px] leading-7 shadow-inner flex flex-col justify-center border border-slate-100 print:shadow-none print:border-0 print:p-0">
                 <p>{aiAnalysis && <HighlightedText text={aiAnalysis.diagnosis} colorClass="text-blue-700 bg-blue-100 print:bg-transparent print:text-blue-800" />}</p>
               </div>
             )}
           </div>
        </div>

        {/* Detailed AI Analysis */}
        {!isLoading && aiAnalysis && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in-up print:block print:space-y-4">
            <div className="bg-white rounded-3xl shadow-lg border border-slate-100 overflow-hidden print:shadow-none print:border print:border-slate-300 no-break">
               <div className="bg-red-50 px-6 py-4 border-b border-red-100 flex items-center gap-2 print:bg-gray-100 print:border-gray-300">
                 <span className="text-xl">⚠️</span> <h3 className="text-red-900 font-bold print:text-black">취약점 정밀 분석</h3>
               </div>
               <div className="p-6 text-slate-700 leading-relaxed"><HighlightedText text={aiAnalysis.weakness} colorClass="text-red-600 bg-red-50 print:bg-transparent print:text-red-700" /></div>
            </div>
            <div className="bg-white rounded-3xl shadow-lg border border-slate-100 overflow-hidden print:shadow-none print:border print:border-slate-300 no-break mt-6 md:mt-0 print:mt-4">
               <div className="bg-emerald-50 px-6 py-4 border-b border-emerald-100 flex items-center gap-2 print:bg-gray-100 print:border-gray-300">
                 <span className="text-xl">💊</span> <h3 className="text-emerald-900 font-bold print:text-black">솔루션 & 처방전</h3>
               </div>
               <div className="p-6 text-slate-700 leading-relaxed"><HighlightedText text={aiAnalysis.prescription} colorClass="text-emerald-700 bg-emerald-50 print:bg-transparent print:text-emerald-700" /></div>
            </div>
          </div>
        )}

        {/* --- REVIEW LIST (ODAP NOTE) --- */}
        {wrongRecords.length > 0 && (
            <div className="bg-white rounded-3xl shadow-lg border border-slate-200 overflow-hidden mt-8 animate-slide-up print:shadow-none print:border print:border-slate-300">
                <div className="bg-gray-100 px-6 py-4 border-b border-gray-200 flex items-center justify-between print:bg-gray-200">
                    <h3 className="font-extrabold text-gray-800 text-lg flex items-center gap-2">
                        📝 오답 노트 (Review Note)
                        <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full print:bg-black print:text-white">{wrongRecords.length}개 틀림</span>
                    </h3>
                </div>
                <div className="divide-y divide-gray-100">
                    {wrongRecords.map((record, idx) => {
                        // Find original question for explanation and correct answer text
                        const originalQ = QUESTIONS.find(q => q.id === record.questionId);
                        return (
                            <div key={idx} className="p-6 hover:bg-gray-50 transition print:break-inside-avoid">
                                <div className="flex items-center gap-2 mb-2 text-xs font-bold text-gray-400 uppercase">
                                    <span className="bg-gray-200 px-2 py-1 rounded text-gray-600">{record.category}</span>
                                    <span>난이도 {record.difficulty}</span>
                                </div>
                                <p className="font-bold text-gray-800 mb-3 text-lg">{record.questionText}</p>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                                    <div className="bg-red-50 border border-red-200 p-3 rounded-lg print:border-gray-300">
                                        <span className="text-xs font-bold text-red-500 block mb-1">내가 고른 답</span>
                                        <span className="text-red-900 font-medium">{record.selectedOption}</span>
                                    </div>
                                    <div className="bg-green-50 border border-green-200 p-3 rounded-lg print:border-gray-300">
                                        <span className="text-xs font-bold text-green-600 block mb-1">정답</span>
                                        <span className="text-green-900 font-medium">{originalQ?.correct_answer || "확인 필요"}</span>
                                    </div>
                                </div>
                                <div className="bg-slate-50 p-4 rounded-xl text-sm text-slate-600 border border-slate-100 print:bg-white print:border-gray-200">
                                    <span className="font-bold text-slate-800 mr-2">💡 해설:</span>
                                    {originalQ?.explanation}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        )}

        {/* Footer Actions (Hidden when printing) */}
        <div className="pt-4 pb-8 flex flex-col md:flex-row gap-4 print:hidden">
          {wrongRecords.length > 0 && (
             <button
                onClick={() => onRetry(wrongQuestionIds)}
                className="flex-1 bg-gradient-to-r from-red-500 to-orange-500 text-white font-bold py-5 rounded-2xl shadow-xl hover:shadow-2xl hover:from-red-600 hover:to-orange-600 transition transform active:scale-[0.98] flex items-center justify-center gap-3 text-lg"
             >
                <span>💊 틀린 문제 집중 치료 (Retry)</span>
             </button>
          )}
          
          <button
            onClick={onRestart}
            className={`flex-1 bg-slate-800 text-white font-bold py-5 rounded-2xl shadow-xl hover:bg-slate-900 transition transform active:scale-[0.98] flex items-center justify-center gap-3 text-lg ${wrongRecords.length === 0 ? 'w-full' : ''}`}
          >
            <span>🔄 처음부터 다시 하기</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultScreen;
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
    <span className="leading-relaxed">
      {parts.map((part, i) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return (
            <span key={i} className={`font-black mx-0.5 px-1.5 py-0.5 rounded ${colorClass}`}>
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
    const board: ScoreBoard = { total: 0, maxTotal: records.length * 5, vocab: 0, structure: 0, reading: 0, grammar: 0 };
    const pointsPerQuestion = 5;

    records.forEach(r => {
      if (r.isCorrect) {
        board.total += pointsPerQuestion;
        if (r.category === 'Vocabulary') board.vocab += pointsPerQuestion;
        if (r.category === 'Structure') board.structure += pointsPerQuestion;
        if (r.category === 'Reading') board.reading += pointsPerQuestion;
        if (r.category === 'Grammar') board.grammar += pointsPerQuestion;
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
      ).slice(0, 10).join('\n');

      const prompt = `
        System: 당신은 대한민국 목동 학원가에서 가장 비싸고 유능한 '영어 입시 전문 컨설턴트'입니다.
        
        [필수 요청 사항]
        1. **말투**: 매우 전문적이고, 냉철하며, 신뢰감을 주는 '해요'체를 사용하세요.
        2. **강조**: 중요한 키워드(취약한 문법 용어, 심각성, 핵심 전략 등)는 반드시 **이중 별표**로 감싸주세요. (예: **관계대명사**, **심각한 수준**)
        3. **전문성**: 학생의 점수와 틀린 태그를 바탕으로 구체적인 피드백을 주세요.
        
        [Data]
        - 학생 이름: ${profile.name} (학년: ${profile.grade})
        - 선택 난이도: ${profile.level === 'beginner' ? '왕기초반' : profile.level === 'standard' ? '기본반' : '심화 실전반'}
        - 점수: ${finalScore}점
        - 약점 태그: ${wrongTags}
        - 오답 상세:
        ${wrongQuestionsSummary}

        [Output Format (JSON Only)]
        {
          "diagnosis": "총평. 3문장 이내. 중요 단어 **강조**.",
          "weakness": "취약점 분석. 불렛 포인트 사용 가능. 문법 용어 **강조**.",
          "prescription": "학습 로드맵. 단계별 제시. 행동 지침 **강조**."
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
  ];

  return (
    <div className="max-w-4xl mx-auto bg-slate-50 min-h-screen pb-12 font-sans">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-xl font-extrabold text-slate-800 flex items-center gap-2 tracking-tight">
            🏥 Dr. English <span className="text-xs bg-slate-800 text-white px-2 py-0.5 rounded shadow-sm">Premium Report</span>
          </h1>
          <button onClick={onRestart} className="text-sm text-slate-500 hover:text-slate-900 font-medium transition">
            ✕ 닫기
          </button>
        </div>
      </div>

      <div className="p-6 space-y-8">
        {/* Score Card */}
        <section className="bg-white rounded-3xl shadow-xl p-8 border border-slate-100 flex flex-col md:flex-row items-center gap-10 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
          <div className="text-center md:text-left flex-1 z-10">
            <h2 className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-3">Diagnostic Result</h2>
            <div className="flex items-end justify-center md:justify-start gap-4">
              <span className="text-7xl font-black text-slate-900 tracking-tighter">{finalScore}</span>
              <span className="text-2xl text-slate-300 font-bold mb-3">/ 100</span>
            </div>
            <div className={`mt-5 inline-flex items-center gap-2 px-5 py-2 rounded-full border-2 ${tierColor} font-bold text-sm shadow-sm`}>
              <span>🏆 {tier} Class</span>
            </div>
            <p className="text-xs text-slate-400 mt-3 font-medium">* 목동 학군 기준 백분위 추정</p>
          </div>
          <div className="w-full md:w-1/2 h-56 z-10">
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           <div className="bg-white rounded-3xl shadow-lg p-6 border border-slate-100 flex flex-col">
             <h3 className="text-sm font-bold text-slate-800 mb-6 flex items-center gap-2">📊 영역별 밸런스</h3>
             <div className="flex-1 min-h-[250px]">
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

           <div className="bg-white rounded-3xl shadow-lg p-6 border border-slate-100 flex flex-col">
             <h3 className="text-sm font-bold text-slate-800 mb-4 flex items-center gap-2">🩺 Dr. English 소견</h3>
             {isLoading ? (
               <div className="flex-1 flex flex-col items-center justify-center text-slate-400 min-h-[200px]">
                 <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-3"></div>
                 <span className="text-sm font-medium animate-pulse">분석 중...</span>
               </div>
             ) : (
               <div className="flex-1 bg-slate-50 rounded-2xl p-6 text-slate-700 text-[15px] leading-7 shadow-inner flex flex-col justify-center border border-slate-100">
                 <p>{aiAnalysis && <HighlightedText text={aiAnalysis.diagnosis} colorClass="text-blue-700 bg-blue-100" />}</p>
               </div>
             )}
           </div>
        </div>

        {/* Detailed AI Analysis */}
        {!isLoading && aiAnalysis && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in-up">
            <div className="bg-white rounded-3xl shadow-lg border border-slate-100 overflow-hidden">
               <div className="bg-red-50 px-6 py-4 border-b border-red-100 flex items-center gap-2">
                 <span className="text-xl">⚠️</span> <h3 className="text-red-900 font-bold">취약점 분석</h3>
               </div>
               <div className="p-6 text-slate-700 leading-relaxed"><HighlightedText text={aiAnalysis.weakness} colorClass="text-red-600 bg-red-50" /></div>
            </div>
            <div className="bg-white rounded-3xl shadow-lg border border-slate-100 overflow-hidden">
               <div className="bg-emerald-50 px-6 py-4 border-b border-emerald-100 flex items-center gap-2">
                 <span className="text-xl">💊</span> <h3 className="text-emerald-900 font-bold">솔루션 & 처방</h3>
               </div>
               <div className="p-6 text-slate-700 leading-relaxed"><HighlightedText text={aiAnalysis.prescription} colorClass="text-emerald-700 bg-emerald-50" /></div>
            </div>
          </div>
        )}

        {/* --- REVIEW LIST (ODAP NOTE) --- */}
        {wrongRecords.length > 0 && (
            <div className="bg-white rounded-3xl shadow-lg border border-slate-200 overflow-hidden mt-8 animate-slide-up">
                <div className="bg-gray-100 px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                    <h3 className="font-extrabold text-gray-800 text-lg flex items-center gap-2">
                        📝 오답 노트 (Review Note)
                        <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">{wrongRecords.length}개 틀림</span>
                    </h3>
                </div>
                <div className="divide-y divide-gray-100">
                    {wrongRecords.map((record, idx) => {
                        // Find original question for explanation and correct answer text
                        const originalQ = QUESTIONS.find(q => q.id === record.questionId);
                        return (
                            <div key={idx} className="p-6 hover:bg-gray-50 transition">
                                <div className="flex items-center gap-2 mb-2 text-xs font-bold text-gray-400 uppercase">
                                    <span className="bg-gray-200 px-2 py-1 rounded text-gray-600">{record.category}</span>
                                    <span>난이도 {record.difficulty}</span>
                                </div>
                                <p className="font-bold text-gray-800 mb-3 text-lg">{record.questionText}</p>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                                    <div className="bg-red-50 border border-red-200 p-3 rounded-lg">
                                        <span className="text-xs font-bold text-red-500 block mb-1">내가 고른 답</span>
                                        <span className="text-red-900 font-medium">{record.selectedOption}</span>
                                    </div>
                                    <div className="bg-green-50 border border-green-200 p-3 rounded-lg">
                                        <span className="text-xs font-bold text-green-600 block mb-1">정답</span>
                                        <span className="text-green-900 font-medium">{originalQ?.correct_answer || "확인 필요"}</span>
                                    </div>
                                </div>
                                <div className="bg-slate-50 p-4 rounded-xl text-sm text-slate-600 border border-slate-100">
                                    <span className="font-bold text-slate-800 mr-2">💡 해설:</span>
                                    {originalQ?.explanation}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        )}

        {/* Footer Actions */}
        <div className="pt-4 pb-8 flex flex-col md:flex-row gap-4">
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
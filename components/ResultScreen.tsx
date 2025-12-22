import React, { useMemo, useEffect, useState } from 'react';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';
import { UserProfile, AnswerRecord, ScoreBoard } from '../types';
import { GoogleGenAI } from "@google/genai";

interface Props {
  profile: UserProfile;
  records: AnswerRecord[];
  onRestart: () => void;
}

// Helper component to parse **bold** text and apply styles
const HighlightedText: React.FC<{ text: string; colorClass?: string }> = ({ text, colorClass = "text-indigo-700 bg-indigo-50" }) => {
  if (!text) return null;
  // Split by **text** markers
  const parts = text.split(/(\*\*.*?\*\*)/g);
  
  return (
    <span className="leading-relaxed">
      {parts.map((part, i) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          // Remove asterisks and apply style
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

const ResultScreen: React.FC<Props> = ({ profile, records, onRestart }) => {
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

  // Convert to 100-point scale for display
  const finalScore = Math.round((scores.total / Math.max(scores.maxTotal, 1)) * 100);
  
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
          diagnosis: "API 키가 설정되지 않았습니다.",
          weakness: "결과를 분석할 수 없습니다.",
          prescription: "관리자에게 문의하세요."
        });
        setIsLoading(false);
        return;
      }

      // Collect Wrong Tags for Professional Analysis
      const wrongTags = records
        .filter(r => !r.isCorrect)
        .flatMap(r => r.tags)
        .filter((value, index, self) => self.indexOf(value) === index) // Unique tags
        .join(', ');

      const wrongQuestionsSummary = records.filter(r => !r.isCorrect).map(r => 
        `- [${r.category}] 문제유형: ${r.tags.join(', ')} / 오답: ${r.selectedOption}`
      ).slice(0, 10).join('\n'); // Limit to 10 to fit context window

      const prompt = `
        System: 당신은 대한민국 목동 학원가에서 가장 비싸고 유능한 '영어 입시 전문 컨설턴트'입니다.
        학생과 학부모에게 보여줄 "프리미엄 정밀 진단 리포트"를 작성해야 합니다.
        
        [필수 요청 사항]
        1. **말투**: 매우 전문적이고, 냉철하며, 신뢰감을 주는 '해요'체를 사용하세요. (반말 금지)
        2. **강조**: 중요한 키워드(취약한 문법 용어, 심각성, 핵심 전략 등)는 반드시 **이중 별표**로 감싸주세요. (예: **관계대명사**, **심각한 수준**, **암기 필수**) -> 프론트엔드에서 색상 처리를 할 것입니다.
        3. **전문성**: 단순히 '열심히 하세요'가 아니라, 제공된 '태그(Tag)' 정보를 바탕으로 구체적인 문법 용어를 언급하세요.
        
        [Data]
        - 학생 이름: ${profile.name} (학년: ${profile.grade})
        - 선택 난이도: ${profile.level === 'beginner' ? '왕기초반' : profile.level === 'standard' ? '기본반' : '심화 실전반'}
        - 점수: ${finalScore}점 (백분위 추정: 상위 ${100 - finalScore}%)
        - 학생이 틀린 문제의 핵심 태그(약점): ${wrongTags}
        - 오답 상세:
        ${wrongQuestionsSummary}

        [Output Format (JSON Only)]
        {
          "diagnosis": "총평. 현재 학생의 정확한 위치와 상태를 3문장 이내로 요약. 중요한 단어는 **강조**.",
          "weakness": "취약점 심층 분석. 발견된 약점 태그들을 언급하며 왜 틀렸는지 논리적으로 설명. 불렛 포인트(-) 사용 가능. 중요한 문법 용어는 **강조**.",
          "prescription": "향후 학습 로드맵. [1단계: 기초복구] -> [2단계: 개념정립] -> [3단계: 실전적용] 처럼 단계별로 구체적 교재나 학습법 제시. 중요한 행동은 **강조**."
        }
      `;

      try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const response = await ai.models.generateContent({
          model: 'gemini-3-flash-preview',
          contents: prompt,
          config: { 
            responseMimeType: "application/json",
            temperature: 0.7 
          }
        });
        
        const text = response.text || "{}";
        const json = JSON.parse(text);
        setAiAnalysis(json);
      } catch (e) {
        console.error(e);
        setAiAnalysis({
          diagnosis: "AI 서버 통신 중 오류가 발생했습니다.",
          weakness: "잠시 후 다시 시도해주세요.",
          prescription: "기본 처방: **오답노트**를 철저히 작성하세요."
        });
      } finally {
        setIsLoading(false);
      }
    };

    generateAnalysis();
  }, [records, profile, finalScore]);

  // Chart Data
  const chartData = [
    { subject: '어휘(Vocab)', MyScore: (scores.vocab / Math.max(records.filter(r => r.category === 'Vocabulary').length * 5, 1)) * 100, Top10: 96 },
    { subject: '구조(Structure)', MyScore: (scores.structure / Math.max(records.filter(r => r.category === 'Structure').length * 5, 1)) * 100, Top10: 92 },
    { subject: '독해(Reading)', MyScore: (scores.reading / Math.max(records.filter(r => r.category === 'Reading').length * 5, 1)) * 100, Top10: 98 },
    { subject: '문법(Grammar)', MyScore: (scores.grammar / Math.max(records.filter(r => r.category === 'Grammar').length * 5, 1)) * 100, Top10: 95 },
  ];

  return (
    <div className="max-w-4xl mx-auto bg-slate-50 min-h-screen pb-12 font-sans">
      {/* Header Badge */}
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
        {/* 1. Score Card Section */}
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
            <p className="text-xs text-slate-400 mt-3 font-medium">* 목동 학군 {profile.grade} 기준 백분위 추정치</p>
          </div>
          
          <div className="w-full md:w-1/2 h-56 z-10">
             <ResponsiveContainer width="100%" height="100%">
               <BarChart data={chartData} layout="vertical" barSize={16} margin={{ left: 40, right: 20 }}>
                 <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
                 <XAxis type="number" domain={[0, 100]} hide />
                 <YAxis dataKey="subject" type="category" width={80} tick={{fontSize: 11, fontWeight: 'bold', fill: '#64748b'}} />
                 <Tooltip cursor={{fill: 'transparent'}} contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'}} />
                 <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', fontWeight: '600' }} />
                 <Bar dataKey="MyScore" name="내 점수" fill="#3b82f6" radius={[0, 6, 6, 0]} animationDuration={1500} />
                 <Bar dataKey="Top10" name="목동 상위 10%" fill="#cbd5e1" radius={[0, 6, 6, 0]} />
               </BarChart>
             </ResponsiveContainer>
          </div>
        </section>

        {/* 2. Radar & Diagnosis Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           {/* Radar Chart */}
           <div className="bg-white rounded-3xl shadow-lg p-6 border border-slate-100 flex flex-col">
             <h3 className="text-sm font-bold text-slate-800 mb-6 flex items-center gap-2">
               📊 영역별 정밀 밸런스
             </h3>
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

           {/* AI Diagnosis */}
           <div className="bg-white rounded-3xl shadow-lg p-6 border border-slate-100 flex flex-col">
             <h3 className="text-sm font-bold text-slate-800 mb-4 flex items-center gap-2">
               🩺 Dr. English 종합 소견
             </h3>
             {isLoading ? (
               <div className="flex-1 flex flex-col items-center justify-center text-slate-400 min-h-[200px]">
                 <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-3"></div>
                 <span className="text-sm font-medium animate-pulse">AI가 정밀 분석 중입니다...</span>
               </div>
             ) : (
               <div className="flex-1 bg-slate-50 rounded-2xl p-6 text-slate-700 text-[15px] leading-7 shadow-inner flex flex-col justify-center border border-slate-100">
                 <p>
                   {aiAnalysis && <HighlightedText text={aiAnalysis.diagnosis} colorClass="text-blue-700 bg-blue-100" />}
                 </p>
               </div>
             )}
           </div>
        </div>

        {/* 3. Detailed Analysis (Weakness & Prescription) */}
        {!isLoading && aiAnalysis && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in-up">
            {/* Weakness Analysis */}
            <div className="bg-white rounded-3xl shadow-lg overflow-hidden border border-slate-100 group hover:shadow-xl transition-shadow duration-300">
               <div className="bg-red-50 px-8 py-5 border-b border-red-100 flex items-center gap-3">
                 <div className="bg-white p-2 rounded-full shadow-sm text-lg">⚠️</div>
                 <h3 className="text-red-900 font-extrabold tracking-tight text-lg">
                   취약점 정밀 분석
                 </h3>
               </div>
               <div className="p-8 text-slate-700 text-[15px] leading-8 whitespace-pre-line">
                 <HighlightedText text={aiAnalysis.weakness} colorClass="text-red-600 bg-red-50 border-b-2 border-red-100" />
               </div>
            </div>

            {/* Prescription */}
            <div className="bg-white rounded-3xl shadow-lg overflow-hidden border border-slate-100 group hover:shadow-xl transition-shadow duration-300">
               <div className="bg-emerald-50 px-8 py-5 border-b border-emerald-100 flex items-center gap-3">
                 <div className="bg-white p-2 rounded-full shadow-sm text-lg">💊</div>
                 <h3 className="text-emerald-900 font-extrabold tracking-tight text-lg">
                   솔루션 & 학습 로드맵
                 </h3>
               </div>
               <div className="p-8 text-slate-700 text-[15px] leading-8 whitespace-pre-line">
                 <HighlightedText text={aiAnalysis.prescription} colorClass="text-emerald-700 bg-emerald-50 border-b-2 border-emerald-100" />
               </div>
            </div>
          </div>
        )}

        {/* Footer Action */}
        <div className="pt-8 pb-4">
          <button
            onClick={onRestart}
            className="w-full bg-slate-900 text-white font-bold py-5 rounded-2xl shadow-2xl hover:bg-black transition transform active:scale-[0.98] flex items-center justify-center gap-3 text-lg ring-4 ring-slate-100"
          >
            <span>🔄 다른 테스트 진행하기</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultScreen;

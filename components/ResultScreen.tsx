import React, { useMemo, useEffect, useState } from 'react';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';
import { UserProfile, AnswerRecord, ScoreBoard } from '../types';
import { GoogleGenAI } from "@google/genai";

interface Props {
  profile: UserProfile;
  records: AnswerRecord[];
  onRestart: () => void;
}

const ResultScreen: React.FC<Props> = ({ profile, records, onRestart }) => {
  // --- Scoring Logic ---
  const scores = useMemo(() => {
    // Each question is worth 3.33 points roughly, or simplify to total points based on correct count
    // But let's keep specific category buckets
    const board: ScoreBoard = { total: 0, maxTotal: records.length * 5, vocab: 0, structure: 0, reading: 0, grammar: 0 };
    const pointsPerQuestion = 5; // Simplified points per question for internal calc

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
  const finalScore = Math.round((scores.total / scores.maxTotal) * 100);
  
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

      // Filter wrong answers for the prompt
      const wrongAnswers = records.filter(r => !r.isCorrect).map(r => 
        `- [${r.category}] 문제: "${r.questionText}" / 학생답: ${r.selectedOption}`
      ).join('\n');

      // Join weakness array for prompt
      const weaknessStr = profile.weakness.join(', ');

      const prompt = `
        System: 당신은 대한민국 교육특구 '목동'에서 가장 유명한 중등 영어 입시 컨설턴트입니다. 
        학부모님과 학생에게 보여줄 "프리미엄 진단 리포트"를 작성해야 합니다.
        말투는 매우 전문적이고, 냉철하며, 신뢰감을 주어야 합니다. (반말 금지. 정중한 '해요'체 사용).
        
        Data:
        - 학생: ${profile.name} (중2)
        - 점수: ${finalScore}점 (목동 상위권 기준 ${finalScore >= 90 ? '합격점' : '재수강 필요'})
        - 학생이 꼽은 약점: ${weaknessStr}
        - 실제 틀린 문제들:
        ${wrongAnswers}

        Output Format:
        JSON 형식으로 다음 3가지 키를 포함하여 응답하세요. Markdown은 쓰지 마세요.
        {
          "diagnosis": "전체적인 총평. 학생의 현재 위치를 정확히 진단 (2-3문장)",
          "weakness": "틀린 문제들을 분석하여 발견된 치명적인 약점과 원인 분석 (상세히)",
          "prescription": "향후 3개월간의 구체적인 학습 로드맵 및 공부법 (3가지 포인트)"
        }
      `;

      try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const response = await ai.models.generateContent({
          model: 'gemini-3-flash-preview',
          contents: prompt,
          config: { responseMimeType: "application/json" }
        });
        
        const text = response.text || "{}";
        const json = JSON.parse(text);
        setAiAnalysis(json);
      } catch (e) {
        console.error(e);
        setAiAnalysis({
          diagnosis: "AI 서버 통신 중 오류가 발생했습니다.",
          weakness: "잠시 후 다시 시도해주세요.",
          prescription: "기본 처방: 오답노트를 철저히 작성하세요."
        });
      } finally {
        setIsLoading(false);
      }
    };

    generateAnalysis();
  }, [records, profile, finalScore]);

  // Chart Data
  // Mock Data for "Mok-dong Top 10%" to simulate competition
  const chartData = [
    { subject: '어휘(Vocab)', MyScore: (scores.vocab / (records.filter(r => r.category === 'Vocabulary').length * 5 || 1)) * 100, Top10: 96 },
    { subject: '구조(Structure)', MyScore: (scores.structure / (records.filter(r => r.category === 'Structure').length * 5 || 1)) * 100, Top10: 92 },
    { subject: '독해(Reading)', MyScore: (scores.reading / (records.filter(r => r.category === 'Reading').length * 5 || 1)) * 100, Top10: 98 },
    { subject: '문법(Grammar)', MyScore: (scores.grammar / (records.filter(r => r.category === 'Grammar').length * 5 || 1)) * 100, Top10: 95 },
  ];

  return (
    <div className="max-w-4xl mx-auto bg-gray-50 min-h-screen pb-12">
      {/* Header Badge */}
      <div className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            🏥 Dr. English <span className="text-xs bg-gray-800 text-white px-2 py-0.5 rounded">Premium</span>
          </h1>
          <button onClick={onRestart} className="text-sm text-gray-500 hover:text-gray-900 font-medium">
            ✕ 닫기
          </button>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* 1. Score Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 flex flex-col md:flex-row items-center gap-8">
          <div className="text-center md:text-left flex-1">
            <h2 className="text-gray-500 text-sm font-bold uppercase tracking-wider mb-2">Diagnostic Result</h2>
            <div className="flex items-end justify-center md:justify-start gap-3">
              <span className="text-6xl font-black text-gray-900">{finalScore}</span>
              <span className="text-xl text-gray-400 font-medium mb-2">/ 100</span>
            </div>
            <div className={`mt-4 inline-flex items-center gap-2 px-4 py-1.5 rounded-full border ${tierColor} font-bold text-sm`}>
              <span>🏆 {tier} Class</span>
            </div>
            <p className="text-xs text-gray-400 mt-2">* 목동 학군 중2 기준 백분위 추정치입니다.</p>
          </div>
          
          <div className="w-full md:w-1/2 h-48">
             <ResponsiveContainer width="100%" height="100%">
               <BarChart data={chartData} layout="vertical" barSize={12} margin={{ left: 40 }}>
                 <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                 <XAxis type="number" domain={[0, 100]} hide />
                 <YAxis dataKey="subject" type="category" width={80} tick={{fontSize: 11, fontWeight: 'bold'}} />
                 <Tooltip cursor={{fill: 'transparent'}} contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)'}} />
                 <Legend iconType="circle" />
                 <Bar dataKey="MyScore" name="내 점수" fill="#3b82f6" radius={[0, 4, 4, 0]} />
                 <Bar dataKey="Top10" name="목동 상위 10%" fill="#e5e7eb" radius={[0, 4, 4, 0]} />
               </BarChart>
             </ResponsiveContainer>
          </div>
        </div>

        {/* 2. Radar Balance */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
             <h3 className="text-sm font-bold text-gray-800 mb-4 flex items-center gap-2">
               📊 영역별 밸런스
             </h3>
             <div className="h-64">
               <ResponsiveContainer width="100%" height="100%">
                 <RadarChart cx="50%" cy="50%" outerRadius="70%" data={chartData}>
                   <PolarGrid />
                   <PolarAngleAxis dataKey="subject" tick={{ fill: '#6b7280', fontSize: 11, fontWeight: 'bold' }} />
                   <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} />
                   <Radar name="My Score" dataKey="MyScore" stroke="#2563eb" fill="#3b82f6" fillOpacity={0.4} />
                   <Legend />
                 </RadarChart>
               </ResponsiveContainer>
             </div>
           </div>

           {/* 3. AI Diagnosis Card (Loading State Handled) */}
           <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100 flex flex-col">
             <h3 className="text-sm font-bold text-gray-800 mb-4 flex items-center gap-2">
               🩺 닥터의 종합 소견
             </h3>
             {isLoading ? (
               <div className="flex-1 flex flex-col items-center justify-center text-gray-400">
                 <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-2"></div>
                 <span className="text-xs">데이터 분석 중...</span>
               </div>
             ) : (
               <div className="flex-1 bg-blue-50 rounded-xl p-5 text-sm leading-relaxed text-blue-900 flex flex-col justify-center">
                 <p className="font-medium">"{aiAnalysis?.diagnosis}"</p>
               </div>
             )}
           </div>
        </div>

        {/* 4. Detailed Breakdown (Weakness & Prescription) */}
        {!isLoading && aiAnalysis && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in-up">
            {/* Weakness Analysis */}
            <div className="bg-white rounded-2xl shadow-md p-0 overflow-hidden border border-gray-100">
               <div className="bg-red-50 px-6 py-4 border-b border-red-100">
                 <h3 className="text-red-800 font-bold flex items-center gap-2">
                   ⚠️ 취약점 정밀 분석
                 </h3>
               </div>
               <div className="p-6 text-gray-700 text-sm leading-7 whitespace-pre-wrap">
                 {aiAnalysis.weakness}
               </div>
            </div>

            {/* Prescription */}
            <div className="bg-white rounded-2xl shadow-md p-0 overflow-hidden border border-gray-100">
               <div className="bg-green-50 px-6 py-4 border-b border-green-100">
                 <h3 className="text-green-800 font-bold flex items-center gap-2">
                   💊 솔루션 & 처방전
                 </h3>
               </div>
               <div className="p-6 text-gray-700 text-sm leading-7 whitespace-pre-wrap">
                 {aiAnalysis.prescription}
               </div>
            </div>
          </div>
        )}

        {/* Footer Action */}
        <div className="pt-6">
          <button
            onClick={onRestart}
            className="w-full bg-gray-900 text-white font-bold py-4 rounded-xl shadow-lg hover:bg-black transition active:scale-95 flex items-center justify-center gap-2"
          >
            🔄 다른 테스트 진행하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultScreen;

import React, { useMemo } from 'react';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { UserProfile, AnswerRecord, ScoreBoard } from '../types';
import { QUESTIONS } from '../constants';
import { GoogleGenAI } from "@google/genai";

interface Props {
  profile: UserProfile;
  records: AnswerRecord[];
  onRestart: () => void;
}

const ResultScreen: React.FC<Props> = ({ profile, records, onRestart }) => {
  // --- 1. Scoring Logic ---
  const scores = useMemo(() => {
    const board: ScoreBoard = { total: 0, vocab: 0, structure: 0, reading: 0, grammar: 0 };
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

  // --- 2. Grade Calculation ---
  const grade = scores.total >= 80 ? 'A' : scores.total >= 50 ? 'B' : 'C';
  const gradeColor = grade === 'A' ? 'text-green-600' : grade === 'B' ? 'text-yellow-600' : 'text-red-600';

  // --- 3. Badge Logic ---
  const badges = useMemo(() => {
    const b = ["🏅 용감한 도전자"]; // Always earned if completed
    if (scores.vocab >= 27) b.push("📚 단어 마스터");
    if (scores.structure === 20) b.push("🏗️ 문장 건축가");
    if (scores.reading === 20) b.push("📖 독해 스나이퍼");
    if (scores.grammar >= 27) b.push("⚡ 문법 헌터");
    if (scores.total >= 95) b.push("👑 완벽주의자");
    return b;
  }, [scores]);

  // --- 4. Tag Analysis & Prescriptions ---
  const analysis = useMemo(() => {
    const wrongTags: Record<string, number> = {};
    const wrongDifficulty: Record<number, number> = { 1: 0, 2: 0, 3: 0 };

    records.forEach(r => {
      if (!r.isCorrect) {
        r.tags.forEach(t => {
          wrongTags[t] = (wrongTags[t] || 0) + 1;
        });
        wrongDifficulty[r.difficulty] = (wrongDifficulty[r.difficulty] || 0) + 1;
      }
    });

    // Priority Check
    let priorityDiag = "";
    let primaryAction = "";

    if (scores.vocab < 15) {
      priorityDiag = "어휘 응급";
      primaryAction = "중등 필수 영단어장 1일 30개 암기";
    } else if (scores.structure < 10) {
      priorityDiag = "구조 붕괴";
      primaryAction = "주어-동사 찾기 훈련 시급";
    } else {
      priorityDiag = "정밀 분석 필요";
      primaryAction = "틀린 문제 유형별 오답노트 작성";
    }

    // Weakness Match Logic
    const categoryScores = {
      '단어암기': scores.vocab / 30,
      '문장만들기': scores.structure / 20,
      '긴글읽기': scores.reading / 20,
      '문법용어': scores.grammar / 30
    };
    
    // Convert weakness string to English key for mapping
    const mapWeaknessToCat = {
      '단어암기': 'vocab',
      '문장만들기': 'structure',
      '긴글읽기': 'reading',
      '문법용어': 'grammar'
    };

    // Find actual lowest
    let lowestScore = 1.0;
    let lowestArea = "";
    Object.entries(categoryScores).forEach(([k, v]) => {
      if (v < lowestScore) {
        lowestScore = v;
        lowestArea = k;
      }
    });

    const isPredictionCorrect = lowestArea === profile.weakness;
    const diagnosisText = isPredictionCorrect
      ? `네 예상이 맞았어. '${profile.weakness}' 부분이 진짜 구멍이야. 여기부터 메우자.`
      : `아니야, 넌 사실 '${lowestArea}'가 더 문제였어. 메타인지 조정이 필요해.`;

    // Prescriptions
    const prescriptions = [];
    if (wrongTags['voc_spelling'] > 2) prescriptions.push("단어 소리 내서 읽으면서 쓰기 (하루 10개씩!)");
    if (wrongTags['voc_confusion'] > 0) prescriptions.push("헷갈리는 단어 표 만들어서 비교하기");
    if (wrongTags['syn_svo'] > 0) prescriptions.push("교과서 본문에서 주어/동사 찾기 연습 (하루 3문장)");
    if (wrongTags['grm_infinitive'] > 0) prescriptions.push("to부정사 3가지 용법 정리 & 예문 5개씩 만들기");
    if (wrongTags['grm_passive'] > 0) prescriptions.push("'be + p.p.' 공식 암기하고 능동태↔수동태 바꾸기 연습");
    if (wrongTags['grm_tense'] > 0) prescriptions.push("시제별 시간표현(yesterday, now, tomorrow) 정리하기");
    
    // Fallback prescription if clean
    if (prescriptions.length === 0) prescriptions.push("틀린 문제가 별로 없네! 심화 독해 문제집에 도전해봐.");

    return {
      wrongDifficulty,
      priorityDiag,
      primaryAction,
      diagnosisText,
      prescriptions,
      lowestArea
    };
  }, [records, scores, profile]);

  // Chart Data
  const chartData = [
    { subject: '어휘', A: scores.vocab, fullMark: 30 },
    { subject: '구조', A: scores.structure, fullMark: 20 },
    { subject: '독해', A: scores.reading, fullMark: 20 },
    { subject: '문법', A: scores.grammar, fullMark: 30 },
  ];

  // AI Doctor's Note State
  const [aiOpinion, setAiOpinion] = React.useState<string | null>(null);
  const [loadingAi, setLoadingAi] = React.useState(false);

  const fetchAiOpinion = async () => {
    if (!process.env.API_KEY) {
      alert("API Key가 설정되지 않아 AI 소견을 불러올 수 없습니다. 기본 진단을 참고하세요.");
      return;
    }
    setLoadingAi(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      // Use a strict prompt to ensure good output
      const prompt = `
        System: You are "Dr. English", a strict but warm middle school English tutor.
        Task: Write a 2-sentence encouragement and specific advice based on this student's diagnostic result.
        Student: ${profile.name} (${profile.grade})
        Score: ${scores.total}/100
        Weakest Area: ${analysis.lowestArea}
        Diagnosis: ${analysis.diagnosisText}
        Tone: Korean, warm but sharp. Use emojis.
      `;
      
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
      });
      setAiOpinion(response.text);
    } catch (e) {
      console.error("AI Gen Error", e);
      setAiOpinion("통신 상태가 좋지 않아 닥터의 정밀 소견을 가져오지 못했어. (하지만 위 진단결과는 정확해!)");
    } finally {
      setLoadingAi(false);
    }
  };

  // Determine Basic vs Advanced Error for static note
  const basicErrorCount = analysis.wrongDifficulty[1];
  const staticOpinion = basicErrorCount > 0 
    ? "기초 문제(난이도 1)를 틀린 건 뼈아파. 실수도 실력이야. 기초부터 다시 잡자." 
    : "어려운 문제만 골라서 틀렸구나? 기본기는 튼튼하니 심화 학습만 보완하면 완벽해질 거야.";

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-2xl rounded-3xl overflow-hidden border border-gray-200">
      <div className="bg-gray-800 text-white p-6 text-center">
        <h1 className="text-2xl font-bold mb-2">🏥 닥터 잉글리시 진단서</h1>
        <p className="opacity-80">환자: {profile.name} ({profile.grade})</p>
      </div>

      <div className="p-8 space-y-8">
        {/* Total Score */}
        <div className="text-center">
          <div className="text-gray-500 font-medium mb-1">종합 점수</div>
          <div className={`text-6xl font-black ${gradeColor}`}>{scores.total}<span className="text-2xl text-gray-400">/100</span></div>
          <div className="mt-2 inline-block px-4 py-1 rounded-full bg-gray-100 font-bold text-gray-600">
            등급: {grade}
          </div>
        </div>

        {/* Chart */}
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="subject" tick={{ fill: '#4b5563', fontSize: 12, fontWeight: 'bold' }} />
              <PolarRadiusAxis angle={30} domain={[0, 'auto']} />
              <Radar name="My Score" dataKey="A" stroke="#2563eb" fill="#3b82f6" fillOpacity={0.5} />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* Breakdown */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="bg-green-50 p-3 rounded-lg">
            <span className="font-bold block text-green-800">어휘력</span>
            {scores.vocab}/30
          </div>
          <div className="bg-purple-50 p-3 rounded-lg">
            <span className="font-bold block text-purple-800">구조력</span>
            {scores.structure}/20
          </div>
          <div className="bg-orange-50 p-3 rounded-lg">
            <span className="font-bold block text-orange-800">독해력</span>
            {scores.reading}/20
          </div>
          <div className="bg-pink-50 p-3 rounded-lg">
            <span className="font-bold block text-pink-800">문법력</span>
            {scores.grammar}/30
          </div>
        </div>

        {/* Diagnosis */}
        <div className="border-t border-gray-100 pt-6">
          <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center">
            🔍 자가진단 vs 실제 결과
          </h3>
          <p className="bg-gray-50 p-4 rounded-xl text-gray-700 italic border-l-4 border-gray-400">
            "{analysis.diagnosisText}"
          </p>
        </div>

        <div className="border-t border-gray-100 pt-6">
          <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center">
            👨‍⚕️ 닥터의 소견
          </h3>
          <div className="bg-blue-50 p-5 rounded-xl text-blue-900 leading-relaxed relative">
             {/* Fallback Static Opinion */}
            {!aiOpinion && (
               <p>{staticOpinion}</p>
            )}
            {/* AI Opinion */}
            {aiOpinion && (
               <p className="animate-fade-in">{aiOpinion}</p>
            )}

            {/* AI Button - Only show if AI not yet loaded and API key conceptually exists */}
            {!aiOpinion && !loadingAi && (
               <button 
                onClick={fetchAiOpinion}
                className="mt-4 text-xs bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition flex items-center gap-1"
               >
                 ✨ AI 정밀 분석 더보기
               </button>
            )}
             {loadingAi && <div className="mt-4 text-xs text-blue-500">닥터가 차트를 분석 중입니다...</div>}
          </div>
        </div>

        <div className="border-t border-gray-100 pt-6">
          <h3 className="text-lg font-bold text-gray-800 mb-3">💊 오늘의 처방전</h3>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <span className="bg-red-100 text-red-600 font-bold px-2 py-1 rounded text-xs mt-0.5 shrink-0">최우선</span>
              <span className="text-gray-700 font-medium">{analysis.primaryAction}</span>
            </li>
            {analysis.prescriptions.slice(0, 3).map((p, idx) => (
              <li key={idx} className="flex items-start gap-3">
                 <span className="bg-blue-100 text-blue-600 font-bold px-2 py-1 rounded text-xs mt-0.5 shrink-0">보완</span>
                 <span className="text-gray-700">{p}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="border-t border-gray-100 pt-6 pb-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">🏅 획득 뱃지</h3>
          <div className="flex flex-wrap gap-2">
            {badges.map(b => (
              <span key={b} className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-bold border border-yellow-200 shadow-sm">
                {b}
              </span>
            ))}
          </div>
        </div>

        <button
          onClick={onRestart}
          className="w-full bg-gray-900 text-white font-bold py-4 rounded-xl shadow-lg hover:bg-black transition"
        >
          처음으로 돌아가기
        </button>
      </div>
    </div>
  );
};

export default ResultScreen;

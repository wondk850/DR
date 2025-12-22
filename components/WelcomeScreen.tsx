import React, { useState } from 'react';
import { UserProfile, GradeLevel, ConfidenceLevel, WeaknessType, TestMode, TargetLevel } from '../types';

interface Props {
  onComplete: (profile: UserProfile) => void;
}

const WelcomeScreen: React.FC<Props> = ({ onComplete }) => {
  const [name, setName] = useState('');
  const [grade, setGrade] = useState<GradeLevel>('중2');
  const [confidence, setConfidence] = useState<ConfidenceLevel>('😐보통');
  const [weaknesses, setWeaknesses] = useState<WeaknessType[]>(['문법용어']);
  const [mode, setMode] = useState<TestMode>('comprehensive');
  const [level, setLevel] = useState<TargetLevel>('advanced'); // Default

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onComplete({ name, grade, confidence, weakness: weaknesses, mode, level });
    }
  };

  const toggleWeakness = (w: WeaknessType) => {
    setWeaknesses(prev => 
      prev.includes(w) 
        ? prev.filter(item => item !== w) 
        : [...prev, w]
    );
  };

  const modes: { id: TestMode; label: string; icon: string; desc: string }[] = [
    { id: 'comprehensive', label: '종합 정밀 진단', icon: '🏥', desc: '신서중 2학년 내신 완벽 대비' },
    { id: 'grammar', label: '문법 집중 케어', icon: '⚡', desc: '5형식, 관계사, 수동태, 가정법' },
    { id: 'reading', label: '독해 심화 분석', icon: '📖', desc: '추론, 순서배열, 내용일치' },
    { id: 'vocabulary', label: '어휘력 테스트', icon: '📚', desc: '영영풀이, 다의어, 파생어' },
  ];

  return (
    <div className="bg-white p-6 md:p-8 rounded-3xl shadow-2xl max-w-lg w-full border-t-8 border-blue-600">
      <div className="text-center mb-6">
        <div className="text-5xl mb-3 animate-bounce">👨‍⚕️</div>
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">닥터 잉글리시</h1>
        <p className="text-blue-600 font-bold mt-2 text-lg">Ver 6.3 (Strict Level System)</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">이름을 알려줘!</label>
          <input
            type="text"
            required
            className="w-full px-5 py-3 bg-white text-gray-900 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none transition text-lg placeholder-gray-400 font-bold"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="예: 김학생 (여기에 이름 입력)"
          />
        </div>

        {/* Level Selection */}
        <div>
           <label className="block text-sm font-bold text-gray-700 mb-3">도전할 난이도를 선택해줘!</label>
           <div className="flex flex-col gap-3">
             {/* Beginner Level */}
             <button
               type="button"
               onClick={() => setLevel('beginner')}
               className={`p-3 rounded-xl border-2 transition-all text-left relative overflow-hidden flex items-center gap-3 ${
                 level === 'beginner' 
                   ? 'border-yellow-500 bg-yellow-50 text-yellow-900 ring-1 ring-yellow-500 shadow-md' 
                   : 'border-gray-200 bg-white text-gray-500 hover:bg-gray-50'
               }`}
             >
               <div className="text-3xl">🐥</div>
               <div className="flex-1">
                 <div className="font-bold text-base flex items-center gap-2">Beginner Class <span className="text-xs bg-yellow-200 text-yellow-800 px-2 py-0.5 rounded-full">중1 기초</span></div>
                 <div className="text-xs opacity-80 mt-1">Be동사, 일반동사 등 아주 기초적인 문제만 나와요. 절대 어렵지 않아요!</div>
               </div>
               {level === 'beginner' && <div className="text-yellow-600 text-lg font-bold">✓</div>}
             </button>

             <div className="grid grid-cols-2 gap-3">
               <button
                 type="button"
                 onClick={() => setLevel('standard')}
                 className={`p-3 rounded-xl border-2 transition-all text-center relative overflow-hidden ${
                   level === 'standard' 
                     ? 'border-green-500 bg-green-50 text-green-900 ring-1 ring-green-500 shadow-md' 
                     : 'border-gray-200 bg-white text-gray-500 hover:bg-gray-50'
                 }`}
               >
                 <div className="text-2xl mb-1">🌱</div>
                 <div className="font-bold text-base">Standard</div>
                 <div className="text-xs opacity-80 font-medium text-green-700 mt-1">기본 탄탄반<br/>(킬러 문항 X)</div>
                 {level === 'standard' && <div className="absolute top-2 right-2 text-green-500 text-xs font-bold">✓</div>}
               </button>

               <button
                 type="button"
                 onClick={() => setLevel('advanced')}
                 className={`p-3 rounded-xl border-2 transition-all text-center relative overflow-hidden ${
                   level === 'advanced' 
                     ? 'border-red-500 bg-red-50 text-red-900 ring-1 ring-red-500 shadow-md' 
                     : 'border-gray-200 bg-white text-gray-500 hover:bg-gray-50'
                 }`}
               >
                 <div className="text-2xl mb-1">🔥</div>
                 <div className="font-bold text-base">High-End</div>
                 <div className="text-xs opacity-80 font-medium text-red-700 mt-1">목동 실전반<br/>(함정 주의)</div>
                 {level === 'advanced' && <div className="absolute top-2 right-2 text-red-500 text-xs font-bold">✓</div>}
               </button>
             </div>
           </div>
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">학년</label>
          <div className="flex gap-2">
            {(['중1', '중2', '중3'] as GradeLevel[]).map((g) => (
              <button
                key={g}
                type="button"
                onClick={() => setGrade(g)}
                className={`flex-1 py-3 rounded-xl text-sm font-bold transition transform active:scale-95 ${
                  grade === g
                    ? 'bg-blue-600 text-white shadow-lg ring-2 ring-blue-300 ring-offset-2'
                    : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                }`}
              >
                {g}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-3">어떤 검사를 받을래?</label>
          <div className="grid grid-cols-1 gap-2">
            {modes.map((m) => (
              <button
                key={m.id}
                type="button"
                onClick={() => setMode(m.id)}
                className={`px-4 py-3 rounded-xl text-left border transition-all duration-200 flex items-center gap-3 ${
                  mode === m.id
                    ? 'border-blue-500 bg-blue-50 text-blue-900 font-bold shadow-sm'
                    : 'border-gray-200 bg-white text-gray-600 hover:bg-gray-50'
                }`}
              >
                <span>{m.icon}</span>
                <span className="flex-1">{m.label}</span>
                {mode === m.id && <span className="text-blue-500">●</span>}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">가장 고민인 부분은? (여러 개 선택 가능)</label>
          <div className="grid grid-cols-2 gap-2">
            {(['단어암기', '문장만들기', '긴글읽기', '문법용어'] as WeaknessType[]).map((w) => {
              const isSelected = weaknesses.includes(w);
              return (
                <button
                  key={w}
                  type="button"
                  onClick={() => toggleWeakness(w)}
                  className={`py-2 px-3 rounded-lg text-sm font-medium transition text-left ${
                    isSelected
                      ? 'bg-purple-100 text-purple-800 border-2 border-purple-500 shadow-sm'
                      : 'bg-gray-50 text-gray-600 border border-gray-200 hover:bg-gray-100'
                  }`}
                >
                  {isSelected ? '✅ ' : '⬜ '} {w}
                </button>
              );
            })}
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-gray-900 hover:bg-black text-white font-bold py-4 rounded-xl shadow-xl transform transition active:scale-95 text-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed mt-4"
          disabled={!name.trim() || weaknesses.length === 0}
        >
          <span>진단 시작하기</span>
          <span className="animate-pulse">🩺</span>
        </button>
      </form>
    </div>
  );
};

export default WelcomeScreen;

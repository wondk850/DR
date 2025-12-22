import React, { useState } from 'react';
import { UserProfile, GradeLevel, ConfidenceLevel, WeaknessType, TestMode } from '../types';

interface Props {
  onComplete: (profile: UserProfile) => void;
}

const WelcomeScreen: React.FC<Props> = ({ onComplete }) => {
  const [name, setName] = useState('');
  const [grade, setGrade] = useState<GradeLevel>('중2');
  const [confidence, setConfidence] = useState<ConfidenceLevel>('😐보통');
  const [weaknesses, setWeaknesses] = useState<WeaknessType[]>(['문법용어']);
  const [mode, setMode] = useState<TestMode>('comprehensive');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onComplete({ name, grade, confidence, weakness: weaknesses, mode });
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
    { id: 'comprehensive', label: '종합 정밀 진단', icon: '🏥', desc: '어휘+문법+독해 전 영역 체크' },
    { id: 'grammar', label: '문법 집중 케어', icon: '⚡', desc: '문장 구조와 규칙 완벽 분석' },
    { id: 'reading', label: '독해 심화 분석', icon: '📖', desc: '긴 지문 이해력과 추론 능력' },
    { id: 'vocabulary', label: '어휘력 테스트', icon: '📚', desc: '단어 뜻, 스펠링, 혼동 어휘' },
  ];

  return (
    <div className="bg-white p-6 md:p-8 rounded-3xl shadow-2xl max-w-lg w-full border-t-8 border-blue-600">
      <div className="text-center mb-8">
        <div className="text-5xl mb-3 animate-bounce">👨‍⚕️</div>
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">닥터 잉글리시</h1>
        <p className="text-blue-600 font-bold mt-2 text-lg">중학 영어 정밀 진단 키트 (Ver 4.1)</p>
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
          <div className="grid grid-cols-1 gap-3">
            {modes.map((m) => (
              <button
                key={m.id}
                type="button"
                onClick={() => setMode(m.id)}
                className={`relative p-4 rounded-xl text-left border-2 transition-all duration-200 ${
                  mode === m.id
                    ? 'border-blue-500 bg-blue-50 ring-1 ring-blue-500 shadow-md'
                    : 'border-gray-100 bg-white hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{m.icon}</span>
                  <div>
                    <div className={`font-bold ${mode === m.id ? 'text-blue-900' : 'text-gray-700'}`}>
                      {m.label}
                    </div>
                    <div className="text-xs text-gray-500 mt-0.5">{m.desc}</div>
                  </div>
                  {mode === m.id && (
                    <div className="absolute right-4 text-blue-500">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    </div>
                  )}
                </div>
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
          <p className="text-xs text-gray-500 mt-1">* 최소 1개 이상 선택해주세요.</p>
        </div>

        <button
          type="submit"
          className="w-full bg-gray-900 hover:bg-black text-white font-bold py-4 rounded-xl shadow-xl transform transition active:scale-95 text-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
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

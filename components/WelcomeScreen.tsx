import React, { useState } from 'react';
import { UserProfile, GradeLevel, ConfidenceLevel, WeaknessType } from '../types';

interface Props {
  onComplete: (profile: UserProfile) => void;
}

const WelcomeScreen: React.FC<Props> = ({ onComplete }) => {
  const [name, setName] = useState('');
  const [grade, setGrade] = useState<GradeLevel>('중1');
  const [confidence, setConfidence] = useState<ConfidenceLevel>('😐보통');
  const [weakness, setWeakness] = useState<WeaknessType>('단어암기');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onComplete({ name, grade, confidence, weakness });
    }
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full border-t-4 border-blue-600">
      <div className="text-center mb-8">
        <div className="text-4xl mb-2">🏥</div>
        <h1 className="text-2xl font-bold text-gray-800">닥터 잉글리시</h1>
        <p className="text-gray-500 text-sm mt-1">중학 영어 정밀 진단 키트</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">이름이 뭐야?</label>
          <input
            type="text"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="이름 입력"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">학년</label>
          <div className="flex gap-2">
            {(['중1', '중2', '중3'] as GradeLevel[]).map((g) => (
              <button
                key={g}
                type="button"
                onClick={() => setGrade(g)}
                className={`flex-1 py-2 rounded-lg text-sm font-medium transition ${
                  grade === g
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {g}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">영어 자신감은?</label>
          <select
            value={confidence}
            onChange={(e) => setConfidence(e.target.value as ConfidenceLevel)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white"
          >
            {['😫바닥', '😕불안', '😐보통', '🙂괜찮음', '😎자신만만'].map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">가장 걱정되는 부분은?</label>
          <div className="grid grid-cols-2 gap-2">
            {(['단어암기', '문장만들기', '긴글읽기', '문법용어'] as WeaknessType[]).map((w) => (
              <button
                key={w}
                type="button"
                onClick={() => setWeakness(w)}
                className={`py-2 px-3 rounded-lg text-sm font-medium transition text-left ${
                  weakness === w
                    ? 'bg-blue-100 text-blue-800 border-2 border-blue-500'
                    : 'bg-gray-50 text-gray-600 border border-gray-200 hover:bg-gray-100'
                }`}
              >
                {weakness === w ? '✅ ' : '⬜ '} {w}
              </button>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl shadow-lg transform transition active:scale-95"
        >
          진단 시작하기 🩺
        </button>
      </form>
    </div>
  );
};

export default WelcomeScreen;

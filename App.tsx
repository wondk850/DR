import React, { useState, useMemo } from 'react';
import WelcomeScreen from './components/WelcomeScreen';
import QuizScreen from './components/QuizScreen';
import ResultScreen from './components/ResultScreen';
import { UserProfile, AnswerRecord, TestMode } from './types';
import { QUESTIONS } from './constants';

const App: React.FC = () => {
  const [screen, setScreen] = useState<'welcome' | 'quiz' | 'result'>('welcome');
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [records, setRecords] = useState<AnswerRecord[]>([]);

  // Filter questions based on selected mode AND level
  const filteredQuestions = useMemo(() => {
    if (!profile) return [];
    
    let baseQuestions = QUESTIONS;

    // 1. Filter by Test Mode (Category)
    if (profile.mode === 'vocabulary') {
      baseQuestions = baseQuestions.filter(q => q.category === 'Vocabulary');
    } else if (profile.mode === 'grammar') {
      baseQuestions = baseQuestions.filter(q => q.category === 'Grammar' || q.category === 'Structure');
    } else if (profile.mode === 'reading') {
      baseQuestions = baseQuestions.filter(q => q.category === 'Reading');
    }

    // 2. Filter by Level (Difficulty) - STRICT MODE IMPLEMENTATION
    // 문제 수가 적더라도 난이도를 침범하지 않도록 엄격하게 제한합니다.
    if (profile.level === 'beginner') {
      // Beginner Class: Difficulty 0 (왕기초) & 1 (기초) ONLY.
      // 절대 Difficulty 2, 3이 섞이지 않음.
      const pool = baseQuestions.filter(q => q.difficulty === 0 || q.difficulty === 1);
      
      // 쉬운 순서대로 정렬 (자신감 상승 목적)
      return pool.sort((a, b) => a.difficulty - b.difficulty);
    } 
    else if (profile.level === 'standard') {
      // Standard Class: Difficulty 1 (기초) & 2 (중급).
      // Difficulty 3(킬러)은 절대 포함하지 않음.
      let pool = baseQuestions.filter(q => q.difficulty === 1 || q.difficulty === 2);
      
      // 만약 특정 영역(예: 독해) 선택 시 문제가 너무 적다면(< 5문제), 
      // 억지로 어려운 걸 넣는 게 아니라 '더 쉬운(Difficulty 0)' 걸 넣어서 기초를 다지게 함.
      if (pool.length < 5) {
         const padding = baseQuestions.filter(q => q.difficulty === 0);
         // 중복 제거 후 추가
         const currentIds = new Set(pool.map(q => q.id));
         const newPadding = padding.filter(q => !currentIds.has(q.id));
         pool = [...pool, ...newPadding];
      }
      
      // 난이도 1 -> 2 순서로 배치 (점진적 학습)
      return pool.sort((a, b) => a.difficulty - b.difficulty);
    } 
    else {
      // High-End Class (Advanced): Difficulty 2 (중급) & 3 (상급/킬러).
      let pool = baseQuestions.filter(q => q.difficulty === 2 || q.difficulty === 3);
      
      // 문제가 너무 적으면 Difficulty 1을 일부 포함.
      if (pool.length < 5) {
          const padding = baseQuestions.filter(q => q.difficulty === 1);
          const currentIds = new Set(pool.map(q => q.id));
          const newPadding = padding.filter(q => !currentIds.has(q.id));
          pool = [...pool, ...newPadding];
      }
      
      // 실전반은 섞어서 출제 (실전 감각)
      // ID순으로 정렬하면 제작자가 의도한 믹스(Mix) 순서가 됨.
      return pool.sort((a, b) => a.id - b.id);
    }
  }, [profile]);

  const handleStart = (userProfile: UserProfile) => {
    setProfile(userProfile);
    setScreen('quiz');
    setCurrentQuestionIndex(0);
    setRecords([]);
  };

  const handleAnswer = (record: AnswerRecord) => {
    setRecords(prev => {
        const existingIndex = prev.findIndex(r => r.questionId === record.questionId);
        if (existingIndex >= 0) {
            const newRecords = [...prev];
            newRecords[existingIndex] = record;
            return newRecords;
        }
        return [...prev, record];
    });
  };

  const handleNext = () => {
    if (currentQuestionIndex < filteredQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setScreen('result');
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleRestart = () => {
    setScreen('welcome');
    setProfile(null);
    setRecords([]);
    setCurrentQuestionIndex(0);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 font-sans text-gray-900">
      {screen === 'welcome' && (
        <WelcomeScreen onComplete={handleStart} />
      )}
      
      {screen === 'quiz' && profile && (
        <QuizScreen 
          questions={filteredQuestions}
          currentQuestionIndex={currentQuestionIndex}
          onAnswer={handleAnswer}
          onNext={handleNext}
          onPrev={handlePrev}
          onExit={handleRestart}
          userName={profile.name}
        />
      )}

      {screen === 'result' && profile && (
        <ResultScreen 
          profile={profile}
          records={records}
          onRestart={handleRestart}
        />
      )}
    </div>
  );
};

export default App;

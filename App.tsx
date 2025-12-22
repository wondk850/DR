import React, { useState, useMemo } from 'react';
import WelcomeScreen from './components/WelcomeScreen';
import QuizScreen from './components/QuizScreen';
import ResultScreen from './components/ResultScreen';
import { UserProfile, AnswerRecord, Question } from './types';
import { QUESTIONS } from './constants';

const App: React.FC = () => {
  const [screen, setScreen] = useState<'welcome' | 'quiz' | 'result'>('welcome');
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [records, setRecords] = useState<AnswerRecord[]>([]);
  
  // Retry Mode State
  const [isRetryMode, setIsRetryMode] = useState(false);
  const [retryQuestions, setRetryQuestions] = useState<Question[]>([]);

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

    // 2. Filter by Level (Difficulty) - STRICT MODE
    if (profile.level === 'beginner') {
      const pool = baseQuestions.filter(q => q.difficulty === 0 || q.difficulty === 1);
      return pool.sort((a, b) => a.difficulty - b.difficulty);
    } 
    else if (profile.level === 'standard') {
      let pool = baseQuestions.filter(q => q.difficulty === 1 || q.difficulty === 2);
      if (pool.length < 5) {
         const padding = baseQuestions.filter(q => q.difficulty === 0);
         const currentIds = new Set(pool.map(q => q.id));
         const newPadding = padding.filter(q => !currentIds.has(q.id));
         pool = [...pool, ...newPadding];
      }
      return pool.sort((a, b) => a.difficulty - b.difficulty);
    } 
    else {
      let pool = baseQuestions.filter(q => q.difficulty === 2 || q.difficulty === 3);
      if (pool.length < 5) {
          const padding = baseQuestions.filter(q => q.difficulty === 1);
          const currentIds = new Set(pool.map(q => q.id));
          const newPadding = padding.filter(q => !currentIds.has(q.id));
          pool = [...pool, ...newPadding];
      }
      return pool.sort((a, b) => a.id - b.id);
    }
  }, [profile]);

  // Determine which questions to show (Normal vs Retry)
  const activeQuestions = isRetryMode ? retryQuestions : filteredQuestions;

  const handleStart = (userProfile: UserProfile) => {
    setProfile(userProfile);
    setIsRetryMode(false);
    setScreen('quiz');
    setCurrentQuestionIndex(0);
    setRecords([]);
  };

  const handleRetry = (wrongQuestionIds: number[]) => {
    // Filter full question objects based on IDs
    const questionsToRetry = QUESTIONS.filter(q => wrongQuestionIds.includes(q.id));
    
    setRetryQuestions(questionsToRetry);
    setIsRetryMode(true);
    setRecords([]); // Reset records for the retry session
    setCurrentQuestionIndex(0);
    setScreen('quiz');
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
    if (currentQuestionIndex < activeQuestions.length - 1) {
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
    setIsRetryMode(false);
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
          questions={activeQuestions}
          currentQuestionIndex={currentQuestionIndex}
          onAnswer={handleAnswer}
          onNext={handleNext}
          onPrev={handlePrev}
          onExit={handleRestart}
          userName={profile.name}
          isRetryMode={isRetryMode}
        />
      )}

      {screen === 'result' && profile && (
        <ResultScreen 
          profile={profile}
          records={records}
          onRestart={handleRestart}
          onRetry={handleRetry}
        />
      )}
    </div>
  );
};

export default App;
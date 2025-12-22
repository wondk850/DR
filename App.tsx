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

  // Filter questions based on selected mode
  const filteredQuestions = useMemo(() => {
    if (!profile) return [];
    
    if (profile.mode === 'comprehensive') {
      return QUESTIONS;
    } else if (profile.mode === 'vocabulary') {
      return QUESTIONS.filter(q => q.category === 'Vocabulary');
    } else if (profile.mode === 'grammar') {
      // Structure is closely related to Grammar
      return QUESTIONS.filter(q => q.category === 'Grammar' || q.category === 'Structure');
    } else if (profile.mode === 'reading') {
      return QUESTIONS.filter(q => q.category === 'Reading');
    }
    return QUESTIONS;
  }, [profile]);

  const handleStart = (userProfile: UserProfile) => {
    setProfile(userProfile);
    setScreen('quiz');
    setCurrentQuestionIndex(0);
    setRecords([]);
  };

  const handleAnswer = (record: AnswerRecord) => {
    // If answering the same question again (e.g. after going back), update the record instead of appending
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

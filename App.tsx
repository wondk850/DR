import React, { useState } from 'react';
import WelcomeScreen from './components/WelcomeScreen';
import QuizScreen from './components/QuizScreen';
import ResultScreen from './components/ResultScreen';
import { UserProfile, AnswerRecord } from './types';
import { QUESTIONS } from './constants';

const App: React.FC = () => {
  const [screen, setScreen] = useState<'welcome' | 'quiz' | 'result'>('welcome');
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [records, setRecords] = useState<AnswerRecord[]>([]);

  const handleStart = (userProfile: UserProfile) => {
    setProfile(userProfile);
    setScreen('quiz');
    setCurrentQuestionIndex(0);
    setRecords([]);
  };

  const handleAnswer = (record: AnswerRecord) => {
    setRecords(prev => [...prev, record]);
  };

  const handleNext = () => {
    if (currentQuestionIndex < QUESTIONS.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setScreen('result');
    }
  };

  const handleRestart = () => {
    setScreen('welcome');
    setProfile(null);
    setRecords([]);
    setCurrentQuestionIndex(0);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      {screen === 'welcome' && (
        <WelcomeScreen onComplete={handleStart} />
      )}
      
      {screen === 'quiz' && profile && (
        <QuizScreen 
          currentQuestionIndex={currentQuestionIndex}
          onAnswer={handleAnswer}
          onNext={handleNext}
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

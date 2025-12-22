import React, { useState, useEffect } from 'react';
import { Question, AnswerRecord } from '../types';

interface Props {
  questions: Question[];
  currentQuestionIndex: number;
  onAnswer: (record: AnswerRecord) => void;
  onNext: () => void;
  onPrev: () => void;
  onExit: () => void;
  userName: string;
}

const QuizScreen: React.FC<Props> = ({ questions, currentQuestionIndex, onAnswer, onNext, onPrev, onExit, userName }) => {
  const question = questions[currentQuestionIndex];
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  // Safety check
  if (!question) return <div>Loading Question...</div>;

  // Check if we need to show the passage. 
  const showPassage = question.passage && (
    currentQuestionIndex === 0 || 
    questions[currentQuestionIndex - 1]?.passage_id !== question.passage_id
  );

  useEffect(() => {
    setSelectedOption(null);
    setFeedback(null);
    setIsCorrect(null);
  }, [currentQuestionIndex]);

  const handleOptionClick = (option: string) => {
    if (selectedOption) return; // Prevent double clicking
    setSelectedOption(option);

    const correct = option === question.correct_answer;
    setIsCorrect(correct);

    if (correct) {
      setFeedback("정답! ✅ 아주 잘했어.");
    } else {
      const specificFeedback = question.wrong_feedback[option] || "아쉬워. 다시 생각해보자.";
      setFeedback(`❌ ${specificFeedback}`);
    }

    // Record answer with full context for AI analysis later
    onAnswer({
      questionId: question.id,
      isCorrect: correct,
      selectedOption: option,
      category: question.category,
      difficulty: question.difficulty,
      tags: question.tags,
      questionText: question.question_text
    });
  };

  const progressPercent = ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <div className="w-full max-w-lg mx-auto px-4 relative">
      {/* Navigation Header */}
      <div className="flex justify-between items-center mb-6">
        <button 
          onClick={onExit}
          className="flex items-center text-gray-500 hover:text-gray-800 font-bold text-sm bg-white border border-gray-200 px-3 py-1.5 rounded-lg shadow-sm transition"
        >
          🏠 홈으로
        </button>
        
        {currentQuestionIndex > 0 && (
          <button 
            onClick={onPrev}
            className="flex items-center text-gray-500 hover:text-gray-800 font-bold text-sm bg-white border border-gray-200 px-3 py-1.5 rounded-lg shadow-sm transition"
          >
            ⬅️ 이전 문제
          </button>
        )}
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between items-end mb-1">
          <span className="text-2xl font-black text-blue-600 italic">Q{currentQuestionIndex + 1}</span>
          <span className="text-xs font-bold text-gray-400">TOTAL {questions.length}</span>
        </div>
        <div className="h-3 bg-gray-200 rounded-full w-full overflow-hidden shadow-inner">
          <div 
            className="h-full bg-gradient-to-r from-blue-400 to-blue-600 transition-all duration-500 ease-out" 
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Encouragement Bubble */}
      {currentQuestionIndex > 0 && currentQuestionIndex % 5 === 0 && !selectedOption && (
        <div className="mb-4 bg-yellow-400 text-yellow-900 px-4 py-2 rounded-xl text-sm font-bold animate-bounce text-center shadow-md transform -rotate-1">
          💪 힘내라 {userName}! 벌써 {currentQuestionIndex}문제 돌파!
        </div>
      )}

      {/* Passage Display */}
      {showPassage && (
        <div className="bg-white border-2 border-gray-100 p-5 mb-6 rounded-2xl shadow-sm">
          <span className="inline-block bg-gray-100 text-gray-500 text-xs font-bold px-2 py-1 rounded mb-2">지문</span>
          <p className="text-gray-800 leading-relaxed font-serif text-lg">{question.passage}</p>
        </div>
      )}

      {/* Question Card */}
      <div className="bg-white p-6 md:p-8 rounded-3xl shadow-xl mb-6 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-2 h-full bg-blue-500"></div>
        
        <div className="flex items-center gap-2 mb-4">
          <span className={`text-xs px-2 py-1 rounded-md font-bold uppercase tracking-wide ${
            question.category === 'Vocabulary' ? 'bg-green-100 text-green-700' :
            question.category === 'Structure' ? 'bg-purple-100 text-purple-700' :
            question.category === 'Reading' ? 'bg-orange-100 text-orange-700' :
            'bg-pink-100 text-pink-700'
          }`}>
            {question.category}
          </span>
          {question.difficulty === 3 && (
            <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded-md font-extrabold">🔥 고난도</span>
          )}
        </div>
        
        <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-8 leading-snug">
          {question.question_text}
        </h2>

        <div className="space-y-3">
          {question.options.map((option, idx) => {
            let btnClass = "w-full text-left p-4 rounded-xl border-2 transition-all duration-200 font-medium relative overflow-hidden ";
            
            if (selectedOption === null) {
              btnClass += "border-gray-100 hover:border-blue-400 hover:bg-blue-50 text-gray-700 hover:shadow-md";
            } else if (option === selectedOption) {
               if (isCorrect) {
                 btnClass += "border-green-500 bg-green-50 text-green-900 shadow-inner";
               } else {
                 btnClass += "border-red-500 bg-red-50 text-red-900 shadow-inner";
               }
            } else {
              btnClass += "border-gray-50 text-gray-300 bg-gray-50 opacity-50 cursor-not-allowed";
            }

            return (
              <button
                key={idx}
                onClick={() => handleOptionClick(option)}
                disabled={selectedOption !== null}
                className={btnClass}
              >
                <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs mr-3 font-bold ${
                    selectedOption === option 
                        ? (isCorrect ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800')
                        : 'bg-gray-200 text-gray-600'
                }`}>
                    {String.fromCharCode(65 + idx)}
                </span>
                {option}
              </button>
            );
          })}
        </div>
      </div>

      {/* Feedback Area */}
      {selectedOption && feedback && (
        <div className={`p-5 rounded-2xl mb-24 animate-fade-in-up shadow-lg border-2 ${
            isCorrect ? 'bg-green-50 border-green-200 text-green-900' : 'bg-red-50 border-red-200 text-gray-800'
        }`}>
          <div className="font-bold text-lg mb-2 flex items-center gap-2">
            {isCorrect ? "👨‍⚕️ 닥터 잉글리시:" : "👨‍⚕️ 닥터 잉글리시:"}
          </div>
          <p className="font-medium leading-relaxed">{feedback}</p>
        </div>
      )}

      {/* Fixed Next Button */}
      {selectedOption && (
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/90 backdrop-blur-md border-t border-gray-200 flex justify-center z-50 animate-slide-up">
          <button
            onClick={onNext}
            className="w-full max-w-lg bg-gray-900 hover:bg-black text-white font-bold py-4 px-8 rounded-2xl shadow-xl transform transition active:scale-95 flex items-center justify-center gap-3 text-lg"
          >
            다음 문제 
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
          </button>
        </div>
      )}
    </div>
  );
};

export default QuizScreen;

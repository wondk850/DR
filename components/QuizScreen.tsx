import React, { useState, useEffect } from 'react';
import { Question, AnswerRecord } from '../types';
import { QUESTIONS } from '../constants';

interface Props {
  currentQuestionIndex: number;
  onAnswer: (record: AnswerRecord) => void;
  onNext: () => void;
  userName: string;
}

const QuizScreen: React.FC<Props> = ({ currentQuestionIndex, onAnswer, onNext, userName }) => {
  const question = QUESTIONS[currentQuestionIndex];
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  // Check if we need to show the passage. 
  // Show passage if it exists AND (it's the first Q, or the previous Q had a different passage_id)
  const showPassage = question.passage && (
    currentQuestionIndex === 0 || 
    QUESTIONS[currentQuestionIndex - 1].passage_id !== question.passage_id
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
      setFeedback(`❌ ${specificFeedback} (정답은 나중에 알려줄게!)`);
    }

    // Delay recording slightly for UX, then wait for user to click next
    onAnswer({
      questionId: question.id,
      isCorrect: correct,
      selectedOption: option,
      category: question.category,
      difficulty: question.difficulty,
      tags: question.tags
    });
  };

  return (
    <div className="w-full max-w-lg mx-auto">
      {/* Progress */}
      <div className="mb-6 flex justify-between items-center">
        <div className="h-2 bg-gray-200 rounded-full w-full mr-4 overflow-hidden">
          <div 
            className="h-full bg-blue-500 transition-all duration-300" 
            style={{ width: `${((currentQuestionIndex + 1) / QUESTIONS.length) * 100}%` }}
          />
        </div>
        <span className="text-xs font-bold text-gray-500 whitespace-nowrap">
          {currentQuestionIndex + 1} / {QUESTIONS.length}
        </span>
      </div>

      {/* Encouragement every 5 questions */}
      {currentQuestionIndex > 0 && currentQuestionIndex % 5 === 0 && !selectedOption && (
        <div className="mb-4 bg-yellow-100 text-yellow-800 px-4 py-2 rounded-lg text-sm font-medium animate-bounce text-center">
          💪 힘내, {userName}! 벌써 {currentQuestionIndex}문제나 풀었어!
        </div>
      )}

      {/* Passage Display */}
      {showPassage && (
        <div className="bg-gray-50 border-l-4 border-blue-400 p-4 mb-6 rounded-r-lg shadow-sm">
          <h3 className="text-xs font-bold text-blue-500 uppercase tracking-wider mb-1">Passage</h3>
          <p className="text-gray-800 leading-relaxed font-serif text-lg">{question.passage}</p>
        </div>
      )}

      {/* Question Card */}
      <div className="bg-white p-6 rounded-2xl shadow-lg mb-6">
        <div className="flex items-center gap-2 mb-4">
          <span className={`text-xs px-2 py-1 rounded font-bold uppercase ${
            question.category === 'Vocabulary' ? 'bg-green-100 text-green-700' :
            question.category === 'Structure' ? 'bg-purple-100 text-purple-700' :
            question.category === 'Reading' ? 'bg-orange-100 text-orange-700' :
            'bg-pink-100 text-pink-700'
          }`}>
            {question.category}
          </span>
          {question.difficulty === 3 && (
            <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded font-bold">고난도</span>
          )}
        </div>
        
        <h2 className="text-xl font-bold text-gray-900 mb-6 leading-snug">
          {question.question_text}
        </h2>

        <div className="space-y-3">
          {question.options.map((option, idx) => {
            let btnClass = "w-full text-left p-4 rounded-xl border-2 transition-all duration-200 font-medium ";
            
            if (selectedOption === null) {
              btnClass += "border-gray-200 hover:border-blue-400 hover:bg-blue-50 text-gray-700";
            } else if (option === selectedOption) {
               if (isCorrect) {
                 btnClass += "border-green-500 bg-green-50 text-green-800";
               } else {
                 btnClass += "border-red-500 bg-red-50 text-red-800";
               }
            } else {
              btnClass += "border-gray-100 text-gray-400 opacity-50 cursor-not-allowed";
            }

            return (
              <button
                key={idx}
                onClick={() => handleOptionClick(option)}
                disabled={selectedOption !== null}
                className={btnClass}
              >
                <span className="mr-2 opacity-60">{String.fromCharCode(65 + idx)}.</span>
                {option}
              </button>
            );
          })}
        </div>
      </div>

      {/* Feedback & Next Button */}
      {selectedOption && feedback && (
        <div className={`p-4 rounded-xl mb-24 animate-fade-in-up ${isCorrect ? 'bg-green-600 text-white' : 'bg-gray-800 text-white'}`}>
          <div className="font-bold text-lg mb-1">
            {isCorrect ? "Dr. English:" : "Dr. English:"}
          </div>
          <p>{feedback}</p>
        </div>
      )}

      {selectedOption && (
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/90 backdrop-blur border-t border-gray-200 flex justify-center z-50">
          <button
            onClick={onNext}
            className="w-full max-w-lg bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-xl shadow-lg transform transition active:scale-95 flex items-center justify-center gap-2"
          >
            다음 문제 <span className="text-xl">→</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default QuizScreen;

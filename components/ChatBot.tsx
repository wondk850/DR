import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI } from "@google/genai";
import { UserProfile, AnswerRecord, Question } from '../types';
import { QUESTIONS } from '../constants';

interface Props {
  profile: UserProfile | null;
  records: AnswerRecord[];
}

interface Message {
  role: 'user' | 'model';
  text: string;
}

const ChatBot: React.FC<Props> = ({ profile, records }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: '안녕하세요! 저는 닥터 잉글리시 AI 튜터입니다. 👨‍⚕️\n문제 풀다가 모르는 것이나, 공부 방법이 궁금하면 언제든 물어보세요!' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  // Build context string based on current user state
  const getSystemContext = () => {
    if (!profile) return "당신은 친절한 영어 선생님 '닥터 잉글리시'입니다. 아직 학생 정보가 입력되지 않았으니, 학생에게 먼저 이름을 물어보고 진단을 시작하도록 유도하세요.";

    const wrongRecords = records.filter(r => !r.isCorrect);
    const wrongSummary = wrongRecords.map(r => {
        const q = QUESTIONS.find(q => q.id === r.questionId);
        return `[문제 ${r.questionId}] ${r.questionText} (학생답: ${r.selectedOption}, 정답: ${q?.correct_answer}, 해설: ${q?.explanation})`;
    }).join('\n');

    return `
      System: 당신은 대한민국 최고의 영어 입시 컨설턴트 '닥터 잉글리시'입니다.
      
      [학생 정보]
      - 이름: ${profile.name}
      - 학년: ${profile.grade}
      - 목표 레벨: ${profile.level}
      - 현재까지 푼 문제 수: ${records.length}
      - 틀린 문제 목록 및 상세 분석:
      ${wrongSummary}

      [행동 지침]
      1. 학생이 "나 이거 왜 틀렸어?"라고 물으면 위 '틀린 문제 목록'을 참고하여 구체적으로 설명해주세요.
      2. 문법 용어는 ${profile.grade} 수준에 맞춰 쉽게 설명하세요.
      3. 항상 격려하는 태도를 유지하되, 학습 조언은 단호하고 명확하게 하세요.
      4. 답변은 3~4문장 내외로 간결하게 작성하세요.
    `;
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
        if (!process.env.API_KEY) {
            throw new Error("API Key not found");
        }

        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        
        // Chat interaction using generateContent (simulating chat for simplicity with context injection)
        // We inject the system context + recent conversation history
        const context = getSystemContext();
        const historyText = messages.slice(-6).map(m => `${m.role === 'user' ? 'Student' : 'Dr.English'}: ${m.text}`).join('\n');
        
        const prompt = `${context}\n\n[이전 대화]\n${historyText}\n\nStudent: ${userMessage}\nDr.English:`;

        const response = await ai.models.generateContent({
            model: 'gemini-3-pro-preview', // High intelligence model requested
            contents: prompt,
        });

        const reply = response.text || "죄송해요, 잠시 연결이 원활하지 않네요. 다시 물어봐주세요.";
        setMessages(prev => [...prev, { role: 'model', text: reply }]);

    } catch (error) {
        console.error(error);
        setMessages(prev => [...prev, { role: 'model', text: "시스템 오류가 발생했습니다. (API Key 확인 필요)" }]);
    } finally {
        setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-none">
      {/* Chat Window */}
      {isOpen && (
        <div className="bg-white w-80 md:w-96 h-[500px] rounded-3xl shadow-2xl border border-blue-100 flex flex-col overflow-hidden mb-4 pointer-events-auto animate-fade-in-up">
          {/* Header */}
          <div className="bg-slate-900 p-4 flex justify-between items-center text-white">
            <div className="flex items-center gap-2">
              <span className="text-2xl">👨‍⚕️</span>
              <div>
                <h3 className="font-bold text-sm">Dr. English AI</h3>
                <p className="text-xs text-slate-400">실시간 학습 상담 중</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white">✕</button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 bg-slate-50 space-y-4">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
                  msg.role === 'user' 
                    ? 'bg-blue-600 text-white rounded-br-none shadow-md' 
                    : 'bg-white text-slate-800 border border-slate-200 rounded-bl-none shadow-sm'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
               <div className="flex justify-start">
                 <div className="bg-white p-3 rounded-2xl rounded-bl-none border border-slate-200 shadow-sm flex gap-1">
                   <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                   <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-100"></div>
                   <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-200"></div>
                 </div>
               </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-3 bg-white border-t border-slate-100">
            <div className="flex items-center gap-2 bg-slate-100 rounded-full px-4 py-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="궁금한 점을 물어보세요..."
                className="flex-1 bg-transparent outline-none text-sm text-slate-800"
                disabled={isLoading}
              />
              <button 
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                className={`w-8 h-8 rounded-full flex items-center justify-center transition ${
                    !input.trim() || isLoading ? 'bg-slate-300 text-slate-500' : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                ↑
              </button>
            </div>
          </div>
        </div>
      )}

      {/* FAB Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-2xl flex items-center justify-center transition transform hover:scale-105 active:scale-95 pointer-events-auto border-4 border-white"
      >
        {isOpen ? (
          <span className="text-2xl font-bold">✕</span>
        ) : (
          <span className="text-4xl">👨‍⚕️</span>
        )}
      </button>
    </div>
  );
};

export default ChatBot;

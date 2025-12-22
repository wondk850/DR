export type GradeLevel = '중1' | '중2' | '중3';
export type ConfidenceLevel = '😫바닥' | '😕불안' | '😐보통' | '🙂괜찮음' | '😎자신만만';
export type WeaknessType = '단어암기' | '문장만들기' | '긴글읽기' | '문법용어';
export type TestMode = 'comprehensive' | 'grammar' | 'reading' | 'vocabulary';
export type TargetLevel = 'beginner' | 'standard' | 'advanced'; // Added 'beginner'

export interface UserProfile {
  name: string;
  grade: GradeLevel;
  confidence: ConfidenceLevel;
  weakness: WeaknessType[]; 
  mode: TestMode;
  level: TargetLevel;
}

export interface Question {
  id: number;
  category: 'Vocabulary' | 'Structure' | 'Reading' | 'Grammar';
  difficulty: 0 | 1 | 2 | 3; // Added 0 for beginner questions
  question_text: string;
  options: string[];
  correct_answer: string;
  tags: string[];
  explanation: string;
  wrong_feedback: Record<string, string>;
  passage?: string;
  passage_id?: string;
}

export interface AnswerRecord {
  questionId: number;
  isCorrect: boolean;
  selectedOption: string;
  category: string;
  difficulty: number;
  tags: string[];
  questionText: string;
}

export interface ScoreBoard {
  total: number;
  maxTotal: number;
  vocab: number;
  structure: number;
  reading: number;
  grammar: number;
}
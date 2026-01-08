
export interface Question {
  question: string;
  options: string[];
  correctIndex: number;
}

export interface QuizData {
  ruleName: string;
  ruleExplanation: string;
  questions: Question[];
}

export type AppState = 'START' | 'LOADING' | 'QUIZ' | 'RESULT';

export type SpideyMood = 'IDLE' | 'HAPPY' | 'THINKING' | 'WAVE';

export interface UserProgress {
  grade: number;
  score: number;
  currentQuiz: QuizData | null;
}

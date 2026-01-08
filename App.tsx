
import React, { useState, useCallback } from 'react';
import { AppState, UserProgress, QuizData } from './types';
import { generateQuiz } from './geminiService';
import GradeSelector from './components/GradeSelector';
import Quiz from './components/Quiz';
import Result from './components/Result';
import Loading from './components/Loading';

const App: React.FC = () => {
  const [state, setState] = useState<AppState>('START');
  const [progress, setProgress] = useState<UserProgress>({
    grade: 1,
    score: 0,
    currentQuiz: null,
  });

  const handleGradeSelect = async (grade: number) => {
    setState('LOADING');
    setProgress(prev => ({ ...prev, grade }));
    try {
      const quiz = await generateQuiz(grade);
      setProgress(prev => ({ ...prev, currentQuiz: quiz, score: 0 }));
      setState('QUIZ');
    } catch (error) {
      console.error("Failed to generate quiz:", error);
      alert("Ой! Мое паучье чутье говорит о проблеме с интернетом. Попробуй еще раз!");
      setState('START');
    }
  };

  const handleQuizComplete = (score: number) => {
    setProgress(prev => ({ ...prev, score }));
    setState('RESULT');
  };

  const handleRestart = () => {
    setState('START');
    setProgress({ grade: 1, score: 0, currentQuiz: null });
  };

  const handleNewQuiz = async () => {
    setState('LOADING');
    try {
      const quiz = await generateQuiz(progress.grade);
      setProgress(prev => ({ ...prev, currentQuiz: quiz, score: 0 }));
      setState('QUIZ');
    } catch (error) {
      console.error("Failed to generate quiz:", error);
      setState('START');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <header className="fixed top-0 left-0 w-full p-4 flex items-center justify-center bg-white shadow-md z-50 border-b-4 border-red-600">
        <img 
          src="https://img.icons8.com/color/96/spiderman-head.png" 
          alt="Spider-Man" 
          className="w-12 h-12 mr-3"
        />
        <h1 className="text-2xl md:text-3xl font-hero text-red-600">
          Репетитор Спайди
        </h1>
      </header>

      <main className="w-full max-w-2xl mt-20 mb-8 bg-white rounded-3xl shadow-2xl overflow-hidden border-4 border-blue-600">
        {state === 'START' && (
          <GradeSelector onSelect={handleGradeSelect} />
        )}
        {state === 'LOADING' && (
          <Loading />
        )}
        {state === 'QUIZ' && progress.currentQuiz && (
          <Quiz 
            data={progress.currentQuiz} 
            onComplete={handleQuizComplete} 
          />
        )}
        {state === 'RESULT' && progress.currentQuiz && (
          <Result 
            quiz={progress.currentQuiz} 
            score={progress.score} 
            onRestart={handleRestart} 
            onNewQuiz={handleNewQuiz}
          />
        )}
      </main>
      
      <footer className="text-gray-500 text-sm mt-auto pb-4">
        Учись с суперсилой! © 2024
      </footer>
    </div>
  );
};

export default App;

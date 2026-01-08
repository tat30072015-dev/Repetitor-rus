
import React from 'react';
import { QuizData } from '../types';
import SpideyCharacter from './SpideyCharacter';

interface ResultProps {
  quiz: QuizData;
  score: number;
  onRestart: () => void;
  onNewQuiz: () => void;
}

const Result: React.FC<ResultProps> = ({ quiz, score, onRestart, onNewQuiz }) => {
  const getMessage = () => {
    if (score === 5) return "Потрясающе! Ты настоящий супергерой грамотности!";
    if (score >= 3) return "Отличная работа! Твое паучье чутье работает хорошо!";
    return "Неплохо, но нам нужно больше тренироваться!";
  };

  const getSpideyMessage = () => {
    if (score === 5) return "Вау! Даже я так не умею! Ты лучший!";
    if (score >= 3) return "Хороший результат, напарник!";
    return "Не вешай нос! В следующий раз мы их сделаем!";
  };

  return (
    <div className="p-8 relative">
      <div className="text-center mb-8">
        <div className="inline-block relative">
          <img 
            src={`https://picsum.photos/seed/spidey${score}/400/200`} 
            alt="Result Spiderman" 
            className="rounded-2xl mb-4 border-4 border-red-500 shadow-xl"
          />
          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-yellow-400 text-black px-6 py-2 rounded-full font-hero text-2xl shadow-lg border-2 border-black">
            {score} / 5
          </div>
        </div>
        <h2 className="text-3xl font-hero text-blue-700 mt-8 mb-2">Миссия выполнена!</h2>
        <p className="text-xl font-bold text-gray-700">{getMessage()}</p>
      </div>

      <div className="bg-blue-50 p-6 rounded-2xl border-2 border-blue-200 mb-8 shadow-inner">
        <h4 className="text-blue-800 font-bold mb-3 flex items-center">
          <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          Разбор полетов: {quiz.ruleName}
        </h4>
        <p className="text-gray-700 whitespace-pre-line leading-relaxed italic text-sm md:text-base">
          "{quiz.ruleExplanation}"
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <button
          onClick={onNewQuiz}
          className="flex-1 bg-red-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-red-700 transition-all shadow-[0_4px_0_0_rgba(153,27,27,1)] active:shadow-none active:translate-y-1"
        >
          Новая миссия
        </button>
        <button
          onClick={onRestart}
          className="flex-1 bg-white text-blue-600 border-2 border-blue-600 py-4 rounded-xl font-bold text-lg hover:bg-blue-50 transition-all active:scale-95"
        >
          Сменить класс
        </button>
      </div>

      <SpideyCharacter mood={score >= 3 ? 'HAPPY' : 'WAVE'} message={getSpideyMessage()} />
    </div>
  );
};

export default Result;

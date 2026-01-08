
import React, { useState, useEffect } from 'react';
import { QuizData, SpideyMood } from '../types';
import SpideyCharacter from './SpideyCharacter';

interface QuizProps {
  data: QuizData;
  onComplete: (score: number) => void;
}

const Quiz: React.FC<QuizProps> = ({ data, onComplete }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [spideyMood, setSpideyMood] = useState<SpideyMood>('IDLE');
  const [spideyMessage, setSpideyMessage] = useState<string | undefined>("Готов к геройским подвигам?");

  useEffect(() => {
    if (!isAnswered) {
      setSpideyMood('IDLE');
      const messages = [
        "Твое паучье чутье что-то подсказывает?",
        "Хмм, этот вопрос с подвохом!",
        "Великая сила — это великие знания!",
        "Внимательно читай вопрос, герой!"
      ];
      setSpideyMessage(messages[Math.floor(Math.random() * messages.length)]);
    }
  }, [currentIdx, isAnswered]);

  const handleOptionClick = (idx: number) => {
    if (isAnswered) return;
    setSelectedIdx(idx);
    setIsAnswered(true);

    const isCorrect = idx === data.questions[currentIdx].correctIndex;
    if (isCorrect) {
      setScore(s => s + 1);
      setSpideyMood('HAPPY');
      setSpideyMessage("Бум! В точку! Так держать!");
    } else {
      setSpideyMood('THINKING');
      setSpideyMessage("Упс! Даже я иногда путаю нити... Посмотри правило!");
    }
  };

  const handleNext = () => {
    if (currentIdx + 1 < data.questions.length) {
      setCurrentIdx(currentIdx + 1);
      setSelectedIdx(null);
      setIsAnswered(false);
    } else {
      onComplete(score + (selectedIdx === data.questions[currentIdx].correctIndex ? 1 : 0));
    }
  };

  const currentQuestion = data.questions[currentIdx];

  return (
    <div className="p-8 relative">
      <div className="flex justify-between items-center mb-6">
        <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full font-bold border border-red-200">
          Вопрос {currentIdx + 1} из {data.questions.length}
        </span>
        <span className="text-blue-600 font-bold uppercase tracking-wider text-xs md:text-sm max-w-[150px] text-right">
          {data.ruleName}
        </span>
      </div>

      <div className="mb-8 min-h-[80px]">
        <h3 className="text-xl md:text-2xl font-bold text-gray-800 leading-tight">
          {currentQuestion.question}
        </h3>
      </div>

      <div className="space-y-3">
        {currentQuestion.options.map((option, idx) => {
          let bgColor = "bg-white border-gray-200 hover:border-blue-400 hover:shadow-md";
          if (isAnswered) {
            if (idx === currentQuestion.correctIndex) {
              bgColor = "bg-green-100 border-green-500 text-green-700 shadow-[inset_0_2px_4px_rgba(0,0,0,0.05)]";
            } else if (idx === selectedIdx) {
              bgColor = "bg-red-100 border-red-500 text-red-700";
            } else {
              bgColor = "bg-gray-50 border-gray-100 opacity-50";
            }
          }

          return (
            <button
              key={idx}
              onClick={() => handleOptionClick(idx)}
              disabled={isAnswered}
              className={`w-full text-left p-4 rounded-xl border-2 transition-all font-medium text-base md:text-lg flex items-center ${bgColor}`}
            >
              <span className={`mr-3 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm shrink-0 ${isAnswered && idx === currentQuestion.correctIndex ? 'bg-green-500 text-white' : 'bg-blue-100 text-blue-600'}`}>
                {String.fromCharCode(65 + idx)}
              </span>
              {option}
            </button>
          );
        })}
      </div>

      <div className="mt-8 flex justify-end items-center h-12">
        {isAnswered && (
          <button
            onClick={handleNext}
            className="px-8 py-3 bg-red-600 text-white rounded-xl font-bold text-lg hover:bg-red-700 transition-all shadow-lg active:scale-95 animate-in fade-in zoom-in duration-300"
          >
            {currentIdx + 1 === data.questions.length ? "Результаты" : "Дальше →"}
          </button>
        )}
      </div>

      <SpideyCharacter mood={spideyMood} message={spideyMessage} />
    </div>
  );
};

export default Quiz;

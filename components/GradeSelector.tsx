
import React from 'react';
import SpideyCharacter from './SpideyCharacter';

interface GradeSelectorProps {
  onSelect: (grade: number) => void;
}

const GradeSelector: React.FC<GradeSelectorProps> = ({ onSelect }) => {
  const grades = Array.from({ length: 11 }, (_, i) => i + 1);

  return (
    <div className="p-8 text-center relative">
      <div className="mb-6">
        <img 
          src="https://picsum.photos/seed/spiderman1/600/300" 
          alt="Spider-man welcome" 
          className="rounded-xl w-full object-cover mb-4 border-2 border-red-500 shadow-lg"
        />
        <h2 className="text-3xl font-hero text-blue-700 mb-2">Эй, привет!</h2>
        <p className="text-gray-600 text-lg">Я Человек-паук, твой напарник по русскому языку. В каком ты классе?</p>
      </div>

      <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
        {grades.map(grade => (
          <button
            key={grade}
            onClick={() => onSelect(grade)}
            className="p-4 bg-white border-2 border-blue-200 rounded-2xl hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all font-bold text-lg shadow-sm active:scale-95"
          >
            {grade}
          </button>
        ))}
      </div>

      <SpideyCharacter mood="WAVE" message="Выбирай класс, и полетели!" />
    </div>
  );
};

export default GradeSelector;

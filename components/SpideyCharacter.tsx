
import React from 'react';
import { SpideyMood } from '../types';

interface SpideyCharacterProps {
  mood: SpideyMood;
  message?: string;
}

const SpideyCharacter: React.FC<SpideyCharacterProps> = ({ mood, message }) => {
  const getSpideyIcon = () => {
    switch (mood) {
      case 'HAPPY': return "https://img.icons8.com/color/144/spiderman-head.png";
      case 'THINKING': return "https://img.icons8.com/color/144/spider-man-new.png";
      case 'WAVE': return "https://img.icons8.com/color/144/spiderman-old.png";
      default: return "https://img.icons8.com/color/144/spiderman-head.png";
    }
  };

  const getAnimation = () => {
    switch (mood) {
      case 'HAPPY': return "animate-bounce scale-110";
      case 'THINKING': return "animate-pulse";
      case 'WAVE': return "animate-pulse";
      default: return "hover:scale-105 transition-transform duration-500";
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end pointer-events-none md:pointer-events-auto">
      {message && (
        <div className="mb-2 mr-4 relative">
          <div className="bg-yellow-300 border-2 border-black p-3 rounded-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] max-w-[200px] animate-in fade-in slide-in-from-bottom-2 duration-300">
            <p className="text-black font-bold text-sm leading-tight uppercase tracking-tighter">
              {message}
            </p>
          </div>
          <div className="absolute -bottom-2 right-4 w-4 h-4 bg-yellow-300 border-r-2 border-b-2 border-black rotate-45"></div>
        </div>
      )}
      
      <div className={`relative ${getAnimation()}`}>
        {/* Spider web line */}
        <div className="absolute -top-40 left-1/2 w-0.5 h-40 bg-gray-300 -z-10"></div>
        
        <img 
          src={getSpideyIcon()} 
          alt="Spidey" 
          className="w-20 h-20 md:w-24 md:h-24 drop-shadow-xl"
        />
      </div>
    </div>
  );
};

export default SpideyCharacter;

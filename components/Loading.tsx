
import React from 'react';

const Loading: React.FC = () => {
  return (
    <div className="p-12 text-center flex flex-col items-center justify-center min-h-[400px]">
      <div className="relative mb-8">
        <div className="w-20 h-20 border-8 border-blue-200 border-t-red-600 rounded-full animate-spin"></div>
        <img 
          src="https://img.icons8.com/color/48/spider.png" 
          alt="Loading spider" 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-bounce"
        />
      </div>
      <h3 className="text-2xl font-hero text-red-600 mb-2">Плетем паутину знаний...</h3>
      <p className="text-gray-500 animate-pulse">Готовлю для тебя секретное задание!</p>
    </div>
  );
};

export default Loading;

import React from 'react';

const LoadingDots= () => {
  return (
    <div className="flex space-x-1 justify-center items-center">
      <div className="h-2 w-2 bg-gray-500 rounded-full animate-bounce"></div>
      <div className="h-2 w-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
      <div className="h-2 w-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
    </div>
  );
};

export default LoadingDots;
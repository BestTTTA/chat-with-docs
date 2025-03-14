// components/ChatMessage.tsx
import React, { useState } from 'react';

const ChatMessage = ({ message }) => {
  const [showSources, setShowSources] = useState(false);

  return (
    <div
      className={`my-2 flex ${
        message.sender === 'user' ? 'justify-end' : 'justify-start'
      }`}
    >
      <div
        className={`p-3 rounded-lg max-w-[80%] ${
          message.sender === 'user'
            ? 'bg-blue-500 text-white'
            : 'bg-gray-200 text-gray-800'
        }`}
      >
        <div className="whitespace-pre-wrap">{message.text}</div>
        
        {message.sender === 'bot' && message.results && message.results.length > 0 && (
          <div className="mt-2">
            <button
              onClick={() => setShowSources(!showSources)}
              className="text-xs text-blue-600 hover:underline"
            >
              {showSources ? 'ซ่อนแหล่งข้อมูล' : 'แสดงแหล่งข้อมูล'}
            </button>
            
            {showSources && (
              <div className="mt-2 text-xs border-t pt-2">
                <div className="font-semibold mb-1">แหล่งข้อมูล:</div>
                {message.results.map((result) => (
                  <div key={result.id} className="mb-2 p-2 bg-gray-100 rounded">
                    <div className="font-semibold text-xs text-gray-500">
                      หน้า {result.page}
                    </div>
                    <div className="text-xs mt-1">{result.content}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
        
        <div className="text-xs opacity-70 mt-1">
          {message.timestamp.toLocaleTimeString()}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;



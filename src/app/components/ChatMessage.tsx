'use client'; 

import React from 'react';
import { Bot, User } from 'lucide-react'; 

const Role = {
  USER: 'user',
  GEMINI: 'gemini',
};

/**
 * Renders a single message, styling it based on the sender's role
 * and providing distinct appearance for User vs. Gemini.
 * * @param {object} props.message - { role: 'user' | 'gemini', content: string, createdAt: Date }
 */
export default function ChatMessage({ message }) {
  const isUser = message.role === Role.USER;
  
  // --- Dynamic Styling/Content Configuration ---
  const config = isUser
    ? {
        align: "justify-end",
        bubbleColor: "bg-blue-600 text-white rounded-br-none",
        icon: <User size={20} />,
        iconColor: "bg-blue-600 text-white",
      }
    : {
        align: "justify-start",
        bubbleColor: "bg-gray-100 text-gray-800 rounded-tl-none border border-gray-200",
        icon: <Bot size={20} />,
        iconColor: "bg-gray-700 text-white",
      };

  // The final rendering of the component
  return (
    <div className={`w-full flex ${config.align}`}>
      <div className="max-w-3xl flex items-start space-x-3 mb-4">
        
        {/* 1. Icon (Displayed on the left side for AI, or right side for User) */}
        {!isUser && (
          <div className={`p-2 rounded-full ${config.iconColor} flex-shrink-0`}>
            {config.icon}
          </div>
        )}

        {/* 2. Message Bubble */}
        <div 
          className={`
            p-3 shadow-md rounded-2xl max-w-full whitespace-pre-wrap break-words 
            ${config.bubbleColor}
          `}
        >
          {message.content}
        </div>

        {/* 3. User Icon (Displayed on the right side for User) */}
        {isUser && (
          <div className={`p-2 rounded-full ${config.iconColor} flex-shrink-0`}>
            {config.icon}
          </div>
        )}
      </div>
    </div>
  );
}       
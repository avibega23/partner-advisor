"use client";

import React, { useState } from 'react';
import { Send } from 'lucide-react';

// Define the props for the Input component
interface InputProps {
  // An optional array of strings for quick reply options
  options?: string[];
  
  // Callback function when a text message is sent
  onSendMessage: (message: string) => void;
  
  // Callback function when a quick reply option is selected
  onSelectOption: (option: string) => void;
  
  // Prop to externally disable the input
  disabled?: boolean;
}

/**
 * A flexible chat input bar that supports text input and quick reply options.
 * When options are provided, the text input is disabled, forcing the user
 * to choose an option.
 */
const ChatInput: React.FC<InputProps> = ({ 
  options = [], 
  onSendMessage, 
  onSelectOption, 
  disabled = false 
}) => {
  const [inputValue, setInputValue] = useState("");

  // Determine if the text input should be disabled
  const showOptions = !disabled && options.length > 0;
  const isInputDisabled = disabled || showOptions;

  // Handle form submission (pressing Enter or clicking Send)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() && !isInputDisabled) {
      onSendMessage(inputValue.trim());
      setInputValue(""); // Clear input after sending
    }
  };

  const handleOptionClick = (option: string) => {
    onSelectOption(option);
  };

  return (
    <div className="w-full bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-4 shadow-inner">
      
      {showOptions && (
        <div className="mb-3 flex flex-wrap justify-center gap-2">
          {options.map((option) => (
            <button
              key={option}
              onClick={() => handleOptionClick(option)}
              className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium
                         hover:bg-blue-200 transition-colors
                         dark:bg-blue-900 dark:text-blue-200 dark:hover:bg-blue-800"
            >
              {option}
            </button>
          ))}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex items-center gap-3 ">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder={isInputDisabled ? "Please select an option above" : "Type your message..."}
          className="flex-1 block w-full rounded-lg border-gray-300 shadow-sm 
                     focus:border-blue-500 focus:ring-blue-500 
                     disabled:opacity-70 disabled:bg-gray-100
                     dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
                     dark:disabled:bg-gray-700 sm:text-sm py-5"
        />
        <button
          type="submit"
          disabled={isInputDisabled || inputValue.trim() === ""}
          className="inline-flex items-center justify-center rounded-lg h-15 w-15 
                     bg-blue-600 text-white shadow-sm 
                     hover:bg-blue-700 
                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                     disabled:opacity-50
                     dark:focus:ring-offset-gray-800"
          aria-label="Send message"
        >
          <Send className="h-5 w-5" />
        </button>
      </form>
    </div>
  );
};

export default ChatInput  ;

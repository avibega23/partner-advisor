'use client'; // This component must be a Client Component to use hooks

import { useState, useRef, useEffect, FormEvent } from 'react';
// You'll need an icon for the submit button (e.g., from lucide-react or react-icons)
import { SendHorizonal } from 'lucide-react'; 

// --- Component Definition ---

export default function ChatInput({ onSubmit } : {onSubmit : (message : string) => void}) {
  const [inputText, setInputText] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  // Auto-resize the textarea based on content
  const autoResize = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto'; // Reset height
      // Set the height to match the scroll height, limiting max rows visually
      const maxHeight = 5 * parseFloat(getComputedStyle(textarea).lineHeight);
      textarea.style.height = `${Math.min(textarea.scrollHeight, maxHeight)}px`;
    }
  };

  useEffect(() => {
    autoResize();
  }, [inputText]);

  // Handle the form submission (either by button click or Enter key)
  const handleSubmit = (e : FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const message = inputText.trim();

    if (!message) return; // Prevent submitting empty messages

    // 1. Pass the message to the parent component (e.g., the chat page)
    onSubmit(message); 

    // 2. Reset the input field
    setInputText('');
  };

  

  return (
    <div className="w-full flex justify-center sticky bottom-0 z-10 p-4 bg-white shadow-xl border-t border-gray-200">
      <form onSubmit={handleSubmit} className="w-full max-w-2xl flex items-end bg-gray-50 rounded-2xl border border-gray-300 overflow-hidden p-2">
        
        <textarea
          ref={textareaRef}
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          className="flex-grow resize-none p-2 text-base text-gray-800 bg-transparent focus:outline-none placeholder-gray-500"
          placeholder="Ask for advice..."
          rows={1}
        />

        <button
          type="submit"
          disabled={!inputText.trim()}
          className={`
            p-2 rounded-full transition-colors 
            ${inputText.trim() 
              ? 'bg-blue-600 text-white hover:bg-blue-700' 
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }
          `}
        >
          {/* Using a simple Lucide icon component */}
          <SendHorizonal size={20} />
        </button>
      </form>
    </div>
  );
}
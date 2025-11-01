'use client'; 

import React, { useRef, useEffect } from 'react';
import ChatMessage from './ChatMessage'; // Import your message display component

/**
 * Manages and displays the full list of messages in a conversation.
 * It also handles auto-scrolling to the latest message.
 * * @param {object} props - The component props.
 * @param {Array<object>} props.messages - An array of message objects (IMessage).
 */
export default function ConversationView({messages}) {
  // 1. Ref to target the end of the message list for scrolling
  const endOfMessagesRef = useRef(null);

  // 2. Effect to scroll down whenever the messages array changes (a new message arrives)
  useEffect(() => {
    // Scroll smoothly to the element referenced by endOfMessagesRef
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]); 

  // --- Rendering ---
  return (
    // Set a defined height/max-height and enable vertical scrolling
    <div className="flex flex-col p-6 space-y-4 h-full overflow-y-auto bg-white">
      
      {/* 3. Map over the messages array and render the ChatMessage component
        for each message. Using the message._id (or index) as the key.
      */}
      {messages.length > 0 ? (
        messages.map((msg, index) => (
          // Assuming your message object has a unique '_id' from Mongoose
          <ChatMessage key={msg._id || index} message={msg} />
        ))
      ) : (
        // Initial state when no messages are present
        <div className="text-center text-gray-500 mt-20">
          Start a conversation to get personalized advice.
        </div>
      )}
      
      {/* 4. The scroll target element */}
      <div ref={endOfMessagesRef} /> 
    </div>
  );
}

"use client"
import PartnerSidebar from '@/app/components/PartnerSidebar';
import ConversationView from '@/app/components/ConversationView';
import ChatInput from '@/app/components/ChatInput'; 
import React,{useState} from 'react';

export default function Page({ params } : {params : {activePartnerId : string}}) {
  const activePartnerId = params.activePartnerId;
    console.log(activePartnerId);
  // --- Mock Data State (Replace with actual state management/data fetching) ---
  const [messages, setMessages] = useState(/* fetch messages for activePartnerId */ []);
  const currentPartner = {name : "user1"};

  // Function to handle the submit action from ChatInput
  const handleChatSubmit = (messageText : string) => {
    // 1. Logic to call your /api/advice route
    // 2. Update messages state after user message and Gemini response
    console.log(`Sending message: "${messageText}" for partner ${activePartnerId}`);
    // ...
  };
  
  return (
    <div className="flex h-screen bg-gray-100">
      
      {/* LEFT SIDE: Sidebar/Partner List */}
      <PartnerSidebar activePartnerId={activePartnerId} />
      
      {/* RIGHT SIDE: Chat Area */}
      <div className="flex flex-col flex-grow">
        
        {/* Header/Partner Name Display */}
        <header className="p-4 border-b border-gray-200 bg-white">
          <h2 className="text-lg font-semibold text-gray-800">Chat with Advisor about: {currentPartner.name || 'Loading...'}</h2>
        </header>
        
        {/* Messages Display */}
        <main className="flex-grow overflow-y-hidden">
          <ConversationView messages={messages} />
        </main>
        
        {/* Chat Input */}
        <footer className="w-full">
          <ChatInput 
            onSubmit={handleChatSubmit}
          />
        </footer>
      </div>
    </div>
  );
} 
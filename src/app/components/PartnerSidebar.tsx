'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { PlusCircle, LogOut } from 'lucide-react'; // Icons

// --- Mock Data Structure (Replace with actual data fetch) ---
const mockPartners = [
  { _id: 'p1', name: 'Wife/Spouse' },
  { _id: 'p2', name: 'Girlfriend/Partner' },
  { _id: 'p3', name: 'Sibling/Friend' },
];

/**
 * Sidebar component displaying the logo, partner list, and action buttons.
 */
export default function PartnerSidebar({ activePartnerId } : {activePartnerId : string}) {
  const router = useRouter();

  // 1. Function to handle switching between partners
  const handlePartnerSelect = (partnerId : string) => {
    // Navigate to the dynamic chat route for the selected partner
    router.push(`/chat/${partnerId}`);
  };

  // 2. Function to handle creating a new partner profile
  const handleNewProfile = () => {
    router.push('/profiles/new'); 
  };
  
  // 3. Function to handle user logout
  const handleLogout = () => {
    // Implement your actual logout logic here (e.g., clearing tokens/cookies)
    console.log('User logged out.');
    router.push('/login'); // Redirect to login page
  };

  return (
    <div className="flex flex-col w-72 h-screen border-r border-gray-200 bg-gray-50">
      
      {/* --- Logo Area --- */}
      <div className="p-4 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-blue-600">Partner Advisor</h1>
      </div>

      {/* --- Profiles Display --- */}
      <div className="flex-grow overflow-y-auto p-4 space-y-2">
        <h2 className="text-sm font-semibold text-gray-500 uppercase mb-3">Profiles</h2>
        
        {mockPartners.map((partner) => (
          <button
            key={partner._id}
            onClick={() => handlePartnerSelect(partner._id)}
            className={`
              w-full text-left p-3 rounded-lg transition-colors 
              ${activePartnerId === partner._id 
                ? 'bg-blue-100 text-blue-800 font-semibold' 
                : 'text-gray-700 hover:bg-gray-200'
              }
            `}
          >
            {partner.name}
          </button>
        ))}
      </div>

      {/* --- New Profile Button --- */}
      <div className="p-4 border-t border-gray-200">
        <button
          onClick={handleNewProfile}
          className="w-full flex items-center justify-center p-3 text-sm font-medium text-white bg-green-600 rounded-lg shadow hover:bg-green-700 transition-colors"
        >
          <PlusCircle size={18} className="mr-2" />
          New Partner Profile
        </button>
      </div>

      {/* --- Logout Button --- */}
      <div className="p-4 border-t border-gray-200">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center p-3 text-sm font-medium text-red-600 border border-red-300 rounded-lg hover:bg-red-50 transition-colors"
        >
          <LogOut size={18} className="mr-2" />
          Logout
        </button>
      </div>
    </div>
  );
}
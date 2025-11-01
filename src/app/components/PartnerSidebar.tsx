"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { PlusCircle, LogOut } from "lucide-react"; // Icons
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs";
import { IPartner } from "@/types/partner.types";

export default function PartnerSidebar({
  activePartnerId,
}: {
  activePartnerId?: string;
}) {
  const router = useRouter();
  const [partners, setPartners] = useState<IPartner[]>([]);
  const [isCreating, setIsCreating] = useState<boolean>(false);
  console.log(activePartnerId);
  useEffect(() => {
    const fetchPartners = async () => {
      const res = await fetch("../api/partners");
      const data = await res.json();

      setPartners(data.data);
    };
    fetchPartners();
  }, []);

  const handlePartnerSelect = (partnerId: string) => {
    console.log({ id: partnerId });
    router.push(`/chat/${partnerId}`);
  };

  const handleNewProfile = () => {
    setIsCreating(true);
  };

  const handleCreatePartner = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const response = await fetch("./../../api/partners", {
      // This should point to your POST route
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: name }),
    });
    if (response.ok) {
      // Re-fetch updated partner list
      const res = await fetch("../api/partners");
      const data = await res.json();
      setPartners(data.data);

      // Reset form state
      setIsCreating(false);
      e.currentTarget.reset()
    }
  };

  return (
    <div className="flex flex-col w-72 h-screen border-r border-gray-200 bg-gray-50">
      {/* --- Logo Area --- */}
      <div className="p-4 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-blue-600">Partner Advisor</h1>
      </div>

      {/* --- Profiles Display --- */}
      <div className="flex-grow overflow-y-auto p-4 space-y-2">
        <h2 className="text-sm font-semibold text-gray-500 uppercase mb-3">
          Profiles
        </h2>
        {partners.map((partner) => {
          console.log({
            active: activePartnerId,
            current: partner._id,
            isMatch: activePartnerId === partner._id,
          });
          return (
            <button
              key={partner._id}
              onClick={() => handlePartnerSelect(partner._id)}
              className={`
                w-full text-left p-3 rounded-lg transition-colors 
                ${
                  activePartnerId === partner._id
                    ? "bg-blue-100 text-blue-800 font-semibold"
                    : "text-gray-700 hover:bg-gray-200"
                }
              `}
            >
              {partner.name}
            </button>
          );
        })}
      </div>
      {isCreating && (
        <div className="bg-black">
          <form onSubmit={handleCreatePartner}>
            <input
              type="text"
              name="name"
              placeholder="Partner's name..."
              // ... more jsx ...
            />
            <button type="submit">Save</button>
            <button type="button" onClick={() => setIsCreating(false)}>
              Cancel
            </button>
          </form>
        </div>
      )}
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
        <LogoutLink className="w-full flex items-center justify-center p-3 text-sm font-medium text-red-600 border border-red-300 rounded-lg hover:bg-red-50 transition-colors">
          <LogOut size={18} className="mr-2" />
          Logout
        </LogoutLink>
      </div>
    </div>
  );
}

"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { PlusCircle,  } from "lucide-react"; // Icons
import { IPartner } from "@/types/partner.types";
import { signOut } from "next-auth/react";

export default function PartnerSidebar({
  activePartnerId,
}: {
  activePartnerId?: string;
}) {
  const router = useRouter();
  const [partners, setPartners] = useState<IPartner[]>([]);
  const [isCreating, setIsCreating] = useState<boolean>(false);
  useEffect(() => {
    const fetchPartners = async () => {
      const res = await fetch("../api/partners");
      const data = await res.json();

      setPartners(data.data);
    };
    fetchPartners();
  }, []);

  const handlePartnerSelect = (partnerId: string) => {
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
      e.currentTarget.reset();
    }
  };

  return (
    <div className="flex h-screen w-72 flex-col border-r border-gray-200 bg-gray-50">
      {/* --- Logo Area --- */}
      <div className="border-b border-gray-200 p-4">
        <h1 className="text-2xl font-bold text-blue-600">Partner Advisor</h1>
      </div>

      {/* --- Profiles Display --- */}
      <div className="flex-grow space-y-2 overflow-y-auto p-4">
        <h2 className="mb-3 text-sm font-semibold text-gray-500 uppercase">
          Profiles
        </h2>
        {partners.map((partner) => {
          return (
            <button
              key={partner._id}
              onClick={() => handlePartnerSelect(partner._id)}
              className={`w-full rounded-lg p-3 text-left transition-colors ${
                activePartnerId === partner._id
                  ? "bg-blue-100 font-semibold text-blue-800"
                  : "text-gray-700 hover:bg-gray-200"
              } `}
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
      <div className="border-t border-gray-200 p-4">
        <button
          onClick={handleNewProfile}
          className="flex w-full items-center justify-center rounded-lg bg-green-600 p-3 text-sm font-medium text-white shadow transition-colors hover:bg-green-700"
        >
          <PlusCircle size={18} className="mr-2" />
          New Partner Profile
        </button>
        
      </div>
      <button className="text-black" onClick={()=>{signOut()}}>Signout</button>
    </div>
  );
}

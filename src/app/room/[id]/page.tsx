"use client";

import React, { useEffect } from "react";
import { InRoomDisplay } from "@/components/InRoomDisplay";
import { useParams } from "next/navigation";

export default function RoomPage() {
  // Get room ID from URL params
  const params = useParams();
  const roomId = params?.id as string;

  // Apply dark theme to body
  useEffect(() => {
    document.body.classList.add("bg-[#1a1a1a]");
    return () => {
      document.body.classList.remove("bg-[#1a1a1a]");
    };
  }, []);

  return (
    <div className="min-h-screen w-screen flex flex-col items-center justify-center p-4 bg-[#0a0a0a] text-white">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[#0a0a0a]">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-[radial-gradient(#c19a6b_1px,transparent_1px)] bg-[length:20px_20px]"></div>
        </div>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-[#c19a6b]/20 to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#c19a6b]/20 to-transparent"></div>
        </div>
      </div>

      {/* Main content container */}
      <div className="relative z-10 flex flex-col items-center w-full max-w-5xl mx-auto">
        {roomId && (
          <div className="absolute top-6 left-6 text-sm text-gray-400">
            Room {roomId} - In-Room Display
          </div>
        )}

        {/* Main content area */}
        <div className="flex-1 flex items-center justify-center w-full max-w-4xl mx-auto">
          <div className="w-full transform scale-[0.95] transition-all duration-500 h-[90vh]">
            {roomId && <InRoomDisplay roomId={roomId} />}
          </div>
        </div>
      </div>
    </div>
  );
}

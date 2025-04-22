"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { useKioskMode } from "@/lib/KioskModeContext";

export function KioskModeButton() {
  const { toggleFullscreen, isKioskMode, setKioskMode } = useKioskMode();

  const handleToggleKiosk = () => {
    if (!isKioskMode) {
      toggleFullscreen();
      setKioskMode(true);
    } else {
      toggleFullscreen();
      setKioskMode(false);
    }
  };

  return (
    <Button
      variant="outline"
      className="fixed bottom-4 right-4 z-50 p-2 rounded-full bg-[#0e0e0e] border border-[#c19a6b]/30 hover:bg-[#c19a6b]/20 text-white transition-all duration-300 shadow-lg hover:shadow-[#c19a6b]/10 hover:shadow-xl"
      onClick={handleToggleKiosk}
      aria-label={isKioskMode ? "Exit Kiosk Mode" : "Enter Kiosk Mode"}
      title={isKioskMode ? "Exit Kiosk Mode" : "Enter Kiosk Mode"}
    >
      {isKioskMode ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
          />
        </svg>
      )}
    </Button>
  );
}

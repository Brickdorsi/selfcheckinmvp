"use client";

import React, { ReactNode } from "react";
import { useKioskMode } from "@/lib/KioskModeContext";
import { useInactivityTimer } from "@/lib/useInactivityTimer";

interface KioskModeWrapperProps {
  children: ReactNode;
}

export function KioskModeWrapper({ children }: KioskModeWrapperProps) {
  const { isKioskMode } = useKioskMode();
  const isInactive = useInactivityTimer(10000, [isKioskMode]); // 10 seconds timeout

  return (
    <div
      className={`transition-all duration-500 ${
        isKioskMode ? "select-none overflow-hidden" : ""
      } ${isKioskMode && isInactive ? "cursor-none" : ""}`}
      style={{
        touchAction: isKioskMode ? "none" : "auto",
      }}
    >
      {children}
    </div>
  );
}

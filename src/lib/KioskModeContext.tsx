"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

type KioskModeContextType = {
  isFullscreen: boolean;
  toggleFullscreen: () => void;
  isKioskMode: boolean;
  setKioskMode: (value: boolean) => void;
};

const KioskModeContext = createContext<KioskModeContextType | undefined>(
  undefined
);

export function useKioskMode() {
  const context = useContext(KioskModeContext);
  if (context === undefined) {
    throw new Error("useKioskMode must be used within a KioskModeProvider");
  }
  return context;
}

interface KioskModeProviderProps {
  children: ReactNode;
}

export function KioskModeProvider({ children }: KioskModeProviderProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isKioskMode, setKioskMode] = useState(false);

  // Check if the document is in fullscreen mode
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(
        !!(
          document.fullscreenElement ||
          (document as any).webkitFullscreenElement ||
          (document as any).mozFullScreenElement ||
          (document as any).msFullscreenElement
        )
      );
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
    document.addEventListener("mozfullscreenchange", handleFullscreenChange);
    document.addEventListener("MSFullscreenChange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener(
        "webkitfullscreenchange",
        handleFullscreenChange
      );
      document.removeEventListener(
        "mozfullscreenchange",
        handleFullscreenChange
      );
      document.removeEventListener(
        "MSFullscreenChange",
        handleFullscreenChange
      );
    };
  }, []);

  // Add keyboard listener to exit kiosk mode with Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isKioskMode) {
        exitFullscreen();
        setKioskMode(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isKioskMode]);

  const toggleFullscreen = () => {
    if (!isFullscreen) {
      enterFullscreen();
    } else {
      exitFullscreen();
    }
  };

  const enterFullscreen = () => {
    const element = document.documentElement;

    if (element.requestFullscreen) {
      element.requestFullscreen().catch((err) => {
        console.error(
          `Error attempting to enable full-screen mode: ${err.message}`
        );
      });
    } else if ((element as any).webkitRequestFullscreen) {
      (element as any).webkitRequestFullscreen();
    } else if ((element as any).mozRequestFullScreen) {
      (element as any).mozRequestFullScreen();
    } else if ((element as any).msRequestFullscreen) {
      (element as any).msRequestFullscreen();
    }
  };

  const exitFullscreen = () => {
    if (document.exitFullscreen) {
      document.exitFullscreen().catch((err) => {
        console.error(
          `Error attempting to exit full-screen mode: ${err.message}`
        );
      });
    } else if ((document as any).webkitExitFullscreen) {
      (document as any).webkitExitFullscreen();
    } else if ((document as any).mozCancelFullScreen) {
      (document as any).mozCancelFullScreen();
    } else if ((document as any).msExitFullscreen) {
      (document as any).msExitFullscreen();
    }
  };

  return (
    <KioskModeContext.Provider
      value={{
        isFullscreen,
        toggleFullscreen,
        isKioskMode,
        setKioskMode,
      }}
    >
      {children}
    </KioskModeContext.Provider>
  );
}

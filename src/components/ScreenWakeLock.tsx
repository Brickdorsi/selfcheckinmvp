"use client";

import { useEffect } from "react";
import { useKioskMode } from "@/lib/KioskModeContext";

export function ScreenWakeLock() {
  const { isKioskMode } = useKioskMode();

  useEffect(() => {
    let wakeLockObj: any = null;

    const requestWakeLock = async () => {
      try {
        if ("wakeLock" in navigator) {
          wakeLockObj = await (navigator as any).wakeLock.request("screen");

          wakeLockObj.addEventListener("release", () => {
            console.log("Screen Wake Lock released");
          });
        }
      } catch (err) {
        console.error(`Failed to obtain wake lock: ${err}`);
      }
    };

    const releaseWakeLock = async () => {
      if (wakeLockObj) {
        try {
          await wakeLockObj.release();
          wakeLockObj = null;
        } catch (err) {
          console.error(`Failed to release wake lock: ${err}`);
        }
      }
    };

    // Event handler for visibility change
    const handleVisibilityChange = async () => {
      if (document.visibilityState === "visible" && isKioskMode) {
        await requestWakeLock();
      }
    };

    // Request wake lock when entering kiosk mode
    if (isKioskMode) {
      requestWakeLock();
      document.addEventListener("visibilitychange", handleVisibilityChange);
    } else {
      releaseWakeLock();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    }

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      releaseWakeLock();
    };
  }, [isKioskMode]);

  // This component doesn't render anything
  return null;
}

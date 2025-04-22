"use client";

import { useState, useEffect, DependencyList } from "react";

export function useInactivityTimer(
  timeout: number = 5000,
  dependencies: DependencyList = []
) {
  const [isInactive, setIsInactive] = useState(false);
  const [lastActivity, setLastActivity] = useState(Date.now());

  useEffect(() => {
    const updateActivity = () => {
      setLastActivity(Date.now());
      setIsInactive(false);
    };

    // Update activity on user interaction
    const events = [
      "mousemove",
      "mousedown",
      "click",
      "keypress",
      "touchstart",
      "touchmove",
    ];

    events.forEach((event) => {
      window.addEventListener(event, updateActivity);
    });

    // Check for inactivity every second
    const interval = setInterval(() => {
      const now = Date.now();
      if (now - lastActivity > timeout) {
        setIsInactive(true);
      }
    }, 1000);

    return () => {
      events.forEach((event) => {
        window.removeEventListener(event, updateActivity);
      });
      clearInterval(interval);
    };
  }, [lastActivity, timeout, ...dependencies]);

  return isInactive;
}

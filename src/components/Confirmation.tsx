import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SpaCircuit } from "@/types/spa";

interface ConfirmationProps {
  selectedCircuit: SpaCircuit | null;
  onStartOver: () => void;
}

export function Confirmation({
  selectedCircuit,
  onStartOver,
}: ConfirmationProps) {
  const [timeLeft, setTimeLeft] = useState(60); // 60 seconds = 1 minute
  const [animationProgress, setAnimationProgress] = useState(0);

  // Animation states for each section
  const [visibleSections, setVisibleSections] = useState({
    header: false,
    circuitDetails: false,
    confirmationMessage: false,
    inRoomDisplay: false,
    bookingLength: false,
    doorAccess: false,
    footer: false,
  });

  // Animation sequence
  useEffect(() => {
    // Show header immediately
    setVisibleSections((prev) => ({ ...prev, header: true }));
    setAnimationProgress(5);

    // Sequence for showing each section with delay
    const timers = [
      setTimeout(() => {
        setVisibleSections((prev) => ({ ...prev, circuitDetails: true }));
        setAnimationProgress(20);
      }, 400),
      setTimeout(() => {
        setVisibleSections((prev) => ({
          ...prev,
          confirmationMessage: true,
        }));
        setAnimationProgress(40);
      }, 800),
      setTimeout(() => {
        setVisibleSections((prev) => ({ ...prev, inRoomDisplay: true }));
        setAnimationProgress(60);
      }, 1200),
      setTimeout(() => {
        setVisibleSections((prev) => ({ ...prev, bookingLength: true }));
        setAnimationProgress(80);
      }, 1600),
      setTimeout(() => {
        setVisibleSections((prev) => ({ ...prev, doorAccess: true }));
        setAnimationProgress(90);
      }, 2000),
      setTimeout(() => {
        setVisibleSections((prev) => ({ ...prev, footer: true }));
        setAnimationProgress(100);
      }, 2400),
    ];

    // Clean up timers
    return () => {
      timers.forEach((timer) => clearTimeout(timer));
    };
  }, []);

  // Auto start over after 1 minute
  useEffect(() => {
    // Start the countdown
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          onStartOver(); // Redirect when timer reaches 0
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Reset timer on user interaction
    const resetTimer = () => setTimeLeft(60);

    // Add event listeners for user interaction
    window.addEventListener("click", resetTimer);
    window.addEventListener("touchstart", resetTimer);
    window.addEventListener("mousemove", resetTimer);

    // Clean up on unmount
    return () => {
      clearInterval(interval);
      window.removeEventListener("click", resetTimer);
      window.removeEventListener("touchstart", resetTimer);
      window.removeEventListener("mousemove", resetTimer);
    };
  }, [onStartOver]);

  // Format time as MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <Card className="w-full bg-gradient-to-b from-[#1a1a1a] to-[#121212] border-[#c19a6b]/30 border-2 rounded-3xl overflow-hidden shadow-2xl">
      {/* Animation Progress Bar */}
      <div className="relative h-1 w-full bg-[#1a1a1a] overflow-hidden">
        <div
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#c19a6b]/70 to-[#c19a6b] transition-all duration-300"
          style={{ width: `${animationProgress}%` }}
        ></div>
      </div>

      <div
        className={`bg-gradient-to-r from-[#121212] to-[#1a1a1a] p-8 rounded-t-3xl border-b border-[#c19a6b]/20 transition-all duration-500 ease-out ${
          visibleSections.header
            ? "opacity-100 transform-none"
            : "opacity-0 transform scale-90"
        }`}
      >
        <CardHeader className="text-center pb-0">
          <CardTitle className="text-5xl font-light tracking-wider text-white">
            Thank You!
          </CardTitle>
          <CardDescription className="text-xl mt-4 text-gray-200 font-light">
            Your wellness journey is about to begin.
          </CardDescription>
        </CardHeader>
      </div>
      <CardContent className="py-10 space-y-8 px-8 bg-gradient-to-b from-[#1e1e1e] to-[#252525]">
        {/* Main content grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Selected Circuit Details */}
          <div
            className={`bg-[#0e0e0e] p-8 rounded-xl border border-[#c19a6b]/40 space-y-4 text-center transition-all duration-700 ease-out ${
              visibleSections.circuitDetails
                ? "opacity-100 transform-none hover:border-[#c19a6b]/60"
                : "opacity-0 transform scale-75 -translate-y-10"
            }`}
          >
            <h3 className="text-2xl font-light text-white">
              Your Selected Circuit
            </h3>
            {selectedCircuit && (
              <>
                <p className="text-2xl font-medium bg-gradient-to-r from-[#e0c9a6] to-[#c19a6b] bg-clip-text text-transparent">
                  {selectedCircuit.name}
                </p>
                <p className="text-lg text-gray-200 mt-4">
                  {selectedCircuit.description}
                </p>
              </>
            )}
          </div>

          {/* Confirmation Message */}
          <div
            className={`bg-[#0e0e0e] p-8 rounded-xl border border-[#c19a6b]/20 space-y-4 text-center transition-all duration-700 ease-out ${
              visibleSections.confirmationMessage
                ? "opacity-100 transform-none shadow-lg"
                : "opacity-0 transform scale-75 translate-y-10"
            }`}
          >
            <h3 className="text-2xl font-light bg-gradient-to-r from-[#e0c9a6] to-[#c19a6b] bg-clip-text text-transparent">
              You&apos;re All Set!
            </h3>
            <p className="text-lg text-gray-200">
              We hope you enjoy your private wellness experience at Sauna
              Suites.
            </p>
            <p className="text-lg text-gray-200 mt-4">
              Remember to follow the instructions for your selected circuit for
              the best experience.
            </p>
            <div className="bg-[#121212] p-4 rounded-lg mt-6 border border-[#c19a6b]/30">
              <p className="text-base text-[#e0c9a6] flex items-center justify-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clipRule="evenodd"
                  />
                </svg>
                The in-room display will guide you through each step of your
                circuit
              </p>
            </div>
          </div>
        </div>

        {/* In-Room Display Information */}
        <div
          className={`bg-gradient-to-br from-[#c19a6b]/10 to-[#121212] p-6 rounded-xl border-2 border-[#c19a6b]/40 transition-all duration-700 ease-out ${
            visibleSections.inRoomDisplay
              ? "opacity-100 transform-none shadow-xl"
              : "opacity-0 transform scale-90"
          }`}
        >
          <h3 className="text-2xl font-light text-center text-white border-b border-[#c19a6b]/30 pb-3 mb-4">
            <span className="font-medium text-[#c19a6b]">
              Inside Your Suite
            </span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
            <div className="bg-[#121212] p-4 rounded-lg border border-[#c19a6b]/20">
              <div className="flex items-center gap-2 mb-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-[#c19a6b]"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                    clipRule="evenodd"
                  />
                </svg>
                <h4 className="text-lg font-medium text-white">Timer</h4>
              </div>
              <p className="text-gray-300 text-sm">
                An interactive timer will help you track your progress through
                each step
              </p>
            </div>

            <div className="bg-[#121212] p-4 rounded-lg border border-[#c19a6b]/20">
              <div className="flex items-center gap-2 mb-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-[#c19a6b]"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                <h4 className="text-lg font-medium text-white">Step-by-Step</h4>
              </div>
              <p className="text-gray-300 text-sm">
                Detailed instructions for each phase of your selected circuit
              </p>
            </div>

            <div className="bg-[#121212] p-4 rounded-lg border border-[#c19a6b]/20">
              <div className="flex items-center gap-2 mb-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-[#c19a6b]"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
                    clipRule="evenodd"
                  />
                </svg>
                <h4 className="text-lg font-medium text-white">Guidance</h4>
              </div>
              <p className="text-gray-300 text-sm">
                Automatic synchronization with your selections from the lobby
                kiosk
              </p>
            </div>
          </div>
        </div>

        {/* Booking Length and Rounds */}
        <div
          className={`bg-gradient-to-br from-[#1a1a1a] to-[#0e0e0e] p-6 rounded-xl border-2 border-[#c19a6b]/40 transition-all duration-700 ease-out ${
            visibleSections.bookingLength
              ? "opacity-100 transform-none shadow-xl"
              : "opacity-0 transform scale-90"
          }`}
        >
          <h3 className="text-2xl font-light text-center text-white border-b border-[#c19a6b]/30 pb-3 mb-4">
            <span className="font-medium text-[#c19a6b]">How Many Rounds?</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#121212] p-5 rounded-lg border border-[#c19a6b]/20">
              <h4 className="text-xl font-medium text-white text-center mb-4">
                Your Booking Length Determines Your Experience
              </h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#0e0e0e] p-3 rounded-lg text-center border border-[#c19a6b]/10">
                  <p className="text-lg font-medium text-[#c19a6b]">1 Hour</p>
                  <p className="text-white text-sm">=</p>
                  <p className="text-white">1 Round</p>
                </div>
                <div className="bg-[#0e0e0e] p-3 rounded-lg text-center border border-[#c19a6b]/10">
                  <p className="text-lg font-medium text-[#c19a6b]">2 Hours</p>
                  <p className="text-white text-sm">=</p>
                  <p className="text-white">2 Rounds</p>
                </div>
                <div className="bg-[#0e0e0e] p-3 rounded-lg text-center border border-[#c19a6b]/10">
                  <p className="text-lg font-medium text-[#c19a6b]">3 Hours</p>
                  <p className="text-white text-sm">=</p>
                  <p className="text-white">3 Rounds</p>
                </div>
                <div className="bg-[#0e0e0e] p-3 rounded-lg text-center border border-[#c19a6b]/10">
                  <p className="text-lg font-medium text-[#c19a6b]">4 Hours</p>
                  <p className="text-white text-sm">=</p>
                  <p className="text-white">4 Rounds</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-between bg-[#121212] p-5 rounded-lg border border-[#c19a6b]/20">
              <div>
                <p className="text-lg text-white text-center mb-2">
                  We recommend{" "}
                  <span className="text-[#c19a6b] font-medium">3 rounds</span>{" "}
                  for maximum recovery
                </p>
                <p className="text-gray-300 text-sm text-center">
                  Each cycle unlocks deeper benefits as your body adapts to the
                  contrast therapy.
                </p>
              </div>

              <div className="mt-4 bg-[#0a0a0a] p-4 rounded-lg border border-[#c19a6b]/10">
                <p className="text-sm text-gray-300 mb-2">
                  To add more rounds/hours to your reservation, email us at:
                </p>
                <p className="text-[#c19a6b] font-medium text-center">
                  saunasuites@gmail.com
                </p>
                <p className="text-xs text-gray-400 mt-2 text-center">
                  Subject: "Extend Stay"
                </p>
                <p className="text-xs text-gray-400 mt-2 text-center">
                  Remember our website is saunasuites.net (not .com)
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Door Access Reminder */}
        <div
          className={`bg-gradient-to-r from-[#1a1a1a] to-[#0e0e0e] p-6 rounded-xl border border-[#c19a6b]/50 transition-all duration-700 ease-out ${
            visibleSections.doorAccess
              ? "opacity-100 transform-none shadow-lg"
              : "opacity-0 transform scale-90"
          }`}
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="bg-[#c19a6b]/20 p-3 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-[#c19a6b]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-medium text-[#e0c9a6]">
                  Door Access Reminder
                </h3>
                <p className="text-gray-300">
                  Your door code will activate exactly at your reservation time
                </p>
              </div>
            </div>
            <div className="bg-[#0a0a0a] px-6 py-3 rounded-lg border border-[#c19a6b]/30">
              <p className="text-base text-white font-medium">
                Enter your code on the keypad + press #
              </p>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter
        className={`flex justify-between pb-8 px-8 bg-[#1e1e1e] transition-all duration-500 ease-out ${
          visibleSections.footer
            ? "opacity-100 transform-none"
            : "opacity-0 transform -translate-y-10"
        }`}
      >
        <div className="text-sm text-[#c19a6b]">
          Auto-reset in {formatTime(timeLeft)}
        </div>
        <Button
          className="px-8 py-2 text-lg bg-[#1e1e1e] border border-[#c19a6b] text-white hover:bg-[#c19a6b]/20 rounded-full transition-all duration-300 shadow-lg hover:shadow-[#c19a6b]/10 hover:shadow-xl"
          onClick={onStartOver}
        >
          Start Over
        </Button>
      </CardFooter>
    </Card>
  );
}

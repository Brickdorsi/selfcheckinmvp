import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SpaCircuit } from "@/types/spa";
import { createSession } from "@/lib/api";

interface DoorAccessProps {
  selectedCircuit: SpaCircuit | null;
  onBackToCircuitSelection: () => void;
  onConfirm: () => void;
}

export function DoorAccess({
  selectedCircuit,
  onBackToCircuitSelection,
  onConfirm,
}: DoorAccessProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [roomId, setRoomId] = useState("1"); // In a real app, this would be determined by the kiosk location

  const handleConfirm = async () => {
    if (!selectedCircuit) return;

    setIsSubmitting(true);
    try {
      // Save the selected circuit to the API
      await createSession(roomId, selectedCircuit);
      // Then proceed to confirmation
      onConfirm();
    } catch (error) {
      console.error("Failed to save session:", error);
      // In a production app, you'd want to show an error message
      // For this demo, we'll just continue to the confirmation
      onConfirm();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full bg-gradient-to-b from-[#1a1a1a] to-[#121212] border-[#c19a6b]/30 border-2 rounded-3xl overflow-hidden shadow-2xl">
      <div className="bg-gradient-to-r from-[#121212] to-[#1a1a1a] p-8 rounded-t-3xl border-b border-[#c19a6b]/20">
        <CardHeader className="text-center pb-0">
          <CardTitle className="text-3xl font-light tracking-wider text-white">
            ENTER YOUR DOOR CODE ON THE
            <div className="text-3xl font-serif tracking-wide mt-1 bg-gradient-to-r from-[#e0c9a6] to-[#c19a6b] bg-clip-text text-transparent">
              KEYPAD OUTSIDE YOUR SUITE
            </div>
          </CardTitle>
        </CardHeader>
      </div>

      <CardContent className="grid lg:grid-cols-2 gap-6 py-10 px-8 bg-gradient-to-b from-[#1e1e1e] to-[#252525]">
        {/* Door Access Instructions - Now more prominent */}
        <div className="bg-gradient-to-br from-[#c19a6b]/10 to-[#121212] p-8 rounded-xl border-2 border-[#c19a6b]/40 space-y-6 shadow-xl order-1 lg:order-2">
          <div className="flex items-center justify-center mb-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 text-[#c19a6b]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>

          <h3 className="text-2xl font-light text-center text-white border-b border-[#c19a6b]/30 pb-3">
            Door Access{" "}
            <span className="font-medium text-[#c19a6b]">Instructions</span>
          </h3>

          <ol className="list-decimal list-inside space-y-4 text-gray-200 font-light">
            <li className="p-3 bg-[#121212] rounded-lg">
              <span className="font-medium text-white">Locate the keypad</span>{" "}
              next to your private suite door
            </li>
            <li className="p-3 bg-[#121212] rounded-lg">
              <span className="font-medium text-white">
                Enter your door code
              </span>{" "}
              exactly at your reservation time
            </li>
            <li className="p-3 bg-[#121212] rounded-lg">
              <span className="font-medium text-white">Press the # key</span>{" "}
              after entering your code
            </li>
            <li className="p-3 bg-[#121212] rounded-lg">
              <span className="font-medium text-white">Lock the door</span>{" "}
              behind you by pressing the lock button
            </li>
          </ol>

          <div className="bg-[#0e0e0e] p-4 rounded-lg mt-4 border border-[#c19a6b]/30">
            <p className="text-sm text-[#e0c9a6] flex items-center justify-center gap-2">
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
              Your code activates exactly at your reservation time
            </p>
          </div>
        </div>

        {/* Selected Circuit Details */}
        <div className="bg-[#0e0e0e] p-8 rounded-xl border border-[#c19a6b]/40 space-y-5 text-center transition-all duration-300 shadow-lg order-2 lg:order-1">
          <h3 className="text-2xl font-light text-white border-b border-[#c19a6b]/30 pb-3 mb-4">
            Your Selected Circuit
          </h3>

          {selectedCircuit && (
            <>
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#c19a6b]/30 to-[#c19a6b]/10 flex items-center justify-center shadow-inner">
                  <span className="text-3xl">
                    {selectedCircuit.name.split(" ")[0]}
                  </span>
                </div>
              </div>

              <p className="text-xl font-medium bg-gradient-to-r from-[#e0c9a6] to-[#c19a6b] bg-clip-text text-transparent">
                {selectedCircuit.name.split(" ").slice(1).join(" ")}
              </p>

              <p className="text-gray-300 mt-4">
                {selectedCircuit.description}
              </p>

              {selectedCircuit.isGroupCircuit && (
                <div className="bg-[#121212] p-4 rounded-lg mt-6 border border-[#c19a6b]/30">
                  <p className="text-sm text-[#e0c9a6] flex items-center justify-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                        clipRule="evenodd"
                      />
                    </svg>
                    This is optimized for 3-4 people
                  </p>
                </div>
              )}

              <div className="bg-[#121212] p-4 rounded-lg mt-6 border border-[#c19a6b]/30">
                <p className="text-sm text-[#e0c9a6] flex items-center justify-center gap-2">
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
                  Complete step-by-step circuit instructions will be displayed
                  inside
                </p>
              </div>
            </>
          )}
        </div>
      </CardContent>

      <CardFooter className="flex justify-between items-center pb-8 px-8 bg-[#1e1e1e]">
        <Button
          variant="outline"
          className="px-8 py-2 text-lg border-[#c19a6b]/50 text-[#c19a6b] hover:bg-[#c19a6b]/10 hover:text-white rounded-full transition-all duration-300 shadow-lg hover:shadow-[#c19a6b]/10 hover:shadow-xl"
          onClick={onBackToCircuitSelection}
          disabled={isSubmitting}
        >
          Back
        </Button>
        <Button
          className="px-8 py-2 text-lg bg-[#1e1e1e] border border-[#c19a6b] text-white hover:bg-[#c19a6b]/20 rounded-full transition-all duration-300 shadow-lg hover:shadow-[#c19a6b]/10 hover:shadow-xl"
          onClick={handleConfirm}
          disabled={isSubmitting}
        >
          {isSubmitting ? "SAVING..." : "CONFIRM"}
        </Button>
      </CardFooter>
    </Card>
  );
}

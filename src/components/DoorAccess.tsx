import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SpaCircuit } from "@/types/spa";

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
      <CardContent className="grid grid-cols-2 gap-4 py-10 space-y-8 px-8 bg-gradient-to-b from-[#1e1e1e] to-[#252525]">
        {/* Selected Circuit Details */}
        <div className="size-full bg-[#0e0e0e] p-8 rounded-xl border border-[#c19a6b]/40 space-y-4 text-center hover:border-[#c19a6b]/60 transition-all duration-300 shadow-lg">
          <h3 className="text-2xl font-light text-white">
            Your Selected Circuit
          </h3>
          {selectedCircuit && (
            <>
              <p className="text-2xl font-medium bg-gradient-to-r from-[#e0c9a6] to-[#c19a6b] bg-clip-text text-transparent">
                {selectedCircuit.name}
              </p>
              <p className="text-sm text-gray-300 mt-2">
                {selectedCircuit.description}
              </p>
            </>
          )}
        </div>

        {/* Door Access Instructions */}
        <div className="size-full bg-[#0e0e0e] p-8 rounded-xl border border-[#c19a6b]/20 space-y-4 shadow-lg">
          <p className="text-lg text-gray-200">
            Your code will activate at the exact time your reservation begins.
            Please enter the code at that time to access your private suite.
          </p>
          <p className="text-lg text-gray-200">
            Enjoy your stay — and don&apos;t forget to lock the door behind you.
          </p>
          <div className="bg-[#121212] p-4 rounded-lg mt-4 border border-[#c19a6b]/30">
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
              Your spa circuit instructions will be displayed on the screen
              inside your suite
            </p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center pb-8 px-8 bg-[#1e1e1e]">
        <Button
          variant="outline"
          className="px-8 py-2 text-lg border-[#c19a6b]/50 text-[#c19a6b] hover:bg-[#c19a6b]/10 hover:text-white rounded-full transition-all duration-300 shadow-lg hover:shadow-[#c19a6b]/10 hover:shadow-xl"
          onClick={onBackToCircuitSelection}
        >
          Back
        </Button>
        <Button
          className="px-8 py-2 text-lg bg-[#1e1e1e] border border-[#c19a6b] text-white hover:bg-[#c19a6b]/20 rounded-full transition-all duration-300 shadow-lg hover:shadow-[#c19a6b]/10 hover:shadow-xl"
          onClick={onConfirm}
        >
          CONFIRM
        </Button>
      </CardFooter>
    </Card>
  );
}

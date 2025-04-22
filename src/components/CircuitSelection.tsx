import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CircuitCard } from "@/components/CircuitCard";
import { SpaCircuit } from "@/types/spa";

interface CircuitSelectionProps {
  circuits: SpaCircuit[];
  onSelectCircuit: (circuit: SpaCircuit) => void;
  onBackToWelcome: () => void;
}

export function CircuitSelection({
  circuits,
  onSelectCircuit,
  onBackToWelcome,
}: CircuitSelectionProps) {
  return (
    <Card className="w-full bg-gradient-to-b from-[#1a1a1a] to-[#121212] border-[#c19a6b]/30 border-2 rounded-3xl overflow-hidden shadow-2xl">
      <div className="bg-gradient-to-r from-[#121212] to-[#1a1a1a] p-6 rounded-t-3xl border-b border-[#c19a6b]/20">
        <CardHeader className="text-center pb-0">
          <CardTitle className="text-4xl font-light tracking-wider text-white">
            CHOOSE YOUR
            <div className="text-4xl font-serif tracking-wide mt-1 bg-gradient-to-r from-[#e0c9a6] to-[#c19a6b] bg-clip-text text-transparent">
              SELF SPA CIRCUIT
            </div>
          </CardTitle>
          <CardDescription className="text-sm mt-3 text-gray-300 font-light">
            Each selection includes Round 1: 50 minutes of guided therapy + 10
            minutes to cool down, shower, and check out.
          </CardDescription>
        </CardHeader>
      </div>
      <CardContent className="flex flex-col gap-4 py-6 px-6 bg-gradient-to-b from-[#1e1e1e] to-[#252525]">
        <div className="bg-[#0e0e0e] p-3 rounded-xl border border-[#c19a6b]/20 mb-2">
          <p className="text-center text-xs text-gray-300">
            We recommend 3 rounds for optimal benefits — contrast therapy
            becomes more powerful with each cycle.
          </p>
        </div>

        <div className="bg-[#121212] p-4 rounded-lg mb-2 border border-[#c19a6b]/30">
          <p className="text-sm text-[#e0c9a6] flex items-center justify-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              />
            </svg>
            Detailed step-by-step instructions will be displayed on the screen
            inside your suite
          </p>
        </div>

        {/* Circuit cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 h-auto">
          {circuits.map((circuit) => (
            <CircuitCard
              key={circuit.id}
              circuit={circuit}
              onClick={onSelectCircuit}
            />
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-center pb-6 bg-[#1e1e1e]">
        <Button
          variant="outline"
          className="px-8 py-2 text-lg border-[#c19a6b]/50 text-[#c19a6b] hover:bg-[#c19a6b]/10 hover:text-white rounded-full transition-all duration-300 shadow-lg hover:shadow-[#c19a6b]/10 hover:shadow-xl"
          onClick={onBackToWelcome}
        >
          Back to Home
        </Button>
      </CardFooter>
    </Card>
  );
}

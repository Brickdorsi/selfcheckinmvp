import React, { useState } from "react";
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
  const [selectedPreview, setSelectedPreview] = useState<SpaCircuit | null>(
    null
  );

  const handleCircuitClick = (circuit: SpaCircuit) => {
    setSelectedPreview(circuit);
  };

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

        {/* Circuit Selection and Preview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Circuit cards scrollable list */}
          <div className="overflow-y-auto pr-2 max-h-96 space-y-4 scrollbar-thin scrollbar-thumb-[#c19a6b]/20 scrollbar-track-[#0e0e0e] scrollbar-thumb-rounded-full scrollbar-track-rounded-full">
            {circuits.map((circuit) => (
              <div
                key={circuit.id}
                className={`p-3 rounded-xl transition-all duration-200 cursor-pointer ${
                  selectedPreview?.id === circuit.id
                    ? "bg-[#c19a6b]/20 border-[#c19a6b]/70"
                    : "bg-[#0e0e0e] border-[#c19a6b]/30 hover:bg-[#c19a6b]/10"
                } border`}
                onClick={() => handleCircuitClick(circuit)}
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#c19a6b]/30 to-[#c19a6b]/10 flex items-center justify-center shadow-inner">
                    <span className="text-2xl">
                      {circuit.name.split(" ")[0]}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white font-medium">
                      {circuit.name.split(" ").slice(1).join(" ")}
                    </h3>
                    <p className="text-xs text-gray-300 line-clamp-1">
                      {circuit.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Circuit detail preview */}
          <div className="bg-[#0e0e0e] p-6 rounded-xl border border-[#c19a6b]/40 flex flex-col">
            {selectedPreview ? (
              <>
                <div className="mb-4 text-center">
                  <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-[#c19a6b]/30 to-[#c19a6b]/10 flex items-center justify-center mb-3 shadow-inner">
                    <span className="text-3xl">
                      {selectedPreview.name.split(" ")[0]}
                    </span>
                  </div>
                  <h2 className="text-xl font-medium text-white mb-1">
                    {selectedPreview.name.split(" ").slice(1).join(" ")}
                  </h2>
                </div>
                <div className="flex-1 mb-6">
                  <p className="text-gray-200 text-center">
                    {selectedPreview.description}
                  </p>
                </div>
                <Button
                  className="w-full py-3 bg-[#c19a6b] hover:bg-[#a88553] text-black font-medium rounded-lg shadow-lg"
                  onClick={() => onSelectCircuit(selectedPreview)}
                >
                  Select This Circuit
                </Button>
              </>
            ) : (
              <div className="flex flex-col h-full items-center justify-center text-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 text-[#c19a6b]/50 mb-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
                <p className="text-gray-400">
                  Select a circuit from the list to view details
                </p>
              </div>
            )}
          </div>
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

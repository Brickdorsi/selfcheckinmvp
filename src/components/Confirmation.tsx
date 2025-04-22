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
import { SpaCircuit } from "@/types/spa";

interface ConfirmationProps {
  selectedCircuit: SpaCircuit | null;
  onStartOver: () => void;
}

export function Confirmation({
  selectedCircuit,
  onStartOver,
}: ConfirmationProps) {
  return (
    <Card className="w-full bg-gradient-to-b from-[#1a1a1a] to-[#121212] border-[#c19a6b]/30 border-2 rounded-3xl overflow-hidden shadow-2xl">
      <div className="bg-gradient-to-r from-[#121212] to-[#1a1a1a] p-8 rounded-t-3xl border-b border-[#c19a6b]/20">
        <CardHeader className="text-center pb-0">
          <CardTitle className="text-5xl font-light tracking-wider text-white">
            Thank You!
          </CardTitle>
          <CardDescription className="text-xl mt-4 text-gray-200 font-light">
            Your wellness journey is about to begin.
          </CardDescription>
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
              <p className="text-lg text-gray-200 mt-4">
                {selectedCircuit.description}
              </p>
            </>
          )}
        </div>

        {/* Confirmation Message */}
        <div className="size-full bg-[#0e0e0e] p-8 rounded-xl border border-[#c19a6b]/20 space-y-4 text-center shadow-lg">
          <h3 className="text-2xl font-light bg-gradient-to-r from-[#e0c9a6] to-[#c19a6b] bg-clip-text text-transparent">
            You&apos;re All Set!
          </h3>
          <p className="text-lg text-gray-200">
            We hope you enjoy your private wellness experience at Sauna Suites.
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
              Detailed instructions for your circuit will be displayed on the
              screen inside your suite
            </p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-center pb-8 bg-[#1e1e1e]">
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

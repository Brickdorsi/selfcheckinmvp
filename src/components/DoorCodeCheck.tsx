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

interface DoorCodeCheckProps {
  onHasDoorCode: () => void;
  onNoDoorCode: () => void;
  onBackToWelcome: () => void;
}

export function DoorCodeCheck({
  onHasDoorCode,
  onNoDoorCode,
  onBackToWelcome,
}: DoorCodeCheckProps) {
  return (
    <Card className="w-full bg-gradient-to-b from-[#1a1a1a] to-[#121212] border-[#c19a6b]/30 border-2 rounded-3xl overflow-hidden shadow-2xl">
      <div className="bg-gradient-to-r from-[#121212] to-[#1a1a1a] p-8 rounded-t-3xl border-b border-[#c19a6b]/20">
        <CardHeader className="text-center pb-0">
          <CardTitle className="text-4xl font-light tracking-wider text-white">
            PLEASE OPEN YOUR BOOKING
            <div className="text-4xl font-serif tracking-wide mt-1 bg-gradient-to-r from-[#e0c9a6] to-[#c19a6b] bg-clip-text text-transparent">
              CONFIRMATION EMAIL
            </div>
          </CardTitle>
          <CardDescription className="text-xl mt-4 text-gray-300 font-light">
            It contains your door access code.
          </CardDescription>
        </CardHeader>
      </div>
      <CardContent className="flex flex-col items-center gap-8 py-10 px-8 bg-gradient-to-b from-[#1e1e1e] to-[#252525]">
        <div className="w-full max-w-md space-y-6">
          <Button
            className="w-full py-6 text-lg bg-[#1e1e1e] border border-[#c19a6b] text-white hover:bg-[#c19a6b]/20 rounded-full transition-all duration-300 shadow-lg hover:shadow-[#c19a6b]/10 hover:shadow-xl"
            onClick={onHasDoorCode}
          >
            I HAVE MY DOOR CODE
          </Button>
          <Button
            variant="outline"
            className="w-full py-6 text-lg border-[#c19a6b]/50 text-[#c19a6b] hover:bg-[#c19a6b]/10 hover:text-white rounded-full transition-all duration-300 shadow-lg hover:shadow-[#c19a6b]/10 hover:shadow-xl"
            onClick={onNoDoorCode}
          >
            I DO NOT HAVE MY DOOR CODE
          </Button>
        </div>
      </CardContent>
      <CardFooter className="flex justify-center pb-8 bg-[#1e1e1e]">
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

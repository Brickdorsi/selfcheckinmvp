import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface WelcomeProps {
  onCheckIn: () => void;
  onMakeReservation: () => void;
}

export function Welcome({ onCheckIn, onMakeReservation }: WelcomeProps) {
  return (
    <Card className="w-full bg-gradient-to-b from-[#1a1a1a] to-[#121212] border-[#c19a6b]/30 border-2 rounded-3xl overflow-hidden shadow-2xl transition-all duration-500">
      <div className="bg-gradient-to-r from-[#121212] to-[#1a1a1a] p-8 rounded-t-3xl border-b border-[#c19a6b]/20">
        <CardHeader className="text-center pb-0">
          <CardTitle className="text-4xl font-light tracking-wider text-white">
            WELCOME TO
          </CardTitle>
          <div className="text-6xl font-serif tracking-wide mt-2 bg-gradient-to-r from-[#e0c9a6] to-[#c19a6b] bg-clip-text text-transparent">
            <div>SAUNA</div>
            <div>SUITES</div>
          </div>
          <CardDescription className="text-xl mt-4 text-gray-300 font-light">
            Your private, fully automated wellness experience awaits.
          </CardDescription>
        </CardHeader>
      </div>
      <CardContent className="flex flex-col items-center gap-8 py-10 px-8 bg-gradient-to-b from-[#1e1e1e] to-[#252525]">
        <div className="w-full max-w-md space-y-6">
          <Button
            className="w-full py-6 text-lg bg-[#1e1e1e] border border-[#c19a6b] text-white hover:bg-[#c19a6b]/20 rounded-full transition-all duration-300 shadow-lg hover:shadow-[#c19a6b]/10 hover:shadow-xl"
            onClick={onCheckIn}
          >
            CHECK IN FOR MY RESERVATION
          </Button>
          <Button
            variant="outline"
            className="w-full py-6 text-lg border-[#c19a6b]/50 text-[#c19a6b] hover:bg-[#c19a6b]/10 hover:text-white rounded-full transition-all duration-300 shadow-lg hover:shadow-[#c19a6b]/10 hover:shadow-xl"
            onClick={onMakeReservation}
          >
            MAKE A RESERVATION
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

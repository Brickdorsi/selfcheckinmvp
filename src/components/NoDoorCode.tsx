import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface NoDoorCodeProps {
  onBackToDoorCodeCheck: () => void;
  onMakeReservation: () => void;
}

export function NoDoorCode({
  onBackToDoorCodeCheck,
  onMakeReservation,
}: NoDoorCodeProps) {
  return (
    <Card className="w-full bg-gradient-to-b from-[#1a1a1a] to-[#121212] border-[#c19a6b]/30 border-2 rounded-3xl overflow-hidden shadow-2xl">
      <div className="bg-gradient-to-r from-[#121212] to-[#1a1a1a] p-8 rounded-t-3xl border-b border-[#c19a6b]/20">
        <CardHeader className="text-center pb-0">
          <CardTitle className="text-4xl font-light tracking-wider text-white">
            NO DOOR CODE
            <div className="text-4xl font-serif tracking-wide mt-1 bg-gradient-to-r from-[#e0c9a6] to-[#c19a6b] bg-clip-text text-transparent">
              FOUND
            </div>
          </CardTitle>
        </CardHeader>
      </div>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4 py-10 px-8 bg-gradient-to-b from-[#1e1e1e] to-[#252525]">
        <div className="size-full bg-[#0e0e0e] p-8 rounded-xl border border-[#c19a6b]/40 space-y-4 text-center hover:border-[#c19a6b]/60 transition-all duration-300 shadow-lg">
          <h3 className="text-2xl font-light bg-gradient-to-r from-[#e0c9a6] to-[#c19a6b] bg-clip-text text-transparent">
            Need Help?
          </h3>
          <p className="text-lg text-gray-200 mt-4">
            If you have a reservation but can&apos;t find your booking
            confirmation email, please email us &quot;door code&quot; right away
            at:
          </p>
          <div className="p-4 bg-[#121212] rounded-lg mt-4 text-lg text-[#e0c9a6] font-medium">
            saunasuites@gmail.com
          </div>
          <p className="text-base text-gray-300 mt-4">
            Include the full name on your reservation. We&apos;ll assist you
            shortly.
          </p>
        </div>

        <div className="size-full bg-[#0e0e0e] p-8 rounded-xl border border-[#c19a6b]/20 space-y-4 text-center shadow-lg flex flex-col justify-center">
          <h3 className="text-2xl font-light bg-gradient-to-r from-[#e0c9a6] to-[#c19a6b] bg-clip-text text-transparent">
            Don&apos;t Have a Reservation?
          </h3>
          <p className="text-lg text-gray-200 mb-6">
            If you need to make a reservation, you can do so on our website.
          </p>
          <Button
            className="w-full py-6 text-lg bg-[#1e1e1e] border border-[#c19a6b] text-white hover:bg-[#c19a6b]/20 rounded-full transition-all duration-300 shadow-lg hover:shadow-[#c19a6b]/10 hover:shadow-xl mx-auto max-w-xs"
            onClick={onMakeReservation}
          >
            MAKE A RESERVATION
          </Button>
        </div>
      </CardContent>
      <CardFooter className="flex justify-center pb-8 bg-[#1e1e1e]">
        <Button
          variant="outline"
          className="px-8 py-2 text-lg border-[#c19a6b]/50 text-[#c19a6b] hover:bg-[#c19a6b]/10 hover:text-white rounded-full transition-all duration-300 shadow-lg hover:shadow-[#c19a6b]/10 hover:shadow-xl"
          onClick={onBackToDoorCodeCheck}
        >
          Back
        </Button>
      </CardFooter>
    </Card>
  );
}

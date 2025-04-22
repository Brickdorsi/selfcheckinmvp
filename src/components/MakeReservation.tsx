import React, { useState } from "react";
import QRCode from "react-qr-code";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface MakeReservationProps {
  onBackToWelcome: () => void;
}

export function MakeReservation({ onBackToWelcome }: MakeReservationProps) {
  const bookingUrl = "https://www.saunasuites.com";
  const [showTooltip, setShowTooltip] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  const handleQrCodeClick = () => {
    window.open(bookingUrl, "_blank");
  };

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(bookingUrl).then(() => {
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    });
  };

  return (
    <Card className="w-full bg-gradient-to-b from-[#1a1a1a] to-[#121212] border-[#c19a6b]/30 border-2 rounded-3xl overflow-hidden shadow-2xl">
      <div className="bg-gradient-to-r from-[#121212] to-[#1a1a1a] p-8 rounded-t-3xl border-b border-[#c19a6b]/20">
        <CardHeader className="text-center pb-0">
          <CardTitle className="text-5xl font-light tracking-wider text-white">
            READY TO BOOK?
          </CardTitle>
          <CardDescription className="text-xl mt-4 text-gray-300 font-light">
            Scan the QR code below or visit www.saunasuites.com to reserve your
            session.
          </CardDescription>
        </CardHeader>
      </div>
      <CardContent className="flex flex-col items-center gap-8 py-10 px-8 bg-gradient-to-b from-[#1e1e1e] to-[#252525]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
          <div className="bg-[#0e0e0e] p-6 rounded-xl border border-[#c19a6b]/30 flex items-center justify-center shadow-xl hover:border-[#c19a6b]/50 transition-all duration-300 size-full">
            <div className="text-center p-4 bg-white rounded-lg relative">
              <button
                onClick={handleQrCodeClick}
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
                className="cursor-pointer focus:outline-none"
                aria-label="Click to visit Sauna Suites website"
              >
                <QRCode
                  size={150}
                  value={bookingUrl}
                  viewBox={`0 0 150 150`}
                  style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                  bgColor="#FFFFFF"
                  fgColor="#000000"
                />
                {showTooltip && (
                  <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-[#0e0e0e] text-white text-xs py-1 px-2 rounded shadow-lg whitespace-nowrap z-10">
                    Click to visit website
                  </div>
                )}
              </button>
              <div className="flex items-center justify-center mt-4 gap-2">
                <p className="text-sm bg-gradient-to-r from-[#e0c9a6] to-[#c19a6b] bg-clip-text text-transparent font-medium">
                  www.saunasuites.com
                </p>
                <button
                  onClick={handleCopyUrl}
                  className="text-xs bg-[#0e0e0e] text-[#c19a6b] hover:text-white p-1 rounded-md transition-colors duration-200 relative"
                  aria-label="Copy URL to clipboard"
                >
                  {copySuccess ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                      <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>

          <div className="size-full bg-[#0e0e0e] p-8 rounded-xl border border-[#c19a6b]/20 flex flex-col justify-center shadow-lg">
            <h3 className="text-2xl font-light bg-gradient-to-r from-[#e0c9a6] to-[#c19a6b] bg-clip-text text-transparent mb-4 text-center">
              Booking Instructions
            </h3>
            <p className="text-lg text-gray-200 mb-4">
              1. Scan the QR code with your phone camera
            </p>
            <p className="text-lg text-gray-200 mb-4">
              2. Select your preferred date and time
            </p>
            <p className="text-lg text-gray-200 mb-4">
              3. Complete the booking process
            </p>
            <p className="text-lg text-gray-200 mb-4">
              4. Keep the confirmation email for your door code
            </p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-center pb-8 bg-[#1e1e1e]">
        <Button
          className="px-8 py-2 text-lg bg-[#1e1e1e] border border-[#c19a6b] text-white hover:bg-[#c19a6b]/20 rounded-full transition-all duration-300 shadow-lg hover:shadow-[#c19a6b]/10 hover:shadow-xl"
          onClick={onBackToWelcome}
        >
          Back to Welcome
        </Button>
      </CardFooter>
    </Card>
  );
}

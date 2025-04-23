import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SpaCircuit } from "@/types/spa";
import { getActiveSession } from "@/lib/api";

interface InRoomDisplayProps {
  roomId: string;
  pollingInterval?: number; // How often to check for updates in ms
}

export function InRoomDisplay({
  roomId,
  pollingInterval = 10000,
}: InRoomDisplayProps) {
  const [selectedCircuit, setSelectedCircuit] = useState<SpaCircuit | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [timerActive, setTimerActive] = useState(false);

  // Check for active session
  useEffect(() => {
    const fetchActiveSession = async () => {
      try {
        setLoading(true);
        const session = await getActiveSession(roomId);

        if (session && session.selectedCircuit) {
          setSelectedCircuit(session.selectedCircuit);
        }
      } catch (error) {
        console.error("Error fetching active session:", error);
      } finally {
        setLoading(false);
      }
    };

    // Initial fetch
    fetchActiveSession();

    // Set up polling
    const intervalId = setInterval(fetchActiveSession, pollingInterval);

    return () => clearInterval(intervalId);
  }, [roomId, pollingInterval]);

  // Handle timer
  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (timerActive) {
      intervalId = setInterval(() => {
        setElapsedTime((prev) => prev + 1);
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [timerActive]);

  // Format time as MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  // Extract circuit steps based on description
  const getCircuitSteps = (circuit: SpaCircuit) => {
    if (!circuit) return [];

    // Parse the description to extract steps
    // This assumes the description has the format: "X min Activity → Y min Activity → Z min Activity"
    const steps = circuit.description.split("→").map((step) => {
      const match = step.trim().match(/(\d+)\s+min\s+(.*)/);
      if (match) {
        return {
          duration: parseInt(match[1], 10),
          activity: match[2].trim(),
        };
      }
      return { duration: 5, activity: step.trim() };
    });

    return steps;
  };

  const circuitSteps = selectedCircuit ? getCircuitSteps(selectedCircuit) : [];
  const currentCircuitStep = circuitSteps[currentStep] || {
    duration: 0,
    activity: "",
  };

  const handleStartTimer = () => {
    setTimerActive(true);
  };

  const handleStopTimer = () => {
    setTimerActive(false);
  };

  const handleResetTimer = () => {
    setElapsedTime(0);
    setTimerActive(false);
  };

  const handleNextStep = () => {
    if (currentStep < circuitSteps.length - 1) {
      setCurrentStep((prev) => prev + 1);
      setElapsedTime(0);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
      setElapsedTime(0);
    }
  };

  if (loading) {
    return (
      <Card className="w-full h-full bg-gradient-to-b from-[#1a1a1a] to-[#121212] border-[#c19a6b]/30 border-2 rounded-3xl overflow-hidden shadow-2xl">
        <CardContent className="flex items-center justify-center h-full">
          <div className="text-[#c19a6b] text-xl">Loading session data...</div>
        </CardContent>
      </Card>
    );
  }

  if (!selectedCircuit) {
    return (
      <Card className="w-full h-full bg-gradient-to-b from-[#1a1a1a] to-[#121212] border-[#c19a6b]/30 border-2 rounded-3xl overflow-hidden shadow-2xl">
        <CardContent className="flex flex-col items-center justify-center h-full p-10 gap-6">
          <div className="text-white text-2xl text-center">
            No active session found for this room
          </div>
          <p className="text-gray-300 text-center">
            Please use the check-in kiosk in the lobby to select your spa
            circuit.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full h-full bg-gradient-to-b from-[#1a1a1a] to-[#121212] border-[#c19a6b]/30 border-2 rounded-3xl overflow-hidden shadow-2xl">
      <div className="bg-gradient-to-r from-[#121212] to-[#1a1a1a] p-6 rounded-t-3xl border-b border-[#c19a6b]/20">
        <CardHeader className="text-center pb-0">
          <CardTitle className="text-3xl font-light tracking-wider text-white">
            {selectedCircuit.name}
            <div className="text-xl font-light tracking-wide mt-2 text-gray-300">
              Step {currentStep + 1} of {circuitSteps.length}
            </div>
          </CardTitle>
        </CardHeader>
      </div>

      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6 py-8 px-6 bg-gradient-to-b from-[#1e1e1e] to-[#252525]">
        {/* Current Step */}
        <div className="bg-gradient-to-br from-[#c19a6b]/10 to-[#121212] p-8 rounded-xl border-2 border-[#c19a6b]/40 space-y-6 shadow-xl flex flex-col items-center">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#c19a6b]/30 to-[#c19a6b]/10 flex items-center justify-center shadow-inner">
            <span className="text-5xl">
              {selectedCircuit.name.split(" ")[0]}
            </span>
          </div>

          <div className="text-3xl font-light text-white text-center">
            <span className="font-medium text-[#c19a6b]">
              {currentCircuitStep.activity}
            </span>
          </div>

          <div className="text-4xl font-light text-white text-center">
            {formatTime(elapsedTime)} / {currentCircuitStep.duration}:00
          </div>

          <div className="grid grid-cols-3 gap-4 w-full mt-4">
            <Button
              variant="outline"
              className="bg-[#121212] border border-[#c19a6b]/50 text-[#c19a6b] hover:bg-[#c19a6b]/10 hover:text-white"
              onClick={handleStartTimer}
              disabled={timerActive}
            >
              Start
            </Button>
            <Button
              variant="outline"
              className="bg-[#121212] border border-[#c19a6b]/50 text-[#c19a6b] hover:bg-[#c19a6b]/10 hover:text-white"
              onClick={handleStopTimer}
              disabled={!timerActive}
            >
              Pause
            </Button>
            <Button
              variant="outline"
              className="bg-[#121212] border border-[#c19a6b]/50 text-[#c19a6b] hover:bg-[#c19a6b]/10 hover:text-white"
              onClick={handleResetTimer}
            >
              Reset
            </Button>
          </div>
        </div>

        {/* Circuit Overview */}
        <div className="bg-[#0e0e0e] p-6 rounded-xl border border-[#c19a6b]/40 space-y-4 shadow-lg">
          <h3 className="text-2xl font-light text-white border-b border-[#c19a6b]/30 pb-3 mb-2">
            Circuit Steps
          </h3>

          <div className="space-y-3 max-h-60 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-[#c19a6b]/20 scrollbar-track-[#0e0e0e]">
            {circuitSteps.map((step, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg flex items-center justify-between ${
                  index === currentStep
                    ? "bg-[#c19a6b]/20 border border-[#c19a6b]/70"
                    : "bg-[#121212] border border-[#c19a6b]/20"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#1e1e1e] flex items-center justify-center">
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-medium text-white">{step.activity}</p>
                    <p className="text-sm text-gray-400">
                      {step.duration} minutes
                    </p>
                  </div>
                </div>
                {index === currentStep && (
                  <div className="w-3 h-3 rounded-full bg-[#c19a6b]"></div>
                )}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-4 mt-6">
            <Button
              variant="outline"
              className="bg-[#121212] border border-[#c19a6b]/50 text-[#c19a6b] hover:bg-[#c19a6b]/10 hover:text-white"
              onClick={handlePreviousStep}
              disabled={currentStep === 0}
            >
              Previous Step
            </Button>
            <Button
              className="bg-[#c19a6b] text-black hover:bg-[#a88553]"
              onClick={handleNextStep}
              disabled={currentStep === circuitSteps.length - 1}
            >
              Next Step
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

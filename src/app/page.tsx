"use client";

import React, { useState, useEffect } from "react";
import { Welcome } from "@/components/Welcome";
import { DoorCodeCheck } from "@/components/DoorCodeCheck";
import { MakeReservation } from "@/components/MakeReservation";
import { CircuitSelection } from "@/components/CircuitSelection";
import { DoorAccess } from "@/components/DoorAccess";
import { Confirmation } from "@/components/Confirmation";
import { NoDoorCode } from "@/components/NoDoorCode";
import { GroupSizeSelection } from "@/components/GroupSizeSelection";
import { SpaCircuit } from "@/types/spa";
import { KioskModeWrapper } from "@/components/KioskModeWrapper";
import { KioskModeButton } from "@/components/KioskModeButton";
import { ScreenWakeLock } from "@/components/ScreenWakeLock";
import { ProgressSidebar } from "@/components/ProgressSidebar";

// Define the steps in the check-in flow
enum CheckInStep {
  WELCOME = "welcome",
  DOOR_CODE_CHECK = "door_code_check",
  MAKE_RESERVATION = "make_reservation",
  GROUP_SIZE_SELECTION = "group_size_selection",
  CIRCUIT_SELECTION = "circuit_selection",
  DOOR_ACCESS = "door_access",
  CONFIRMATION = "confirmation",
  NO_DOOR_CODE = "no_door_code",
}

// Define the spa circuits
const spaCircuits: SpaCircuit[] = [
  {
    id: "health-circuit",
    name: "🩺 Health Circuit",
    description:
      "5 min Cold Plunge → 5 min Red Light → 40 min Sauna. Boosts immunity, lowers stress, enhances balance.",
  },
  {
    id: "cold-circuit",
    name: "❄️ Cold Circuit",
    description:
      "5 min Cold Plunge → 5 min Red Light → 5 min Cold → 30 min Sauna → 5 min Cold. Cold exposure increases norepinephrine for sharper focus, energy, and mood.",
  },
  {
    id: "heat-circuit",
    name: "🔥 Heat Circuit",
    description:
      "2 min Cold Plunge → 50 min Sauna. Ends with intense heat to activate heat shock proteins, support detox, and circulation.",
  },
  {
    id: "skin-rejuvenation",
    name: "💎 Skin Rejuvenation Circuit",
    description:
      "5 min Cold Plunge → 15 min Red Light → 30 min Sauna. Light + heat combo for collagen production, glowing skin, and rejuvenation.",
  },
  {
    id: "freestyle",
    name: "🎛️ Freestyle Mode",
    description:
      "No rules. Create your own healing flow. Listen to your body. It knows what to do.",
  },
  {
    id: "group-circuit",
    name: "👥 Group Circuit Flow",
    description:
      "Step 1: Split into 2 groups - Group A (2 guests) starts in sauna, Group B (1-2 guests) rotates between cold plunge & red light. Step 2: Group B does 3 rounds of 5 min red light → 5 min cold plunge (30 min total) while Group A stays in sauna. Step 3: Groups switch.",
    isGroupCircuit: true,
  },
];

export default function Home() {
  const [currentStep, setCurrentStep] = useState<CheckInStep>(
    CheckInStep.WELCOME
  );
  const [selectedCircuit, setSelectedCircuit] = useState<SpaCircuit | null>(
    null
  );
  const [lastActivityTime, setLastActivityTime] = useState<number>(Date.now());
  const INACTIVITY_TIMEOUT = 60000; // 1 minute in milliseconds
  const [isLargeGroup, setIsLargeGroup] = useState<boolean>(false);

  // Apply dark theme to body
  useEffect(() => {
    document.body.classList.add("bg-[#1a1a1a]");
    return () => {
      document.body.classList.remove("bg-[#1a1a1a]");
    };
  }, []);

  // Reset to Welcome screen after inactivity
  useEffect(() => {
    // Skip for Welcome and Confirmation screens (Confirmation has its own timer)
    if (
      currentStep === CheckInStep.WELCOME ||
      currentStep === CheckInStep.CONFIRMATION
    ) {
      return;
    }

    // Track user activity
    const handleUserActivity = () => {
      setLastActivityTime(Date.now());
    };

    // Add event listeners for user interaction
    window.addEventListener("click", handleUserActivity);
    window.addEventListener("touchstart", handleUserActivity);
    window.addEventListener("mousemove", handleUserActivity);

    // Check for inactivity
    const inactivityCheck = setInterval(() => {
      const currentTime = Date.now();
      if (currentTime - lastActivityTime > INACTIVITY_TIMEOUT) {
        setCurrentStep(CheckInStep.WELCOME);
      }
    }, 10000); // Check every 10 seconds

    // Clean up
    return () => {
      clearInterval(inactivityCheck);
      window.removeEventListener("click", handleUserActivity);
      window.removeEventListener("touchstart", handleUserActivity);
      window.removeEventListener("mousemove", handleUserActivity);
    };
  }, [currentStep, lastActivityTime]);

  // Handlers for navigation
  const handleCheckIn = () => setCurrentStep(CheckInStep.DOOR_CODE_CHECK);
  const handleMakeReservation = () =>
    setCurrentStep(CheckInStep.MAKE_RESERVATION);
  const handleHasDoorCode = () => {
    setCurrentStep(CheckInStep.GROUP_SIZE_SELECTION);
  };
  const handleNoDoorCode = () => {
    setCurrentStep(CheckInStep.NO_DOOR_CODE);
  };

  const handleSmallGroup = () => {
    setIsLargeGroup(false);
    setCurrentStep(CheckInStep.CIRCUIT_SELECTION);
  };

  const handleLargeGroup = () => {
    setIsLargeGroup(true);
    // For large groups, automatically select the group circuit and go to door access
    const groupCircuit = spaCircuits.find((circuit) => circuit.isGroupCircuit);
    if (groupCircuit) {
      setSelectedCircuit(groupCircuit);
      setCurrentStep(CheckInStep.DOOR_ACCESS);
    } else {
      // Fallback to circuit selection if no group circuit found
      setCurrentStep(CheckInStep.CIRCUIT_SELECTION);
    }
  };

  const handleSelectCircuit = (circuit: SpaCircuit) => {
    setSelectedCircuit(circuit);
    setCurrentStep(CheckInStep.DOOR_ACCESS);
  };
  const handleConfirmation = () => setCurrentStep(CheckInStep.CONFIRMATION);
  const handleStartOver = () => setCurrentStep(CheckInStep.WELCOME);
  const handleBackToWelcome = () => setCurrentStep(CheckInStep.WELCOME);
  const handleBackToCircuitSelection = () =>
    setCurrentStep(CheckInStep.CIRCUIT_SELECTION);
  const handleBackToDoorCodeCheck = () =>
    setCurrentStep(CheckInStep.DOOR_CODE_CHECK);
  const handleBackToGroupSizeSelection = () =>
    setCurrentStep(CheckInStep.GROUP_SIZE_SELECTION);

  // Render the appropriate component based on the current step
  const renderStep = () => {
    switch (currentStep) {
      case CheckInStep.WELCOME:
        return (
          <Welcome
            onCheckIn={handleCheckIn}
            onMakeReservation={handleMakeReservation}
          />
        );
      case CheckInStep.DOOR_CODE_CHECK:
        return (
          <DoorCodeCheck
            onHasDoorCode={handleHasDoorCode}
            onNoDoorCode={handleNoDoorCode}
            onBackToWelcome={handleBackToWelcome}
          />
        );
      case CheckInStep.GROUP_SIZE_SELECTION:
        return (
          <GroupSizeSelection
            onSmallGroup={handleSmallGroup}
            onLargeGroup={handleLargeGroup}
            onBackToDoorCodeCheck={handleBackToDoorCodeCheck}
          />
        );
      case CheckInStep.MAKE_RESERVATION:
        return <MakeReservation onBackToWelcome={handleBackToWelcome} />;
      case CheckInStep.CIRCUIT_SELECTION:
        return (
          <CircuitSelection
            circuits={
              isLargeGroup
                ? spaCircuits.filter((circuit) => circuit.isGroupCircuit)
                : spaCircuits.filter((circuit) => !circuit.isGroupCircuit)
            }
            onSelectCircuit={handleSelectCircuit}
            onBackToWelcome={
              isLargeGroup
                ? handleBackToGroupSizeSelection
                : handleBackToWelcome
            }
          />
        );
      case CheckInStep.DOOR_ACCESS:
        return (
          <DoorAccess
            selectedCircuit={selectedCircuit}
            onBackToCircuitSelection={
              isLargeGroup
                ? handleBackToGroupSizeSelection
                : handleBackToCircuitSelection
            }
            onConfirm={handleConfirmation}
          />
        );
      case CheckInStep.CONFIRMATION:
        return (
          <Confirmation
            selectedCircuit={selectedCircuit}
            onStartOver={handleStartOver}
          />
        );
      case CheckInStep.NO_DOOR_CODE:
        return (
          <NoDoorCode
            onBackToDoorCodeCheck={handleBackToDoorCodeCheck}
            onMakeReservation={handleMakeReservation}
          />
        );
      default:
        return (
          <Welcome
            onCheckIn={handleCheckIn}
            onMakeReservation={handleMakeReservation}
          />
        );
    }
  };

  return (
    <>
      <KioskModeButton />
      <ScreenWakeLock />
      <KioskModeWrapper>
        {/* Progress Sidebar - only shown for actual check-in steps */}
        {currentStep !== CheckInStep.WELCOME &&
          currentStep !== CheckInStep.MAKE_RESERVATION && (
            <ProgressSidebar currentStep={currentStep} />
          )}

        <div className="min-h-screen w-screen flex flex-col items-center justify-center p-4 bg-[#0a0a0a] text-white">
          {/* Background pattern */}
          <div className="absolute inset-0 bg-[#0a0a0a]">
            <div className="absolute inset-0 opacity-5">
              <div className="absolute inset-0 bg-[radial-gradient(#c19a6b_1px,transparent_1px)] bg-[length:20px_20px]"></div>
            </div>
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-[#c19a6b]/20 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#c19a6b]/20 to-transparent"></div>
            </div>
          </div>

          {/* Main content container */}
          <div className="relative z-10 flex flex-col items-center w-full max-w-5xl mx-auto">
            {/* Main content area */}
            <div className="flex-1 flex items-center justify-center w-full max-w-4xl mx-auto">
              <div className="w-full transform scale-[0.95] transition-all duration-500">
                {renderStep()}
              </div>
            </div>
          </div>
        </div>
      </KioskModeWrapper>
    </>
  );
}

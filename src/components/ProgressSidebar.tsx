import React from "react";

// Import the CheckInStep enum
type CheckInStep =
  | "welcome"
  | "door_code_check"
  | "make_reservation"
  | "group_size_selection"
  | "circuit_selection"
  | "door_access"
  | "confirmation"
  | "no_door_code";

interface ProgressSidebarProps {
  currentStep: CheckInStep;
}

// Define the steps to show in the sidebar (we'll exclude some alternative paths)
const steps = [
  { id: "door_code_check", label: "Door Code" },
  { id: "group_size_selection", label: "Group Size" },
  { id: "circuit_selection", label: "Circuit Selection" },
  { id: "door_access", label: "Door Access" },
  { id: "confirmation", label: "Confirmation" },
];

// Map to handle steps not in the main flow
const stepMapping: Record<string, number> = {
  no_door_code: 0, // Map alternative paths to a reasonable place in the flow
};

export function ProgressSidebar({ currentStep }: ProgressSidebarProps) {
  // Find the index of the current step, with fallback to mapping
  let currentIndex = steps.findIndex((step) => step.id === currentStep);

  // If step not found in main flow, check mapping
  if (currentIndex === -1 && stepMapping[currentStep] !== undefined) {
    currentIndex = stepMapping[currentStep];
  }

  return (
    <div className="fixed left-4 top-1/2 transform -translate-y-1/2 z-20 animate-fade-in">
      <div className="bg-gradient-to-b from-[#1a1a1a] to-[#121212] border-[#c19a6b]/20 border rounded-xl p-3 shadow-xl">
        <div className="flex flex-col items-center space-y-4 relative">
          {/* Vertical line connecting the steps */}
          <div className="absolute h-full w-0.5 bg-gradient-to-b from-[#c19a6b]/10 to-[#c19a6b]/40 left-1/2 transform -translate-x-1/2 z-0" />

          {steps.map((step, index) => {
            // Determine the status of this step
            const isCompleted = index < currentIndex;
            const isCurrent = index === currentIndex;

            return (
              <div
                key={step.id}
                className="flex flex-col items-center relative z-10"
                title={step.label}
              >
                {/* Step indicator dot */}
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center transition-all duration-500 ${
                    isCompleted
                      ? "bg-[#c19a6b] text-black shadow-[0_0_10px_rgba(193,154,107,0.5)]"
                      : isCurrent
                      ? "bg-[#c19a6b]/80 ring-2 ring-[#c19a6b] ring-offset-1 ring-offset-[#121212] shadow-[0_0_15px_rgba(193,154,107,0.7)]"
                      : "bg-[#2a2a2a] border border-[#c19a6b]/20 text-gray-500"
                  }`}
                >
                  {isCompleted ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-3 w-3"
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
                    <span className="text-xs">{index + 1}</span>
                  )}
                </div>

                {/* Step label - shows for current step */}
                <div
                  className={`absolute left-full ml-3 whitespace-nowrap transition-all duration-500 ${
                    isCurrent
                      ? "opacity-100 translate-x-0"
                      : "opacity-0 -translate-x-2"
                  }`}
                >
                  <span className="text-sm bg-[#1a1a1a] px-2 py-1 rounded border border-[#c19a6b]/40 text-[#c19a6b]">
                    {step.label}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

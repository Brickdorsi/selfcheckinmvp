import React from "react";
import { SpaCircuit } from "@/types/spa";

interface CircuitCardProps {
  circuit: SpaCircuit;
  onClick: (circuit: SpaCircuit) => void;
}

export function CircuitCard({ circuit, onClick }: CircuitCardProps) {
  // Extract the emoji and name parts
  const emoji = circuit.name.split(" ")[0];
  const name = circuit.name.split(" ").slice(1).join(" ");

  return (
    <button
      className="h-full w-full flex flex-col items-center justify-start p-4 text-center rounded-xl bg-[#0e0e0e] hover:bg-[#c19a6b]/20 border border-[#c19a6b]/30 hover:border-[#c19a6b] transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-[#c19a6b]/10 transform hover:scale-[1.02]"
      onClick={() => onClick(circuit)}
    >
      <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#c19a6b]/30 to-[#c19a6b]/10 flex items-center justify-center mb-3 shadow-inner">
        <span className="text-2xl">{emoji}</span>
      </div>
      <span className="text-sm font-medium tracking-wide text-white mb-1">
        {name}
      </span>
    </button>
  );
}

import React from "react";

function DataCard({ name, description }) {
  return (
    <div className="bg-[#1E1E2A] rounded-lg p-4 w-64 h-60 cursor-pointer shadow-lg hover:shadow-2xl transform transition-all duration-300 hover:scale-105 hover:border-[#0E499D] hover:border-2">
      <h2 className="text-white text-lg font-semibold">{name}</h2>
      <p className="text-[#A0AEC0]">{description}</p>
    </div>
  );
}

export default DataCard;

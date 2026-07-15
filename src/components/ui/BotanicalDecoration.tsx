import React from "react";

export function BotanicalDecoration({
  className = "",
  opacity = 0.04,
}: {
  className?: string;
  opacity?: number;
}) {
  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden flex items-center justify-between ${className}`}
      style={{ opacity }}
    >
      {/* Left Floral Decoration (Top-Left Edge) */}
      <svg
        width="400"
        height="400"
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute -top-10 -left-10 md:-top-20 md:-left-20 w-64 h-64 md:w-96 md:h-96 object-contain opacity-70"
        preserveAspectRatio="xMinYMin meet"
      >
        <g stroke="currentColor" strokeWidth="0.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
          {/* Stem */}
          <path d="M 0 200 C 50 150 100 120 120 70" />
          {/* Leaves */}
          <path d="M 50 150 C 70 170 90 140 100 150 C 90 130 60 140 50 150" />
          <path d="M 80 130 C 60 110 50 120 40 100 C 60 100 70 110 80 130" />
          <path d="M 110 90 C 130 110 140 100 160 80 C 140 70 120 80 110 90" />
          {/* Flower Base / Receptacle */}
          <path d="M 120 70 C 115 65 125 60 120 70" />
          {/* Petals */}
          <path d="M 120 70 C 90 50 100 10 120 30 C 130 10 140 20 125 40" />
          <path d="M 120 70 C 140 60 170 40 145 35 C 135 25 125 45 120 70" />
          <path d="M 120 70 C 100 80 70 60 95 45 C 105 35 115 55 120 70" />
          <path d="M 120 70 C 125 40 110 20 120 30 C 135 15 145 35 120 70" />
          {/* Inner Petal Details */}
          <path d="M 120 70 C 115 55 110 40 120 45" />
          <path d="M 120 70 C 125 55 130 40 120 45" />
          <path d="M 120 70 C 105 60 90 50 100 55" />
        </g>
      </svg>

      {/* Right Floral Decoration (Bottom-Right Edge) */}
      <svg
        width="400"
        height="400"
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute -bottom-10 -right-10 md:-bottom-20 md:-right-20 w-64 h-64 md:w-96 md:h-96 object-contain opacity-70"
        preserveAspectRatio="xMaxYMax meet"
        style={{ transform: 'rotate(180deg)' }}
      >
        <g stroke="currentColor" strokeWidth="0.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
          {/* Stem */}
          <path d="M 0 200 C 50 150 100 120 120 70" />
          {/* Leaves */}
          <path d="M 50 150 C 70 170 90 140 100 150 C 90 130 60 140 50 150" />
          <path d="M 80 130 C 60 110 50 120 40 100 C 60 100 70 110 80 130" />
          <path d="M 110 90 C 130 110 140 100 160 80 C 140 70 120 80 110 90" />
          {/* Flower Base / Receptacle */}
          <path d="M 120 70 C 115 65 125 60 120 70" />
          {/* Petals */}
          <path d="M 120 70 C 90 50 100 10 120 30 C 130 10 140 20 125 40" />
          <path d="M 120 70 C 140 60 170 40 145 35 C 135 25 125 45 120 70" />
          <path d="M 120 70 C 100 80 70 60 95 45 C 105 35 115 55 120 70" />
          <path d="M 120 70 C 125 40 110 20 120 30 C 135 15 145 35 120 70" />
          {/* Inner Petal Details */}
          <path d="M 120 70 C 115 55 110 40 120 45" />
          <path d="M 120 70 C 125 55 130 40 120 45" />
          <path d="M 120 70 C 105 60 90 50 100 55" />
        </g>
      </svg>
    </div>
  );
}
          


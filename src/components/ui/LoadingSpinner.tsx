"use client";

import React from "react";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  color?: "gold" | "emerald" | "white" | "dark";
  label?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = "md",
  className = "",
  color = "gold",
  label,
}) => {
  const sizeClasses = {
    sm: "w-5 h-5 border-2",
    md: "w-8 h-8 border-2",
    lg: "w-12 h-12 border-3",
    xl: "w-16 h-16 border-4",
  }[size];

  const colorClasses = {
    gold: "border-[#c9a84c]/20 border-t-[#c9a84c]",
    emerald: "border-[#0B2516]/20 border-t-[#0B2516]",
    white: "border-white/20 border-t-white",
    dark: "border-stone-800/20 border-t-stone-800",
  }[color];

  return (
    <div className={`flex flex-col items-center justify-center space-y-3 ${className}`}>
      <div
        className={`${sizeClasses} ${colorClasses} rounded-full animate-spin transition-all`}
        style={{ animationDuration: "0.75s" }}
        role="status"
        aria-label="Loading"
      />
      {label ? (
        <p className="text-xs uppercase tracking-[0.25em] font-serif text-stone-500 font-medium animate-pulse">
          {label}
        </p>
      ) : null}
    </div>
  );
};

export const SectionLoader: React.FC<{ label?: string; minHeight?: string }> = ({
  label = "Loading…",
  minHeight = "min-h-[300px]",
}) => {
  return (
    <div className={`w-full ${minHeight} flex flex-col items-center justify-center p-8 bg-transparent`}>
      <LoadingSpinner size="lg" color="gold" label={label} />
    </div>
  );
};

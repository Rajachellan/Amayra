"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export interface SortDropdownProps {
  value: string;
  onChange: (val: string) => void;
  options: string[];
  label?: string;
  className?: string;
}

export const SortDropdown: React.FC<SortDropdownProps> = ({
  value,
  onChange,
  options,
  label = "Sort by:",
  className = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent | TouchEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <div ref={dropdownRef} className={`relative inline-block text-left ${className}`}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        className={`group inline-flex items-center gap-2 py-1.5 px-3 sm:px-3.5 rounded-full border transition-all duration-200 text-xs cursor-pointer select-none ${
          isOpen
            ? "border-[#c9a84c] bg-[#faf7f0] shadow-sm text-stone-900"
            : "border-stone-200 bg-white/90 hover:border-stone-300 hover:bg-white text-stone-800 shadow-2xs"
        }`}
      >
        <span className="text-stone-400 font-normal">{label}</span>
        <span className="font-semibold text-stone-900 tracking-wide">{value}</span>
        <ChevronDown
          className={`w-3.5 h-3.5 text-stone-500 transition-transform duration-250 ease-out group-hover:text-[#c9a84c] ${
            isOpen ? "rotate-180 text-[#c9a84c]" : ""
          }`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -4, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.98 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute right-0 top-full mt-2 w-56 sm:w-60 bg-white/98 backdrop-blur-md rounded-2xl border border-stone-200/90 shadow-[0_12px_36px_rgba(0,0,0,0.12)] p-1.5 z-50 overflow-hidden"
            role="listbox"
          >
            {options.map((option) => {
              const isSelected = option === value;
              return (
                <button
                  key={option}
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => {
                    onChange(option);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs tracking-wide transition-all text-left cursor-pointer ${
                    isSelected
                      ? "bg-[#faf6ed] text-[#8e6d24] font-semibold shadow-2xs"
                      : "text-stone-700 hover:bg-stone-50 hover:text-stone-950 font-medium"
                  }`}
                >
                  <span>{option}</span>
                  {isSelected && (
                    <Check className="w-3.5 h-3.5 text-[#c9a84c] shrink-0 stroke-[2.5]" />
                  )}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

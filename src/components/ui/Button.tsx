import React from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface ButtonProps extends Omit<HTMLMotionProps<"button">, "ref"> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "gold";
  size?: "sm" | "md" | "lg";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    const variants = {
      primary: "bg-gradient-to-r from-[#1a3d2f] to-[#2e5a44] text-white font-bold shadow-md hover:shadow-[0_8px_25px_rgba(26,61,47,0.45)] hover:-translate-y-0.5 rounded-full transition-all duration-300",
      secondary: "bg-[#1a3d2f] text-white hover:bg-[#255240] font-bold shadow-md rounded-full transition-all duration-300",
      outline: "bg-gradient-to-r from-[#1a3d2f] to-[#2e5a44] text-white font-bold shadow-md hover:shadow-[0_8px_25px_rgba(26,61,47,0.45)] hover:-translate-y-0.5 rounded-full transition-all duration-300",
      ghost: "text-[#1a3d2f] hover:bg-emerald-50 font-bold",
      gold:
        "bg-gradient-to-r from-[#1a3d2f] to-[#2e5a44] text-white font-bold shadow-md hover:shadow-[0_8px_25px_rgba(26,61,47,0.45)] hover:-translate-y-0.5 rounded-full transition-all duration-300 disabled:border-gray-300 disabled:!bg-neutral-300 disabled:!bg-none disabled:!text-neutral-900",
    };

    const sizes = {
      sm: "px-4 py-2 text-sm",
      md: "px-6 py-3 text-base font-medium",
      lg: "px-8 py-4 text-lg font-semibold",
    };

    return (
      <motion.button
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.3, ease: "easeInOut", type: "spring", stiffness: 400, damping: 60 }}
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-none transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:pointer-events-none tracking-widest uppercase",
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

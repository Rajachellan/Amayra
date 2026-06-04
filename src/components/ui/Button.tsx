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
      primary: "bg-brand-emerald text-white hover:bg-emerald-900",
      secondary: "bg-white text-brand-emerald hover:bg-gray-100",
      outline: "border border-brand-gold text-brand-gold hover:bg-black/75 hover:text-white rounded-sm ",
      ghost: "text-brand-emerald hover:bg-emerald-50",
      gold:
        "gold-gradient text-white shadow-md rounded-sm hover:brightness-110 hover:shadow-lg active:brightness-95 disabled:border-gray-300 disabled:!bg-neutral-300 disabled:!bg-none disabled:!text-neutral-900",
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

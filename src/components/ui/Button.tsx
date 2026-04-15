import React from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "gold";
  size?: "sm" | "md" | "lg";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    const variants = {
      primary: "bg-brand-emerald text-white hover:bg-emerald-900",
      secondary: "bg-white text-brand-emerald hover:bg-gray-100",
      outline: "border-2 border-brand-gold text-brand-gold hover:bg-brand-gold hover:text-white",
      ghost: "text-brand-emerald hover:bg-emerald-50",
      gold: "gold-gradient text-white hover:opacity-90 shadow-md",
    };

    const sizes = {
      sm: "px-4 py-2 text-sm",
      md: "px-6 py-3 text-base font-medium",
      lg: "px-8 py-4 text-lg font-semibold",
    };

    return (
      <button
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

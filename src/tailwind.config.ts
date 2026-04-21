import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "sans-serif"],
      },
      keyframes: {
        // Scrolling ticker
        ticker: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        // Badge floating up/down
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        // Sparkle blink
        sparkle: {
          "0%, 100%": { opacity: "0", transform: "scale(0)" },
          "50%": { opacity: "1", transform: "scale(1)" },
        },
        // Scan line sweep
        scan: {
          "0%": { top: "0%", opacity: "0" },
          "10%": { opacity: "1" },
          "90%": { opacity: "1" },
          "100%": { top: "100%", opacity: "0" },
        },
        // Corner bracket shimmer
        shimmerBorder: {
          "0%, 100%": { opacity: "0.2" },
          "50%": { opacity: "0.8" },
        },
        // Pulse ring on live dot
        pulseRing: {
          "0%": { boxShadow: "0 0 0 0 rgba(212,175,55,0.5)" },
          "70%": { boxShadow: "0 0 0 8px rgba(212,175,55,0)" },
          "100%": { boxShadow: "0 0 0 0 rgba(212,175,55,0)" },
        },
        // Fade up entrance
        fadeUp: {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        // Fade from left
        fadeRight: {
          from: { opacity: "0", transform: "translateX(-20px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        // Fade from right
        fadeLeft: {
          from: { opacity: "0", transform: "translateX(20px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        // Slow spin for decorative ring
        spinSlow: {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
      },
      animation: {
        ticker: "ticker 20s linear infinite",
        float: "float 3s ease-in-out infinite",
        sparkle: "sparkle 2.2s ease-in-out infinite",
        scan: "scan 4s ease-in-out infinite",
        "shimmer-border": "shimmerBorder 2.5s ease-in-out infinite",
        "pulse-ring": "pulseRing 1.8s ease-in-out infinite",
        "fade-up": "fadeUp 0.6s ease both",
        "fade-right": "fadeRight 0.7s ease both",
        "fade-left": "fadeLeft 0.7s ease both",
        "spin-slow": "spinSlow 7s linear infinite",
      },
    },
  },

  // tailwind.config.js
plugins: [require('tailwind-scrollbar-hide')]
};

export default config;
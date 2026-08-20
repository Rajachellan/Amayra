"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Plus } from "lucide-react";
import { BotanicalDecoration } from "@/components/ui/BotanicalDecoration";
import silver1 from "../../assets/silver_collection (1).jpg";
import silver2 from "../../assets/silver_collection (2).jpg";
import silver from "../../assets/silver.jpg";

const stylingTips = [
  {
    id: 1,
    title: "Perfect Layering",
    description:
      "Combine a 16-inch choker with a 22-inch pendant for a layered look that adds depth to any neckline.",
    image: silver2,
  },
  {
    id: 2,
    title: "Emerald & gold color",
    description:
      "Pair high-carat gold color with deep emeralds. The contrast highlights the natural brilliance of the gemstone.",
    image: silver1,
  },
  {
    id: 3,
    title: "Statement Studs",
    description:
      "Keep your necklace simple when wearing chandelier earrings to let your face remain the centerpiece.",
    image: silver,
  },
];

export const StylingGuide = () => {
  return (
    <section
      className="relative overflow-hidden min-h-screen flex items-center"
      style={{ backgroundColor: 'var(--bg-sage-light)' }}
    >
      <BotanicalDecoration className="text-emerald-900" opacity={0.03} />
      {/* Ambient radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(196,160,100,0.1) 0%, transparent 60%)",
        }}
      />

      <div className="relative container mx-auto px-6 py-8">
        {/* Section Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-10 h-px" style={{ background: "rgba(196,160,100,0.7)" }} />
            <span
              className="font-sans font-bold tracking-[0.45em] uppercase text-[10px]"
              style={{ color: "#C4A064" }}
            >
              Aspirational Styling
            </span>
            <div className="w-10 h-px" style={{ background: "rgba(196,160,100,0.7)" }} />
          </div>

          <h2
            className="font-serif text-3xl md:text-4xl mb-4 leading-tight"
            style={{ color: "#1C1510" }}
          >
            The Art of{" "}
            <span className="italic" style={{ color: "#C4A064" }}>
              Adornment
            </span>
          </h2>

          <p
            className="font-sans text-xs tracking-wider leading-relaxed max-w-lg mx-auto"
            style={{ color: "rgba(28,21,16,0.55)" }}
          >
            Curated tips from our lead designers on how to wear your MaiRii
            pieces with effortless elegance.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {stylingTips.map((tip, idx) => (
            <motion.div
              key={tip.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.18, duration: 0.7 }}
              className="group"
            >
              {/* Image container */}
              <div className="relative w-full aspect-[4/3] max-h-[50vh] mb-4 overflow-hidden rounded-xl">
                <Image
                  src={tip.image}
                  alt={tip.title}
                  fill
                  className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
                />
                {/* Dark overlay that lifts on hover */}
                <div
                  className="absolute inset-0 transition-opacity duration-700"
                  style={{ background: "rgba(28,21,16,0.25)" }}
                />
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                  style={{ background: "rgba(28,21,16,0.1)" }}
                />

                {/* Hover plus icon */}
                <div
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 scale-75 group-hover:scale-100"
                  style={{
                    background: "rgba(196,160,100,0.85)",
                    boxShadow: "0 0 30px rgba(196,160,100,0.5)",
                  }}
                >
                  <Plus className="w-5 h-5 text-white" />
                </div>

                {/* Corner gold color accents */}
                <div
                  className="absolute top-3 left-3 w-6 h-6 transition-opacity duration-500 opacity-0 group-hover:opacity-100"
                  style={{
                    borderTop: "1.5px solid rgba(196,160,100,0.8)",
                    borderLeft: "1.5px solid rgba(196,160,100,0.8)",
                  }}
                />
                <div
                  className="absolute bottom-3 right-3 w-6 h-6 transition-opacity duration-500 opacity-0 group-hover:opacity-100"
                  style={{
                    borderBottom: "1.5px solid rgba(196,160,100,0.8)",
                    borderRight: "1.5px solid rgba(196,160,100,0.8)",
                  }}
                />
              </div>

              {/* Text */}
              <h4
                className="font-serif text-xl mb-3 tracking-wide transition-colors duration-300"
                style={{ color: "#1C1510" }}
              >
                {tip.title}
              </h4>
              <div className="w-6 h-px mb-3 transition-all duration-500 group-hover:w-10" style={{ background: "#C4A064" }} />
              <p
                className="font-sans text-xs tracking-wider leading-[1.9]"
                style={{ color: "rgba(28,21,16,0.55)" }}
              >
                {tip.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

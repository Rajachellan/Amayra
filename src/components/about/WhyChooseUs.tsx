"use client";

import React from "react";
import { motion } from "framer-motion";
import { Heart, RefreshCcw, ScrollText, Users } from "lucide-react";

const features = [
  {
    icon: <Users className="w-5 h-5" strokeWidth={1.25} />,
    title: "VIRTUAL CONCIERGE",
    desc: "Experience personal consulting with our master designers from the comfort of your home.",
  },
  {
    icon: <RefreshCcw className="w-5 h-5" strokeWidth={1.25} />,
    title: "LIFETIME MAINTENANCE",
    desc: "Complimentary polishing and stone checking for all Gems of Shree Aarna pieces.",
  },
  {
    icon: <ScrollText className="w-5 h-5" strokeWidth={1.25} />,
    title: "AUTHENTICITY GUILD",
    desc: "Every purchase is accompanied by a blockchain-verified digital certificate of origin.",
  },
  {
    icon: <Heart className="w-5 h-5" strokeWidth={1.25} />,
    title: "CUSTOM ATELIER",
    desc: "Co-create your dream piece with our craftsmen. Your vision, our hands.",
  },
];

export const WhyChooseUs = () => {
  return (
    <section
      className="relative overflow-hidden min-h-screen flex items-center"
      
    >
      {/* Decorative background circle */}
      <div
        className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(196,160,100,0.08) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute -bottom-32 -left-32 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(196,160,100,0.06) 0%, transparent 70%)",
        }}
      />

      <div className="relative container mx-auto px-6 py-10">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
          {/* Left — heading column */}
          <div className="lg:w-[38%]">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px" style={{ background: "rgba(196,160,100,0.7)" }} />
              <span
                className="text-[10px] uppercase tracking-[0.45em] font-bold"
                style={{ color: "#C4A064" }}
              >
                The Advantage
              </span>
            </div>

            <h2
              className="font-serif text-3xl md:text-4xl mb-5 leading-snug"
              style={{ color: "#1C1510" }}
            >
              Why Shree{" "}
              <span className="italic" style={{ color: "#C4A064" }}>
                Aarna?
              </span>
            </h2>

            <div
              className="w-10 h-px mb-6"
              style={{ background: "rgba(196,160,100,0.5)" }}
            />

            <p
              className="text-xs font-light leading-[1.8] tracking-wide"
              style={{ color: "rgba(28,21,16,0.65)" }}
            >
              Beyond the gold and gemstones, we provide a service that is as enduring as our
              jewellery. We are committed to a lifetime of luxury for every client.
            </p>

            {/* Stat strip */}
            <div className="mt-8 flex gap-8">
              <div>
                <div
                  className="font-serif text-2xl mb-1"
                  style={{ color: "#C4A064" }}
                >
                  35+
                </div>
                <div
                  className="text-[8px] uppercase tracking-[0.2em]"
                  style={{ color: "rgba(28,21,16,0.45)" }}
                >
                  Years of Legacy
                </div>
              </div>
              <div>
                <div
                  className="font-serif text-2xl mb-1"
                  style={{ color: "#C4A064" }}
                >
                  12K+
                </div>
                <div
                  className="text-[8px] uppercase tracking-[0.2em]"
                  style={{ color: "rgba(28,21,16,0.45)" }}
                >
                  Happy Clients
                </div>
              </div>
            </div>
          </div>

          {/* Right — cards grid */}
          <div className="lg:w-[62%] grid grid-cols-1 sm:grid-cols-2 gap-4">
            {features.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.7 }}
                className="group relative p-6 transition-all duration-500 hover:-translate-y-1"
                style={{
                  background: "rgba(255,255,255,0.7)",
                  border: "1px solid rgba(196,160,100,0.2)",
                  boxShadow: "0 4px 20px -8px rgba(28,21,16,0.06)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.border =
                    "1px solid rgba(196,160,100,0.55)";
                  (e.currentTarget as HTMLElement).style.boxShadow =
                    "0 16px 40px -12px rgba(196,160,100,0.18)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.border =
                    "1px solid rgba(196,160,100,0.2)";
                  (e.currentTarget as HTMLElement).style.boxShadow =
                    "0 4px 24px -8px rgba(28,21,16,0.06)";
                }}
              >
                {/* Icon */}
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center mb-6 transition-colors duration-500"
                  style={{
                    background: "rgba(196,160,100,0.12)",
                    color: "#C4A064",
                  }}
                >
                  {item.icon}
                </div>

                <h4
                  className="text-[10px] uppercase tracking-[0.35em] font-semibold mb-3"
                  style={{ color: "#1C1510" }}
                >
                  {item.title}
                </h4>
                <p
                  className="text-xs font-light leading-[1.85]"
                  style={{ color: "rgba(28,21,16,0.55)" }}
                >
                  {item.desc}
                </p>

                {/* Bottom gold line on hover */}
                <div
                  className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-500"
                  style={{ background: "linear-gradient(90deg, #C4A064, rgba(196,160,100,0.3))" }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

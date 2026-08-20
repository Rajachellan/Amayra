"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { BotanicalDecoration } from "@/components/ui/BotanicalDecoration";

export const CollectionStory = () => {
  return (
    <section
      className="relative overflow-hidden  flex items-center"
      style={{ backgroundColor: 'var(--bg-mint-soft)' }}
    >
      <BotanicalDecoration className="text-emerald-900" opacity={0.03} />
      {/* Ambient gold glow */}
      <div
        className="absolute top-0 right-0 w-[600px] h-[600px] pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 80% 20%, rgba(196,160,100,0.08) 0%, transparent 70%)",
        }}
      />

      <div className="relative container mx-auto px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 lg:items-center gap-16 md:gap-10">
          {/* Image Column */}
          <div className="order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="relative aspect-[4/6] md:aspect-[4/5] lg:aspect-[4/6] max-h-[70vh] mx-auto"
            >
              {/* Gold border offset frame */}
              <div
                className="absolute inset-0 translate-x-5 translate-y-5 -z-10"
                style={{ border: "1px solid rgba(196,160,100,0.25)" }}
              />
              <Image
                src="/images/optimized/about-us-daughterandchild.png"
                alt="Our Heritage"
                fill
                loading="lazy"
                quality={75}
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                style={{ boxShadow: "0 30px 60px -15px rgba(196,160,100,0.15)" }}
              />
              {/* Corner accents */}
              <div
                className="absolute bottom-0 left-0 w-12 h-12"
                style={{
                  borderBottom: "1.5px solid rgba(196,160,100,0.4)",
                  borderLeft: "1.5px solid rgba(196,160,100,0.4)",
                }}
              />
              <div
                className="absolute top-0 right-0 w-12 h-12"
                style={{
                  borderTop: "1.5px solid rgba(196,160,100,0.4)",
                  borderRight: "1.5px solid rgba(196,160,100,0.4)",
                }}
              />
            </motion.div>
          </div>

          {/* Text Column */}
          <div className="order-1 lg:order-2">
           <motion.div
  initial={{ opacity: 0, x: 50 }}
  whileInView={{ opacity: 1, x: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.8 }}
>
  <h2
    className="font-serif text-4xl md:text-5xl lg:text-[3.5rem] mb-8 leading-tight"
    style={{ color: "#4A3F35" }}
  >
    A Legacy of 
    <span className="italic ml-3" style={{ color: "#C4A064" }}>
      Love
    </span>
  </h2>

  <div
    className="w-12 h-px mb-8"
    style={{ background: "rgba(196,160,100,0.3)" }}
  />

  <div
    className="space-y-6 font-sans text-sm leading-[1.9] tracking-wide"
    style={{ color: "#6B5E51" }}
  >
    <p>
      More precious than the inheritance of gold are the virtues you
      inherited from the women who shaped who you are.
    </p>

    {/* Her Qualities */}
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
      {[
        "She gave you her courage.",
        "Her Kindness",
        "Her Resilience",
        "Her Way of Loving",
      ].map((item) => (
        <div
          key={item}
          className="flex items-center gap-3 py-3 px-4 border border-[#C4A064]/15 rounded-lg bg-white/40 transition-all duration-300 hover:border-[#C4A064]/40 hover:bg-white/70"
        >
          <span
            className="w-1.5 h-1.5 rounded-full shrink-0"
            style={{ backgroundColor: "#C4A064" }}
          />

          <span
            className="font-serif text-base italic"
            style={{ color: "#4A3F35" }}
          >
            {item}
          </span>
        </div>
      ))}
    </div>

    <p className="pt-2">
      Without ever asking for anything in return.
    </p>

    <p>
      <span
        className="font-serif text-xl italic"
        style={{ color: "#C4A064" }}
      >
        Mairii
      </span>{" "}
      is a celebration of her.
    </p>

    <p>
      Every piece is inspired by the women whose stories live quietly
      within us, and designed for the woman we are still becoming.
    </p>
  </div>
</motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowDown } from "lucide-react";

export const AboutHero = () => {
  return (
    <section className="relative h-[85vh] min-h-screen pt-24 flex items-center justify-center overflow-hidden bg-stone-950">
      {/* Background Hero Image */}
      <motion.div
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute inset-0"
      >
        <Image
          src="/images/optimized/banner-image.png"
          alt="MaiRii Heritage Jewellery"
          fill
          priority
          className="object-cover object-[center_35%] brightness-90"
        />
        
      </motion.div>

    

      {/* Floating Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50"
      >
        <span className="text-[9px] uppercase tracking-[0.4em] font-medium">Scroll</span>
        <ArrowDown className="w-4 h-4 animate-bounce text-amber-300" />
      </motion.div>
    </section>
  );
};

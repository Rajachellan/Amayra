import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export const AboutHero = () => {
  return (
    <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Hero Image */}
      <motion.div
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute inset-0"
      >
        <Image
          src="/images/woman-wears-gold-sari-with-green-gold-jewelry.jpg"
          alt="Luxury Heritage Jewellery"
          fill
          priority
          className="object-cover object-[center_30%]"
        />
        {/* Soft Overlay - SHARPENED */}
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-transparent to-transparent opacity-40" />
      </motion.div>

      {/* Content */}
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <span className="text-[12px] uppercase tracking-[0.4em] text-champagne font-bold mb-6 block">
              {"EST. 1990 — A Legacy of Lustre"}
            </span>
            <h1 className="text-5xl md:text-7xl font-serif leading-tight mb-8 text-foreground">
              Crafting <br />
              <span className="italic">Timeless Elegance</span>
            </h1>
            <p className="text-lg md:text-xl font-light text-[#3D3934] leading-relaxed mb-12 text-editorial">
              For over three decades, mairii has been the custodian of heritage,
              weaving stories of gold and precious stones into masterpieces that transcend time.
            </p>
            <div className="flex flex-wrap gap-6">
              <button className="btn-luxury">
                Explore Collections
              </button>
              <div className="flex items-center gap-4 text-champagne group cursor-pointer">
                <div className="w-12 h-[1px] bg-champagne transition-all group-hover:w-20" />
                <span className="text-[10px] uppercase tracking-widest font-medium">Watch Our Story</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
      >
        <span className="text-[9px] uppercase tracking-[0.5em] text-foreground/30 rotate-90 origin-left ml-2">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-champagne to-transparent" />
      </motion.div>
    </section>
  );
};

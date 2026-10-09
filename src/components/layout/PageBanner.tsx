"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

interface PageBannerProps {
  title?: string;
  subtitle?: string;
  image: string;
  height?: string;
  showText?: boolean;
}

export const PageBanner: React.FC<PageBannerProps> = ({ 
  title, 
  subtitle, 
  image, 
  height = "h-[65vh]",
  showText = true,
}) => {
  const hasContent = showText && (Boolean(title) || Boolean(subtitle));

  return (
    <section className={`relative ${height} flex items-center justify-center overflow-hidden`}>
      <motion.div 
        initial={{ scale: 1.05 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute inset-0"
      >
        <Image
          src={image}
          alt={title || "Page Banner"}
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        {hasContent ? (
          <div className="absolute inset-0 bg-black/40" />
        ) : (
          <div className="absolute inset-0 bg-black/10" />
        )}
      </motion.div>

      {hasContent && (
        <div className="relative z-10 text-center px-6">
          {subtitle && (
            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-[10px] uppercase tracking-[0.5em] text-white/80 font-bold mb-4 block"
            >
              {subtitle}
            </motion.span>
          )}
          {title && (
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl font-serif text-white tracking-tight"
            >
              {title}
            </motion.h1>
          )}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="h-px w-20 bg-champagne/60 mx-auto mt-6"
          />
        </div>
      )}
    </section>
  );
};

"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import clientImg from "../../assets/midsection-smiling-young-bride-home.jpg"

export const ClientStories = () => {
  return (
    <section className="py-24 bg-blush/30 relative">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2 }}
              className="relative aspect-[4/5] rounded-[40px] overflow-hidden"
            >
              <Image
                src={clientImg}
                alt="Client Story"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blush/20 via-transparent to-transparent" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="space-y-10"
            >
              <div className="space-y-4">
                <span className="text-champagne uppercase tracking-[0.5em] text-[10px] font-bold block">
                  Client Memoirs
                </span>
                <h2 className="text-foreground text-3xl md:text-5xl font-serif italic font-light leading-tight">
                  &quot;The moment I saw my bridal sets, I knew they were designed for my soul.&quot;
                </h2>
              </div>

              <div className="space-y-4">
                <p className="text-foreground/50 text-sm font-light leading-relaxed">
                  Choosing Shree Aarna wasn&apos;t just a purchase; it was a journey into my own heritage. The team didn&apos;t just show me jewelry; they showed me a reflection of my family&apos;s history. Every diamond feels like a legacy in the making.
                </p>
                <div className="flex flex-col">
                  <span className="text-foreground text-[11px] uppercase tracking-[0.2em] font-bold">Ananya Verma</span>
                  <span className="text-champagne text-[10px] uppercase tracking-[0.1em] font-medium">Shree Aarna Bride, 2026</span>
                </div>
              </div>

              <div className="pt-6">
                <button className="text-[10px] uppercase tracking-[0.4em] font-bold text-foreground border-b border-foreground/20 pb-1 hover:border-champagne transition-colors">
                  Read Luxury Memoirs
                </button>
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
};

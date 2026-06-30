"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export const CollectionStory = () => {
  return (
    <section
      className="relative overflow-hidden min-h-screen flex items-center"
      style={{ background: "linear-gradient(135deg, #FFFDF8 0%, #F9F4E8 50%, #FFFDF8 100%)" }}
    >
      {/* Ambient gold glow */}
      <div
        className="absolute top-0 right-0 w-[600px] h-[600px] pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 80% 20%, rgba(196,160,100,0.08) 0%, transparent 70%)",
        }}
      />

      <div className="relative container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 lg:items-center gap-16 md:gap-20">
          {/* Image Column */}
          <div className="order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="relative aspect-[4/5] md:aspect-square lg:aspect-[4/5] max-h-[65vh] mx-auto"
            >
              {/* Gold border offset frame */}
              <div
                className="absolute inset-0 translate-x-5 translate-y-5 -z-10"
                style={{ border: "1px solid rgba(196,160,100,0.25)" }}
              />
              <Image
                src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=2070&auto=format&fit=crop"
                alt="Our Heritage"
                fill
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
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-px" style={{ background: "#C4A064" }} />
                <span
                  className="font-sans font-bold tracking-[0.45em] uppercase text-[10px]"
                  style={{ color: "#C4A064" }}
                >
                  Our Craftsmanship
                </span>
              </div>

              <h2
                className="font-serif text-4xl md:text-5xl lg:text-[3.5rem] mb-8 leading-tight"
                style={{ color: "#4A3F35" }}
              >
                A Legacy of <br />
                <span className="italic" style={{ color: "#C4A064" }}>
                  Brilliance
                </span>
              </h2>

              <div className="w-12 h-px mb-8" style={{ background: "rgba(196,160,100,0.3)" }} />

              <div
                className="space-y-5 font-sans text-sm leading-[1.9] tracking-wide"
                style={{ color: "#6B5E51" }}
              >
                <p>
                  At  Mairii, we believe every piece of jewellery is a vessel of
                  memories. For over three decades, our master craftsmen have dedicated their
                  lives to the art of working with precious stones and pure gold.
                </p>
                <p>
                  From the deep emerald mines to the artisanal workshops where gold is hammered
                  into delicate filigree, our process remains rooted in tradition while embracing
                  contemporary elegance.
                </p>
              </div>

              <div
                className="mt-10 pt-8"
                style={{ borderTop: "1px solid rgba(196,160,100,0.15)" }}
              >
                <div className="font-serif text-3xl italic mb-1" style={{ color: "#C4A064" }}>
                  Bandana
                </div>
                <div
                  className="text-[13px] tracking-[0.3em] font-bold uppercase"
                  style={{ color: "rgba(74,63,53,0.5)" }}
                >
                  Founder
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

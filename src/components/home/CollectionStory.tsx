"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export const CollectionStory = () => {
  return (
    <section className="py-32 bg-brand-emerald text-white overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 lg:items-center gap-16 md:gap-24">
          <div className="order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="relative aspect-[4/5] md:aspect-square"
            >
              <div className="absolute inset-0 border border-brand-gold/30 translate-x-6 translate-y-6 -z-10" />
              <Image
                src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=2070&auto=format&fit=crop"
                alt="Our Heritage"
                fill
                className="object-cover shadow-2xl"
              />
            </motion.div>
          </div>

          <div className="order-1 lg:order-2">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h3 className="text-brand-gold font-sans font-bold tracking-[0.4em] uppercase text-xs mb-6">
                Our Craftsmanship
              </h3>
              <h2 className="text-white font-serif text-4xl md:text-5xl lg:text-6xl mb-10 leading-tight">
                A Legacy of <br /> Brilliance
              </h2>

              <div className="space-y-8 text-gray-300 font-sans tracking-widest leading-relaxed">
                <p>
                  At Gems of Shree Aarna, we believe every piece of jewellery is a vessel of memories. For over three decades, our master craftsmen have dedicated their lives to the art of working with precious stones and pure gold.
                </p>
                <p>
                  From the deep emerald mines to the artisanal workshops where gold is hammered into delicate filigree, our process remains rooted in tradition while embracing contemporary elegance.
                </p>
                <div className="pt-6">
                  <div className="text-brand-gold font-serif text-3xl mb-2 italic">Anjana Sharma</div>
                  <div className="text-[10px] tracking-[0.2em] font-bold uppercase">Founder & Creative Director</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

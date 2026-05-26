"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export const BrandStory = () => {
  return (
    <section className="section-padding bg-pearl/30">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* Image Side */}
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="relative z-10"
            >
              <div className="relative aspect-[4/5] w-full">
                <Image
                  src="/images/pexels-dandu-16612609.jpg"
                  alt="Our Heritage"
                  fill
                  className="object-cover rounded-sm shadow-2xl"
                />
              </div>
              {/* Gold Accent Frame */}
              <div className="absolute -top-6 -left-6 w-full h-full border border-champagne/30 -z-10" />
            </motion.div>

            {/* Decals */}
            <div className="absolute -bottom-10 -right-10 w-40 h-40 border-r border-b border-champagne/20 pointer-events-none" />
          </div>

          {/* Text Side */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-[10px] uppercase tracking-[0.5em] text-champagne mb-4 block">Origin & Vision</span>
              <h2 className="text-4xl font-serif mb-8 leading-relaxed">
                A Journey Through <br />
                <span className="italic">Generations of Craft</span>
              </h2>

              <div className="space-y-6 text-foreground/70 font-light leading-loose text-editorial">
                <p>
                  Founded in the heart of heritage, Amayra began as a modest atelier
                  at a time when jewellery was not just an accessory, but a sacred heirloom.
                  Our founder, inspired by the intricate temple architecture and the celestial
                  grace of traditional Indian art, envisioned a brand that would preserve the
                  dying arts of handcrafted jewellery.
                </p>
                <p>
                  Today, we occupy a unique space where ancient techniques meet contemporary
                  sensibilities. Every piece we create is a bridge between the regal past and
                  the sophisticated present.
                </p>
              </div>

              {/* Founder Quote */}
              <div className="mt-12 p-8 border-l border-champagne bg-champagne/5">
                <p className="font-serif italic text-lg text-foreground/80 mb-4">
                  {"“Jewellery is the silent poet of a woman's soul. We don't just set stones; we set memories into gold.”"}
                </p>
                <p className="text-[10px] uppercase tracking-widest text-champagne font-semibold">{"— Amayra, Founder"}</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

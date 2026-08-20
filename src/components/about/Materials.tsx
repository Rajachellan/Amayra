"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Baby,
  Gem,
  Crown,
  Gift,
} from "lucide-react";

const stories = [
  {
    icon: Baby,
    title: "The Little Girl",
    desc: "The little girl who wore her mother's bangles.",
  },
  {
    icon: Gem,
    title: "The Daughter",
    desc: "The daughter who borrowed her mother's earrings.",
  },
  {
    icon: Crown,
    title: "The Bride",
    desc: "The bride wearing her grandmother's blessings.",
  },
  {
    icon: Gift,
    title: "The Mother",
    desc: "The mother gifting her daughter her first meaningful piece.",
  },
];

export const Materials = () => {
  return (
    <section className="bg-[#FAF8F3] py-16 md:py-20 border-y border-[#C4A064]/10">
      <div className="container mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] gap-10 lg:gap-16 items-center">

          {/* Left Editorial Content */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
           

            <h2 className="font-serif text-4xl md:text-5xl lg:text-[3.2rem] leading-[1.08] text-[#4A3F35]">
             Purity beyond 
              <br />
              <span className="italic text-[#C4A064]">
                expectations
              </span>
            </h2>

            <div className="w-10 h-px bg-[#C4A064]/40 my-6" />

            <div className="space-y-4 text-[16px] font-light leading-[1.8] text-[#6B5E51] max-w-md">
              <p>
                This isn't nostalgia.This isn't nostalgia. It's continuity.
              </p>

              <p>
                We inherit stories. And somewhere along the way, we become
                the woman another little girl will admire.
              </p>
            </div>

            <div className="mt-7 pl-5 border-l border-[#C4A064]">
              <p className="font-serif text-lg md:text-xl italic leading-relaxed text-[#4A3F35]">
                Mairii celebrates the invisible inheritance every woman carries.
              </p>
            </div>
          </motion.div>

          {/* Right Stories */}
          <div className="grid grid-cols-1 sm:grid-cols-2 border-t border-l border-[#C4A064]/15">
            {stories.map((story, idx) => {
              const Icon = story.icon;

              return (
                <motion.div
                  key={story.title}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    delay: idx * 0.08,
                  }}
                  className="group min-h-[180px] p-6 border-r border-b border-[#C4A064]/15 bg-white/30 hover:bg-white/70 transition-all duration-300"
                >
                  <div className="flex items-start justify-between mb-5">
                    <div className="text-[#C4A064]">
                      <Icon
                        strokeWidth={1.2}
                        className="w-7 h-7 group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    <span className="text-[15px] tracking-[0.2em] text-[#C4A064]/60">
                      0{idx + 1}
                    </span>
                  </div>

                  <h3 className="font-serif text-xl italic text-[#4A3F35] mb-2">
                    {story.title}
                  </h3>

                  <p className="text-[14px] font-light leading-[1.7] text-[#6B5E51] max-w-[220px]">
                    {story.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
};
"use client";

import React from "react";
import { motion } from "framer-motion";
import { GraduationCap, Briefcase, Wrench, Coins, HeartHandshake, Sparkles } from "lucide-react";

const impactPillars = [
  {
    icon: GraduationCap,
    title: "Women's Education",
    description: "Sponsoring scholarships, educational materials, and learning centers for girls and young women."
  },
  {
    icon: Briefcase,
    title: "Entrepreneurship",
    description: "Providing micro-grants and mentorship to nurture women-led businesses and local female artisans."
  },
  {
    icon: Wrench,
    title: "Skill Development",
    description: "Offering hands-on vocational training in craftsmanship, design, and digital literacy skills."
  },
  {
    icon: Coins,
    title: "Financial Well-Being",
    description: "Enabling economic independence through financial literacy workshops and fair-wage livelihoods."
  }
];

export const OurVision = () => {
  return (
    <section className="relative py-10 md:py-10 bg-gradient-to-b from-[#FAF8F3] via-white to-[#F9F5EC] overflow-hidden">
      {/* Subtle Background Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-[#C4A064]/30 to-transparent pointer-events-none" />
      <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-[#C4A064]/5 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-[#3D3934]/5 blur-3xl pointer-events-none" />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        {/* Header Tag */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#C4A064]/10 border border-[#C4A064]/20 text-[10px] uppercase tracking-[0.4em] font-bold text-[#A37F43] mb-6">
              <Sparkles className="w-3 h-3 text-[#C4A064]" />
              Our Vision & Social Impact
            </span>
            <h2 className="text-4xl md:text-6xl font-serif text-[#2B2B2B] leading-tight mb-6">
              Empowering Women <br />
              <span className="italic font-light text-[#C4A064]">To Shine In Every Stage</span>
            </h2>
            <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#C4A064] to-transparent mx-auto mb-8" />
            <p className="text-lg text-[#555555] font-light leading-relaxed font-serif">
              Every woman carries a story — of strength quietly worn, dreams quietly set aside, and resilience that often goes unnoticed by the world, and sometimes even by herself.
            </p>
          </motion.div>
        </div>

        {/* Founder Quote Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="mb-20 p-8 md:p-14 rounded-2xl bg-white border border-[#C4A064]/20 shadow-xl shadow-[#C4A064]/5 relative overflow-hidden group"
        >
          {/* Subtle Corner Accents */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#C4A064]/10 to-transparent rounded-bl-full pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-[#C4A064]/10 to-transparent rounded-tr-full pointer-events-none" />

          <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6">
            <div className="w-12 h-12 rounded-full bg-[#C4A064]/10 flex items-center justify-center mx-auto text-[#C4A064]">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <p className="text-2xl md:text-3xl font-serif italic text-[#2B2B2B] leading-relaxed">
              &ldquo;MaiRii is not just a jewellery brand. It is my way of telling every woman who wears it: &lsquo;You deserve to shine, exactly as you are, at every age and every stage of your life.&rsquo;&rdquo;
            </p>
            <div className="pt-2">
              <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#C4A064]">
                — Bandana, Founder of MaiRii
              </span>
            </div>
          </div>
        </motion.div>

        {/* 10% Profit Pledge Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.0 }}
          className="p-10 md:p-16 rounded-2xl bg-gradient-to-r from-[#2C2A28] via-[#3B3732] to-[#2C2A28] text-white shadow-2xl relative overflow-hidden mb-16"
        >
          {/* Decorative Gold Line */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#C4A064] via-amber-300 to-[#C4A064]" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-4 text-center lg:text-left space-y-4">
              <div className="inline-block px-5 py-2 rounded-full bg-[#C4A064]/20 border border-[#C4A064]/40">
                <span className="text-3xl md:text-5xl font-serif font-bold text-amber-300">10%</span>
                <span className="text-xs uppercase tracking-widest font-semibold text-stone-200 ml-3">Profit Commitment</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-serif text-white font-light">
                Committed To <span className="italic text-amber-300">Her Future</span>
              </h3>
            </div>

            <div className="lg:col-span-8 space-y-4 border-t lg:border-t-0 lg:border-l border-white/10 pt-6 lg:pt-0 lg:pl-10">
              <p className="text-base md:text-lg font-light leading-relaxed text-stone-300 font-serif">
                Through MaiRii, we create accessible jewellery and meaningful opportunities for women to earn, grow, and feel valued. We commit at least 10% of our profits towards initiatives that support women&apos;s education, entrepreneurship, skill development, and financial well-being.
              </p>
              <p className="text-xs uppercase tracking-[0.2em] font-medium text-amber-300/80">
                Every purchase directly contributes to empowering women across communities.
              </p>
            </div>
          </div>
        </motion.div>

        {/* 4 Impact Pillars Grid */}
        {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {impactPillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: idx * 0.15 }}
                className="p-8 rounded-xl bg-white border border-[#C4A064]/15 hover:border-[#C4A064]/50 shadow-sm hover:shadow-xl hover:shadow-[#C4A064]/10 transition-all duration-500 group"
              >
                <div className="w-14 h-14 rounded-full bg-[#FAF8F3] group-hover:bg-[#C4A064] text-[#C4A064] group-hover:text-white flex items-center justify-center mb-6 transition-all duration-500 shadow-inner">
                  <Icon className="w-6 h-6 transition-transform duration-500 group-hover:scale-110" />
                </div>
                <h4 className="text-lg font-serif text-[#2B2B2B] mb-3 group-hover:text-[#A37F43] transition-colors">
                  {pillar.title}
                </h4>
                <p className="text-xs text-[#666666] font-light leading-relaxed">
                  {pillar.description}
                </p>
              </motion.div>
            );
          })}
        </div> */}
      </div>
    </section>
  );
};

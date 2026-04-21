"use client";

import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Award, Zap, Diamond } from "lucide-react";

const certifications = [
  {
    icon: <ShieldCheck className="w-8 h-8 font-extralight" />,
    title: "BIS Hallmark",
    desc: "Government certified 22kt and 18kt gold purity with unique HUID."
  },
  {
    icon: <Award className="w-8 h-8 font-extralight" />,
    title: "IGI / GIA Certified",
    desc: "World-class grading for diamond clarity, color, and cut."
  },
  {
    icon: <Diamond className="w-8 h-8 font-extralight" />,
    title: "Ethical Sourcing",
    desc: "Every stone is conflict-free and sourced from responsible mines."
  },
  {
    icon: <Zap className="w-8 h-8 font-extralight" />,
    title: "Lifetime Warranty",
    desc: "Full transparency on buyback and exchange policies."
  }
];

export const Materials = () => {
  return (
    <section className="section-padding bg-sage/30">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-serif mb-8">Purity Beyond <br /><span className="italic">Expectations</span></h2>
            <p className="text-foreground/60 font-light leading-loose text-editorial mb-10">
              We believe that luxury should be transparent. Our commitment to quality 
              extends beyond the aesthetics to the molecular level of our metals 
              and the crystalline perfection of our stones.
            </p>
            <div className="flex gap-4">
               {/* Minimalist Trust Badges */}
               <div className="px-6 py-4 border border-champagne/30 rounded-sm bg-white/50 text-[10px] uppercase tracking-widest flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-emerald" />
                  Hallmarked Gold
               </div>
               <div className="px-6 py-4 border border-champagne/30 rounded-sm bg-white/50 text-[10px] uppercase tracking-widest flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-emerald" />
                  Lab Certified
               </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {certifications.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="p-8 bg-pearl/50 border border-white/50 hover:border-champagne/30 transition-colors group"
              >
                <div className="text-champagne mb-6 group-hover:scale-110 transition-transform duration-500">
                  {item.icon}
                </div>
                <h4 className="text-lg font-serif mb-3 italic">{item.title}</h4>
                <p className="text-xs font-light text-foreground/50 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

"use client";

import React from "react";
import { BotanicalDecoration } from "@/components/ui/BotanicalDecoration";
import { Gift, Sparkles, BadgeCheck, Lock, Globe, RefreshCcw } from "lucide-react";

const features = [
  {
    icon: Gift,
    title: "PREMIUM PACKAGING",
    desc: "Luxury packaging for every order.",
  },
  {
    icon: Sparkles,
    title: "HANDCRAFTED JEWELLERY",
    desc: "Crafted by skilled artisans.",
  },
  {
    icon: BadgeCheck,
    title: "CERTIFIED QUALITY",
    desc: "Authentic and quality assured.",
  },
  {
    icon: Lock,
    title: "SECURE PAYMENTS",
    desc: "100% safe and encrypted checkout.",
  },
  {
    icon: Globe,
    title: "WORLDWIDE SHIPPING",
    desc: "Fast international delivery.",
  },
  {
    icon: RefreshCcw,
    title: "EASY RETURNS",
    desc: "Simple and hassle-free returns.",
  },
];

export const WhyChooseUs = () => {
  return (
    <section 
      className="relative overflow-hidden py-[100px] border-y border-black/5" 
      style={{ backgroundColor: '#FAF8F3' }}
    >
      {/* <BotanicalDecoration className="text-emerald-900"  position="top-left" /> */}

      <div className="container relative z-10 mx-auto px-6 max-w-[1400px]">
        <div className="text-center mb-20">
          <h2 className="font-serif text-3xl md:text-4xl text-[#2B2B2B]">
            Why Choose Mairii
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-x-8 gap-y-16">
          {features.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div 
                key={idx} 
                className="group flex flex-col items-center text-center cursor-default"
              >
                {/* Icon wrapper with hover scale and color change */}
                <div 
                  className="mb-[20px] text-[#2B2B2B] transition-all duration-300 ease-out group-hover:scale-[1.08] group-hover:text-[#C4A064]"
                >
                  <Icon strokeWidth={1} className="w-10 h-10" />
                </div>
                
                {/* Title */}
                <h4 
                  className="text-[16px] uppercase tracking-[0.1em] font-bold mb-[10px] text-[#2B2B2B] transition-colors duration-300 group-hover:text-[#C4A064]"
                >
                  {item.title}
                </h4>
                
                {/* Description */}
                <p className="text-md font-light text-[#555555] leading-relaxed max-w-[180px]">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

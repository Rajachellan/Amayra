"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Heart,
  Sparkles,
  HandCoins,
  RotateCcw,
  CreditCard,
  Leaf,
    HeartHandshake,
  Gem,
  Banknote,
  PackageOpen,
  WalletCards,
  Flower2,
} from "lucide-react";

const features = [
  {
    icon: HeartHandshake,
    title: "CURATED WITH LOVE",
    desc: "Thoughtfully selected pieces, curated with love and care to make every moment special.",
  },
  {
    icon: Gem,
    title: "TIMELESS DESIGNS",
    desc: "Elegant jewellery designs created to complement your style beyond changing trends.",
  },
  {
    icon: Banknote,
    title: "PARTIAL COD AVAILABLE",
    desc: "Enjoy flexible shopping with the convenience of partial cash on delivery.",
  },
  {
    icon: PackageOpen,
    title: "EASY 5 DAY RETURNS",
    desc: "Shop confidently with our simple and hassle-free 5-day return policy.",
  },
  {
    icon: WalletCards,
    title: "MULTIPLE PAYMENT OPTIONS",
    desc: "Choose from multiple secure and convenient payment options at checkout.",
  },
  {
    icon: Flower2,
    title: "BEAUTY WITH PURPOSE",
    desc: "Beautiful jewellery made with a meaningful purpose that goes beyond aesthetics.",
  },
];

export const WhyChooseUs = () => {
  return (
    <section className="relative overflow-hidden py-24 md:py-32 bg-[#FAF8F3] border-y border-stone-200">
      <div className="container relative z-10 mx-auto px-6 max-w-7xl">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-[#C4A064] mb-3 block">
            The MaiRii Promise
          </span>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#2B2B2B] mb-4">
            Why Choose MaiRii
          </h2>

      
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((item, idx) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="group flex flex-col items-center text-center p-8 rounded-xl bg-white border border-[#C4A064]/15 hover:border-[#C4A064]/40 shadow-sm hover:shadow-xl hover:shadow-[#C4A064]/10 transition-all duration-300"
              >
                <div className="w-20 h-20 rounded-full bg-[#FAF8F3] group-hover:bg-[#C4A064] text-[#C4A064] group-hover:text-white flex items-center justify-center mb-6 transition-all duration-300 shadow-inner">
                  <Icon
                    strokeWidth={1.5}
                    className="w-10 h-10 transition-transform duration-300 group-hover:scale-110"
                  />
                </div>

                <h4 className="text-sm font-bold uppercase tracking-[0.15em] mb-3 text-[#2B2B2B] group-hover:text-[#A37F43] transition-colors">
                  {item.title}
                </h4>

                <p className="text-xs font-light text-[#666666] leading-relaxed max-w-xs">
                  {item.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
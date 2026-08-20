"use client";

import React from "react";
import { ShieldCheck, Truck, RotateCcw, Clock } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  // {
  //   icon: ShieldCheck,
  //   title: "BIS Hallmarked",
  //   description: "Every piece of gold color is hallmarked for purity and authenticity.",
  // },
  {
    icon: Truck,
    title: "Secure Shipping",
    description: "Insured and tracked shipping to your doorstep worldwide.",
  },
  {
    icon: RotateCcw,
    title: "Easy Returns",
    description: "No-questions-asked 15-day return policy for peace of mind.",
  },
  {
    icon: Clock,
    title: "24/7 Support",
    description: "Dedicated concierge service for all your enquiries.",
  },
];

export const WhyChooseUs = () => {
  return (
    <section className="py-24 bg-brand-emerald text-white">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="flex flex-col items-center text-center group"
            >
              <div className="mb-6 p-4 rounded-full border border-white/10 group-hover:bg-brand-gold color transition-colors duration-500">
                <feature.icon className="w-8 h-8 text-brand-gold color group-hover:text-brand-emerald transition-colors duration-500" />
              </div>
              <h4 className="font-serif text-xl tracking-[0.1em] mb-4 uppercase">
                {feature.title}
              </h4>
              <p className="text-gray-400 font-sans tracking-widest text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

"use client";

import React from "react";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const reviews = [
  {
    name: "Anjali Mehta",
    role: "Bride",
    text: "The bridal set I chose for my wedding was not just jewellery, it was a piece of art that I will cherish forever. The attention to detail is unparalleled.",
    rating: 5
  },
  {
    name: "Vikram Malhotra",
    role: "Collector",
    text: "mairii has a soul in their designs. I've collected many antique pieces, and theirs are the most authentic I've found in years.",
    rating: 5
  },
  {
    name: "Priya Sharma",
    role: "Modern Woman",
    text: "Minimalist yet meaningful. I love how I can wear their temple jewellery even with contemporary outfits. It's truly versatile luxury.",
    rating: 5
  }
];

export const Testimonials = () => {
  return (
    <section className="section-padding bg-background relative overflow-hidden">
      {/* Background Decal */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none">
        <h1 className="text-[20vw] font-serif select-none">Heritage</h1>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <Quote className="w-12 h-12 text-champagne/40 mx-auto mb-8" />
          <h2 className="text-4xl font-serif">Client Stories</h2>
        </div>

        <div className="flex flex-nowrap md:grid md:grid-cols-3 gap-8 overflow-x-auto no-scrollbar pb-12 snap-x">
          {reviews.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="min-w-[300px] snap-center p-12 bg-pearl/30 border border-white/50 relative"
            >
              <div className="flex gap-1 text-champagne mb-8">
                {[...Array(item.rating)].map((_, i) => <Star key={i} className="w-3 h-3 fill-current" />)}
              </div>
              <p className="font-light leading-loose text-foreground/70 mb-10 italic">
                {`“${item.text}”`}
              </p>
              <div>
                <h4 className="text-[11px] uppercase tracking-[0.3em] font-semibold mb-1">{item.name}</h4>
                <p className="text-[9px] uppercase tracking-widest text-champagne">{item.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

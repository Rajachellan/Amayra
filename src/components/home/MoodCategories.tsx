"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { api, mediaSrc } from "@/lib/api";
import { BotanicalDecoration } from "@/components/ui/BotanicalDecoration";

interface Occasion {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
}

export const MoodCategories = () => {
  const [occasions, setOccasions] = useState<Occasion[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await api<Occasion[]>("/occasions");
        setOccasions(data);
      } catch (e) {
        console.error("Failed to load occasions", e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <section className="py-24 overflow-hidden relative" style={{ backgroundColor: 'var(--bg-ivory)' }}>
      <BotanicalDecoration className="text-emerald-900" opacity={0.03} />
      <div className="container relative z-10 mx-auto px-4 sm:px-6">
        <div className="max-w-xl mb-16">
          <span className="text-yellow-600 uppercase tracking-[0.2em] text-[14px] font-bold block mb-4">
            Curated Experiences
          </span>
          <h2 className="text-foreground text-4xl md:text-5xl font-serif">
            Shop by <span className="italic font-serif-alt text-[#3D3934]/90">Mood</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {loading ? (
            [1, 2, 3, 4].map((i) => (
              <div key={i} className="aspect-[4/5] bg-pearl animate-pulse rounded-[24px]" />
            ))
          ) : (
            occasions.map((occ, index) => (
              <motion.div
                key={occ._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: index * 0.1 }}
                className="group relative overflow-hidden flex flex-col rounded-[24px] aspect-[4/5] bg-pearl border border-foreground/10 transition-all duration-700 hover:shadow-2xl hover:-translate-y-2"
              >
                <Link href={`/occasion/${occ.slug}`} className="block h-full relative flex flex-col">
                  <div className="absolute inset-[16px] bottom-[110px] overflow-hidden rounded-[16px]">
                    <Image
                      src={mediaSrc(occ.image)}
                      alt={occ.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 25vw"
                      className="object-cover transition-transform duration-[2s] group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-foreground/5 group-hover:bg-foreground/5 transition-colors" />
                  </div>

                  <div className="absolute bottom-0 inset-x-0 p-5 pt-2 flex flex-col items-center text-center z-10 bg-pearl/90 backdrop-blur-sm">
                    <h3 className="text-foreground text-xl font-serif mb-1 group-hover:text-champagne transition-colors duration-300">
                      {occ.name}
                    </h3>
                    {/* <p className="text-[#6B6661] text-[10px] uppercase tracking-[0.15em] font-medium mb-3 line-clamp-1">
                      {occ.description || "Curated collection"}
                    </p> */}
                    <span className="relative group/btn overflow-hidden w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#1a3d2f] to-[#2e5a44] text-white text-[10px] uppercase tracking-[0.2em] font-bold shadow-md transition-all duration-300 group-hover:shadow-[0_6px_20px_rgba(26,61,47,0.4)] flex items-center justify-center">
                      <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 -translate-x-full group-hover:translate-x-full" />
                      <span className="relative z-10 font-bold text-white">Explore More</span>
                    </span>
                  </div>

                  {/* Subtle border detail */}
                  <div className="absolute inset-4 border border-foreground/10 rounded-[20px] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                </Link>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};


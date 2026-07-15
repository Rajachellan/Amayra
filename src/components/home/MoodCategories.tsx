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
          <span className="text-champagne uppercase tracking-[0.6em] text-[10px] font-bold block mb-4">
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
                className="group relative overflow-hidden rounded-[24px] aspect-[4/5] bg-pearl border border-foreground/10 transition-all duration-700 hover:shadow-2xl hover:-translate-y-2"
              >
                <Link href={`/occasion/${occ.slug}`} className="block h-full relative">
                  <div className="absolute inset-0 p-8 flex flex-col justify-end z-10">
                    <span className="text-champagne uppercase tracking-[0.3em] text-[9px] font-bold mb-3 block opacity-0 group-hover:opacity-100 transition-opacity duration-500 translate-y-4 group-hover:translate-y-0 transition-transform">
                      Discover More
                    </span>
                    <h3 className="text-foreground text-2xl font-serif mb-2 group-hover:text-champagne transition-colors duration-500">
                      {occ.name}
                    </h3>
                    <p className="text-[#6B6661] text-[11px] uppercase tracking-[0.15em] font-medium">
                      {occ.description || "Curated collection"}
                    </p>
                  </div>

                  <div className="absolute inset-x-8 top-8 bottom-32 overflow-hidden rounded-[16px]">
                    <Image
                      src={mediaSrc(occ.image)}
                      alt={occ.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 25vw"
                      className="object-cover transition-transform duration-[2s] group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-foreground/5 group-hover:bg-foreground/5 transition-colors" />
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


"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "../ui/Button";
import { shopApi, type CollectionDoc } from "@/lib/api/shop";
import { resolveMediaUrl } from "@/lib/apiBase";
import { BotanicalDecoration } from "@/components/ui/BotanicalDecoration";

export const SignatureBlocks = () => {
  const [collections, setCollections] = useState<CollectionDoc[]>([]);

  useEffect(() => {
    shopApi
      .collections({ featured: true })
      .then(setCollections)
      .catch(() => setCollections([]));
  }, []);

  return (
    <section className="py-10 overflow-hidden relative" style={{ backgroundColor: 'var(--bg-sage-light)' }}>
      <BotanicalDecoration className="text-emerald-900" opacity={0.03} />
      <div className="container relative z-10 mx-auto px-6">
        <div className="text-center mb-10">
          <h2 className="text-brand-gold font-serif italic tracking-[0.3em] text-lg md:text-xl mb-4">
            Our Legacy
          </h2>
          <h3 className="text-emerald-dark font-serif text-4xl md:text-5xl lg:text-6xl mb-8">
            The Signature Collections
          </h3>
          <div className="w-32 h-[1px] bg-brand-gold/30 mx-auto" />
        </div>

        {collections.length === 0 ? (
          <p className="text-center text-gray-400 py-8">Loading collections…</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {collections.map((col, idx) => (
              <motion.div
                key={col._id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="relative group h-[400px] overflow-hidden"
              >
                <Image
                  src={resolveMediaUrl(col.image)}
                  alt={col.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 
  bg-gradient-to-t from-black/70 via-black/20 to-transparent 
  backdrop-blur-[4px] 
  opacity-70 group-hover:opacity-90 
  transition-all duration-500"
                />

                <div className="absolute inset-0 flex flex-col items-center justify-end p-10 text-center text-white">
                  <span className="text-brand-gold text-xs tracking-[0.4em] font-bold uppercase mb-3 line-clamp-2">
                    {col.description || "Signature"}
                  </span>
                  <h4 className="font-serif text-2xl md:text-3xl mb-6 tracking-wide">
                    {col.name}
                  </h4>
                  <Link href={`/category/all?collection=${encodeURIComponent(col.slug)}`}>
                    <Button variant="outline" className="opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                      VIEW ALL
                    </Button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

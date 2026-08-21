"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useProducts } from "@/hooks/useProducts";
import { ProductCard } from "@/components/products/ProductCard";
import { BotanicalDecoration } from "@/components/ui/BotanicalDecoration";
import { Button } from "@/components/ui/Button";

export const NecklacesSection = () => {
  const { products, isLoading: loading } = useProducts({ category: "necklaces", limit: 12 });

  if (!loading && products.length === 0) {
    return null;
  }

  const displayedProducts = products.slice(0, 12);

  return (
    <section className="py-16 md:py-24 relative overflow-hidden bg-gradient-to-b from-white via-[#FAF8F5] to-white">
      <BotanicalDecoration className="text-emerald-900" opacity={0.03} />
      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl text-center md:text-left">
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-[#c9a84c] font-serif italic tracking-[0.3em] text-xl md:text-2xl mb-2"
            >
              Timeless Elegance & Royal Grace
            </motion.h3>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-[#0B2516] font-serif text-3xl md:text-5xl lg:text-6xl"
            >
              Necklaces
            </motion.h2>
          </div>
        </div>

        {/* Product Grid: 4 per row on desktop, 2 on tablet, 1 on mobile */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
              <div key={n} className="h-96 rounded-2xl bg-stone-100 animate-pulse" />
            ))}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {displayedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* Explore All Collection Button Centered at Bottom */}
            <div className="mt-16 text-center">
              <Link href="/category/necklaces">
                <Button className="bg-[#0B2516] hover:bg-[#c9a84c] text-white hover:text-[#0B2516] px-10 py-6 text-sm font-semibold uppercase tracking-[0.3em] rounded-full transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5">
                  Explore All Collection
                </Button>
              </Link>
            </div>
          </>
        )}

      </div>
    </section>
  );
};

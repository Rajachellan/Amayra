"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { useProducts } from "@/hooks/useProducts";
import { resolveMediaUrl } from "@/lib/apiBase";
import type { Product } from "@/types";
import { BotanicalDecoration } from "@/components/ui/BotanicalDecoration";

export const ProductSpotlight = () => {
  const { addToCart, openCart } = useCart();
  const { products } = useProducts({ masterpiece: "true", limit: 12 });
  const product: Product | null = products[0] ?? null;

  if (!product) {
    return (
      <section className="py-24 relative overflow-hidden" style={{ backgroundColor: 'var(--bg-mint-soft)' }}>
        <BotanicalDecoration className="text-emerald-900" opacity={0.03} />
        <div className="container relative z-10 mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 space-y-6">
              <div className="h-4 w-36 bg-yellow-600/20 rounded-full animate-pulse" />
              <div className="h-10 w-72 bg-stone-900/20 rounded-xl animate-pulse" />
              <div className="h-20 w-full bg-stone-900/10 rounded-xl animate-pulse" />
              <div className="h-12 w-48 bg-[#0B2516]/20 rounded-full animate-pulse" />
            </div>
            <div className="lg:col-span-7">
              <div className="aspect-[4/5] max-w-lg mx-auto bg-stone-200/60 rounded-3xl animate-pulse" />
            </div>
          </div>
        </div>
      </section>
    );
  }

  const href = `/product/${product.slug ?? product.id}`;
  const img = typeof product.image === "string" ? product.image : resolveMediaUrl(undefined);

  function handleAddToCollection() {
    if (!product) return;
    addToCart(product);
    openCart();
  }

  return (
    <section className="py-24 relative overflow-hidden" style={{ backgroundColor: 'var(--bg-mint-soft)' }}>
      <BotanicalDecoration className="text-emerald-900" opacity={0.03} />
      <div className="container relative z-10 mx-auto px-6">
        <div className="absolute right-10 top-1/2 -translate-y-1/2 hidden xl:block">
          <span className="text-[120px] font-serif italic text-foreground/[0.01] rotate-90 origin-center select-none">
            Signature
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
          <div className="lg:col-span-5 order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2 }}
              className="space-y-8"
            >
              <div className="space-y-4">
                <span className="text-yellow-600 uppercase tracking-[0.6em] text-[15px] font-bold block">
                  Couture Spotlight
                </span>
                <h2 className="text-foreground text-4xl md:text-6xl font-serif leading-[1.1]">
                  {product.name}
                </h2>
              </div>

              <p className="text-[#3D3934] text-base font-light leading-relaxed max-w-md">
                {product.description}
              </p>

              <div className="pt-4 flex flex-col space-y-6">
                <div className="space-y-1">
                  <span className="text-[10px] uppercase tracking-widest text-[#6B6661]">From</span>
                  <div className="flex items-baseline gap-3">
                    {product.oldPrice != null && (
                      <p className="text-lg font-serif text-[#1a3d2f] line-through font-medium opacity-85">
                        ₹{product.oldPrice.toLocaleString()}
                      </p>
                    )}
                    <p className="text-3xl font-serif font-bold text-[#d4af37]">₹{product.price.toLocaleString()}</p>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <Link
                    href={href}
                    className="px-8 py-4 rounded-full bg-[#d4af37] text-[#1a2e22] text-[10px] uppercase tracking-[0.3em] font-bold transition-all duration-500 hover:shadow-lg hover:scale-105"
                  >
                    View Details
                  </Link>
                  {product.stock <= 0 ? (
                    <button
                      type="button"
                      disabled
                      className="px-8 py-4 rounded-full bg-stone-200 text-stone-500 text-[10px] font-bold uppercase tracking-[0.3em] cursor-not-allowed opacity-50"
                    >
                      Out of Stock
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={handleAddToCollection}
                      className="px-8 py-4 rounded-full bg-gradient-to-r from-[#1a3d2f] to-[#2e5a44] text-white text-[10px] font-bold uppercase tracking-[0.3em] hover:shadow-[0_8px_25px_rgba(26,61,47,0.45)] hover:scale-105 cursor-pointer transition-all duration-300"
                    >
                      Add to Cart
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          </div>

          <div className="lg:col-span-7 order-1 lg:order-2">
          <motion.div
  initial={{ opacity: 0, scale: 0.95 }}
  whileInView={{ opacity: 1, scale: 1 }}
  viewport={{ once: true }}
  transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
  className="relative aspect-square w-full max-w-[600px] mx-auto rounded-[40px] overflow-hidden group shadow-2xl"
>
  <Link href={href} className="relative block w-full h-full">
    <Image
      src={img}
      alt={product.name}
      fill
      sizes="(max-width: 768px) 100vw, 60vw"
      className="object-cover transition-transform duration-[3s] group-hover:scale-110"
    />
  </Link>

  <div className="absolute top-8 left-8 w-12 h-12 border-t border-l border-white/20 rounded-tl-2xl" />
  <div className="absolute bottom-8 right-8 w-12 h-12 border-b border-r border-white/20 rounded-br-2xl" />
  <div className="grain-overlay opacity-[0.05]" />
  <div className="absolute inset-0 bg-gradient-to-tr from-champagne/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
</motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

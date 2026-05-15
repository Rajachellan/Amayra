"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { shopApi } from "@/lib/api/shop";
import { mapListItemToProduct } from "@/lib/mapProduct";
import { resolveMediaUrl } from "@/lib/apiBase";
import type { Product } from "@/types";

export const ProductSpotlight = () => {
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        let res = await shopApi.products({ section: "atelier", limit: 1, page: 1 });
        if (!res.items[0]) {
          res = await shopApi.products({ masterpiece: "true", limit: 1, page: 1 });
        }
        if (cancelled || !res.items[0]) return;
        setProduct(mapListItemToProduct(res.items[0]));
      } catch {
        if (!cancelled) setProduct(null);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  if (!product) {
    return (
      <section className="py-32 bg-pearl relative overflow-hidden">
        <div className="container mx-auto px-6 text-center text-gray-400 font-serif">
          Loading atelier spotlight…
        </div>
      </section>
    );
  }

  const href = `/product/${product.slug ?? product.id}`;
  const img = typeof product.image === "string" ? product.image : resolveMediaUrl(undefined);

  return (
    <section className="py-32 bg-pearl relative overflow-hidden">
      <div className="absolute right-10 top-1/2 -translate-y-1/2 hidden xl:block">
        <span className="text-[120px] font-serif italic text-foreground/[0.01] rotate-90 origin-center select-none">
          Signature
        </span>
      </div>

      <div className="container mx-auto px-6">
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
                <span className="text-champagne uppercase tracking-[0.6em] text-[10px] font-bold block">
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
                    <p className="text-3xl font-serif text-foreground">₹{product.price.toLocaleString()}</p>
                    {product.oldPrice != null && (
                      <p className="text-lg font-serif text-foreground/30 line-through">
                        ₹{product.oldPrice.toLocaleString()}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-10">
                  <Link
                    href={href}
                    className="px-12 py-5 rounded-full bg-foreground text-background text-[10px] uppercase tracking-[0.3em] font-medium transition-all duration-500 hover:bg-champagne hover:scale-105"
                  >
                    View Details
                  </Link>
                  <button
                    type="button"
                    onClick={() => addToCart(product)}
                    className="text-[10px] uppercase tracking-[0.4em] font-semibold text-foreground border-b border-champagne pb-1 hover:text-champagne transition-colors bg-transparent cursor-pointer"
                  >
                    Add to Collection
                  </button>
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
              className="relative aspect-square md:aspect-[4/3] rounded-[40px] overflow-hidden group shadow-2xl"
            >
              <Link href={href}>
                <Image
                  src={img}
                  alt={product.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 60vw"
                  className=" transition-transform duration-[3s] group-hover:scale-110"
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

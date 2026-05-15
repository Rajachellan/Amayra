"use client";

import React, { useEffect, useState } from "react";
import { ProductCard } from "../products/ProductCard";
import { Button } from "../ui/Button";
import Link from "next/link";
import { shopApi } from "@/lib/api/shop";
import { mapListItemToProduct } from "@/lib/mapProduct";
import type { Product } from "@/types";

export const Trending = () => {
  const [trendingProducts, setTrendingProducts] = useState<Product[]>([]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        let r = await shopApi.products({ trending: "true", limit: 4, page: 1 });
        if (!r.items.length) {
          r = await shopApi.products({ sort: "trending", limit: 4, page: 1 });
        }
        if (!cancelled) setTrendingProducts(r.items.map(mapListItemToProduct));
      } catch {
        if (!cancelled) setTrendingProducts([]);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-end justify-between mb-16 px-4">
          <div className="max-w-2xl">
            <h2 className="text-brand-gold font-sans font-bold tracking-[0.4em] uppercase text-sm mb-4 text-center md:text-left">
              New Arrivals
            </h2>
            <h3 className="text-brand-emerald font-serif text-4xl md:text-5xl lg:text-6xl mb-6 text-center md:text-left">
              Trending Now
            </h3>
          </div>
          <Link href="/category/all" className="hidden md:block mb-6">
            <Button variant="outline" className="text-xs">VIEW ALL PRODUCTS</Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {trendingProducts.length === 0 ? (
            <p className="text-gray-400 col-span-full text-center py-8">Loading…</p>
          ) : (
            trendingProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          )}
        </div>

        <div className="mt-12 text-center md:hidden">
          <Link href="/category/all">
            <Button variant="outline">VIEW ALL PRODUCTS</Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

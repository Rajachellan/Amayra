"use client";

import React from "react";
import { ProductCard } from "../products/ProductCard";
import { products } from "@/data/products";
import { Button } from "../ui/Button";
import Link from "next/link";

export const Trending = () => {
  const trendingProducts = products.slice(0, 4);

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
          {trendingProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
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

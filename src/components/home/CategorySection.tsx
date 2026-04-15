"use client";

import React from "react";
import { motion } from "framer-motion";
import { ProductCard } from "../products/ProductCard";
import { Product } from "../../types";
import { Button } from "../ui/Button";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface CategorySectionProps {
  title: string;
  subtitle: string;
  products: Product[];
  category: string;
  reversed?: boolean;
}

export const CategorySection = ({ title, subtitle, products, category, reversed = false }: CategorySectionProps) => {
  return (
    <section className={`py-24 ${reversed ? "bg-gray-50" : "bg-white"}`}>
      <div className="container mx-auto px-6">
        <div className={`flex flex-col md:flex-row items-end justify-between mb-16 ${reversed ? "md:flex-row-reverse" : ""}`}>
          <div className={`${reversed ? "md:text-right" : "text-left"}`}>
            <h3 className="text-brand-gold font-sans font-bold tracking-[0.4em] uppercase text-xs mb-4">
              {subtitle}
            </h3>
            <h2 className="text-brand-emerald font-serif text-4xl md:text-5xl lg:text-6xl mb-6">
              {title}
            </h2>
            <div className={`w-24 h-1 gold-gradient ${reversed ? "ml-auto" : "mr-auto"}`} />
          </div>
          <Link href={`/category/${category.toLowerCase()}`} className="hidden md:block mt-8 group">
            <Button variant="ghost" className="flex items-center space-x-2 text-brand-emerald group-hover:text-brand-gold transition-colors p-0">
              <span className="tracking-[0.2em] font-bold text-xs">EXPLORE ALL</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.slice(0, 4).map((product, idx) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center md:hidden">
          <Link href={`/category/${category.toLowerCase()}`}>
            <Button variant="outline" size="sm">VIEW ALL</Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

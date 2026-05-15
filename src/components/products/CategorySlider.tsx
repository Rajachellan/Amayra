"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";

interface CategorySliderProps {
  currentCategory: string;
  subCategories: { name: string; slug: string; image: string }[];
}

export const CategorySlider = ({ currentCategory, subCategories }: CategorySliderProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentSub = searchParams.get("sub");

  return (
    <div className="py-12 bg-white border-b border-gray-100">
      <div className="container mx-auto px-6">
        <div className="flex items-center space-x-8 overflow-x-auto no-scrollbar pb-4">
          {/* View All Option */}
          <button
            onClick={() => router.push(`/category/${currentCategory.toLowerCase()}`)}
            className="flex flex-col items-center space-y-3 min-w-[80px] group"
          >
            <div className={`w-16 h-16 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${!currentSub ? "border-brand-gold bg-brand-gold/5" : "border-gray-100 group-hover:border-brand-gold"}`}>
              <span className="text-[10px] font-bold text-brand-emerald tracking-tighter">ALL</span>
            </div>
            <span className={`text-[10px] uppercase tracking-widest font-bold transition-colors ${!currentSub ? "text-brand-gold" : "text-gray-400 group-hover:text-brand-gold"}`}>
              View All
            </span>
          </button>

          {subCategories.map((sub) => (
            <button
              key={sub.name}
              onClick={() =>
              router.push(`/category/${currentCategory.toLowerCase()}?sub=${encodeURIComponent(sub.slug)}`)
            }
              className="flex flex-col items-center space-y-3 min-w-[80px] group text-center"
            >
              <div className={`w-16 h-16 rounded-full overflow-hidden border-2 transition-all duration-300 relative ${currentSub === sub.slug ? "border-brand-gold" : "border-gray-100 group-hover:border-brand-gold"}`}>
                <Image
                  src={sub.image}
                  alt={sub.name}
                  fill
                  sizes="64px"
                  className="object-cover"
                />
              </div>
              <span className={`text-[10px] uppercase tracking-widest font-bold transition-colors ${currentSub === sub.slug ? "text-brand-gold" : "text-gray-400 group-hover:text-brand-gold"}`}>
                {sub.name}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

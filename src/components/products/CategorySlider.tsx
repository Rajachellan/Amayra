"use client";

import React from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import silverImg from "@/assets/silver.jpg";
import earingImg from "@/assets/kammal_6.jpg";
import necklesImg from "@/assets/neckles.jpg";
import banglesImg from "@/assets/bangles_7.jpg";
import ringsImg from "@/assets/pexels-the-glorious-studio-3584518-10361481 (1).jpg";
import bridalImg from "@/assets/bridal_banner.jpg";
import nosePinImg from "@/assets/pexels-ankunijjar-31772512.jpg";
import mangalsutraImg from "@/assets/pexels-the-glorious-studio-3584518-8306531.jpg";
import chainImg from "@/assets/pexels-thisisjooh-36160928.jpg";
import pendantImg from "@/assets/pexels-arif-13595746.jpg";

interface CategorySliderProps {
  currentCategory: string;
  subCategories?: { name: string; slug: string; image: string }[];
}

const CATEGORY_ITEMS = [
  { name: "ALL", label: "VIEW ALL", slug: "all", image: null },
  { name: "SILVER", label: "SILVER", slug: "silver", image: silverImg },
  { name: "EARRINGS", label: "EARRINGS", slug: "earrings", image: earingImg },
  { name: "NECKLACES", label: "NECKLACES", slug: "necklaces", image: necklesImg },
  { name: "BANGLES", label: "BANGLES", slug: "bangles", image: banglesImg },
  { name: "RINGS", label: "RINGS", slug: "rings", image: ringsImg },
  { name: "BRIDAL", label: "BRIDAL", slug: "bridal", image: bridalImg },
  { name: "NOSE PINS", label: "NOSE PINS", slug: "nose-pins", image: nosePinImg },
  { name: "MANGALSUTRAS", label: "MANGALSUTRAS", slug: "mangalsutras", image: mangalsutraImg },
  { name: "CHAINS", label: "CHAINS", slug: "chains", image: chainImg },
  { name: "PENDANTS", label: "PENDANTS", slug: "pendants", image: pendantImg },
];

export const CategorySlider = ({ currentCategory }: CategorySliderProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentSub = searchParams.get("sub");
  const activeSlug = (currentSub || currentCategory || "all").toLowerCase();

  return (
    <div className="py-8 md:py-10 bg-white border-b border-stone-100 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-center gap-6 sm:gap-8 md:gap-10 overflow-x-auto no-scrollbar pb-2 scroll-smooth">
          {CATEGORY_ITEMS.map((cat) => {
            const isActive = activeSlug === cat.slug.toLowerCase();

            return (
              <button
                key={cat.slug}
                onClick={() => router.push(`/category/${cat.slug}`)}
                className="flex flex-col items-center gap-2.5 min-w-[70px] sm:min-w-[80px] group cursor-pointer shrink-0 transition-transform duration-300 hover:scale-105"
              >
                <div
                  className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden border-2 p-0.5 transition-all duration-300 relative ${
                    isActive
                      ? "border-[#d4af37] shadow-[0_0_15px_rgba(212,175,55,0.4)] scale-105"
                      : "border-stone-200 group-hover:border-[#d4af37]"
                  }`}
                >
                  <div className="relative w-full h-full rounded-full overflow-hidden bg-stone-50 flex items-center justify-center">
                    {cat.image ? (
                      <Image
                        src={cat.image}
                        alt={cat.label}
                        fill
                        sizes="64px"
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    ) : (
                      <span className="text-[11px] font-bold text-[#1a3d2f] tracking-tighter">
                        ALL
                      </span>
                    )}
                  </div>
                </div>

                <span
                  className={`text-[9px] sm:text-[10px] uppercase tracking-[0.18em] font-bold transition-colors text-center ${
                    isActive ? "text-[#d4af37]" : "text-stone-500 group-hover:text-[#d4af37]"
                  }`}
                >
                  {cat.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

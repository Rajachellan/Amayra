"use client";

import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export function ProductDetailSkeleton() {
  return (
    <div className="min-h-screen bg-[#faf9f7] animate-pulse">
      <Navbar />

      {/* Breadcrumbs Skeleton */}
      <div className="bg-[#FAF8F3] border-b border-[#C4A064]/20 pt-28 md:pt-32 pb-4 mb-8">
        <div className="container mx-auto px-6">
          <div className="flex items-center gap-2">
            <div className="h-3 w-12 rounded bg-neutral-200" />
            <div className="h-3 w-3 rounded-full bg-neutral-200" />
            <div className="h-3 w-16 rounded bg-neutral-200" />
            <div className="h-3 w-3 rounded-full bg-neutral-200" />
            <div className="h-3 w-28 rounded bg-neutral-200" />
          </div>
        </div>
      </div>

      <section className="pb-16 md:pb-20">
        <div className="container mx-auto px-6">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-14 xl:gap-20">
            {/* Gallery Skeleton */}
            <div className="w-full lg:w-[50%]">
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-neutral-200/80">
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent animate-[shimmer_1.8s_infinite]" />
              </div>
              {/* Thumbnail Row */}
              <div className="mt-4 flex gap-3">
                {[0, 1, 2, 3].map((i) => (
                  <div key={i} className="h-20 w-20 rounded-xl bg-neutral-200/80 shrink-0" />
                ))}
              </div>
            </div>

            {/* Product Info Skeleton */}
            <div className="w-full lg:w-[50%] space-y-6">
              <div className="flex items-center justify-between">
                <div className="h-6 w-24 rounded-full bg-neutral-200" />
                <div className="h-8 w-8 rounded-full bg-neutral-200" />
              </div>

              {/* Title */}
              <div className="space-y-2">
                <div className="h-8 w-3/4 rounded-lg bg-neutral-200" />
                <div className="h-4 w-1/2 rounded bg-neutral-200" />
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3 pt-2">
                <div className="h-8 w-28 rounded-lg bg-neutral-200" />
                <div className="h-5 w-20 rounded bg-neutral-200" />
                <div className="h-5 w-16 rounded-full bg-neutral-200" />
              </div>

              {/* Delivery Box */}
              <div className="rounded-xl border border-neutral-200/70 p-4 space-y-3 bg-white/50">
                <div className="h-4 w-36 rounded bg-neutral-200" />
                <div className="grid grid-cols-2 gap-4">
                  <div className="h-10 rounded bg-neutral-200" />
                  <div className="h-10 rounded bg-neutral-200" />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <div className="h-14 w-full sm:w-1/3 rounded-full bg-neutral-200" />
                <div className="h-14 w-full sm:w-2/3 rounded-full bg-neutral-300" />
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-4 gap-3 pt-4 border-t border-neutral-200/60">
                {[0, 1, 2, 3].map((i) => (
                  <div key={i} className="flex flex-col items-center gap-2 p-2">
                    <div className="h-8 w-8 rounded-full bg-neutral-200" />
                    <div className="h-2 w-12 rounded bg-neutral-200" />
                  </div>
                ))}
              </div>

              {/* Accordions */}
              <div className="space-y-3 pt-4 border-t border-neutral-200/60">
                {[0, 1, 2].map((i) => (
                  <div key={i} className="h-12 w-full rounded-lg bg-neutral-200/60" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

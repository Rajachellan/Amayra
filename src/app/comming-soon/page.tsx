"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, Home } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function ComingSoonPage() {
  return (
    <main className="min-h-screen flex flex-col justify-between bg-[#FAF8F5] text-stone-900">
      <Navbar />
      <section className="relative pt-28 sm:pt-36 pb-16 sm:pb-24 flex-1 flex flex-col items-center justify-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          {/* Main Visual Banner Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative w-full aspect-[16/9] max-h-[72vh] rounded-2xl overflow-hidden shadow-2xl border border-stone-200/80 bg-stone-950"
          >
            <Image
              src="/images/optimized/banner.jpeg"
              alt="MaiRii Coming Soon - A new chapter of timeless jewellery is arriving"
              fill
              priority
              className="object-cover object-center"
              sizes="(max-width: 1280px) 100vw, 1200px"
            />
          </motion.div>

          {/* Action & Message Callouts below banner */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="mt-10 sm:mt-12 text-center max-w-2xl mx-auto space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0B2516]/5 border border-[#C4A064]/30">
              <Sparkles className="w-3.5 h-3.5 text-[#C4A064]" />
              <span className="text-[11px] uppercase tracking-[0.3em] font-medium text-[#0B2516]">
                Exquisite Craftsmanship Awaits
              </span>
            </div>

            <p className="text-stone-600 text-sm sm:text-base font-light leading-relaxed">
              We&apos;re crafting something truly special for you. Our artisans are putting the finishing touches on this collection. In the meantime, discover our curated treasures.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <Link href="/category/all">
                <Button variant="gold" className="px-8 py-3 text-xs tracking-widest uppercase flex items-center gap-2">
                  <span>Explore All Jewellery</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="/">
                <Button variant="outline" className="px-8 py-3 text-xs tracking-widest uppercase flex items-center gap-2 border-stone-300 hover:border-stone-800">
                  <Home className="w-4 h-4" />
                  <span>Return to Home</span>
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
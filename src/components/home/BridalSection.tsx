"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "../ui/Button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import banner from "../../assets/bridal_banner.jpg"
export const BridalSection = () => {
  return (
    <section className="relative py-32 overflow-hidden bg-brand-emerald">
      <div className="absolute inset-0 opacity-50">
        <Image
          src={banner}
          alt="Luxe Background"
          fill
          className="object-cover"
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-brand-gold font-sans font-bold tracking-[0.5em] uppercase text-xs mb-8">
              SANTORINI LUXE COLLECTION
            </h3>
            <h2 className="text-5xl md:text-8xl font-serif mb-10 leading-[1.1] tracking-tight">
              Celebrate <br /> Your Traditions
            </h2>
            <div className="w-32 h-[1px] bg-brand-gold mx-auto mb-10" />
            <p className="text-gray-200 font-sans text-xl mb-12 leading-relaxed max-w-2xl mx-auto italic font-light">
              "Every piece tells a story of heritage, love, and the timeless beauty of a bride on her most special day."
            </p>

            <div className="flex flex-col md:flex-row items-center justify-center gap-6">
              <Link href="/category/bridal">
                <Button variant="gold" size="lg" className="w-full md:w-auto px-12 group">
                  EXPLORE LUXE <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/booking">
                <Button variant="outline" size="lg" className="w-full md:w-auto px-12 border-white text-white hover:bg-white hover:text-brand-emerald">
                  BOOK CONSULTATION
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Decorative Gold Elements */}
      <div className="absolute top-10 left-10 w-64 h-64 border border-brand-gold/10 rounded-full animate-pulse-slow pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 border border-brand-gold/10 rounded-full animate-pulse-slow pointer-events-none" />
    </section>
  );
};

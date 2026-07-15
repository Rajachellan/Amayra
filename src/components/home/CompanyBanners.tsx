"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { BotanicalDecoration } from "@/components/ui/BotanicalDecoration";

const bannerData = [
  {
    title: "Our Story",
    href: "/our-story",
    image: "/images/bridal_collections/bridal_collections (2).jpg",
  },
  {
    title: "Shipping",
    href: "/shipping-returns",
    image: "/images/neckles_5.jpg",
  },
  {
    title: "Privacy",
    href: "/privacy-policy",
    image: "/images/luxury/bangles.avif",
  },
  {
    title: "Terms",
    href: "/terms-of-service",
    image: "/images/luxury/temple.png",
  },
  {
    title: "Stores",
    href: "/store-locator",
    image: "/images/luxury/jumka.jpg",
  },
];

export const CompanyBanners = () => {
  return (
    <section className="py-20 relative overflow-hidden" style={{ backgroundColor: 'var(--bg-pearl-green)' }}>
      <BotanicalDecoration className="text-emerald-900" opacity={0.03} />
      <div className="container relative z-10 mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {bannerData.map((banner, index) => (
            <motion.div
              key={banner.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Link href={banner.href} className="group block relative h-40 overflow-hidden rounded-sm">
                <Image
                  src={banner.image}
                  alt={banner.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white text-[10px] uppercase tracking-[0.3em] font-bold border-b border-white/40 pb-1">
                    {banner.title}
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

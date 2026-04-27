"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

import bangles from "../../../public/images/luxury/bangles_3.jpg";
import neckles from "../../../public/images/luxury/neckles_32.jpg";
import neckles1 from "../../../public/images/luxury/neckles.jpg";
import kundan from "../../../public/images/luxury/kundan_sets.jpg";
import bendant from "../../../public/images/bendant.jpg";
import nosepin from "../../assets/hip_chain.jpg"
const IMAGES = [
  {
    id: 1,
    src: neckles,
    title: "The Heritage Edit",
    subtitle: "A legacy of brilliance",
    issue: "01",
    span: "hero",
  },
  {
    id: 2,
    src: neckles1,
    title: "Modern Minimal",
    subtitle: "Refined simplicity",
    issue: "02",
    span: "top-center",
  },
  {
    id: 3,
    src: kundan,
    title: "Royal Kundan",
    subtitle: "Majestic details",
    issue: "03",
    span: "right",
  },
  {
    id: 4,
    src: bangles,
    title: "Bridal Essence",
    subtitle: "Timeless vows",
    issue: "04",
    span: "bottom-center",
  },
  {
    id: 5,
    src: nosepin,
    title: "Hip Chain",
    subtitle: "Crafted for eternity",
    issue: "05",
    span: "bottom-right",
  },
];

type CardProps = {
  src: any;
  title: string;
  subtitle: string;
  issue: string;
  className?: string;
  imageClassName?: string;
  index: number;
};

const MagazineCard = ({
  src,
  title,
  subtitle,
  issue,
  className = "",
  imageClassName = "",
  index,
}: CardProps) => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1.0, delay: index * 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`relative overflow-hidden rounded-sm group cursor-pointer ${className}`}
    >
      {/* Image */}
      <div className="relative w-full h-full overflow-hidden">
        <Image
          src={src}
          alt={title}
          fill
          className={`object-cover transition-transform duration-[2400ms] ease-out ${hovered ? "scale-110" : "scale-100"
            } brightness-90 ${imageClassName}`}
        />
      </div>

      {/* Base gradient — always visible */}
      <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/10 to-transparent" />

      {/* Hover dark wash */}
      <div
        className={`absolute inset-0 bg-stone-950/25 transition-opacity duration-700 ${hovered ? "opacity-100" : "opacity-0"
          }`}
      />

      {/* Left accent bar */}
      <div
        className={`absolute left-0 top-[25%] bottom-[25%] w-px bg-gradient-to-b from-transparent via-amber-300/70 to-transparent transition-opacity duration-700 ${hovered ? "opacity-100" : "opacity-0"
          }`}
      />

      {/* Issue number */}
      <div className="absolute top-4 right-4 w-8 h-8 rounded-full border border-amber-300/30 bg-stone-950/50 backdrop-blur-sm flex items-center justify-center z-10">
        <span className="font-serif text-[10px] italic text-amber-300/90">
          {issue}
        </span>
      </div>

      {/* Card text */}
      <div
        className={`absolute bottom-0 left-0 right-0 px-5 pb-5 z-10 transition-transform duration-700 ease-out ${hovered ? "translate-y-0" : "translate-y-1.5"
          }`}
      >
        <span
          className={`block text-[8px] font-light tracking-[0.45em] uppercase text-amber-300 mb-2 transition-all duration-500 ${hovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
            }`}
        >
          {subtitle}
        </span>
        <h3 className="font-serif text-stone-100 leading-snug">{title}</h3>
      </div>
    </motion.div>
  );
};

export const MagazineGallery = () => {
  return (
    <section className="relative py-10 overflow-hidden">
      {/* Vertical center line */}
      <div className="absolute left-1/2 top-0 h-full w-px bg-gradient-to-b from-transparent via-amber-300/8 to-transparent -translate-x-1/2 pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-10">

        {/* Header */}
        <div className="flex items-center gap-6 mb-8">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent to-amber-300/20" />
          <div className="text-center shrink-0">
            <span className="block text-[9px] font-bold tracking-[0.5em] uppercase text-amber-300 mb-2">
              Visual Storytelling · Vol. IV
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-stone-950">
              The{" "}
              <em className="text-amber-300/90 not-italic font-serif">
                Magazine
              </em>
              {" "}Gallery
            </h2>
            <p className="mt-2 text-[10px] font-bold tracking-[0.2em] uppercase text-stone-500">
              An editorial journey through iconic creations
            </p>
          </div>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent to-amber-300/20" />
        </div>

        {/*
          GRID LAYOUT (desktop):
          Columns: [1.6fr] [1fr] [1.1fr]
          Rows: 2

          col-1 row-1/3 → hero (tall, left)
          col-2 row-1   → top-center (square)
          col-3 row-1/3 → right (tall, offset)
          col-2 row-2   → bottom-center (square)
        */}

        {/* Mobile: simple stack | Desktop: magazine grid */}
        <div className="flex flex-col gap-3 lg:grid lg:gap-3"
          style={{
            gridTemplateColumns: "1.6fr 1fr 1.1fr",
            gridTemplateRows: "190px 190px",
          }}
        >
          {/* Card 1 — Hero, left col, full height */}
          <div style={{ gridColumn: "1", gridRow: "1 / 3" }} className="h-80 lg:h-auto">
            <MagazineCard
              src={IMAGES[0].src}
              title={IMAGES[0].title}
              subtitle={IMAGES[0].subtitle}
              issue={IMAGES[0].issue}
              index={0}
              className="w-full h-full"
              imageClassName=""
            />
          </div>

          {/* Card 2 — Top center */}
          <div style={{ gridColumn: "2", gridRow: "1" }} className="h-60 lg:h-auto">
            <MagazineCard
              src={IMAGES[1].src}
              title={IMAGES[1].title}
              subtitle={IMAGES[1].subtitle}
              issue={IMAGES[1].issue}
              index={1}
              className="w-full h-full"
            />
          </div>

          {/* Card 3 — Right col, full height, offset down */}
          <div
            style={{ gridColumn: "3", gridRow: "1 / 3", marginTop: "48px" }}
            className="h-80 lg:h-auto"
          >
            <MagazineCard
              src={IMAGES[2].src}
              title={IMAGES[2].title}
              subtitle={IMAGES[2].subtitle}
              issue={IMAGES[2].issue}
              index={2}
              className="w-full h-full"
            />
          </div>

          {/* Card 4 — Bottom center */}
          <div style={{ gridColumn: "2", gridRow: "2" }} className="h-60 lg:h-auto">
            <MagazineCard
              src={IMAGES[3].src}
              title={IMAGES[3].title}
              subtitle={IMAGES[3].subtitle}
              issue={IMAGES[3].issue}
              index={3}
              className="w-full h-full"
            />
          </div>
        </div>

        {/* 5th card — full width feature strip below grid */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.0, delay: 0.6 }}
          className="mt-3 h-28 lg:h-32 relative overflow-hidden rounded-sm group cursor-pointer"
          style={{}}
        >
          <Image
            src={IMAGES[4].src}
            alt={IMAGES[4].title}
            fill
            className="object-cover object-center transition-transform duration-[2400ms] ease-out group-hover:scale-105 brightness-90"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-stone-950/70 via-stone-950/20 to-transparent" />
          <div className="absolute inset-0 bg-stone-950/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

          {/* Issue tag */}
          <div className="absolute top-4 right-4 w-8 h-8 rounded-full border border-amber-300/30 bg-stone-950/50 flex items-center justify-center">
            <span className="font-serif text-[10px] italic text-amber-300/90">05</span>
          </div>

          {/* Left accent */}
          <div className="absolute left-0 top-[20%] bottom-[20%] w-px bg-gradient-to-b from-transparent via-amber-300/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

          <div className="absolute left-8 bottom-0 top-0 flex flex-col justify-center">
            <span className="block text-[8px] font-light tracking-[0.45em] uppercase text-amber-300 mb-2 opacity-0 group-hover:opacity-100 transition-all duration-500 -translate-y-1 group-hover:translate-y-0">
              {IMAGES[4].subtitle}
            </span>
            <h3 className="font-serif text-2xl md:text-3xl text-stone-100 font-light">
              {IMAGES[4].title}
            </h3>
          </div>
        </motion.div>

        {/* Footer */}
        <div className="mt-6 flex justify-between items-end border-t border-amber-300/80 pt-4">
          <span className="text-[11px] font-bold tracking-[0.15em] uppercase text-stone-600">
            © Atelier Collection · 2026
          </span>
          <Link
            href="/gallery"
            className="group inline-flex items-center gap-4 text-[9px] font-bold tracking-[0.4em] uppercase text-amber-500 hover:text-amber-200 transition-colors duration-300"
          >
            <span
              className="h-px bg-amber-300 transition-all duration-700 group-hover:w-16 w-8"
            />
            Explore All Archives
          </Link>
        </div>
      </div>
    </section>
  );
};
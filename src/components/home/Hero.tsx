"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { shopApi } from "@/lib/api/shop";
import { resolveMediaUrl } from "@/lib/apiBase";

type Slide = {
  id: string;
  image: string;
  mobileImage: string;
  title: string;
  tagline: string;
  cta: string;
  link: string;
};

const FALLBACK_SLIDES: Slide[] = [
  {
    id: "fallback-1",
    image: "/images/optimized/banner-9.webp",
    mobileImage: "https://images.unsplash.com/photo-1617038220319-276d3cfab638?q=80&w=2000&auto=format&fit=crop",
    title: "",
    tagline: "",
    cta: "",
    link: "/category/all",
  },
];

export const Hero = () => {
  const [slides, setSlides] = useState<Slide[]>(FALLBACK_SLIDES);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    shopApi
      .banners()
      .then((list) => {
        const mapped = list
          .filter((b) => b.image?.trim())
          .map((b) => ({
            id: b._id,
            image: resolveMediaUrl(b.image),
            mobileImage: resolveMediaUrl(b.mobileImageUrl || b.image),
            title: (b.title || "").trim(),
            tagline: (b.subtitle || "").trim(),
            cta: (b.buttonText || b.ctaLabel || "").trim(),
            link: b.link || b.redirectLink || "/category/all",
          }));
        if (mapped.length) {
          setSlides(mapped);
          setCurrentIndex(0);
        }
      })
      .catch(() => { });
  }, []);

  const goTo = useCallback((index: number) => {
    if (index < 0 || index >= slides.length) return;
    setCurrentIndex(index);
  }, [slides.length]);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  useEffect(() => {
    if (!isAutoPlaying || slides.length <= 1) return;
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [isAutoPlaying, nextSlide, slides.length]);

  const slide = slides[currentIndex] ?? slides[0];
  const displayImage = isMobile ? slide.mobileImage : slide.image;
  const hasMultiple = slides.length > 1;
  const hasText = Boolean(slide.title || slide.tagline || slide.cta);

  return (
    <section
      className="group relative h-[100svh] min-h-[600px] w-full overflow-hidden bg-black"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      <Link
        href={slide.link}
        className="absolute inset-0 z-0 block"
        aria-label={slide.title || "View collection"}
      >
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={slide.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <Image
              src={displayImage}
              alt={slide.title || "Hero banner"}
              fill
              priority={currentIndex === 0}
              quality={80}
              sizes="100vw"
              className="object-cover object-center"
            />
          </motion.div>
        </AnimatePresence>
      </Link>

      {hasText ? (
        <div className="pointer-events-none absolute inset-0 z-20 flex items-center">
          <div className="mx-auto w-full max-w-7xl px-6">
            <div className="flex max-w-3xl flex-col items-center text-center lg:items-start lg:text-left">
              <AnimatePresence mode="wait">
                <motion.div
                  key={slide.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-6 md:space-y-8"
                >
                  {slide.title ? (
                    <div className="mt-32 space-y-4 md:mt-40">
                      <h1 className="font-serif text-4xl leading-[1.1] tracking-tight text-white drop-shadow-md md:text-5xl">
                        {slide.title.split(" ").map((word, i) => (
                          <span key={i} className={i % 2 !== 0 ? "font-light italic opacity-90" : ""}>
                            {word}{" "}
                          </span>
                        ))}
                      </h1>
                    </div>
                  ) : null}

                  {slide.tagline ? (
                    <p className="max-w-xl font-mono text-xs font-light uppercase leading-relaxed tracking-[0.2em] text-white md:text-sm">
                      {slide.tagline}
                    </p>
                  ) : null}

                  {slide.cta ? (
                    <div className="pointer-events-auto pt-2">
                      <Link
                        href={slide.link}
                        className="hero-next-button inline-block rounded-full bg-white px-14 py-5 text-[10px] font-bold uppercase tracking-[0.4em] text-foreground shadow-lg transition-all duration-300 hover:bg-champagne hover:text-white"
                      >
                        {slide.cta}
                      </Link>
                    </div>
                  ) : null}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      ) : null}

      {hasMultiple ? (
        <>
          <button
            type="button"
            aria-label="Previous slide"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              prevSlide();
            }}
            className="absolute left-4 top-1/2 z-30 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white opacity-0 transition-all duration-300 hover:bg-white/20 group-hover:opacity-100 md:left-8"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            type="button"
            aria-label="Next slide"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              nextSlide();
            }}
            className="absolute right-4 top-1/2 z-30 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white opacity-0 transition-all duration-300 hover:bg-white/20 group-hover:opacity-100 md:right-8"
          >
            <ChevronRight size={18} />
          </button>

          <div className="absolute bottom-8 left-1/2 z-30 flex -translate-x-1/2 items-center gap-3">
            {slides.map((s, index) => (
              <button
                key={s.id}
                type="button"
                aria-label={`Go to slide ${index + 1}`}
                aria-current={currentIndex === index ? "true" : undefined}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  goTo(index);
                }}
                className={`h-[2px] rounded-full transition-all duration-500 ${currentIndex === index
                    ? "w-10 bg-champagne"
                    : "w-4 bg-white/50 hover:w-6 hover:bg-white/80"
                  }`}
              />
            ))}
          </div>
        </>
      ) : null}
    </section>
  );
};

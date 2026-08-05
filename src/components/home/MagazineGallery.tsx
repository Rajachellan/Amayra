"use client";

import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { shopApi } from "@/lib/api/shop";
import { resolveMediaUrl } from "@/lib/apiBase";

/** Pre-compressed WebP (~40–300 KB) — avoids shipping multi‑MB JPGs in the bundle */
const IMAGES = [
  {
    id: 1,
    src: "/images/optimized/neckles_32.webp",
    title: "The Heritage Edit",
    subtitle: "A legacy of brilliance",
    issue: "01",
    link: "/category/necklaces"
  },
  {
    id: 2,
    src: "/images/optimized/neckles.webp",
    title: "Modern Minimal",
    subtitle: "Refined simplicity",
    issue: "02",
    link: "/category/earrings"
  },
  {
    id: 3,
    src: "/images/optimized/kundan_sets.webp",
    title: "Royal Kundan",
    subtitle: "Majestic details",
    issue: "03",
    link: "/category/chocker"
  },
  {
    id: 4,
    src: "/images/optimized/bangles_3.webp",
    title: "Bridal Essence",
    subtitle: "Timeless vows",
    issue: "04",
    link: "/category/bangles"
  },
  {
    id: 5,
    src: "/images/optimized/hip_chain.webp",
    title: "Hip Chain",
    subtitle: "Crafted for eternity",
    issue: "05",
    link: "/category/jewellery"
  },
];

type CardProps = {
  src: string;
  title: string;
  subtitle: string;
  issue: string;
  className?: string;
  imageClassName?: string;
  index: number;
  pdfUrl?: string;
};

const MagazineCard = ({
  src,
  title,
  subtitle,
  issue,
  className = "",
  imageClassName = "",
  index,
  pdfUrl,
}: CardProps) => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "80px" }}
      transition={{ duration: 1.0, delay: index * 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`relative overflow-hidden rounded-sm group cursor-pointer ${className}`}
    >
      <div className="relative w-full h-full overflow-hidden">
        <Image
          src={src}
          alt={title}
          fill
          loading="lazy"
          quality={75}
          sizes="(max-width: 1024px) 100vw, 33vw"
          className={`object-cover transition-transform duration-[2400ms] ease-out ${
            hovered ? "scale-110" : "scale-100"
          } brightness-90 ${imageClassName}`}
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/10 to-transparent" />
      <div
        className={`absolute inset-0 bg-stone-950/25 transition-opacity duration-700 ${
          hovered ? "opacity-100" : "opacity-0"
        }`}
      />
      <div
        className={`absolute left-0 top-[25%] bottom-[25%] w-px bg-gradient-to-b from-transparent via-amber-300/70 to-transparent transition-opacity duration-700 ${
          hovered ? "opacity-100" : "opacity-0"
        }`}
      />
      {pdfUrl && (
        <div className="absolute top-4 left-4 z-20 flex items-center gap-1.5 rounded-full bg-amber-300 px-2.5 py-1 text-[8px] font-extrabold uppercase tracking-wider text-stone-950 shadow-md">
          <svg className="h-2.5 w-2.5 text-stone-950" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          PDF
        </div>
      )}
      <div className="absolute top-4 right-4 w-8 h-8 rounded-full border border-amber-300/30 bg-stone-950/50 backdrop-blur-sm flex items-center justify-center z-10">
        <span className="font-serif text-[10px] italic text-amber-300/90">{issue}</span>
      </div>
      <div
        className={`absolute bottom-0 left-0 right-0 px-5 pb-5 z-10 transition-transform duration-700 ease-out ${
          hovered ? "translate-y-0" : "translate-y-1.5"
        }`}
      >
        <span
          className={`block text-[8px] font-light tracking-[0.45em] uppercase text-amber-300 mb-2 transition-all duration-500 ${
            hovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
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
  const [articles, setArticles] = useState<any[]>([]);

  useEffect(() => {
    shopApi.blogs({ limit: 5 })
      .then((res) => {
        setArticles(res.items || []);
      })
      .catch((err) => {
        console.error("Failed to load magazine articles", err);
      });
  }, []);

  const mergedArticles = useMemo(() => {
    const list = [...articles];
    for (let i = list.length; i < 5; i++) {
      const fallback = IMAGES[i];
      list.push({
        _id: `fallback-${fallback.id}`,
        title: fallback.title,
        excerpt: fallback.subtitle,
        coverImage: fallback.src,
        issue: fallback.issue,
        isFallback: true,
        fallbackLink: fallback.link,
      });
    }
    return list.slice(0, 5);
  }, [articles]);

  const ArticleLinkWrapper = ({ article, children, className = "" }: { article: any; children: React.ReactNode; className?: string }) => {
    const isPdf = !!article.pdfUrl;
    const href = article.isFallback 
      ? article.fallbackLink 
      : article.pdfUrl 
        ? resolveMediaUrl(article.pdfUrl)
        : article.linkType === "category" && article.category
          ? `/category/${typeof article.category === "object" ? article.category.slug : article.category}`
          : article.linkType === "product" && article.product
            ? `/product/${typeof article.product === "object" ? article.product.slug : article.product}`
            : `/blog/${article.slug}`;

    if (isPdf) {
      return (
        <a 
          href={href} 
          target="_blank" 
          rel="noopener noreferrer" 
          className={`block h-full w-full ${className}`}
        >
          {children}
        </a>
      );
    }

    return (
      <Link href={href} className={`block h-full w-full ${className}`}>
        {children}
      </Link>
    );
  };

  return (
    <section className="relative py-10 overflow-hidden">
      <div className="absolute left-1/2 top-0 h-full w-px bg-gradient-to-b from-transparent via-amber-300/8 to-transparent -translate-x-1/2 pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-10">
        <div className="flex items-center gap-6 mb-8">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent to-amber-300/20" />
          <div className="text-center shrink-0">
            <span className="block text-[12px] font-bold tracking-[0.5em] uppercase text-amber-300 mb-2">
              Visual Storytelling · Vol. IV
            </span>
            <h2 className="font-serif text-3xl md:text-5xl font-bold text-stone-950">
              The{" "}
              <em className="text-amber-300/90 not-italic font-serif">Magazine</em> Gallery
            </h2>
            <p className="mt-2 text-[10px] font-bold tracking-[0.2em] uppercase text-stone-500">
              An editorial journey through iconic creations
            </p>
          </div>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent to-amber-300/20" />
        </div>

        <div
          className="flex flex-col gap-3 lg:grid lg:gap-3"
          style={{
            gridTemplateColumns: "1.6fr 1fr 1.1fr",
            gridTemplateRows: "190px 190px",
          }}
        >
          {/* Card 1 */}
          <div style={{ gridColumn: "1", gridRow: "1 / 3" }} className="h-80 lg:h-auto">
            <ArticleLinkWrapper article={mergedArticles[0]}>
              <MagazineCard
                src={mergedArticles[0].isFallback ? mergedArticles[0].coverImage : resolveMediaUrl(mergedArticles[0].coverImage)}
                title={mergedArticles[0].title}
                subtitle={mergedArticles[0].excerpt || ""}
                issue={mergedArticles[0].isFallback ? mergedArticles[0].issue : "01"}
                pdfUrl={mergedArticles[0].pdfUrl}
                index={0}
                className="w-full h-full"
              />
            </ArticleLinkWrapper>
          </div>

          {/* Card 2 */}
          <div style={{ gridColumn: "2", gridRow: "1" }} className="h-60 lg:h-auto">
            <ArticleLinkWrapper article={mergedArticles[1]}>
              <MagazineCard
                src={mergedArticles[1].isFallback ? mergedArticles[1].coverImage : resolveMediaUrl(mergedArticles[1].coverImage)}
                title={mergedArticles[1].title}
                subtitle={mergedArticles[1].excerpt || ""}
                issue={mergedArticles[1].isFallback ? mergedArticles[1].issue : "02"}
                pdfUrl={mergedArticles[1].pdfUrl}
                index={1}
                className="w-full h-full"
              />
            </ArticleLinkWrapper>
          </div>

          {/* Card 3 */}
          <div
            style={{ gridColumn: "3", gridRow: "1 / 3", marginTop: "48px" }}
            className="h-80 lg:h-auto"
          >
            <ArticleLinkWrapper article={mergedArticles[2]}>
              <MagazineCard
                src={mergedArticles[2].isFallback ? mergedArticles[2].coverImage : resolveMediaUrl(mergedArticles[2].coverImage)}
                title={mergedArticles[2].title}
                subtitle={mergedArticles[2].excerpt || ""}
                issue={mergedArticles[2].isFallback ? mergedArticles[2].issue : "03"}
                pdfUrl={mergedArticles[2].pdfUrl}
                index={2}
                className="w-full h-full"
              />
            </ArticleLinkWrapper>
          </div>

          {/* Card 4 */}
          <div style={{ gridColumn: "2", gridRow: "2" }} className="h-60 lg:h-auto">
            <ArticleLinkWrapper article={mergedArticles[3]}>
              <MagazineCard
                src={mergedArticles[3].isFallback ? mergedArticles[3].coverImage : resolveMediaUrl(mergedArticles[3].coverImage)}
                title={mergedArticles[3].title}
                subtitle={mergedArticles[3].excerpt || ""}
                issue={mergedArticles[3].isFallback ? mergedArticles[3].issue : "04"}
                pdfUrl={mergedArticles[3].pdfUrl}
                index={3}
                className="w-full h-full"
              />
            </ArticleLinkWrapper>
          </div>
        </div>

        {/* Card 5 */}
        <ArticleLinkWrapper article={mergedArticles[4]}>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "80px" }}
            transition={{ duration: 1.0, delay: 0.6 }}
            className="mt-3 h-28 lg:h-32 relative overflow-hidden rounded-sm group cursor-pointer"
          >
            <Image
              src={mergedArticles[4].isFallback ? mergedArticles[4].coverImage : resolveMediaUrl(mergedArticles[4].coverImage)}
              alt={mergedArticles[4].title}
              fill
              loading="lazy"
              quality={75}
              sizes="100vw"
              className="object-cover object-center transition-transform duration-[2400ms] ease-out group-hover:scale-105 brightness-90"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-stone-950/70 via-stone-950/20 to-transparent" />
            <div className="absolute inset-0 bg-stone-950/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            
            {mergedArticles[4].pdfUrl && (
              <div className="absolute top-4 left-4 z-20 flex items-center gap-1.5 rounded-full bg-amber-300 px-2.5 py-1 text-[8px] font-extrabold uppercase tracking-wider text-stone-950 shadow-md">
                <svg className="h-2.5 w-2.5 text-stone-950" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                PDF
              </div>
            )}

            <div className="absolute top-4 right-4 w-8 h-8 rounded-full border border-amber-300/30 bg-stone-950/50 flex items-center justify-center">
              <span className="font-serif text-[10px] italic text-amber-300/90">
                {mergedArticles[4].isFallback ? mergedArticles[4].issue : "05"}
              </span>
            </div>
            <div className="absolute left-0 top-[20%] bottom-[20%] w-px bg-gradient-to-b from-transparent via-amber-300/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="absolute left-8 bottom-0 top-0 flex flex-col justify-center">
              <span className="block text-[8px] font-light tracking-[0.45em] uppercase text-amber-300 mb-2 opacity-0 group-hover:opacity-100 transition-all duration-500 -translate-y-1 group-hover:translate-y-0">
                {mergedArticles[4].excerpt || ""}
              </span>
              <h3 className="font-serif text-2xl md:text-3xl text-stone-100 font-light">
                {mergedArticles[4].title}
              </h3>
            </div>
          </motion.div>
        </ArticleLinkWrapper>

        <div className="mt-6 flex justify-between items-end border-t border-amber-300/80 pt-4">
          <span className="text-[11px] font-bold tracking-[0.15em] uppercase text-stone-600">
            © Mairii Collection · 2026
          </span>
          <Link
            href="/category/new"
            className="group inline-flex items-center gap-4 text-[12px] font-bold tracking-[0.4em] uppercase text-amber-400 hover:text-amber-300 transition-colors duration-300"
          >
            <span className="h-px bg-amber-300 transition-all duration-700 group-hover:w-16 w-8" />
            Explore All Collections
          </Link>
        </div>
      </div>
    </section>
  );
};

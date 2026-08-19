"use client";

import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { shopApi } from "@/lib/api/shop";
import { resolveMediaUrl } from "@/lib/apiBase";
import { ArrowRight, BookOpen } from "lucide-react";

/** Pre-compressed WebP & curated fallback items */
const IMAGES = [
  {
    id: 1,
    src: "/images/optimized/neckles_32.webp",
    title: "Floral Pearl Cascade Necklace",
    subtitle: "Royal Floral Cluster Necklace",
    issue: "01",
    link: "/blog/for-you-ma-mairii-origin-story"
  },
  {
    id: 2,
    src: "/images/optimized/neckles.webp",
    title: "Antique Temple Choker Set",
    subtitle: "Sacred grace & royal heritage",
    issue: "02",
    link: "/category/earrings"
  },
  {
    id: 3,
    src: "/images/optimized/kundan_sets.webp",
    title: "Royal Kundan Artistry",
    subtitle: "Majestic handcrafted details",
    issue: "03",
    link: "/category/chocker"
  },
  {
    id: 4,
    src: "/images/optimized/bangles_3.webp",
    title: "Bridal Essence",
    subtitle: "Timeless vows & bangles",
    issue: "04",
    link: "/category/bangles"
  },
  {
    id: 5,
    src: "/images/optimized/hip_chain.webp",
    title: "Hip Chain & Heritage Accents",
    subtitle: "Crafted for eternity and beauty",
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
      className={`relative overflow-hidden rounded-md group cursor-pointer border border-[#C4A064]/20 hover:border-[#C4A064]/60 transition-all duration-500 shadow-md ${className}`}
    >
      <div className="relative w-full h-full overflow-hidden">
        <Image
          src={src}
          alt={title}
          fill
          loading="lazy"
          quality={80}
          sizes="(max-width: 1024px) 100vw, 33vw"
          className={`object-cover transition-transform duration-[2000ms] ease-out ${
            hovered ? "scale-105" : "scale-100"
          } brightness-90 ${imageClassName}`}
        />
      </div>

      {/* Dark luxury gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/20 to-transparent" />
      
      {/* Gold highlight strip on hover */}
      <div
        className={`absolute left-0 top-[20%] bottom-[20%] w-1 bg-gradient-to-b from-amber-300 via-[#C4A064] to-amber-300 transition-opacity duration-500 ${
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

      {/* Issue Badge */}
      <div className="absolute top-4 right-4 w-9 h-9 rounded-full border border-amber-300/40 bg-stone-950/60 backdrop-blur-md flex items-center justify-center z-10 shadow-lg">
        <span className="font-serif text-[11px] italic font-semibold text-amber-300">{issue}</span>
      </div>

      {/* Card Content */}
      <div
        className={`absolute bottom-0 left-0 right-0 p-6 z-10 transition-transform duration-500 ease-out ${
          hovered ? "translate-y-0" : "translate-y-1"
        }`}
      >
        <span
          className={`block text-[9px] font-bold tracking-[0.3em] uppercase text-amber-300 mb-1.5 transition-all duration-300 ${
            hovered ? "opacity-100 translate-y-0 text-amber-200" : "opacity-90"
          }`}
        >
          {subtitle}
        </span>
        <h3 className="font-serif text-lg md:text-xl text-stone-100 font-normal leading-snug group-hover:text-amber-200 transition-colors">
          {title}
        </h3>
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
    <section className="relative py-20 md:py-28 bg-[#FAF8F3] overflow-hidden border-t border-stone-200">
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12 border-b border-[#C4A064]/20 pb-8">
          <div>
            <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-[#C4A064] block mb-2">
              THE MAIRII JOURNAL & MAGAZINE
            </span>
            <h2 className="font-serif text-3xl md:text-5xl font-normal text-[#2B2B2B]">
              Editorial <span className="italic text-[#C4A064]">Stories & Gallery</span>
            </h2>
          </div>

          <Link
            href="/blog"
            className="group inline-flex items-center gap-3 px-6 py-3 rounded-full bg-[#2C2A28] text-white text-[11px] font-bold tracking-[0.25em] uppercase hover:bg-[#C4A064] transition-all duration-300 shadow-md"
          >
            <BookOpen className="w-4 h-4 text-amber-300 group-hover:text-white" />
            Explore The Journal
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Grid Cards */}
        <div
          className="flex flex-col gap-4 lg:grid lg:gap-4"
          style={{
            gridTemplateColumns: "1.6fr 1fr 1.1fr",
            gridTemplateRows: "210px 210px",
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
            style={{ gridColumn: "3", gridRow: "1 / 3" }}
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

        {/* Card 5 Horizontal Banner */}
        <ArticleLinkWrapper article={mergedArticles[4]}>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "80px" }}
            transition={{ duration: 1.0, delay: 0.5 }}
            className="mt-4 h-32 lg:h-36 relative overflow-hidden rounded-md group cursor-pointer border border-[#C4A064]/20 hover:border-[#C4A064]/60 transition-all duration-500 shadow-md"
          >
            <Image
              src={mergedArticles[4].isFallback ? mergedArticles[4].coverImage : resolveMediaUrl(mergedArticles[4].coverImage)}
              alt={mergedArticles[4].title}
              fill
              loading="lazy"
              quality={80}
              sizes="100vw"
              className="object-cover object-center transition-transform duration-[2000ms] ease-out group-hover:scale-105 brightness-90"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-stone-950/80 via-stone-950/40 to-transparent" />
            
            <div className="absolute top-4 right-4 w-9 h-9 rounded-full border border-amber-300/40 bg-stone-950/60 backdrop-blur-md flex items-center justify-center">
              <span className="font-serif text-[11px] italic font-semibold text-amber-300">
                {mergedArticles[4].isFallback ? mergedArticles[4].issue : "05"}
              </span>
            </div>

            <div className="absolute left-8 bottom-0 top-0 flex flex-col justify-center">
              <span className="block text-[9px] font-bold tracking-[0.3em] uppercase text-amber-300 mb-1">
                {mergedArticles[4].excerpt || "Curated Series"}
              </span>
              <h3 className="font-serif text-xl md:text-3xl text-stone-100 font-light group-hover:text-amber-200 transition-colors">
                {mergedArticles[4].title}
              </h3>
            </div>
          </motion.div>
        </ArticleLinkWrapper>
      </div>
    </section>
  );
};

"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  shopApi,
  type PromoLayoutMode,
  type PromotionLayoutDoc,
  type PromotionalBannerDoc,
  type PromotionsPayload,
} from "@/lib/api/shop";
import { resolveMediaUrl } from "@/lib/apiBase";

function resolveLayoutMode(mode: PromoLayoutMode, count: number): PromoLayoutMode {
  if (mode !== "auto_responsive") return mode;
  if (count <= 1) return "one_banner";
  if (count === 2) return "two_equal";
  if (count === 3) return "three_cards";
  if (count === 4) return "grid_2x2";
  if (count === 5) return "one_large_four_small";
  if (count === 6) return "grid_3x2";
  return "carousel";
}

function gridClassForLayout(mode: PromoLayoutMode, count: number): string {
  const resolved = resolveLayoutMode(mode, count);
  switch (resolved) {
    case "one_banner":
      return "grid grid-cols-1";
    case "two_equal":
      return "grid grid-cols-1 md:grid-cols-2";
    case "three_cards":
      return "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";
    case "one_large_two_small":
      return "grid grid-cols-1 md:grid-cols-2 md:grid-rows-2";
    case "one_large_four_small":
      return "grid grid-cols-2 md:grid-cols-4 md:auto-rows-fr";
    case "grid_2x2":
      return "grid grid-cols-1 sm:grid-cols-2";
    case "grid_3x2":
      return "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";
    case "masonry":
      return "columns-1 sm:columns-2 lg:columns-3";
    case "carousel":
    case "horizontal_scroll":
      return "flex overflow-x-auto snap-x snap-mandatory pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden";
    default:
      return "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3";
  }
}

function cardSpanClass(mode: PromoLayoutMode, index: number, count: number): string {
  const resolved = resolveLayoutMode(mode, count);
  if (resolved === "one_large_two_small" && index === 0) return "md:row-span-2";
  if (resolved === "one_large_four_small" && index === 0) return "col-span-2 row-span-2";
  if (resolved === "carousel" || resolved === "horizontal_scroll") {
    return "min-w-[85%] sm:min-w-[48%] lg:min-w-[36%] snap-start shrink-0";
  }
  if (resolved === "masonry") return "mb-4 break-inside-avoid";
  return "";
}

function aspectClass(ratio?: PromotionLayoutDoc["aspectRatio"]) {
  switch (ratio) {
    case "16/9":
      return "aspect-video";
    case "16/7":
      return "aspect-[16/7]";
    case "4/3":
      return "aspect-[4/3]";
    case "1/1":
      return "aspect-square";
    case "3/4":
      return "aspect-[3/4]";
    default:
      return "min-h-[180px]";
  }
}

function borderClass(style?: PromotionalBannerDoc["borderStyle"]) {
  switch (style) {
    case "thin":
      return "border border-foreground/15";
    case "gold":
      return "border border-[#c4a46a]";
    case "luxury":
      return "border-2 border-[#c4a46a]/45";
    default:
      return "border border-foreground/10";
  }
}

function animationClass(anim?: PromotionalBannerDoc["animation"]) {
  switch (anim) {
    case "slide":
      return "transition-transform duration-500 hover:-translate-y-1";
    case "zoom":
      return "[&_img]:transition-transform [&_img]:duration-700 hover:[&_img]:scale-105";
    case "glow":
      return "hover:shadow-[0_0_28px_rgba(196,164,106,0.35)]";
    case "fade":
      return "animate-[fadeIn_0.7s_ease]";
    default:
      return "[&_img]:transition-transform [&_img]:duration-700 hover:[&_img]:scale-105";
  }
}

function PromoCard({
  card,
  layout,
  className = "",
}: {
  card: PromotionalBannerDoc;
  layout: PromotionLayoutDoc;
  className?: string;
}) {
  const href = card.buttonUrl || card.link || "#";
  const style: React.CSSProperties = {
    borderRadius: layout.borderRadius || "1rem",
    backgroundColor: card.backgroundColor || undefined,
    color: card.textColor || undefined,
    height: layout.autoHeight ? undefined : layout.cardHeight || undefined,
    boxShadow: layout.shadow ? "0 14px 40px rgba(28,25,22,0.1)" : undefined,
  };

  return (
    <Link
      href={href}
      className={`group relative block overflow-hidden ${aspectClass(layout.aspectRatio)} ${borderClass(card.borderStyle)} ${animationClass(card.animation)} ${layout.equalHeight ? "h-full" : ""} ${className}`}
      style={style}
    >
      {card.backgroundImage ? (
        <Image
          src={resolveMediaUrl(card.backgroundImage)}
          alt=""
          fill
          sizes="(max-width: 768px) 100vw, 40vw"
          className="object-cover opacity-50"
        />
      ) : null}
      <picture>
        {card.mobileImage ? (
          <source media="(max-width: 768px)" srcSet={resolveMediaUrl(card.mobileImage)} />
        ) : null}
        {card.image ? (
          <Image
            src={resolveMediaUrl(card.image)}
            alt={card.title || card.name || "Promotion"}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover"
          />
        ) : null}
      </picture>
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
      <div
        className="relative z-[1] flex h-full flex-col justify-end gap-1.5 p-5"
        style={{ color: card.textColor || "#faf7f2" }}
      >
        {card.badge ? (
          <span className="w-fit rounded-full bg-[#c4a46a] px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#1c1916]">
            {card.badge}
          </span>
        ) : null}
        {card.title || card.name ? (
          <h3 className="font-serif text-xl leading-tight md:text-2xl">{card.title || card.name}</h3>
        ) : null}
        {card.subtitle ? <p className="text-sm opacity-90">{card.subtitle}</p> : null}
        {card.description ? (
          <p className="line-clamp-2 text-xs opacity-80 md:text-sm">{card.description}</p>
        ) : null}
        {card.couponCode ? (
          <p className="text-[11px] tracking-wide opacity-85">Use code {card.couponCode}</p>
        ) : null}
        {card.buttonText ? (
          <span className="mt-1 w-fit rounded-full bg-[#c4a46a] px-4 py-1.5 text-xs font-medium text-[#1c1916]">
            {card.buttonText}
          </span>
        ) : null}
      </div>
    </Link>
  );
}

export function PromotionalBannersStrip() {
  const [payload, setPayload] = useState<PromotionsPayload | null>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    shopApi
      .promotionalBanners()
      .then(setPayload)
      .catch(() => setPayload(null));
  }, []);

  const cards = payload?.cards ?? [];
  const layout = payload?.layout;
  const mode = layout?.layout ?? "auto_responsive";
  const resolved = useMemo(() => resolveLayoutMode(mode, cards.length), [mode, cards.length]);
  const isScroll = resolved === "carousel" || resolved === "horizontal_scroll";

  useEffect(() => {
    if (resolved !== "carousel" || !scrollerRef.current || cards.length < 2) return;
    const el = scrollerRef.current;
    const id = window.setInterval(() => {
      const max = el.scrollWidth - el.clientWidth;
      if (max <= 0) return;
      const next = el.scrollLeft + el.clientWidth * 0.7;
      el.scrollTo({ left: next >= max - 8 ? 0 : next, behavior: "smooth" });
    }, 4500);
    return () => window.clearInterval(id);
  }, [resolved, cards.length]);

  if (!layout || !cards.length) return null;

  const gap = layout.gap ?? 16;
  const containerClass =
    layout.containerWidth === "full"
      ? "w-full px-4"
      : "container mx-auto px-4";

  return (
    <section
      style={{
        backgroundColor: layout.backgroundColor || "transparent",
        padding: layout.sectionPadding || undefined,
      }}
    >
      <div className={containerClass}>
        <div
          ref={scrollerRef}
          className={`${gridClassForLayout(mode, cards.length)} ${
            isScroll ? "" : layout.equalHeight ? "items-stretch" : ""
          }`}
          style={{ gap: `${gap}px` }}
        >
          {cards.map((card, index) => (
            <div key={card._id} className={cardSpanClass(mode, index, cards.length)}>
              <PromoCard card={card} layout={layout} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

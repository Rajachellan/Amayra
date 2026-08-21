"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ArrowRight, Gift, Star, Tag } from "lucide-react";
import { BotanicalDecoration } from "@/components/ui/BotanicalDecoration";
import { resolveMediaUrl } from "@/lib/apiBase";
import {
  shopApi,
  type AnnouncementDoc,
  type PromotionalBannerDoc,
  type PromotionLayoutDoc,
} from "@/lib/api/shop";

type OfferCard = PromotionalBannerDoc;

const FALLBACK_TICKER = [
  "Limited time wedding sale — flat 20% off bridal sets",
  "First order perk — use code WELCOME5 for extra 5% off",
  "Free silver coin on bridal orders above ₹2,00,000",
];

const FALLBACK_CARDS: OfferCard[] = [
  {
    _id: "fallback-1",
    title: "Flat 20% Off on Bridal Sets",
    badge: "Limited time · Wedding sale",
    description:
      "Mark the beginning of your forever with our signature heritage collections at exceptional prices.",
    buttonText: "Shop the sale",
    buttonUrl: "/shop",
    link: "/shop",
    backgroundColor: "#ffffff",
    textColor: "#0b2516",
    order: 0,
    image: "",
  },
  {
    _id: "fallback-2",
    title: "First purchase perk",
    description: "Get an extra 5% off on your first order. Use code",
    couponCode: "WELCOME5",
    buttonText: "Get code",
    buttonUrl: "/shop",
    link: "/shop",
    backgroundColor: "#ffffff",
    textColor: "#0b2516",
    order: 1,
    image: "",
  },
  {
    _id: "fallback-3",
    title: "Complimentary gift",
    description: "Free silver coin on all bridal orders above ₹2,00,000.",
    buttonText: "View details",
    buttonUrl: "/shop",
    link: "/shop",
    backgroundColor: "#0b2516",
    textColor: "#ffffff",
    order: 2,
    image: "",
  },
];

function hrefOf(card: OfferCard) {
  return card.buttonUrl || card.link || "#";
}

function isDarkCard(card: OfferCard, index: number) {
  const bg = (card.backgroundColor || "").toLowerCase();
  if (bg.includes("#0b2516") || bg.includes("0b2516")) return true;
  if (bg === "#0b2516" || bg === "rgb(11, 37, 22)") return true;
  if ((card.textColor || "").toLowerCase() === "#ffffff") return true;
  // Default third card in the classic 3-up layout is dark
  return !card.backgroundColor && index === 2;
}

export const OffersSection = () => {
  const [ticker, setTicker] = useState<string[]>([]);
  const [cards, setCards] = useState<OfferCard[]>([]);
  const [layout, setLayout] = useState<PromotionLayoutDoc | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    Promise.all([
      shopApi.announcements().catch(() => [] as AnnouncementDoc[]),
      shopApi.promotionalBanners().catch(() => null),
    ])
      .then(([announcements, promotions]) => {
        if (cancelled) return;

        const texts = announcements
          .map((a) => a.text?.trim())
          .filter((t): t is string => Boolean(t));
        setTicker(texts.length ? texts : FALLBACK_TICKER);

        if (promotions?.layout) setLayout(promotions.layout);

        const next = (promotions?.cards ?? []).filter(
          (c) => c.title || c.name || c.description || c.badge
        );
        setCards(next.length ? next : FALLBACK_CARDS);
      })
      .catch(() => {
        if (!cancelled) {
          setTicker(FALLBACK_TICKER);
          setCards(FALLBACK_CARDS);
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) {
    return (
      <section className="relative overflow-hidden py-16" style={{ backgroundColor: "var(--bg-sage-light)" }}>
        <BotanicalDecoration className="text-emerald-900" opacity={0.03} />
        <div className="container relative z-10 mx-auto space-y-6 px-4 md:px-6">
          <div className="h-10 w-full bg-emerald-950/10 rounded-full animate-pulse" />
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-64 bg-white/60 rounded-2xl animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  const mode = layout?.layout ?? "one_large_two_small";
  const useClassicTrio =
    (mode === "one_large_two_small" || mode === "auto_responsive") && cards.length === 3;

  return (
    <section
      className="relative overflow-hidden py-16"
      style={{ backgroundColor: "var(--bg-sage-light)" }}
    >
      <BotanicalDecoration className="text-emerald-900" opacity={0.03} />
      <div className="container relative z-10 mx-auto space-y-6 px-4 md:px-6">
        <TickerBar items={ticker} />

        {cards.length === 1 ? (
          <MainOfferCard card={cards[0]} />
        ) : cards.length === 2 ? (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <SideOfferCard card={cards[0]} index={0} />
            <SideOfferCard card={cards[1]} index={1} />
          </div>
        ) : (mode === "one_large_two_small" || mode === "auto_responsive") && cards.length >= 3 ? (
          <div className="space-y-5">
            <div className="flex flex-col gap-5 lg:flex-row">
              <MainOfferCard card={cards[0]} />
              <div className="flex w-full flex-col gap-5 lg:w-[38%]">
                <SideOfferCard card={cards[1]} index={1} />
                <SideOfferCard card={cards[2]} index={2} />
              </div>
            </div>

            {cards.length > 3 && (
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
                {cards.slice(3).map((card, i) => (
                  <SideOfferCard key={card._id} card={card} index={i + 3} />
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {cards.map((card, i) => (
              <SideOfferCard key={card._id} card={card} index={i} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

function TickerBar({ items }: { items: string[] }) {
  const doubled = [...items, ...items];
  return (
    <div className="overflow-hidden rounded-xl bg-emerald-dark py-2">
      <div className="animate-marquee flex w-max">
        {doubled.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="inline-flex items-center gap-3 whitespace-nowrap px-8 text-[14px] font-medium uppercase tracking-[0.18em] text-brand-gold"
          >
            <span className="h-1 w-1 flex-shrink-0 rounded-full bg-brand-gold" />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

function MainOfferCard({ card }: { card: OfferCard }) {
  const href = hrefOf(card);
  return (
    <Link
      href={href}
      className="group relative flex min-h-[380px] flex-1 animate-fade-right flex-col justify-center overflow-hidden rounded-3xl border border-emerald-dark/10 bg-white p-10 md:p-14"
      style={{
        backgroundColor: card.backgroundColor || "#ffffff",
        color: card.textColor || "#0b2516",
      }}
    >
      {card.image || card.backgroundImage ? (
        <Image
          src={resolveMediaUrl(card.backgroundImage || card.image)}
          alt={card.title || card.name || "Offer"}
          fill
          sizes="(max-width: 768px) 100vw, 60vw"
          className="object-cover opacity-30 group-hover:scale-105 transition-transform duration-700 pointer-events-none"
        />
      ) : null}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_80%_20%,rgba(196,160,100,0.09)_0%,transparent_65%)]" />
      <span className="absolute top-4 left-4 h-5 w-5 animate-shimmer-border rounded-tl border-t-2 border-l-2 border-emerald-dark/20" />
      <span className="absolute top-4 right-4 h-5 w-5 animate-shimmer-border rounded-tr border-t-2 border-r-2 border-emerald-dark/20 [animation-delay:0.6s]" />
      <span className="absolute bottom-4 left-4 h-5 w-5 animate-shimmer-border rounded-bl border-b-2 border-l-2 border-emerald-dark/20 [animation-delay:1.2s]" />
      <span className="absolute bottom-4 right-4 h-5 w-5 animate-shimmer-border rounded-br border-b-2 border-r-2 border-emerald-dark/20 [animation-delay:1.8s]" />

      {card.badge ? (
        <div className="absolute top-5 right-5 z-10 flex h-[72px] w-[72px] animate-float flex-col items-center justify-center rounded-full bg-brand-gold shadow-[0_4px_20px_rgba(196,160,100,0.4)]">
          <Tag className="mb-0.5 h-4 w-4 text-emerald-dark" />
          <span className="px-1 text-center text-[8px] font-semibold uppercase leading-tight tracking-wide text-emerald-dark">
            {card.badge.length > 18 ? "Offer" : card.badge}
          </span>
        </div>
      ) : null}

      {card.badge ? (
        <div className="mb-5 inline-flex w-fit animate-fade-up items-center gap-2 rounded-full bg-emerald-dark px-4 py-1.5 text-[12px] font-medium uppercase tracking-[0.18em] text-brand-gold">
          <span className="h-1.5 w-1.5 flex-shrink-0 animate-pulse-ring rounded-full bg-brand-gold" />
          {card.badge}
        </div>
      ) : null}

      <h2 className="mb-4 animate-fade-up font-serif text-4xl font-light leading-tight text-emerald-dark md:text-5xl lg:text-[3.2rem] [animation-delay:0.1s]">
        {card.title || card.name}
      </h2>

      {card.description || card.subtitle ? (
        <p className="mb-8 max-w-xs animate-fade-up text-[15px] leading-relaxed text-emerald-dark/70 [animation-delay:0.2s]">
          {card.description || card.subtitle}
        </p>
      ) : null}

      {card.couponCode ? (
        <span className="mb-6 inline-block w-fit rounded bg-emerald-dark/07 px-2.5 py-1 text-[11px] font-semibold tracking-widest text-emerald-dark">
          {card.couponCode}
        </span>
      ) : null}

      <span className="inline-flex w-fit animate-fade-up items-center gap-2 rounded-full bg-emerald-dark px-7 py-3.5 text-[13px] font-semibold uppercase tracking-[0.14em] text-brand-gold transition-all duration-200 group-hover:translate-x-1 group-hover:bg-emerald-medium [animation-delay:0.3s]">
        {card.buttonText || "Shop now"}
        <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
      </span>
    </Link>
  );
}

function SideOfferCard({ card, index }: { card: OfferCard; index: number }) {
  const dark = isDarkCard(card, index);
  const href = hrefOf(card);
  const Icon = index % 2 === 0 ? Gift : Star;

  return (
    <Link
      href={href}
      className={`group relative flex-1 cursor-pointer overflow-hidden rounded-2xl p-7 transition-all duration-300 hover:-translate-y-1 animate-fade-left ${
        dark
          ? "bg-emerald-dark hover:shadow-[0_16px_40px_rgba(11,37,22,0.25)]"
          : "border border-emerald-dark/10 bg-white hover:shadow-[0_16px_40px_rgba(11,37,22,0.12)]"
      }`}
      style={{
        backgroundColor: card.backgroundColor || undefined,
        color: card.textColor || undefined,
        animationDelay: index === 2 ? "0.15s" : undefined,
      }}
    >
      {card.image || card.backgroundImage ? (
        <Image
          src={resolveMediaUrl(card.backgroundImage || card.image)}
          alt={card.title || card.name || "Offer"}
          fill
          sizes="(max-width: 768px) 100vw, 40vw"
          className="object-cover opacity-25 group-hover:scale-105 transition-transform duration-700 pointer-events-none"
        />
      ) : null}
      <div
        className={`pointer-events-none absolute -top-5 -right-5 h-24 w-24 rounded-full ${
          dark ? "bg-brand-gold/08" : "bg-brand-gold/05"
        }`}
      />

      <div
        className={`mb-4 flex h-10 w-10 items-center justify-center rounded-xl ${
          dark ? "bg-brand-gold/15" : "bg-brand-gold/10"
        }`}
      >
        <Icon className="h-5 w-5 text-brand-gold" />
      </div>

      {card.badge ? (
        <p
          className={`mb-2 text-[10px] font-semibold uppercase tracking-[0.16em] ${
            dark ? "text-brand-gold" : "text-emerald-dark/50"
          }`}
        >
          {card.badge}
        </p>
      ) : null}

      <h3
        className={`mb-2 font-serif text-xl font-normal ${
          dark ? "text-white" : "text-emerald-dark"
        }`}
      >
        {card.title || card.name}
      </h3>

      {card.description || card.subtitle ? (
        <p
          className={`mb-3 text-[13px] leading-relaxed ${
            dark ? "text-white/70" : "text-emerald-dark/60"
          }`}
        >
          {card.description || card.subtitle}
        </p>
      ) : null}

      {card.couponCode ? (
        <span
          className={`mb-4 inline-block rounded px-2.5 py-1 text-[11px] font-semibold tracking-widest ${
            dark ? "bg-white/10 text-white" : "bg-emerald-dark/07 text-emerald-dark"
          }`}
        >
          {card.couponCode}
        </span>
      ) : null}

      <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-brand-gold transition-all duration-200 group-hover:gap-3">
        {card.buttonText || "Learn more"}
        <ArrowRight className="h-3.5 w-3.5" />
      </span>
    </Link>
  );
}

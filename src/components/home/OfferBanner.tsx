"use client";

import React, { useEffect, useRef } from "react";
import { Tag, ArrowRight, Zap, Gift, Star } from "lucide-react";

const TICKER_ITEMS = [
  "Limited time wedding sale — flat 20% off bridal sets",
  "First order perk — use code WELCOME5 for extra 5% off",
  "Free silver coin on bridal orders above ₹2,00,000",
];

export const OffersSection = () => {
  return (
    <section className="py-16   overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 space-y-6">
        {/* Ticker Bar */}
        <TickerBar items={TICKER_ITEMS} />

        {/* Cards Grid */}
        <div className="flex flex-col lg:flex-row gap-5">
          {/* Main Banner */}
          <MainCard />

          {/* Side Cards */}
          <div className="w-full lg:w-[38%] flex flex-col gap-5">
            <WelcomeCard />
            <GiftCard />
          </div>
        </div>
      </div>
    </section>
  );
};

/* ─── Ticker Bar ─────────────────────────────────────────────── */
function TickerBar({ items }: { items: string[] }) {
  const doubled = [...items, ...items];
  return (
    <div className="bg-emerald-dark rounded-xl py-2 overflow-hidden">
      <div className="flex whitespace-nowrap animate-ticker w-max">
        {doubled.map((item, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-3 px-8 text-brand-gold text-[10px] font-medium tracking-[0.18em] uppercase"
          >
            <span className="w-1 h-1 rounded-full bg-brand-gold flex-shrink-0" />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ─── Main Card ──────────────────────────────────────────────── */
function MainCard() {
  return (
    <div className="flex-1 relative overflow-hidden rounded-3xl bg-emerald-soft/30 border border-emerald-dark/10 min-h-[380px] flex flex-col justify-center p-10 md:p-14 animate-fade-right group">
      {/* Radial gold glow */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_80%_20%,rgba(196,160,100,0.09)_0%,transparent_65%)]" />

      {/* Scan line */}
      <div className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-gold/25 to-transparent animate-scan pointer-events-none" />

      {/* Corner brackets */}
      <span className="absolute top-4 left-4 w-5 h-5 border-t-2 border-l-2 border-emerald-dark/20 rounded-tl animate-shimmer-border" />
      <span className="absolute top-4 right-4 w-5 h-5 border-t-2 border-r-2 border-emerald-dark/20 rounded-tr animate-shimmer-border [animation-delay:0.6s]" />
      <span className="absolute bottom-4 left-4 w-5 h-5 border-b-2 border-l-2 border-emerald-dark/20 rounded-bl animate-shimmer-border [animation-delay:1.2s]" />
      <span className="absolute bottom-4 right-4 w-5 h-5 border-b-2 border-r-2 border-emerald-dark/20 rounded-br animate-shimmer-border [animation-delay:1.8s]" />

      {/* Floating badge */}
      <div className="absolute top-5 right-5 w-[72px] h-[72px] bg-brand-gold rounded-full flex flex-col items-center justify-center animate-float shadow-[0_4px_20px_rgba(196,160,100,0.4)] z-10">
        <span className="text-emerald-dark text-xl font-bold leading-none">20%</span>
        <span className="text-emerald-dark text-[9px] font-semibold tracking-widest uppercase">Off</span>
      </div>

      {/* Sparkle dots */}
      <span className="absolute bottom-12 right-6 w-2 h-2 bg-brand-gold rounded-full animate-sparkle" />
      <span className="absolute bottom-16 right-10 w-1.5 h-1.5 bg-brand-gold rounded-full animate-sparkle [animation-delay:0.7s]" />
      <span className="absolute bottom-8 right-12 w-1 h-1 bg-brand-gold rounded-full animate-sparkle [animation-delay:1.4s]" />

      {/* Live pill badge */}
      <div className="inline-flex items-center gap-2 bg-emerald-dark text-brand-gold text-[10px] font-medium tracking-[0.18em] uppercase px-4 py-1.5 rounded-full mb-5 w-fit animate-fade-up">
        <span className="w-1.5 h-1.5 rounded-full bg-brand-gold animate-pulse-ring flex-shrink-0" />
        Limited time · Wedding sale
      </div>

      <h2 className="font-serif text-emerald-dark text-4xl md:text-5xl lg:text-[3.2rem] font-light leading-tight mb-4 animate-fade-up [animation-delay:0.1s]">
        Flat{" "}
        <em className="text-brand-gold not-italic italic">20% Off</em>
        <br />
        on Bridal Sets
      </h2>

      <p className="text-emerald-dark/70 text-[15px] leading-relaxed mb-8 max-w-xs animate-fade-up [animation-delay:0.2s]">
        Mark the beginning of your forever with our signature heritage
        collections at exceptional prices.
      </p>

      <button className="inline-flex items-center gap-2 bg-emerald-dark text-brand-gold text-[11px] font-semibold tracking-[0.14em] uppercase px-7 py-3.5 rounded-full w-fit transition-all duration-200 hover:bg-emerald-medium hover:translate-x-1 group animate-fade-up [animation-delay:0.3s]">
        Shop the sale
        <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
      </button>
    </div>
  );
}

/* ─── Welcome Card ───────────────────────────────────────────── */
function WelcomeCard() {
  return (
    <div className="flex-1 bg-white rounded-2xl p-7 relative overflow-hidden border border-emerald-dark/08 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(11,37,22,0.12)] cursor-pointer animate-fade-left group">
      {/* Decor circle */}
      <div className="absolute -right-5 -top-5 w-24 h-24 rounded-full bg-brand-gold/05 pointer-events-none" />

      <div className="w-10 h-10 rounded-xl bg-brand-gold/10 flex items-center justify-center mb-4">
        <Gift className="w-5 h-5 text-brand-gold" />
      </div>

      <h3 className="font-serif text-emerald-dark text-xl font-normal mb-2">
        First purchase perk
      </h3>
      <p className="text-emerald-dark/60 text-[13px] leading-relaxed mb-3">
        Get an extra 5% off on your first order. Use code
      </p>
      <span className="inline-block bg-emerald-dark/07 text-emerald-dark text-[11px] font-semibold tracking-widest px-2.5 py-1 rounded mb-4">
        WELCOME5
      </span>

      <div>
        <button className="inline-flex items-center gap-1.5 text-brand-gold text-[10px] font-semibold tracking-[0.16em] uppercase transition-all duration-200 group-hover:gap-3">
          Get code
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}

/* ─── Gift Card ──────────────────────────────────────────────── */
function GiftCard() {
  return (
    <div className="flex-1 bg-emerald-dark rounded-2xl p-7 relative overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(11,37,22,0.25)] cursor-pointer animate-fade-left [animation-delay:0.15s] group">
      {/* Spinning ring */}
      <div className="absolute top-4 right-4 w-11 h-11 rounded-full border border-brand-gold/20 animate-spin-slow pointer-events-none" />
      <div className="absolute top-6 right-6 w-7 h-7 rounded-full border border-dashed border-brand-gold/15 pointer-events-none" />

      {/* Decor circle */}
      <div className="absolute -right-4 -top-4 w-24 h-24 rounded-full bg-brand-gold/08 pointer-events-none" />

      <div className="w-10 h-10 rounded-xl bg-brand-gold/15 flex items-center justify-center mb-4">
        <Star className="w-5 h-5 text-brand-gold" />
      </div>

      <h3 className="font-serif text-white text-xl font-normal mb-2">
        Complimentary gift
      </h3>
      <p className="text-white/70 text-[13px] leading-relaxed mb-4">
        Free silver coin on all bridal orders above ₹2,00,000.
      </p>

      <button className="inline-flex items-center gap-1.5 text-brand-gold text-[10px] font-semibold tracking-[0.16em] uppercase transition-all duration-200 group-hover:gap-3">
        View details
        <ArrowRight className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
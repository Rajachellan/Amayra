"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { Play, ShoppingBag, ChevronLeft, ChevronRight } from "lucide-react";
import neckles from "../../assets/pexels-loadingstudios-13645592.jpg";
import kammal from "../../assets/pexels-yogendras31-2733490.jpg"
import bridal from "../../assets/pexels-skgphotography-5814563.jpg"
import chain from "../../assets/pexels-rahul-gurjar-2149067193-32879257.jpg"
import kolusu from "../../assets/pexels-vika-glitter-392079-7067964.jpg"
import bangles from "../../assets/pexels-gursher-gill-63702010-13661846.jpg";
import tikka from "../../assets/pexels-rani-sahu-9157351.jpg"
import nose_pin from "../../assets/pexels-cottonbro-9316936.jpg"
import earing from "../../assets/pexels-ellaboina-sumanth-2574650-4361861.jpg"
const videos = [
  { id: 1, tag: "Heritage", image: neckles, title: "Kudan Necklace Set", price: "₹75,000" },
  { id: 2, tag: "Bridal", image: nose_pin, title: "Bridal Nose Pin", price: "₹12,400" },
  { id: 3, tag: "Luxury", image: chain, title: "Santorini Necklace", price: "₹1,20,000" },
  { id: 4, tag: "Classic", image: earing, title: "Ruby Earring Set", price: "₹45,600" },
  { id: 5, tag: "Temple", image: bangles, title: "Temple Bangles", price: "₹88,000" },
  { id: 6, tag: "Royal", image: tikka, title: "Royal Maang Tikka", price: "₹32,000" },
  { id: 7, tag: "Gold", image: kammal, title: "Antique Jhumkas", price: "₹54,000" },
];

const SPV = 6;          // slides per view
const CLONE = SPV;      // clones on each side (must be >= SPV)
const N = videos.length;

// Clone list: [last 6] + [all 7] + [first 6]
const fullList = [
  ...videos.slice(N - CLONE),
  ...videos,
  ...videos.slice(0, CLONE),
];

export const InstagramBridalCarousel = () => {
  const [realIdx, setRealIdx] = useState(0);
  const [animated, setAnimated] = useState(false);
  const [slideW, setSlideW] = useState(0);
  const vpRef = useRef<HTMLDivElement>(null);
  const animating = useRef(false);
  const autoRef = useRef<ReturnType<typeof setInterval> | null>(null);

  /* ── measure viewport width → slide width ── */
  const measure = useCallback(() => {
    if (vpRef.current) setSlideW(vpRef.current.offsetWidth / SPV);
  }, []);

  useEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

  /* ── autoplay ── */
  const resetAuto = useCallback(() => {
    if (autoRef.current) clearInterval(autoRef.current);
    autoRef.current = setInterval(() => slide(1), 3200);
  }, []);

  useEffect(() => { resetAuto(); return () => { if (autoRef.current) clearInterval(autoRef.current); }; }, []);

  /* ── slide one step ── */
  const slide = useCallback((dir: number) => {
    if (animating.current) return;
    animating.current = true;
    setAnimated(true);
    setRealIdx(prev => prev + dir);
    resetAuto();
  }, [resetAuto]);

  const jumpTo = (idx: number) => {
    setAnimated(true);
    setRealIdx(((idx % N) + N) % N);
    resetAuto();
  };

  /* ── seamless loop snap ── */
  const onTransitionEnd = () => {
    animating.current = false;
    setRealIdx(prev => {
      if (prev >= N) { setAnimated(false); return prev - N; }
      if (prev < 0) { setAnimated(false); return prev + N; }
      return prev;
    });
  };

  const displayIdx = ((realIdx % N) + N) % N;
  const translateX = -((realIdx + CLONE) * slideW);
  const cardH = Math.round(slideW * 1.55); // 9:16-ish ratio

  return (
    <section className="py-12 overflow-hidden" style={{ background: "#FBF6E9" }}>

      {/* ── Header ── */}
      <div className="flex justify-between items-end px-8 mb-7">
        <div>
          <div className="inline-flex items-center gap-2 border rounded-full px-4 py-1.5 mb-4"
            style={{ background: "#fff", borderColor: "#C9973A", color: "#7A5A18", fontSize: 10, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase" }}>
            <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "#C9973A" }} />
            Watch &amp; Shop
          </div>
          <h2 className="font-serif text-[34px] mb-1.5" style={{ color: "#1A3D2B", fontWeight: 400 }}>Bridal Reels</h2>
          <p className="text-sm" style={{ color: "#9A8860", maxWidth: 340, lineHeight: 1.6 }}>
            Discover our exclusive bridal masterpieces — explore each shining piece.
          </p>
        </div>

        <div className="flex items-center gap-3 flex-shrink-0">
          <div className="flex flex-col items-end mr-1">
            <span className="font-medium text-[22px] leading-none" style={{ color: "#1A3D2B" }}>
              {String(displayIdx + 1).padStart(2, "0")}
            </span>
            <span className="text-[11px]" style={{ color: "#B8A07A", letterSpacing: "0.08em" }}>
              of {String(N).padStart(2, "0")}
            </span>
          </div>
          {[{ id: "prev", dir: -1, Icon: ChevronLeft }, { id: "next", dir: 1, Icon: ChevronRight }].map(({ id, dir, Icon }) => (
            <button key={id}
              onClick={() => slide(dir)}
              className="flex items-center justify-center rounded-full transition-all"
              style={{ width: 40, height: 40, border: "1.5px solid #D4B87A", background: "transparent", color: "#1A3D2B", cursor: "pointer" }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "#C9973A"; (e.currentTarget as HTMLElement).style.borderColor = "#C9973A"; (e.currentTarget as HTMLElement).style.color = "#fff"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "transparent"; (e.currentTarget as HTMLElement).style.borderColor = "#D4B87A"; (e.currentTarget as HTMLElement).style.color = "#1A3D2B"; }}
            >
              <Icon className="w-4 h-4" />
            </button>
          ))}
        </div>
      </div>

      {/* ── Track ── */}
      <div ref={vpRef} className="overflow-hidden w-full"
        onMouseEnter={() => { if (autoRef.current) clearInterval(autoRef.current); }}
        onMouseLeave={resetAuto}
      >
        <div
          className="flex"
          style={{
            transform: `translateX(${translateX}px)`,
            transition: animated ? "transform 0.55s cubic-bezier(0.25,0.46,0.45,0.94)" : "none",
            willChange: "transform",
          }}
          onTransitionEnd={onTransitionEnd}
        >
          {fullList.map((v, i) => {
            const ri = i - CLONE;
            const isActive = ri === realIdx || ri === realIdx + N || ri === realIdx - N;
            return (
              <div key={i} style={{ flexShrink: 0, width: slideW, padding: "0 6px" }}>
                <div
                  className="relative group cursor-pointer rounded-2xl overflow-hidden"
                  style={{
                    height: cardH,
                    boxShadow: isActive ? "0 18px 44px rgba(0,0,0,.22)" : "0 4px 16px rgba(0,0,0,.10)",
                    transform: isActive ? "translateY(-4px)" : "translateY(0)",
                    transition: "transform .3s, box-shadow .3s",
                  }}
                >
                  <Image src={v.image} alt={v.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width:768px) 50vw, 17vw" />

                  <div className="absolute inset-0"
                    style={{ background: "linear-gradient(to top,rgba(8,18,10,.90) 0%,rgba(0,0,0,.10) 52%,transparent 100%)" }} />

                  {/* Play */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <div className="rounded-full flex items-center justify-center border"
                      style={{ width: 44, height: 44, background: "rgba(255,255,255,.18)", borderColor: "rgba(255,255,255,.5)" }}>
                      <Play className="fill-white text-white ml-0.5" style={{ width: 16, height: 16 }} />
                    </div>
                  </div>

                  {/* Info */}
                  <div className="absolute bottom-0 left-0 right-0" style={{ padding: "14px 13px" }}>
                    <span className="inline-block mb-1" style={{
                      fontSize: 9, letterSpacing: ".18em", textTransform: "uppercase",
                      color: "#F0D080", border: "1px solid rgba(201,151,58,.45)",
                      padding: "2px 8px", borderRadius: 20,
                    }}>{v.tag}</span>
                    <p className="font-serif text-white mb-0.5" style={{ fontSize: 14, lineHeight: 1.3 }}>{v.title}</p>
                    <p className="font-medium mb-2.5" style={{ fontSize: 12, color: "#F0D080" }}>{v.price}</p>
                    <button className="w-full flex items-center justify-center gap-1 rounded-lg text-white transition-colors"
                      style={{ padding: "8px 0", background: "#C9973A", fontSize: 10, letterSpacing: ".12em", textTransform: "uppercase", fontWeight: 500, border: "none", cursor: "pointer" }}
                      onMouseEnter={e => (e.currentTarget.style.background = "#1A3D2B")}
                      onMouseLeave={e => (e.currentTarget.style.background = "#C9973A")}
                    >
                      <ShoppingBag style={{ width: 12, height: 12 }} /> Shop Now
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Footer: arrows + dots + progress ── */}
      <div className="flex items-center justify-center gap-3 mt-5 px-8">

        {/* Left arrow */}
        <button onClick={() => slide(-1)} className="flex items-center justify-center rounded-full transition-all flex-shrink-0"
          style={{ width: 30, height: 30, border: "1.5px solid #D4B87A", background: "transparent", color: "#9A8860", cursor: "pointer" }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "#C9973A"; (e.currentTarget as HTMLElement).style.color = "#C9973A"; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "#D4B87A"; (e.currentTarget as HTMLElement).style.color = "#9A8860"; }}>
          <ChevronLeft style={{ width: 14, height: 14 }} />
        </button>

        {/* Dots */}
        <div className="flex items-center gap-1.5">
          {videos.map((_, i) => (
            <button key={i} onClick={() => jumpTo(i)} className="rounded-full border-none cursor-pointer transition-all flex-shrink-0"
              style={{ height: 7, width: i === displayIdx ? 22 : 7, background: i === displayIdx ? "#C9973A" : "#D4B87A", opacity: i === displayIdx ? 1 : 0.35 }} />
          ))}
        </div>

        {/* Right arrow */}
        <button onClick={() => slide(1)} className="flex items-center justify-center rounded-full transition-all flex-shrink-0"
          style={{ width: 30, height: 30, border: "1.5px solid #D4B87A", background: "transparent", color: "#9A8860", cursor: "pointer" }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "#C9973A"; (e.currentTarget as HTMLElement).style.color = "#C9973A"; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "#D4B87A"; (e.currentTarget as HTMLElement).style.color = "#9A8860"; }}>
          <ChevronRight style={{ width: 14, height: 14 }} />
        </button>


      </div>

    </section>
  );
};
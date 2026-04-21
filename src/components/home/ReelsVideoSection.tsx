"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft, Play, Volume2, VolumeX } from "lucide-react";

// ─── Replace with your actual video/thumbnail assets ─────────────────────────
// Each reel needs:
//   video : string  — path to .mp4 (or use an external URL)
//   thumb : string  — poster/thumbnail image path (StaticImport or string)

const REELS = [
  {
    id: 1,
    video: "/videos/reel1.mp4",
    thumb: "/thumbnails/reel1.jpg",
    title: "Eleanor Summer Studs",
    tag: "Spring Summer",
    tagStyle: "gold", // "gold" | "white"
  },
  {
    id: 2,
    video: "/videos/reel2.mp4",
    thumb: "/thumbnails/reel2.jpg",
    title: "Swivel Lattice Handcuff",
    tag: "New Arrival",
    tagStyle: "white",
  },
  {
    id: 3,
    video: "/videos/reel3.mp4",
    thumb: "/thumbnails/reel3.jpg",
    title: "Swivel Earcrawler (One Piece)",
    tag: "Bestseller",
    tagStyle: "white",
  },
  {
    id: 4,
    video: "/videos/reel4.mp4",
    thumb: "/thumbnails/reel4.jpg",
    title: "Paprika Summer Choker",
    tag: "Spring Summer '26",
    tagStyle: "gold",
  },
  {
    id: 5,
    video: "/videos/reel5.mp4",
    thumb: "/thumbnails/reel5.jpg",
    title: "Swivel Hair Harness",
    tag: "Limited Edition",
    tagStyle: "white",
  },
  {
    id: 6,
    video: "/videos/reel6.mp4",
    thumb: "/thumbnails/reel6.jpg",
    title: "Nomad Chain Drop Earrings",
    tag: "New Arrival",
    tagStyle: "white",
  },
];

// ─── Single Reel Card ─────────────────────────────────────────────────────────
const ReelCard = ({
  reel,
  isActive,
  onClick,
}: {
  reel: (typeof REELS)[0];
  isActive: boolean;
  onClick: () => void;
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const [playing, setPlaying] = useState(false);
  const [hovered, setHovered] = useState(false);

  // Auto-play when active
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (isActive) {
      v.play().then(() => setPlaying(true)).catch(() => { });
    } else {
      v.pause();
      v.currentTime = 0;
      setPlaying(false);
    }
  }, [isActive]);

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    videoRef.current.muted = !muted;
    setMuted((m) => !m);
  };

  const handleCardClick = () => {
    if (!isActive) { onClick(); return; }
    // If active, toggle play/pause
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) { v.play(); setPlaying(true); }
    else { v.pause(); setPlaying(false); }
  };

  return (
    <motion.div
      layout
      onClick={handleCardClick}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      animate={{
        scale: isActive ? 1 : 0.93,
        opacity: isActive ? 1 : 0.72,
      }}
      transition={{ duration: 0.55, ease: [0.32, 0.72, 0, 1] }}
      className="relative flex-shrink-0 overflow-hidden cursor-pointer select-none"
      style={{
        width: isActive ? "220px" : "190px",
        height: isActive ? "380px" : "330px",
        borderRadius: "12px",
        boxShadow: isActive
          ? "0 24px 60px -8px rgba(0,0,0,0.18), 0 0 0 1.5px rgba(212,183,131,0.30)"
          : "0 8px 24px -4px rgba(0,0,0,0.10)",
        transition: "width 0.55s cubic-bezier(0.32,0.72,0,1), height 0.55s cubic-bezier(0.32,0.72,0,1)",
      }}
    >
      {/* Video */}
      <video
        ref={videoRef}
        src={reel.video}
        poster={reel.thumb}
        muted={muted}
        loop
        playsInline
        preload="metadata"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, rgba(10,8,5,0.88) 0%, rgba(10,8,5,0.18) 45%, transparent 70%)",
        }}
      />

      {/* Champagne border glow on active */}
      {isActive && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            boxShadow: "inset 0 0 0 1.5px rgba(212,183,131,0.28)",
            borderRadius: "12px",
          }}
        />
      )}

      {/* Top tag */}
      {isActive && reel.tag && (
        <motion.div
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.35 }}
          className="absolute top-4 left-4"
        >
          <span
            className="block text-[8px] uppercase tracking-[0.42em] font-medium"
            style={{
              fontFamily: "'Raleway', sans-serif",
              color: reel.tagStyle === "gold" ? "#D4B783" : "rgba(255,255,255,0.85)",
            }}
          >
            {reel.tag}
          </span>
        </motion.div>
      )}

      {/* Play indicator (shown when paused & hovered on active) */}
      <AnimatePresence>
        {isActive && !playing && (
          <motion.div
            key="play-icon"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.25 }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
          >
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center"
              style={{
                background: "rgba(255,255,255,0.25)",
                border: "1px solid rgba(255,255,255,0.2)",
              }}
            >
              <Play className="w-5 h-5 fill-white text-white ml-0.5" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom info */}
      <div className="absolute inset-x-0 bottom-0 p-4">
        {/* Thumbnail + title row */}
        <div className="flex items-end gap-2.5">
          {/* Mini thumbnail */}
          <div
            className="flex-shrink-0 overflow-hidden rounded"
            style={{
              width: "42px",
              height: "42px",
              border: "1px solid rgba(212,183,131,0.35)",
            }}
          >
            <img
              src={reel.thumb}
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
          {/* Title */}
          <p
            className="text-white leading-tight flex-1"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: isActive ? "15px" : "13px",
              fontWeight: 400,
              letterSpacing: "0.01em",
            }}
          >
            {reel.title}
          </p>
        </div>

        {/* Mute toggle — only on active */}
        {isActive && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            onClick={toggleMute}
            className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center"
            style={{
              background: "rgba(0,0,0,0.45)",
              border: "1px solid rgba(255,255,255,0.15)",
            }}
            aria-label={muted ? "Unmute" : "Mute"}
          >
            {muted ? (
              <VolumeX className="w-3.5 h-3.5 text-white" />
            ) : (
              <Volume2 className="w-3.5 h-3.5 text-white" />
            )}
          </motion.button>
        )}
      </div>
    </motion.div>
  );
};

// ─── Main Section ─────────────────────────────────────────────────────────────
export const VideoReelSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const total = REELS.length;

  const prev = () => setActiveIndex((p) => (p - 1 + total) % total);
  const next = () => setActiveIndex((p) => (p + 1) % total);

  // Scroll active card into view
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const cards = track.querySelectorAll<HTMLElement>("[data-reel-card]");
    const card = cards[activeIndex];
    if (!card) return;
    const trackRect = track.getBoundingClientRect();
    const cardRect = card.getBoundingClientRect();
    const scrollLeft =
      track.scrollLeft +
      cardRect.left -
      trackRect.left -
      trackRect.width / 2 +
      cardRect.width / 2;
    track.scrollTo({ left: scrollLeft, behavior: "smooth" });
  }, [activeIndex]);

  return (
    <section className="py-20 bg-background overflow-hidden relative">
      {/* Top champagne hairline */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-px bg-champagne opacity-50" />

      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <span
            className="block text-[10px] uppercase tracking-[0.5em] text-foreground/40 mb-3"
            style={{ fontFamily: "'Raleway', sans-serif" }}
          >
            As seen in the wild
          </span>
          <h2
            className="text-foreground text-4xl md:text-5xl"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontWeight: 400,
              letterSpacing: "0.01em",
            }}
          >
            Catch the Magic of{" "}
            <em style={{ fontStyle: "italic", color: "var(--champagne, #D4B783)" }}>
              Amama!
            </em>
          </h2>
          <div className="flex items-center justify-center gap-3 mt-5">
            <div className="h-px w-12 bg-champagne/50" />
            <div className="w-1 h-1 rounded-full bg-champagne" />
            <div className="h-px w-12 bg-champagne/50" />
          </div>
        </div>

        {/* Reel track */}
        <div className="relative">
          {/* Left fade */}
          <div
            className="absolute left-0 top-0 bottom-0 w-16 z-20 pointer-events-none"
            style={{
              background:
                "linear-gradient(to right, var(--background, #fff) 0%, transparent 100%)",
            }}
          />
          {/* Right fade */}
          <div
            className="absolute right-0 top-0 bottom-0 w-16 z-20 pointer-events-none"
            style={{
              background:
                "linear-gradient(to left, var(--background, #fff) 0%, transparent 100%)",
            }}
          />

          {/* Scrollable track */}
          <div
            ref={trackRef}
            className="flex items-center gap-4 overflow-x-auto scrollbar-hide px-[calc(50%-110px)]"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              paddingTop: "12px",
              paddingBottom: "24px",
            }}
          >
            {REELS.map((reel, i) => (
              <div key={reel.id} data-reel-card="">
                <ReelCard
                  reel={reel}
                  isActive={i === activeIndex}
                  onClick={() => setActiveIndex(i)}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Controls row */}
        <div className="flex items-center justify-center gap-5 mt-4">
          <button
            onClick={prev}
            aria-label="Previous reel"
            className="w-10 h-10 rounded-full border border-foreground/12 bg-background flex items-center justify-center text-foreground/45 hover:border-champagne hover:text-foreground transition-all duration-300 shadow-sm"
          >
            <ChevronLeft className="w-4 h-4 stroke-[1.3]" />
          </button>

          {/* Dot nav */}
          <div className="flex items-center gap-1.5">
            {REELS.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                aria-label={`Reel ${i + 1}`}
                className="transition-all duration-400 rounded-full"
                style={{
                  height: "2px",
                  borderRadius: "2px",
                  width: i === activeIndex ? "28px" : "6px",
                  backgroundColor:
                    i === activeIndex
                      ? "var(--champagne, #D4B783)"
                      : "rgba(0,0,0,0.15)",
                }}
              />
            ))}
          </div>

          <button
            onClick={next}
            aria-label="Next reel"
            className="w-10 h-10 rounded-full border border-foreground/12 bg-background flex items-center justify-center text-foreground/45 hover:border-champagne hover:text-foreground transition-all duration-300 shadow-sm"
          >
            <ChevronRight className="w-4 h-4 stroke-[1.3]" />
          </button>
        </div>

        {/* Counter */}
        <p
          className="text-center mt-3 text-[11px] tracking-[0.3em] text-foreground/28"
          style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic" }}
        >
          {String(activeIndex + 1).padStart(2, "0")} &mdash;{" "}
          {String(total).padStart(2, "0")}
        </p>
      </div>

      {/* Bottom champagne hairline */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-px bg-champagne opacity-30" />
    </section>
  );
};
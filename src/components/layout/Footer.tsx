"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  ShieldCheck,
  Truck,
  RotateCcw,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Lock,
  MessageCircle,
  Award,
  ChevronUp,
  ExternalLink,
} from "lucide-react";
import { shopApi } from "@/lib/api/shop";
import toast from "react-hot-toast";

export const Footer = () => {
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      toast.error("Please enter a valid email address");
      return;
    }
    setSubmitting(true);
    try {
      await shopApi.subscribeNewsletter(cleanEmail, "footer_newsletter");
      setSubscribed(true);
      setEmail("");
      toast.success("Welcome to the Elite Circle!");
    } catch (err: any) {
      toast.error(err?.message || "Failed to subscribe. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative overflow-hidden bg-[#05140C] text-[#F3EFE6] selection:bg-[#c4a064] selection:text-[#05140C]">
      {/* ── Top Radiant Accent Line ── */}
      <div
        className="absolute top-0 left-0 right-0 h-[1.5px] z-10"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(196, 160, 100, 0.2) 15%, rgba(230, 211, 163, 0.95) 50%, rgba(196, 160, 100, 0.2) 85%, transparent 100%)",
        }}
      />

      {/* ── Ambient Radial Gold Glow ── */}
      <div
        className="absolute -top-36 left-1/2 -translate-x-1/2 w-[1100px] h-[380px] pointer-events-none opacity-30 blur-3xl"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(196, 160, 100, 0.5) 0%, rgba(10, 36, 22, 0.15) 60%, transparent 100%)",
        }}
      />

      <div className="relative container mx-auto px-6 sm:px-8 lg:px-12">
        {/* ── 1. MAISON VIP NEWSLETTER INVITATION ── */}
        <div className="pt-16 pb-12 border-b border-[#c4a064]/20">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0A2617] via-[#061B10] to-[#0D2F1D] border border-[#c4a064]/35 p-8 sm:p-12 lg:p-14 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)]">
            {/* Subtle filigree texture watermark */}
            <div
              className="absolute inset-0 pointer-events-none opacity-[0.04]"
              style={{
                backgroundImage: `radial-gradient(#c4a064 1px, transparent 1px)`,
                backgroundSize: "24px 24px",
              }}
            />

            {/* Corner Filigree Flourishes */}
            <div className="absolute top-3 left-3 w-7 h-7 border-t-2 border-l-2 border-[#c4a064]/50 rounded-tl-xl pointer-events-none" />
            <div className="absolute top-3 right-3 w-7 h-7 border-t-2 border-r-2 border-[#c4a064]/50 rounded-tr-xl pointer-events-none" />
            <div className="absolute bottom-3 left-3 w-7 h-7 border-b-2 border-l-2 border-[#c4a064]/50 rounded-bl-xl pointer-events-none" />
            <div className="absolute bottom-3 right-3 w-7 h-7 border-b-2 border-r-2 border-[#c4a064]/50 rounded-br-xl pointer-events-none" />

            <div className="relative flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 lg:gap-14">
              <div className="max-w-xl space-y-3.5">
                <div className="inline-flex items-center gap-2 rounded-full bg-[#c4a064]/15 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.25em] text-[#e6d3a3] border border-[#c4a064]/40 shadow-xs">
                  <Sparkles className="h-3.5 w-3.5 text-[#c4a064]" />
                  <span>Private Client Privileges</span>
                </div>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-medium tracking-wide text-[#FAF7F0] leading-tight">
                  Join the <span className="italic text-[#e6d3a3]">Elite Circle</span>
                </h3>
                <p className="text-xs sm:text-sm text-[#E2DFD7]/85 leading-relaxed font-light">
                  Subscribe to receive private archival previews, bespoke seasonal showcases,
                  and complimentary styling consultations directly to your inbox.
                </p>
              </div>

              {/* Newsletter Form */}
              <form onSubmit={handleSubscribe} className="w-full lg:w-auto">
                <div className="flex flex-col sm:flex-row items-stretch gap-3 w-full lg:w-[520px]">
                  <div className="relative flex-grow group">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[#c4a064] group-focus-within:text-[#e6d3a3] transition-colors" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="ENTER YOUR EMAIL ADDRESS"
                      required
                      disabled={submitting}
                      className="w-full rounded-xl bg-[#041009]/80 backdrop-blur-md pl-11 pr-4 py-3.5 text-xs tracking-wider text-white placeholder:text-white/50 border border-[#c4a064]/40 focus:border-[#e6d3a3] focus:outline-none focus:ring-2 focus:ring-[#c4a064]/40 transition-all duration-300"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={submitting || !email.trim()}
                    className="relative overflow-hidden inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#c4a064] via-[#f0dba5] to-[#c4a064] px-8 py-3.5 text-[11px] font-bold uppercase tracking-[0.25em] text-[#06160D] shadow-lg shadow-[#c4a064]/25 transition-all hover:brightness-110 hover:shadow-xl hover:shadow-[#c4a064]/40 active:scale-[0.98] disabled:opacity-50 cursor-pointer shrink-0 font-sans group"
                  >
                    <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 -translate-x-full group-hover:translate-x-full pointer-events-none" />
                    {submitting ? (
                      "Joining…"
                    ) : subscribed ? (
                      <span className="flex items-center gap-1.5 text-[#06160D] font-bold">
                        <CheckCircle2 className="h-4 w-4" /> Joined
                      </span>
                    ) : (
                      <>
                        <span>Subscribe</span>
                        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                      </>
                    )}
                  </button>
                </div>
                <div className="flex items-center gap-2 mt-3.5 text-[11px] text-[#E2DFD7]/75 tracking-wide">
                  <Lock className="h-3.5 w-3.5 text-[#c4a064] shrink-0" />
                  <span>We respect your privacy. 100% confidential. Unsubscribe at any time.</span>
                </div>
              </form>
            </div>
          </div>
        </div>



        {/* ── 3. MAIN NAVIGATION ARCHITECTURE ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 py-16 border-b border-[#c4a064]/20">
          {/* Column 1: Brand & Maison Concierge (4 cols on lg) */}
          <div className="lg:col-span-4 space-y-6 lg:pr-6">
            <Link href="/" className="inline-block group">
              <div className="relative">
                <div className="absolute -inset-2 rounded-xl bg-[#c4a064]/15 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <Image
                  src="/images/Media__5_-removebg-preview.png"
                  alt="MaiRii Jewels"
                  width={180}
                  height={60}
                  className="relative h-14 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                  priority
                />
              </div>
            </Link>

            <p className="text-xs text-[#E2DFD7]/85 leading-[1.9] font-light max-w-sm">
              Crafting stories of royal Indian heritage, timeless artistry, and regal elegance designed
              to be treasured for generations.
            </p>

            {/* Stylist Concierge Pill */}
            <div>
              <a
                href="https://wa.me/919566571655?text=Hello%20MaiRii%20Team%2C%20I%20would%20like%20assistance%20with%20jewellery%20styling"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-[#0C2718] via-[#0E2E1D] to-[#081E12] px-4 py-2.5 text-xs text-[#e6d3a3] border border-[#c4a064]/35 hover:border-[#c4a064] hover:shadow-[0_0_25px_rgba(196,160,100,0.3)] transition-all duration-300 cursor-pointer"
              >
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                </span>
                <MessageCircle className="h-4 w-4 text-emerald-400 group-hover:scale-110 transition-transform" />
                <span className="font-medium tracking-wide text-white group-hover:text-[#e6d3a3] transition-colors">
                  Chat with Jewellery Stylist
                </span>
              </a>
            </div>

            {/* Follow The Maison */}
            <div className="pt-2">
              <p className="text-[10px] uppercase tracking-[0.3em] text-[#c4a064] font-bold mb-3.5 flex items-center gap-2">
                <span className="h-px w-6 bg-[#c4a064]/40" />
                <span>Follow The Maison</span>
              </p>
              <div className="flex items-center gap-3">
                {[
                  {
                    name: "Instagram",
                    href: "https://instagram.com/mairiijewels",
                    icon: (
                      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                      </svg>
                    ),
                  },
                  {
                    name: "Facebook",
                    href: "https://facebook.com/mairiijewels",
                    icon: (
                      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                      </svg>
                    ),
                  },
                  {
                    name: "YouTube",
                    href: "https://youtube.com/@mairiijewels",
                    icon: (
                      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                      </svg>
                    ),
                  },
                ].map((s) => (
                  <a
                    key={s.name}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.name}
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5 border border-[#c4a064]/30 text-white/80 transition-all duration-300 hover:border-[#e6d3a3] hover:bg-[#c4a064] hover:text-[#06160D] hover:scale-110 shadow-xs"
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Column 2: Signature Collections (2 cols on lg) */}
          <div className="lg:col-span-2">
            <h4 className="font-serif text-xs font-semibold tracking-[0.25em] text-[#e6d3a3] uppercase mb-5 flex items-center gap-2">
              <span className="text-[#c4a064] text-[9px]">✦</span>
              <span>Collections</span>
            </h4>
            <ul className="space-y-3 font-light text-xs text-[#E2DFD7]/85">
              {[
<<<<<<< HEAD
                {
                  name: "Virasat",
                  href: "/category/all?collection=virasat",
                },
                {
                  name: "Pehla Tohfa",
                  href: "/category/all?collection=pehla-tohfa",
                },
                {
                  name: "Anchal",
                  href: "/category/all?collection=aanchal",
                },
                {
                  name: "Jashn e Noor",
                  href: "/category/all?collection=Jashn-noor",
                },

=======
                { name: "Virasat (Royal Heritage)", href: "/category/all?collection=virasat" },
                { name: "Pehla Tohfa (Festive Grace)", href: "/category/all?collection=pehla-tohfa" },
                { name: "AAnchal (Bridal Trousseau)", href: "/category/all?collection=aanchal" },
                { name: "Jashn Noor (Celebrations)", href: "/category/all?collection=Jashn-noor" },
                { name: "Darpan (Polki & Mirror)", href: "/category/all?collection=darpan" },
                { name: "New Arrivals Archive", href: "/category/all?sort=newest" },
>>>>>>> ecada8fa617ff5151a8b46cce3968290e097cacc
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="group inline-flex items-center gap-1.5 hover:text-[#FAF7F0] transition-all duration-200"
                  >
                    <span className="h-1 w-1 rounded-full bg-[#c4a064]/50 opacity-0 group-hover:opacity-100 group-hover:w-2 transition-all" />
                    <span className="group-hover:translate-x-1 transition-transform">
                      {item.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Shop by Category (2 cols on lg) */}
          <div className="lg:col-span-2">
            <h4 className="font-serif text-xs font-semibold tracking-[0.25em] text-[#e6d3a3] uppercase mb-5 flex items-center gap-2">
              <span className="text-[#c4a064] text-[9px]">✦</span>
              <span>Categories</span>
            </h4>
            <ul className="space-y-3 font-light text-xs text-[#E2DFD7]/85">
              {[
                { name: "Necklace Sets & Haars", href: "/category/necklaces" },
                { name: "Royal Chokers", href: "/category/choker" },
                { name: "Earrings & Jhumkis", href: "/category/earrings" },
                { name: "Bridal Sets & Ensembles", href: "/category/bridal" },
                { name: "Kundan & Jadau Craft", href: "/category/kundan" },
                { name: "View All Jewellery", href: "/category/all" },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="group inline-flex items-center gap-1.5 hover:text-[#FAF7F0] transition-all duration-200"
                  >
                    <span className="h-1 w-1 rounded-full bg-[#c4a064]/50 opacity-0 group-hover:opacity-100 group-hover:w-2 transition-all" />
                    <span className="group-hover:translate-x-1 transition-transform">
                      {item.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Client Services (2 cols on lg) */}
          <div className="lg:col-span-2">
            <h4 className="font-serif text-xs font-semibold tracking-[0.25em] text-[#e6d3a3] uppercase mb-5 flex items-center gap-2">
              <span className="text-[#c4a064] text-[9px]">✦</span>
              <span>Client Care</span>
            </h4>
            <ul className="space-y-3 font-light text-xs text-[#E2DFD7]/85">
              {[
                { name: "Our Story & Heritage", href: "/about" },
                { name: "Track Your Order", href: "/profile" },
                { name: "Shipping & Delivery Policy", href: "/shipping-returns" },
                { name: "Returns & Exchanges", href: "/returns-exchanges" },
                { name: "Jewellery Care Guide", href: "/blog" },
                { name: "Sitemap Directory", href: "/sitemap" },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="group inline-flex items-center gap-1.5 hover:text-[#FAF7F0] transition-all duration-200"
                  >
                    <span className="h-1 w-1 rounded-full bg-[#c4a064]/50 opacity-0 group-hover:opacity-100 group-hover:w-2 transition-all" />
                    <span className="group-hover:translate-x-1 transition-transform">
                      {item.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 5: The Atelier & Boutique (2 cols on lg) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="font-serif text-xs font-semibold tracking-[0.25em] text-[#e6d3a3] uppercase mb-5 flex items-center gap-2">
              <span className="text-[#c4a064] text-[9px]">✦</span>
              <span>The Atelier</span>
            </h4>

            <div className="space-y-4 text-xs text-[#E2DFD7]/85 font-light">
              <div className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-[#c4a064] shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  Door No F/22, F Block 2nd Main Road, AnnaNagar East, Chennai – 600 102
                </span>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-[#c4a064] shrink-0" />
                <a
                  href="tel:+919566571655"
                  className="hover:text-[#FAF7F0] transition font-medium tracking-wide"
                >
                  +91 9566571655
                </a>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-[#c4a064] shrink-0" />
                <a
                  href="mailto:connect@mairiijewels.com"
                  className="hover:text-[#FAF7F0] transition"
                >
                  connect@mairiijewels.com
                </a>
              </div>

              <div className="flex items-start gap-3 pt-3 border-t border-[#c4a064]/20">
                <Clock className="h-4 w-4 text-[#c4a064] shrink-0 mt-0.5" />
                <span className="text-[11px] text-[#E2DFD7]/75 leading-relaxed">
                  Mon – Sat: 10:30 AM – 8:00 PM IST
                  <br />
                  <span className="text-[#e6d3a3] font-medium">Sunday: By Appointment Only</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ── 4. BOTTOM BAR: SECURITY, PAYMENT BADGES & COPYRIGHT ── */}
        <div className="py-8 pb-24 md:pb-8 flex flex-col lg:flex-row items-center justify-between gap-6 text-xs text-white/65">
          {/* Copyright & Accreditations */}
          <div className="text-center lg:text-left space-y-1.5">
            <p className="text-[11px] text-[#FAF7F0]/90 tracking-wide font-light">
              © {new Date().getFullYear()} MaiRii Jewels Private Limited. All Rights Reserved.
            </p>
            <div className="text-[10px] text-white/50 flex flex-wrap items-center justify-center lg:justify-start gap-2">
              <span>Handcrafted in India with Pride</span>
              <span>•</span>
              <Link href="/privacy-policy" className="hover:text-[#c4a064] transition">
                Privacy Policy
              </Link>
              <span>•</span>
              <Link href="/terms-of-service" className="hover:text-[#c4a064] transition">
                Terms of Service
              </Link>
              <span>•</span>
              <Link href="/sitemap" className="hover:text-[#c4a064] transition">
                Sitemap
              </Link>
              <span>•</span>
              <span className="text-white/40">
                Managed with care by{" "}
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://rankraze.com"
                  className="text-[#c4a064]/80 hover:text-[#c4a064] hover:underline"
                >
                  @Rankraze
                </a>
              </span>
            </div>
          </div>

          {/* Secure Unified Luxury Payment Badges & Back to top */}
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            {/* 256-Bit SSL */}
            <div className="inline-flex items-center gap-1.5 rounded-lg bg-[#071D12] px-3 py-1.5 text-[10px] text-[#e6d3a3] border border-[#c4a064]/35 font-medium shadow-xs">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
              <span>256-Bit SSL Secured</span>
            </div>

            {/* Razorpay Badge */}
            <div className="inline-flex items-center gap-1 rounded-lg bg-[#071D12] px-2.5 py-1.5 text-[10px] font-semibold text-white/90 border border-white/10 tracking-wider">
              <span className="text-[#3395FF] font-bold text-xs">⚡</span>
              <span>RAZORPAY</span>
            </div>

            {/* UPI Badge */}
            <div className="inline-flex items-center gap-1 rounded-lg bg-[#071D12] px-2.5 py-1.5 text-[10px] font-bold text-white/90 border border-white/10 tracking-wider">
              <span className="text-[#00B9F1] font-extrabold text-xs">▲</span>
              <span>UPI</span>
            </div>

            {/* VISA Badge */}
            <div className="inline-flex items-center rounded-lg bg-[#071D12] px-2.5 py-1.5 text-[11px] font-black italic tracking-widest text-[#1A73E8] border border-white/10">
              VISA
            </div>

            {/* Mastercard Badge */}
            <div className="inline-flex items-center gap-1.5 rounded-lg bg-[#071D12] px-2.5 py-1.5 text-[10px] font-bold text-white/90 border border-white/10 tracking-wider">
              <div className="flex -space-x-1.5">
                <span className="h-3 w-3 rounded-full bg-[#EB001B] inline-block" />
                <span className="h-3 w-3 rounded-full bg-[#F79E1B] opacity-80 inline-block" />
              </div>
              <span>MASTERCARD</span>
            </div>

            {/* RuPay Badge */}
            <div className="inline-flex items-center gap-1 rounded-lg bg-[#071D12] px-2.5 py-1.5 text-[10px] font-bold text-white/90 border border-white/10 tracking-wider">
              <span className="text-[#00A859]">Ru</span>
              <span className="text-[#F37021]">Pay</span>
            </div>

            {/* NetBanking Badge */}
            <div className="inline-flex items-center rounded-lg bg-[#071D12] px-2.5 py-1.5 text-[10px] font-medium text-white/85 border border-white/10 tracking-wider">
              NETBANKING
            </div>

            {/* Back to top button */}
            <button
              onClick={scrollToTop}
              title="Return to top"
              aria-label="Return to top of page"
              className="ml-1 inline-flex h-8 w-8 items-center justify-center rounded-lg bg-[#c4a064]/15 hover:bg-[#c4a064] text-[#c4a064] hover:text-[#06160D] border border-[#c4a064]/30 transition-all duration-200 cursor-pointer"
            >
              <ChevronUp className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
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

  return (
    <footer className="relative overflow-hidden bg-[#07190F] text-white selection:bg-[#c4a064] selection:text-white">
      {/* Subtle background ambient gradients */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(196, 160, 100, 0.6), rgba(230, 211, 163, 0.9), rgba(196, 160, 100, 0.6), transparent)",
        }}
      />
      <div
        className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[350px] pointer-events-none opacity-20"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(196, 160, 100, 0.35) 0%, rgba(11, 37, 22, 0) 70%)",
        }}
      />

      {/* 1. TRUST & ARTISANAL EXCELLENCE STRIP */}
      <div className="border-b border-[#c4a064]/20 bg-[#092014]/60 backdrop-blur-xs">
        <div className="container mx-auto px-6 py-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {/* Guarantee 1 */}
            <div className="flex items-center gap-4 group">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#c4a064]/10 border border-[#c4a064]/30 text-[#e6d3a3] transition-all duration-300 group-hover:bg-[#c4a064] group-hover:text-[#07190F] group-hover:scale-105">
                <Sparkles className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-serif text-sm font-semibold tracking-wide text-[#e6d3a3]">
                  Artisanal Craftsmanship
                </h4>
                <p className="text-[11px] text-white/60 leading-relaxed mt-0.5">
                  Handcrafted by master Indian karigars with premium finish
                </p>
              </div>
            </div>

            {/* Guarantee 2 */}
            <div className="flex items-center gap-4 group">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#c4a064]/10 border border-[#c4a064]/30 text-[#e6d3a3] transition-all duration-300 group-hover:bg-[#c4a064] group-hover:text-[#07190F] group-hover:scale-105">
                <Truck className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-serif text-sm font-semibold tracking-wide text-[#e6d3a3]">
                  Complimentary Shipping
                </h4>
                <p className="text-[11px] text-white/60 leading-relaxed mt-0.5">
                  Insured pan-India delivery with live tracking
                </p>
              </div>
            </div>

            {/* Guarantee 3 */}
            <div className="flex items-center gap-4 group">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#c4a064]/10 border border-[#c4a064]/30 text-[#e6d3a3] transition-all duration-300 group-hover:bg-[#c4a064] group-hover:text-[#07190F] group-hover:scale-105">
                <RotateCcw className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-serif text-sm font-semibold tracking-wide text-[#e6d3a3]">
                  Hassle-Free Returns
                </h4>
                <p className="text-[11px] text-white/60 leading-relaxed mt-0.5">
                  7-day easy exchange & dedicated client support
                </p>
              </div>
            </div>

            {/* Guarantee 4 */}
            <div className="flex items-center gap-4 group">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#c4a064]/10 border border-[#c4a064]/30 text-[#e6d3a3] transition-all duration-300 group-hover:bg-[#c4a064] group-hover:text-[#07190F] group-hover:scale-105">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-serif text-sm font-semibold tracking-wide text-[#e6d3a3]">
                  100% Authenticity Guaranteed
                </h4>
                <p className="text-[11px] text-white/60 leading-relaxed mt-0.5">
                  Skin-friendly, hypoallergenic & quality inspected
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative container mx-auto px-6">
        {/* 2. VIP NEWSLETTER BOX */}
        <div className="py-12 border-b border-[#c4a064]/15">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#0d2a19] via-[#092214] to-[#0d2a19] border border-[#c4a064]/25 p-8 sm:p-10 shadow-2xl">
            {/* Background filigree watermark accent */}
            <div className="absolute right-0 top-0 bottom-0 w-80 pointer-events-none opacity-5 bg-[radial-gradient(#c4a064_1px,transparent_1px)] [background-size:16px_16px]" />

            <div className="relative flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
              <div className="max-w-xl">
                <div className="inline-flex items-center gap-2 rounded-full bg-[#c4a064]/15 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.3em] text-[#e6d3a3] border border-[#c4a064]/30 mb-3">
                  <Sparkles className="h-3 w-3 text-[#c4a064]" />
                  Private Client Privileges
                </div>
                <h3 className="text-2xl sm:text-3xl font-serif font-medium tracking-wide text-white">
                  Join the Elite Circle
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-white/70 leading-relaxed font-light">
                  Subscribe to receive private archival previews, bespoke seasonal showcases,
                  and complimentary styling consultations directly to your inbox.
                </p>
              </div>

              {/* Newsletter Form */}
              <form onSubmit={handleSubscribe} className="w-full lg:w-auto">
                <div className="flex flex-col sm:flex-row items-stretch gap-2.5 w-full lg:w-[480px]">
                  <div className="relative flex-grow">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[#c4a064]/70" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="ENTER YOUR EMAIL ADDRESS"
                      required
                      disabled={submitting}
                      className="w-full rounded-xl bg-black/30 pl-11 pr-4 py-3.5 text-xs tracking-wider text-white placeholder:text-white/40 border border-[#c4a064]/30 focus:border-[#c4a064] focus:outline-none focus:ring-1 focus:ring-[#c4a064] transition"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={submitting || !email.trim()}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#c4a064] to-[#a38043] px-7 py-3.5 text-[11px] font-bold uppercase tracking-[0.25em] text-[#07190F] shadow-lg shadow-[#c4a064]/20 transition-all hover:brightness-110 hover:shadow-xl active:scale-[0.98] disabled:opacity-50 cursor-pointer shrink-0 font-sans"
                  >
                    {submitting ? (
                      "Joining…"
                    ) : subscribed ? (
                      <span className="flex items-center gap-1.5 text-emerald-950 font-bold">
                        <CheckCircle2 className="h-4 w-4" /> Joined
                      </span>
                    ) : (
                      <>
                        Subscribe <ArrowRight className="h-3.5 w-3.5" />
                      </>
                    )}
                  </button>
                </div>
                <p className="mt-2 text-[10px] text-white/40 tracking-wider">
                  We respect your privacy. Unsubscribe at any time with a single click.
                </p>
              </form>
            </div>
          </div>
        </div>

        {/* 3. MULTI-COLUMN NAVIGATION GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 py-14 border-b border-[#c4a064]/15">
          {/* Column 1: Brand & Heritage */}
          <div className="lg:col-span-1 space-y-5">
            <Link href="/" className="inline-block group">
              <Image
                src="/images/Media__5_-removebg-preview.png"
                alt="MaiRii Jewels"
                width={170}
                height={55}
                className="h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                priority
              />
            </Link>
            <p className="text-xs text-white/70 leading-[1.8] font-light">
              Crafting stories of royal Indian heritage, timeless artistry, and regal elegance designed
              to be treasured for generations.
            </p>

            {/* Stylist Concierge Pill */}
            <a
              href="https://wa.me/919566571655?text=Hello%20MaiRii%20Team%2C%20I%20would%20like%20assistance%20with%20jewellery%20styling"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#c4a064]/15 px-3.5 py-1.5 text-[11px] font-medium text-[#e6d3a3] border border-[#c4a064]/30 hover:bg-[#c4a064]/25 transition cursor-pointer"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <MessageCircle className="h-3.5 w-3.5 text-emerald-400" />
              <span>Chat with Jewellery Stylist</span>
            </a>

            {/* Social Links */}
            <div>
              <p className="text-[10px] uppercase tracking-[0.25em] text-[#c4a064] font-bold mb-3">
                Follow The Maison
              </p>
              <div className="flex items-center gap-2.5">
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
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5 border border-[#c4a064]/30 text-white/70 transition-all duration-300 hover:bg-[#c4a064] hover:text-[#07190F] hover:scale-110"
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Column 2: Signature Collections */}
          <div>
            <h4 className="font-serif text-sm font-semibold tracking-wider text-[#e6d3a3] uppercase mb-5 flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#c4a064]"></span>
              Collections
            </h4>
            <ul className="space-y-3 font-light text-xs text-white/75">
              {[
<<<<<<< HEAD
                { name: "Virasat (Royal Heritage)", href: "/category/all?collection=virasat" },
                { name: "Pehla Tohfa (Festive Grace)", href: "/category/all?collection=pehla-tohfa" },
                { name: "AAnchal (Bridal Trousseau)", href: "/category/all?collection=aanchal" },
                { name: "Jashn Noor (Celebrations)", href: "/category/all?collection=Jashn-noor" },
                { name: "Darpan (Polki & Mirror)", href: "/category/all?collection=darpan" },
                { name: "New Arrivals Archive", href: "/category/all?sort=newest" },
=======
                {
                  name: "Virasat",
                  href: "/category/all?collection=virasat",
                },
                {
                  name: "Pehla Tohfa",
                  href: "/category/all?collection=pehla-tohfa",
                },
                {
                  name: "AAnchal",
                  href: "/category/all?collection=aanchal",
                },
                {
                  name: "Jashn e Noor",
                  href: "/category/all?collection=Jashn-noor",
                },

>>>>>>> c14ba75af9b64383e7b5f4ba4124b6af1ce0dbc2
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="inline-flex items-center gap-1.5 hover:text-[#e6d3a3] hover:translate-x-1 transition-all duration-200"
                  >
                    <span className="text-[#c4a064]/50">›</span> {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Shop by Category */}
          <div>
            <h4 className="font-serif text-sm font-semibold tracking-wider text-[#e6d3a3] uppercase mb-5 flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#c4a064]"></span>
              Categories
            </h4>
            <ul className="space-y-3 font-light text-xs text-white/75">
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
                    className="inline-flex items-center gap-1.5 hover:text-[#e6d3a3] hover:translate-x-1 transition-all duration-200"
                  >
                    <span className="text-[#c4a064]/50">›</span> {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Client Services & Trust */}
          <div>
            <h4 className="font-serif text-sm font-semibold tracking-wider text-[#e6d3a3] uppercase mb-5 flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#c4a064]"></span>
              Client Care
            </h4>
            <ul className="space-y-3 font-light text-xs text-white/75">
              {[
                { name: "Our Story & Heritage", href: "/about" },
                { name: "Track Your Order", href: "/profile" },
                { name: "Shipping & Delivery Policy", href: "/shipping-returns" },
                { name: "Returns & Exchanges", href: "/shipping-returns" },
                { name: "Jewellery Care Guide", href: "/blog" },
                { name: "Sitemap Directory", href: "/sitemap" },
                { name: "Privacy Policy", href: "/privacy-policy" },
                { name: "Terms of Service", href: "/terms-of-service" },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="inline-flex items-center gap-1.5 hover:text-[#e6d3a3] hover:translate-x-1 transition-all duration-200"
                  >
                    <span className="text-[#c4a064]/50">›</span> {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 5: The Atelier & Contact */}
          <div className="space-y-4">
            <h4 className="font-serif text-sm font-semibold tracking-wider text-[#e6d3a3] uppercase mb-5 flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#c4a064]"></span>
              The Atelier
            </h4>

            <div className="space-y-3.5 text-xs text-white/75 font-light">
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
                  className="hover:text-[#e6d3a3] transition font-medium"
                >
                  +91 9566571655
                </a>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-[#c4a064] shrink-0" />
                <a
                  href="mailto:connect@mairiijewels.com"
                  className="hover:text-[#e6d3a3] transition"
                >
                  connect@mairiijewels.com
                </a>
              </div>

              <div className="flex items-start gap-3 pt-1 border-t border-white/10">
                <Clock className="h-4 w-4 text-[#c4a064] shrink-0 mt-0.5" />
                <span className="text-[11px] text-white/60 leading-relaxed">
                  Mon – Sat: 10:30 AM – 8:00 PM IST
                  <br />
                  Sunday: By Appointment Only
                </span>
              </div>
            </div>
          </div>
        </div>

<<<<<<< HEAD
        {/* 4. BOTTOM BAR: SECURITY, PAYMENT BADGES & COPYRIGHT */}
        <div className="py-8 flex flex-col md:flex-row items-center justify-between gap-5 text-xs text-white/55">
          {/* Copyright */}
          <div className="text-center md:text-left space-y-1">
            <p className="text-[11px]">
              © {new Date().getFullYear()} MaiRii Jewels Private Limited. All Rights Reserved.
            </p>
            <p className="text-[10px] text-white/40 flex items-center justify-center md:justify-start gap-1.5">
              <span>Handcrafted with pride in India</span>
              <span>•</span>
              <span>Designed & Managed with love by</span>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://rankraze.com"
                className="text-[#c4a064] hover:underline"
              >
                @Rankraze
              </a>
              <span>•</span>
              <Link href="/sitemap" className="hover:text-[#c4a064] transition">
                Sitemap
              </Link>
            </p>
          </div>
=======
        {/* Bottom */}
        <div className="flex items-center justify-center py-7">
          <p className="w-full text-center text-[10px] text-white/50">
            © 2026 MaiRii. All Rights Reserved. Designed by{" "}
            <Link
              target="_blank"
              href="https://rankraze.com"
              className="hover:text-brand-gold transition-colors"
            >
              @Rankraze
            </Link>
          </p>

>>>>>>> c14ba75af9b64383e7b5f4ba4124b6af1ce0dbc2

          {/* Secure Payment Badges */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            <span className="inline-flex items-center gap-1 rounded-md bg-white/5 px-2 py-1 text-[10px] text-white/70 border border-white/10">
              <Lock className="h-3 w-3 text-emerald-400" /> 256-Bit SSL Encrypted
            </span>
            <span className="rounded-md bg-white/5 px-2 py-1 text-[10px] font-semibold text-white/80 border border-white/10">
              Razorpay
            </span>
            <span className="rounded-md bg-white/5 px-2 py-1 text-[10px] font-bold text-white/80 border border-white/10 tracking-wider">
              UPI
            </span>
            <span className="rounded-md bg-white/5 px-2 py-1 text-[10px] font-bold text-blue-400 border border-white/10">
              VISA
            </span>
            <span className="rounded-md bg-white/5 px-2 py-1 text-[10px] font-bold text-orange-400 border border-white/10">
              Mastercard
            </span>
            <span className="rounded-md bg-white/5 px-2 py-1 text-[10px] font-bold text-emerald-400 border border-white/10">
              RuPay
            </span>
            <span className="rounded-md bg-white/5 px-2 py-1 text-[10px] font-medium text-white/70 border border-white/10">
              NetBanking
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
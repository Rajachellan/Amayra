"use client";

import React from "react";
import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";

export const Footer = () => {
  return (
    <footer
      className="relative overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #fdf8f2 0%, #fef0e6 50%, #fdf5fb 100%)",
      }}
    >
      {/* Top border */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, #C4A064, transparent)",
        }}
      />

      {/* Soft glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(196,160,100,0.08) 0%, transparent 70%)",
        }}
      />

      <div className="relative container mx-auto px-6">
        {/* Newsletter */}
        <div
          className="flex flex-col lg:flex-row items-start lg:items-center justify-between py-14"
          style={{ borderBottom: "1px solid rgba(196,160,100,0.2)" }}
        >
          <div className="mb-8 lg:mb-0">
            <span
              className="text-[10px] uppercase tracking-[0.45em] font-bold block mb-3"
              style={{ color: "#C4A064" }}
            >
              Exclusive Access
            </span>

            <h3
              className="text-2xl md:text-3xl font-light tracking-wider mb-2"
              style={{ color: "#2C2A28" }} // dark text
            >
              Join the Elite Circle
            </h3>

            <p
              className="text-xs leading-relaxed max-w-sm"
              style={{ color: "#6B645D" }} // readable muted text
            >
              Subscribe to receive updates on new collections, exclusive offers,
              and jewellery care tips.
            </p>
          </div>

          <div className="flex w-full lg:w-auto">
            <input
              type="email"
              placeholder="YOUR EMAIL ADDRESS"
              className="flex-grow lg:w-72 px-5 py-3.5 text-xs tracking-[0.2em] focus:outline-none"
              style={{
                border: "1px solid rgba(196,160,100,0.3)",
                borderRight: "none",
                color: "#2C2A28",
                background: "transparent",
              }}
            />

            <button
              className="px-6 py-3.5 text-[10px] font-bold uppercase tracking-[0.3em]"
              style={{
                background: "#C4A064",
                color: "#fff",
              }}
            >
              Subscribe
            </button>
          </div>
        </div>

        {/* Links */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 py-14"
          style={{ borderBottom: "1px solid rgba(196,160,100,0.15)" }}
        >
          {/* Brand */}
          <div>
            <div className="mb-7">
              {/* <span
                className="text-xl tracking-[0.25em] block"
                style={{ color: "#2C2A28" }}
              >
              Amayra
              </span> */}
              <span
                className="text-xl uppercase tracking-[0.5em] block mt-[-3px]"
                style={{ color: "#C4A064" }}
              >
                Amayra
              </span>
            </div>

            <p
              className="text-xs leading-[1.9] mb-8"
              style={{ color: "#6B645D" }}
            >
              Crafting stories of elegance since 1990. We specialize in
              handcrafted diamond and gold jewellery that speaks to the soul.
            </p>

            <div className="flex space-x-5">
              {[
                {
                  name: "Instagram",
                  svg: (
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                      <path d="M7 2C4.24 2 2 4.24 2 7v10c0 2.76 2.24 5 5 5h10c2.76 
          0 5-2.24 5-5V7c0-2.76-2.24-5-5-5H7zm5 
          5a5 5 0 110 10 5 5 0 010-10zm6.5-.75a1.25 
          1.25 0 11-2.5 0 1.25 1.25 0 012.5 
          0zM12 9a3 3 0 100 6 3 3 0 000-6z" />
                    </svg>
                  ),
                },
                {
                  name: "Facebook",
                  svg: (
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                      <path d="M13 22v-8h3l1-4h-4V7c0-1.03.29-1.73 
          1.76-1.73H17V2.14C16.52 2.07 15.36 2 
          14.04 2 11.3 2 9.5 3.66 9.5 
          6.7V10H7v4h2.5v8H13z" />
                    </svg>
                  ),
                },
                {
                  name: "Twitter",
                  svg: (
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                      <path d="M22 5.92c-.77.35-1.6.58-2.46.69a4.28 
          4.28 0 001.88-2.36 8.59 8.59 0 01-2.71 
          1.03 4.26 4.26 0 00-7.27 3.88A12.09 
          12.09 0 013 4.8a4.26 4.26 0 001.32 
          5.69 4.2 4.2 0 01-1.93-.53v.05a4.26 
          4.26 0 003.42 4.18 4.3 4.3 0 01-1.92.07 
          4.26 4.26 0 003.98 2.95A8.55 8.55 0 
          012 19.54 12.07 12.07 0 008.29 21c7.55 
          0 11.68-6.26 11.68-11.68v-.53A8.18 
          8.18 0 0022 5.92z" />
                    </svg>
                  ),
                },
                {
                  name: "YouTube",
                  svg: (
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                      <path d="M21.8 8s-.2-1.4-.8-2a2.85 
          2.85 0 00-2-1C16.4 4.7 12 4.7 12 
          4.7h0s-4.4 0-7 .3a2.85 2.85 0 
          00-2 1c-.6.6-.8 2-.8 2S2 9.6 2 
          11.2v1.6c0 1.6.2 3.2.2 
          3.2s.2 1.4.8 2a3.36 3.36 0 
          002.2 1c1.6.2 6.8.3 6.8.3s4.4 
          0 7-.3a2.85 2.85 0 002-1c.6-.6.8-2 
          .8-2s.2-1.6.2-3.2v-1.6C22 
          9.6 21.8 8 21.8 8zM10 
          14.5v-5l5 2.5-5 2.5z" />
                    </svg>
                  ),
                },
              ].map((item, index) => (
                <Link
                  key={index}
                  href="#"
                  className="transition-all duration-300"
                  style={{ color: "#7A746D" }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "#C4A064")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "#7A746D")
                  }
                >
                  {item.svg}
                </Link>
              ))}
            </div>
          </div>

          {/* Collections */}
          <div>
            <h4
              className="text-[13px] font-bold tracking-[0.4em] uppercase mb-7"
              style={{ color: "#C4A064" }}
            >
              Collections
            </h4>

            <ul className="space-y-4 font-semibold">
              {[
                "Gold Jewellery",
                "Diamond Collection",
                "Bridal Couture",
                "Traditional Gems",
                "Pure Silver",
              ].map((item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className="text-xs uppercase tracking-widest"
                    style={{ color: "#6B645D" }}
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4
              className="text-[13px] font-bold tracking-[0.4em] uppercase mb-7"
              style={{ color: "#C4A064" }}
            >
              Company
            </h4>

            <ul className="space-y-4 font-semibold">
              {[
                { name: "Our Story", href: "/our-story" },
                { name: "Blogs", href: "/blog" },
                { name: "Shipping & Returns", href: "/shipping-returns" },
                { name: "Privacy Policy", href: "/privacy-policy" },
                { name: "Terms of Service", href: "/terms-of-service" },
                { name: "Store Locator", href: "/store-locator" },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-xs uppercase tracking-widest hover:text-champagne transition-colors"
                    style={{ color: "#6B645D" }}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4
              className="text-[13px] font-bold tracking-[0.4em] uppercase mb-7"
              style={{ color: "#C4A064" }}
            >
              Contact
            </h4>

            <ul className="space-y-5">
              <li className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 mt-0.5" color="#C4A064" />
                <span className="text-sm text-[#6B645D]">
                  123 Diamond Avenue, Jewellery Park,
                  <br /> Mumbai, MH – 400001
                </span>
              </li>

              <li className="flex items-center space-x-3">
                <Phone className="w-4 h-4" color="#C4A064" />
                <span className="text-sm text-[#6B645D]">
                  +91 98765 43210
                </span>
              </li>

              <li className="flex items-center space-x-3">
                <Mail className="w-4 h-4" color="#C4A064" />
                <span className="text-sm text-[#6B645D]">
                  concierge@amayra.com
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between py-7 gap-4">
          <p className="text-[10px]" style={{ color: "#8A837B" }}>
            © 2026 Amayra. All Rights Reserved.
          </p>

          <div className="flex items-center gap-6">
            <span className="text-[10px]" style={{ color: "#A39B92" }}>
              Developed by <Link target="_blank" href="https://rankraze.com">Rankraze</Link>
            </span>

            <div className="flex gap-2">
              {["VISA", "MC", "AMEX"].map((card) => (
                <div
                  key={card}
                  className="px-2 py-1 text-[9px] rounded"
                  style={{
                    background: "rgba(196,160,100,0.15)",
                    color: "#8B7355",
                  }}
                >
                  {card}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
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
              <span
                className="text-xl tracking-[0.25em] block"
                style={{ color: "#2C2A28" }}
              >
                GEMS OF
              </span>
              <span
                className="text-sm tracking-[0.5em] block mt-[-3px]"
                style={{ color: "#C4A064" }}
              >
                SHREE AARNA
              </span>
            </div>

            <p
              className="text-xs leading-[1.9] mb-8"
              style={{ color: "#6B645D" }}
            >
              Crafting stories of elegance since 1990. We specialize in
              handcrafted diamond and gold jewellery that speaks to the soul.
            </p>

            <div className="flex space-x-5 text-[10px] font-semibold">
              {["INSTA", "FB", "TWITTER", "YOUTUBE"].map((social) => (
                <Link
                  key={social}
                  href="#"
                  className="transition-colors duration-300"
                  style={{ color: "#7A746D" }}
                  onMouseEnter={(e) =>
                    ((e.currentTarget.style.color = "#C4A064"))
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget.style.color = "#7A746D"))
                  }
                >
                  {social}
                </Link>
              ))}
            </div>
          </div>

          {/* Collections */}
          <div>
            <h4
              className="text-[14px] font-bold tracking-[0.4em] uppercase mb-7 "
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
              className="text-[14px] font-bold tracking-[0.4em] uppercase mb-7"
              style={{ color: "#C4A064" }}
            >
              Company
            </h4>

            <ul className="space-y-4 font-semibold">
              {[
                "Our Story",
                "Shipping & Returns",
                "Privacy Policy",
                "Terms of Service",
                "Store Locator",
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

          {/* Contact */}
          <div>
            <h4
              className="text-[14px] font-bold tracking-[0.4em] uppercase mb-7"
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
                  concierge@shreeaarna.com
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between py-7 gap-4">
          <p className="text-[10px]" style={{ color: "#8A837B" }}>
            © 2026 Gems of Shree Aarna. All Rights Reserved.
          </p>

          <div className="flex items-center gap-6">
            <span className="text-[10px]" style={{ color: "#A39B92" }}>
              Powered by Luxury Tech
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
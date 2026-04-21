"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import craftImg from "../../assets/jewelry-on-female-body-in-indian-dress-2026-01-11-10-57-02-utc.jpg";

export const Craftsmanship = () => {
  return (
    <section className="py-28 bg-gradient-to-b from-[#faf9f6] to-[#f3f2ee] relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* IMAGE SECTION */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="relative h-[600px] rounded-[32px] overflow-hidden group"
          >
            <Image
              src={craftImg}
              alt="Craftsmanship"
              fill
              className="object-cover group-hover:scale-105 transition duration-700"
            />

            {/* Premium dark overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

            {/* Glow effect */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-700 bg-[radial-gradient(circle_at_30%_30%,rgba(255,215,0,0.2),transparent_60%)]" />

            {/* FLOATING GLASS CARD */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="absolute bottom-10 left-10 right-10 p-6 rounded-2xl backdrop-blur-md bg-white/10 border border-white/20 shadow-[0_10px_40px_rgba(0,0,0,0.25)]"
            >
              <p className="text-white text-sm tracking-widest uppercase font-medium leading-relaxed">
                Crafted with passion. Perfected over 40 years of timeless artistry.
              </p>
            </motion.div>
          </motion.div>

          {/* CONTENT */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="space-y-10"
          >
            {/* Heading */}
            <div>
              <span className="text-yellow-600 uppercase tracking-[0.5em] text-xs font-semibold">
                Heritage Artistry
              </span>

              <h2 className="mt-4 text-5xl font-serif text-gray-900 leading-tight">
                The Soul of <br />
                <span className="italic text-gray-600 font-light">
                  Every Creation
                </span>
              </h2>
            </div>

            {/* Steps */}
            <div className="space-y-8">

              {[
                {
                  title: "Meticulous Selection",
                  desc: "Carefully sourced gemstones with unmatched brilliance and authenticity."
                },
                {
                  title: "Heritage Crafting",
                  desc: "Traditional techniques passed through generations of master artisans."
                },
                {
                  title: "Precision Finishing",
                  desc: "Refined polishing process ensuring luxury in every detail."
                }
              ].map((item, i) => (
                <div key={i} className="flex gap-6 group items-start">
                  
                  {/* Number with gold glow */}
                  <div className="relative">
                    <span className="text-2xl font-serif text-yellow-600 opacity-70 group-hover:opacity-100 transition">
                      {`0${i + 1}`}
                    </span>
                    <div className="absolute inset-0 blur-xl opacity-0 group-hover:opacity-40 bg-yellow-400 transition"></div>
                  </div>

                  {/* Content */}
                  <div>
                    <h4 className="text-sm uppercase tracking-widest font-semibold text-gray-900">
                      {item.title}
                    </h4>
                    <p className="text-gray-600 mt-1 text-sm leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}

            </div>

            {/* Button */}
            <div>
              <button className="relative px-6 py-3 text-xs uppercase tracking-widest font-semibold text-gray-900 overflow-hidden group">
                
                <span className="relative z-10">Explore Our Process</span>

                {/* Animated gold underline */}
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-yellow-500 transform scale-x-0 group-hover:scale-x-100 transition origin-left"></span>

                {/* Soft glow */}
                <span className="absolute inset-0 opacity-0 group-hover:opacity-10 bg-yellow-300 blur-xl transition"></span>
              </button>
            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
};
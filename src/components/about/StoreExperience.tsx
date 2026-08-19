"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export const StoreExperience = () => {
  return (
    <section className="section-padding bg-background">
      <div className="container mx-auto px-6">
        <div className="relative group overflow-hidden h-[600px]">
          <motion.div
            initial={{ scale: 1.1 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 2 }}
            className="absolute inset-0"
          >
            <Image
              src="https://images.pexels.com/photos/1359337/pexels-photo-1359337.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt="Digital Concierge"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/20" />
          </motion.div>

          {/* Glass Card content */}
          <div className="absolute inset-0 flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="glass-morphism p-12 md:p-20 max-w-4xl text-center"
            >
              <span className="text-[10px] uppercase tracking-[0.5em] text-white mb-6 block font-bold">Our Vision</span>
              <h2 className="text-4xl md:text-5xl font-serif text-white mb-8 leading-tight">
                {"A World of Elevated Hospitality"}
              </h2>
              <p className="text-white font-light leading-loose text-editorial mb-10 text-lg">
                {"Whether you visit our flagship boutique in Mumbai or experience our Virtual Concierge from London, the essence of Mairii remains the same: a sanctuary of calm, where time slows down to match the pace of true craftsmanship."}
              </p>
             
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

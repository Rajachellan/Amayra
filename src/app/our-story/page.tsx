"use client";

import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { motion } from "framer-motion";
import Image from "next/image";
import { PageBanner } from "@/components/layout/PageBanner";

const OurStory = () => {
  return (
    <main className="min-h-screen bg-[#FDFBF9] selection:bg-champagne/30">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <motion.div 
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <Image
            src="/images/bridal_collections/bridal_collections (2).jpg"
            alt="Our Story Hero"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40" />
        </motion.div>

        <div className="relative z-10 text-center px-6">
          <motion.span 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-[10px] uppercase tracking-[0.6em] text-white/80 font-bold mb-4 block"
          >
            Since 1990
          </motion.span>
          <motion.h1 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7, duration: 1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-serif text-white tracking-wider mb-8"
          >
            The Soul of <br /> <span className="italic">Amayra</span>
          </motion.h1>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 1.2, duration: 1 }}
            className="h-px w-32 bg-white/40 mx-auto"
          />
        </div>

        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50"
        >
          <div className="w-px h-16 bg-gradient-to-b from-white/50 to-transparent mx-auto" />
        </motion.div>
      </section>

      {/* Heritage Section */}
      <section className="py-24 md:py-32 container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:items-center">
          <motion.div 
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="relative h-[600px] rounded-sm overflow-hidden shadow-2xl"
          >
            <Image
              src="/images/hand_accesorries.jpg"
              alt="Heritage Image"
              fill
              className="object-cover"
            />
          </motion.div>

          <motion.div 
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="lg:pl-12"
          >
            <span className="text-[10px] uppercase tracking-[0.4em] text-champagne font-bold mb-4 block">
              The Heritage
            </span>
            <h2 className="text-4xl md:text-5xl font-serif text-foreground mb-8 leading-tight">
              A Legacy Carved <br /> in Gold and Time
            </h2>
            <div className="space-y-6 text-foreground/70 leading-relaxed font-light">
              <p>
                The story of Amayra began three decades ago in a small atelier, 
                where the clinking of metal and the sparkle of diamonds formed 
                a symphony of dedication. What started as a passion project for 
                breathtaking craftsmanship has evolved into a hallmark of 
                luxury jewellery.
              </p>
              <p>
                Our founder, a master goldsmith with a vision for timeless 
                elegance, believed that every piece of jewellery should tell 
                 a unique story—one that transcends generations and celebrates 
                the essence of the wearer.
              </p>
              <p>
                Today, Amayra stands as a testament to that original vision, 
                blending traditional artistry with modern design to create 
                masterpieces that are as enduring as the bonds they celebrate.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Craftsmanship Section */}
      <section className="bg-[#1A1A1A] py-24 md:py-32 text-white overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="flex flex-col items-center text-center mb-20">
            <motion.span 
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              className="text-[10px] uppercase tracking-[0.4em] text-champagne font-bold mb-4"
            >
              The Art of Making
            </motion.span>
            <motion.h2 
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-4xl md:text-6xl font-serif mb-8"
            >
              Meticulous <span className="italic text-champagne">Artistry</span>
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                title: "Ethical Sourcing",
                desc: "We only work with suppliers who adhere to the strictest ethical and environmental standards, ensuring our diamonds are as pure in origin as they are in brilliance.",
                icon: "✦"
              },
              {
                title: "Master Goldsmiths",
                desc: "Our artisans spend hundreds of hours on a single piece, using techniques passed down through centuries to achieve a finish that is second to none.",
                icon: "✧"
              },
              {
                title: "Precision Setting",
                desc: "Using advanced technology and eagle-eyed precision, we ensure every stone is secured to capture light from every possible angle.",
                icon: "✦"
              }
            ].map((item, index) => (
              <motion.div 
                key={index}
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="group p-8 border border-white/10 hover:border-champagne/40 transition-all duration-500 bg-white/5"
              >
                <div className="text-2xl text-champagne mb-6">{item.icon}</div>
                <h3 className="text-xl font-serif mb-4 tracking-wide group-hover:text-champagne transition-colors">{item.title}</h3>
                <p className="text-sm text-white/50 leading-relaxed font-light">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <PageBanner 
        title="Timeless Legacy"
        subtitle="Our Philosophy"
        image="/images/woman-wears-gold-sari-with-green-gold-jewelry.jpg"
        height="h-[30vh]"
      />

      {/* Vision Section */}
      <section className="py-24 md:py-32 relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-3xl md:text-5xl font-serif text-foreground mb-12 italic"
            >
              "To create not just jewellery, but heirlooms that carry the warmth 
              of memories and the glow of timeless grace."
            </motion.h2>
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              className="h-px w-24 bg-champagne mx-auto mb-12"
            />
            <p className="text-sm uppercase tracking-[0.3em] text-foreground/50 font-bold">
              The Amayra Vision
            </p>
          </div>
        </div>
        
        {/* Decorative background element */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-champagne/5 rounded-full blur-[120px] pointer-events-none -z-10" />
      </section>

      <Footer />
    </main>
  );
};

export default OurStory;

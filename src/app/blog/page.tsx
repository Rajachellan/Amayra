"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BLOG_POSTS } from "@/data/blogs";
import { ArrowRight, Calendar, Clock, Tag } from "lucide-react";

const BlogPage = () => {
  return (
    <main className="min-h-screen bg-background selection:bg-champagne/30 overflow-x-hidden">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1573408302185-9127ff5f6133?q=80&w=2000&auto=format&fit=crop"
            alt="Amayra Blog Hero"
            fill
            priority
            className="object-cover brightness-50 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-background z-10" />
        </div>

        <div className="relative z-20 text-center px-6 max-w-4xl">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-champagne uppercase text-[10px] md:text-xs font-bold tracking-[0.5em] block mb-4"
          >
            The Amayra Journal
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl md:text-6xl text-white font-serif mb-6 leading-tight"
          >
            Stories of <span className="italic font-light">Heritage</span> & <br className="hidden md:block" /> Timeless Brilliance
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-white/70 text-sm md:text-base font-light tracking-widest uppercase max-w-2xl mx-auto"
          >
            Explore the world of luxury jewellery, heritage craftsmanship, and the latest trends from our atelier.
          </motion.p>
        </div>

        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-background to-transparent z-10" />
      </section>

      {/* Blog Listing Grid */}
      <section className="container mx-auto px-6 py-20 md:py-32">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-6 gap-y-12">
          {BLOG_POSTS.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: index * 0.1 }}
              className="group cursor-pointer"
            >
              <Link href={`/blog/${post.slug}`} className="block">
                {/* Image Container */}
                <div className="relative aspect-[4/5] overflow-hidden mb-8 bg-pearl">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                  <div className="absolute top-4 left-4 z-20">
                    <span className="px-4 py-1.5 bg-white/90 backdrop-blur-sm text-[9px] uppercase tracking-[0.2em] font-bold text-foreground">
                      {post.category}
                    </span>
                  </div>
                  {/* Subtle overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500 z-10" />
                </div>

                {/* Content */}
                <div className="space-y-3">
                  <div className="flex items-center gap-4 text-[8px] uppercase tracking-[0.15em] text-text-muted">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-2.5 h-2.5" />
                      {post.date}
                    </span>
                  </div>

                  <h3 className="text-lg md:text-xl font-serif text-foreground group-hover:text-champagne transition-colors duration-300 leading-snug line-clamp-2">
                    {post.title}
                  </h3>

                  <p className="text-xs text-text-muted font-light leading-relaxed line-clamp-2">
                    {post.excerpt}
                  </p>

                  <div className="pt-2">
                    <span className="relative inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] font-bold text-foreground group-hover:text-champagne transition-all duration-300">
                      Read More
                      <ArrowRight className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-1" />
                      <span className="absolute bottom-[-4px] left-0 w-8 h-[1px] bg-champagne transition-all duration-300 group-hover:w-full" />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>

        {/* Newsletter / CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-32 p-12 md:p-20 text-center relative overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #fdf8f2 0%, #fef0e6 50%, #fdf5fb 100%)",
          }}
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-champagne/40 to-transparent" />
          
          <div className="relative z-10 max-w-2xl mx-auto">
            <Tag className="w-6 h-6 text-champagne mx-auto mb-6 opacity-60" />
            <h2 className="text-3xl md:text-4xl font-serif mb-6">Join the Connoisseur's Circle</h2>
            <p className="text-sm text-text-muted mb-10 font-light tracking-widest uppercase">
              Receive curated insights into the world of luxury jewellery and exclusive collection previews.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="YOUR EMAIL ADDRESS"
                className="flex-1 px-6 py-4 text-[10px] tracking-[0.2em] bg-white border border-champagne/20 focus:outline-none focus:border-champagne"
              />
              <button className="bg-foreground text-white px-8 py-4 text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-champagne transition-colors duration-300">
                Subscribe
              </button>
            </div>
          </div>

          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-champagne/40 to-transparent" />
        </motion.div>
      </section>

      <Footer />
    </main>
  );
};

export default BlogPage;

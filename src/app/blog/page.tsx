"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { api, mediaSrc } from "@/lib/api";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ChevronRight, ArrowRight, Play, Bookmark } from "lucide-react";

type Blog = {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  coverImage?: string;
  author?: string;
  tags: string[];
  publishedAt?: string;
};

export default function BlogListPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    async function fetchBlogs() {
      try {
        const res = await api<{ items: Blog[] }>("/blogs?limit=50");
        setBlogs(res.items);
      } catch (error) {
        setErr("Failed to load the Muse collection.");
      } finally {
        setLoading(false);
      }
    }
    fetchBlogs();
  }, []);

  const featuredPost = blogs[0];
  const regularPosts = blogs.slice(1);

  return (
    <main className="min-h-screen bg-[#FDFCF9]" suppressHydrationWarning>
      <Navbar />

      {/* 1. BRAND HEADER */}
      <div className="pt-32 pb-10 text-center border-b border-stone-100" suppressHydrationWarning>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <span className="text-[10px] uppercase tracking-[0.5em] text-stone-400 font-bold mb-4 block">
            Visual Storytelling · Vol. IV
          </span>
          <h1 className="text-5xl md:text-7xl font-serif text-stone-900 tracking-tight">
            Amama <span className="italic font-light text-stone-500">Muse</span>
          </h1>
          <div className="flex justify-center gap-8 mt-8 text-[9px] uppercase tracking-[0.3em] font-bold text-stone-400">
            <span className="hover:text-stone-900 cursor-pointer transition-colors">Diaries</span>
            <span className="hover:text-stone-900 cursor-pointer transition-colors">Style Guide</span>
            <span className="hover:text-stone-900 cursor-pointer transition-colors">Heritage</span>
            <span className="hover:text-stone-900 cursor-pointer transition-colors">Craft</span>
          </div>
        </motion.div>
      </div>

      {/* 2. FEATURED HERO */}
      <section className="px-6 py-10 max-w-[1600px] mx-auto" suppressHydrationWarning>
        {loading ? (
          <div className="h-[70vh] bg-stone-50 animate-pulse rounded-sm" suppressHydrationWarning />
        ) : featuredPost ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2 }}
            className="relative group cursor-pointer overflow-hidden rounded-sm h-[75vh] min-h-[500px]"
          >
            <Link href={`/blog/${featuredPost.slug}`}>
              <Image
                src={featuredPost.coverImage ? mediaSrc(featuredPost.coverImage) : "/images/banner3.jpg"}
                alt={featuredPost.title}
                fill
                priority
                className="object-cover transition-transform duration-[3s] group-hover:scale-105 brightness-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              
              <div className="absolute inset-x-10 bottom-16 text-white max-w-4xl" suppressHydrationWarning>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5, duration: 1 }}
                >
                  <span className="inline-block px-4 py-1.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-[9px] uppercase tracking-[0.3em] font-bold mb-6">
                    Featured Editorial
                  </span>
                  <h2 className="text-4xl md:text-6xl font-serif leading-[1.1] mb-6 drop-shadow-2xl">
                    {featuredPost.title}
                  </h2>
                  <p className="text-white/80 text-sm md:text-lg font-light tracking-wide max-w-2xl mb-8 line-clamp-2">
                    {featuredPost.excerpt}
                  </p>
                  <div className="flex items-center gap-4 text-[10px] uppercase tracking-[0.4em] font-bold">
                    <span>Read The Muse</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </motion.div>
              </div>
            </Link>
          </motion.div>
        ) : null}
      </section>

      {/* 3. MAGAZINE GRID */}
      <section className="px-6 py-20 max-w-7xl mx-auto" suppressHydrationWarning>
        <div className="flex items-center justify-between mb-12 pb-4 border-b border-stone-100" suppressHydrationWarning>
          <h2 className="text-2xl font-serif text-stone-900">Muse <span className="italic">Diaries</span></h2>
          <div className="flex gap-2">
            <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Sort By: Latest</span>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12" suppressHydrationWarning>
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="space-y-4" suppressHydrationWarning>
                <div className="aspect-[16/10] bg-stone-100 animate-pulse rounded-sm" />
                <div className="h-4 bg-stone-100 animate-pulse w-2/3" />
                <div className="h-10 bg-stone-100 animate-pulse" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-20" suppressHydrationWarning>
            {regularPosts.map((post, idx) => (
              <motion.article
                key={post._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: idx % 3 * 0.15 }}
                className="group flex flex-col"
              >
                <Link href={`/blog/${post.slug}`} className="relative aspect-[16/10] overflow-hidden rounded-sm mb-8 bg-stone-50">
                  <Image
                    src={post.coverImage ? mediaSrc(post.coverImage) : "/images/banner2.jpg"}
                    alt={post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-stone-950/0 group-hover:bg-stone-950/10 transition-colors duration-500" />
                </Link>

                <div className="flex flex-col flex-1" suppressHydrationWarning>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[9px] uppercase tracking-[0.3em] font-bold text-stone-400">
                      {post.tags?.[0] || "Diaries"}
                    </span>
                    <time className="text-[9px] text-stone-400 font-medium">
                      {mounted && post.publishedAt ? new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : ''}
                    </time>
                  </div>

                  <h3 className="text-xl md:text-2xl font-serif text-stone-900 group-hover:text-stone-600 transition-colors duration-300 leading-snug mb-4">
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </h3>

                  <p className="text-stone-500 text-sm leading-relaxed line-clamp-3 mb-6 font-light">
                    {post.excerpt}
                  </p>

                  <div className="mt-auto pt-6 border-t border-stone-50 flex items-center justify-between">
                    <Link href={`/blog/${post.slug}`} className="text-[10px] uppercase tracking-[0.2em] font-bold text-stone-900 group-hover:text-stone-500 transition-all flex items-center gap-2">
                      Read More <ChevronRight className="w-3 h-3" />
                    </Link>
                    <button className="text-stone-300 hover:text-stone-900 transition-colors">
                      <Bookmark className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        )}

        {/* 4. NEWSLETTER STRIP */}
        {!loading && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-32 p-12 md:p-20 bg-stone-950 text-center rounded-sm relative overflow-hidden"
          >
            <div className="absolute inset-0 opacity-10 pointer-events-none">
               <Image src="/images/banner1.jpg" alt="" fill className="object-cover" />
            </div>
            <div className="relative z-10">
              <span className="text-[10px] uppercase tracking-[0.6em] text-stone-400 font-bold block mb-6">
                The Inner Circle
              </span>
              <h2 className="text-3xl md:text-4xl font-serif text-white mb-8">Join the Muse Universe</h2>
              <p className="text-stone-400 text-sm max-w-md mx-auto mb-10 leading-relaxed tracking-wide">
                Subscribe to receive curated editorial content, exclusive collection previews, and invitations to private viewings.
              </p>
              <div className="max-w-md mx-auto flex">
                <input
                  type="email"
                  placeholder="ENTER YOUR EMAIL"
                  className="bg-transparent border-b border-stone-700 flex-1 px-4 py-3 text-white text-xs tracking-widest focus:outline-none focus:border-white transition-colors"
                />
                <button className="px-8 py-3 bg-white text-black text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-stone-200 transition-all">
                  Subscribe
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </section>

      <Footer />
    </main>
  );
}

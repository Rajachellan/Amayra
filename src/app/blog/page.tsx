"use client";

import React, { useEffect, useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { api, mediaSrc } from "@/lib/api";
import { BLOG_POSTS, type BlogPost as StaticBlogPost } from "@/data/blogs";
import { ArrowRight, Calendar, Search, Sparkles, BookOpen, Clock, HeartHandshake } from "lucide-react";

interface ApiBlogPost {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  coverImage?: string;
  publishedAt?: string;
  tags?: string[];
  category?: string;
  readTime?: string;
}

const CATEGORIES = [
  "All",
  "Origin & Vision",
  "Heritage",
  "Bridal",
  "Care Guide",
  "Education",
  "Style"
];

export default function BlogPage() {
  const [apiBlogs, setApiBlogs] = useState<ApiBlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const data = await api<{ items: ApiBlogPost[] }>("/blogs?limit=50");
        setApiBlogs(data.items || []);
      } catch (err) {
        console.error("Failed to fetch blogs from API, using static posts:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  // Merge static blogs with API blogs so there are always rich posts to display
  const allPosts = useMemo(() => {
    const combinedMap = new Map<string, any>();

    // First add static posts
    BLOG_POSTS.forEach((post) => {
      combinedMap.set(post.slug, {
        _id: post.id,
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        coverImage: post.image,
        publishedAt: post.date,
        tags: [post.category],
        category: post.category,
        readTime: post.readTime,
        isStatic: true,
      });
    });

    // Then merge API posts
    apiBlogs.forEach((post) => {
      combinedMap.set(post.slug, {
        _id: post._id,
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        coverImage: post.coverImage,
        publishedAt: post.publishedAt,
        tags: post.tags || [post.category || "Editorial"],
        category: post.category || post.tags?.[0] || "Editorial",
        readTime: post.readTime || "5 min read",
        isStatic: false,
      });
    });

    return Array.from(combinedMap.values());
  }, [apiBlogs]);

  // Filter posts by selected category and search query
  const filteredPosts = useMemo(() => {
    return allPosts.filter((post) => {
      const matchesCategory =
        selectedCategory === "All" ||
        post.category?.toLowerCase() === selectedCategory.toLowerCase() ||
        post.tags?.some((t: string) => t.toLowerCase() === selectedCategory.toLowerCase());

      const matchesSearch =
        !searchQuery.trim() ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt?.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [allPosts, selectedCategory, searchQuery]);

  const featuredPost = filteredPosts[0] || allPosts[0];
  const gridPosts = filteredPosts.length > 1 ? filteredPosts.slice(1) : filteredPosts;

  return (
    <main className="min-h-screen bg-[#FAF8F3] selection:bg-[#C4A064]/30 overflow-x-hidden">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[65vh] min-h-[480px] flex items-center justify-center overflow-hidden bg-stone-950">
        <div className="absolute inset-0 z-0">
          <Image
            src=""
            alt="The Mairii Journal Hero"
            fill
            priority
            className="object-cover brightness-50 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-stone-950/70 via-stone-950/40 to-[#FAF8F3] z-10" />
        </div>

        <div className="relative z-20 text-center px-6 max-w-4xl pt-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-300/20 border border-amber-300/40 backdrop-blur-md mb-6"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span className="text-amber-300 uppercase text-[10px] font-bold tracking-[0.4em]">
              The Mairii Journal
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-4xl sm:text-6xl text-white font-serif mb-6 leading-tight"
          >
            Stories of <span className="italic font-light text-amber-300">Heritage</span>, Love & <br className="hidden md:block" /> Timeless Brilliance
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="text-stone-300 text-xs sm:text-sm font-light tracking-[0.2em] uppercase max-w-2xl mx-auto font-serif"
          >
            Explore our origin story, heritage craftsmanship, style guides, and our 10% pledge for women&apos;s empowerment.
          </motion.p>
        </div>
      </section>

      {/* Filter & Search Bar */}
      <section className="container mx-auto px-6 -mt-10 relative z-30 max-w-7xl">
        <div className="p-6 rounded-2xl bg-white border border-[#C4A064]/20 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Categories Pills */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto no-scrollbar pb-2 md:pb-0">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] transition-all whitespace-nowrap ${
                  selectedCategory === cat
                    ? "bg-[#2C2A28] text-amber-300 shadow-md"
                    : "bg-[#FAF8F3] text-[#555555] hover:bg-[#C4A064]/20 hover:text-[#2B2B2B]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-[#C4A064] absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search journal..."
              className="w-full pl-11 pr-4 py-2.5 bg-[#FAF8F3] border border-[#C4A064]/20 rounded-full text-xs text-[#2B2B2B] focus:outline-none focus:border-[#C4A064]"
            />
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="container mx-auto px-6 py-16 md:py-24 max-w-7xl">
        
        {/* Featured Post Spotlight */}
        {featuredPost && searchQuery === "" && selectedCategory === "All" && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-20 rounded-2xl bg-white border border-[#C4A064]/20 overflow-hidden shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-0 group"
          >
            <div className="lg:col-span-7 relative min-h-[350px] lg:min-h-[450px] overflow-hidden">
              <Image
                src={featuredPost.isStatic ? featuredPost.coverImage : mediaSrc(featuredPost.coverImage)}
                alt={featuredPost.title}
                fill
                priority
                className="object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute top-6 left-6 z-10">
                <span className="px-4 py-1.5 rounded-full bg-[#2C2A28]/90 backdrop-blur-md text-amber-300 text-[9px] font-bold uppercase tracking-[0.25em] shadow-md border border-amber-300/30">
                  Featured Story
                </span>
              </div>
            </div>

            <div className="lg:col-span-5 p-8 md:p-12 flex flex-col justify-center space-y-6">
              <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.2em] text-[#C4A064]">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  {featuredPost.publishedAt}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  {featuredPost.readTime}
                </span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-serif text-[#2B2B2B] leading-tight group-hover:text-[#A37F43] transition-colors">
                {featuredPost.title}
              </h2>

              <p className="text-sm text-[#555555] font-light leading-relaxed font-serif line-clamp-3">
                {featuredPost.excerpt}
              </p>

              <div>
                <Link
                  href={`/blog/${featuredPost.slug}`}
                  className="inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-[#2C2A28] text-white text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-[#C4A064] transition-all duration-300 shadow-md"
                >
                  Read Featured Story
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </motion.div>
        )}

        {/* Blog Listing Grid */}
        {filteredPosts.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-[#C4A064]/20 p-12">
            <p className="text-[#555555] font-serif italic text-xl">
              No journal stories found matching your criteria.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {gridPosts.map((post, index) => (
              <motion.article
                key={post._id || post.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group cursor-pointer rounded-xl bg-white border border-[#C4A064]/20 hover:border-[#C4A064]/60 overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-[#C4A064]/10 transition-all duration-500 flex flex-col h-full"
              >
                <Link href={`/blog/${post.slug}`} className="flex flex-col h-full">
                  {/* Image Container */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-stone-100">
                    <Image
                      src={post.isStatic ? post.coverImage : mediaSrc(post.coverImage)}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-1000 group-hover:scale-105"
                    />
                    
                    {post.category && (
                      <div className="absolute top-4 left-4 z-20">
                        <span className="px-3.5 py-1 rounded-full bg-[#2C2A28]/85 backdrop-blur-sm text-[9px] uppercase tracking-[0.2em] font-bold text-amber-300 border border-amber-300/30 shadow-md">
                          {post.category}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Content Container */}
                  <div className="p-6 md:p-8 flex flex-col flex-1 justify-between space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.15em] text-[#C4A064] font-bold">
                        <span className="flex items-center gap-1.5">
                          <Calendar className="w-3 h-3" />
                          {post.publishedAt}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Clock className="w-3 h-3" />
                          {post.readTime}
                        </span>
                      </div>

                      <h3 className="text-xl font-serif text-[#2B2B2B] group-hover:text-[#A37F43] transition-colors duration-300 leading-snug line-clamp-2">
                        {post.title}
                      </h3>

                      <p className="text-xs text-[#666666] font-light leading-relaxed line-clamp-3 font-serif">
                        {post.excerpt}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
                      <span className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] font-bold text-[#2B2B2B] group-hover:text-[#C4A064] transition-all duration-300">
                        Read Story
                        <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        )}

        {/* Social Impact & Newsletter Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-28 p-10 md:p-16 rounded-2xl bg-gradient-to-r from-[#2C2A28] via-[#3B3732] to-[#2C2A28] text-white shadow-2xl relative overflow-hidden text-center"
        >
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#C4A064] via-amber-300 to-[#C4A064]" />
          
          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <div className="w-12 h-12 rounded-full bg-amber-300/10 flex items-center justify-center mx-auto text-amber-300">
              <HeartHandshake className="w-6 h-6" />
            </div>
            
            <h2 className="text-3xl md:text-4xl font-serif text-white">Join The Connoisseur&apos;s Circle</h2>
            
            <p className="text-xs md:text-sm text-stone-300 font-light tracking-widest uppercase font-serif">
              Receive curated insights into heritage jewellery, founder notes, and early previews of new collections.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto pt-4">
              <input
                type="email"
                placeholder="YOUR EMAIL ADDRESS"
                className="flex-1 px-6 py-3.5 text-[10px] tracking-[0.2em] bg-white/10 border border-white/20 rounded-full text-white placeholder:text-stone-400 focus:outline-none focus:border-amber-300"
              />
              <button className="bg-[#C4A064] text-stone-950 px-8 py-3.5 rounded-full text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-amber-300 transition-colors duration-300 shadow-lg">
                Subscribe
              </button>
            </div>
          </div>
        </motion.div>
      </section>

      <Footer />
    </main>
  );
}

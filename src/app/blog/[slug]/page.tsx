"use client";

import React, { use, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { api, mediaSrc } from "@/lib/api";
import { BLOG_POSTS, type BlogPost as StaticBlogPost } from "@/data/blogs";
import { ArrowLeft, Calendar, Share2, Bookmark, Sparkles, HeartHandshake } from "lucide-react";

interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  coverImage?: string;
  publishedAt?: string;
  tags: string[];
  author?: string;
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function BlogDetailsPage({ params }: PageProps) {
  const { slug } = use(params);
  const [post, setPost] = useState<BlogPost | null>(null);
  const [recommended, setRecommended] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // First check static BLOG_POSTS
        const staticMatch = BLOG_POSTS.find((b) => b.slug === slug);
        
        if (staticMatch) {
          setPost({
            _id: staticMatch.id,
            title: staticMatch.title,
            slug: staticMatch.slug,
            content: staticMatch.content,
            excerpt: staticMatch.excerpt,
            coverImage: staticMatch.image,
            publishedAt: staticMatch.date,
            tags: [staticMatch.category],
            author: "Bandana, Founder of MaiRii",
          });

          // Recommended static posts
          const staticOthers = BLOG_POSTS.filter((b) => b.slug !== slug).slice(0, 3).map((b) => ({
            _id: b.id,
            title: b.title,
            slug: b.slug,
            content: b.content,
            coverImage: b.image,
            tags: [b.category],
          }));
          setRecommended(staticOthers);
          setLoading(false);
          return;
        }

        // If not static, try API call
        const doc = await api<BlogPost>(`/blogs/${slug}`);
        setPost(doc);
        
        const others = await api<{ items: BlogPost[] }>("/blogs?limit=4");
        setRecommended(others.items.filter((b) => b.slug !== slug).slice(0, 3));
      } catch (err) {
        console.error("Failed to fetch blog post:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAF8F3] flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-full border-2 border-[#C4A064] border-t-transparent animate-spin" />
          <p className="text-[#C4A064] font-serif italic tracking-widest text-sm">Unveiling Story...</p>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <main className="min-h-screen bg-[#FAF8F3] flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center p-6 text-center">
          <div className="space-y-6 max-w-md">
            <h2 className="text-3xl font-serif text-[#2B2B2B]">Story Not Found</h2>
            <p className="text-sm text-[#666666] font-serif">The journal article you are looking for does not exist or has been relocated.</p>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-[#2C2A28] text-white text-[10px] uppercase tracking-[0.25em] font-bold"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Return To Journal
            </Link>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  const isExternalImage = post.coverImage?.startsWith("http");

  return (
    <main className="min-h-screen bg-[#FAF8F3] selection:bg-[#C4A064]/30 overflow-x-hidden">
      <Navbar />

      {/* Hero / Header Section */}
      <section className="relative pt-32 pb-16 md:pt-44 md:pb-24 px-6 bg-gradient-to-b from-stone-900 to-[#FAF8F3] text-white">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center text-center space-y-6"
          >
            <Link 
              href="/blog"
              className="group inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] font-bold text-amber-300 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
              Back to Journal
            </Link>

            {post.tags?.[0] && (
              <span className="px-4 py-1.5 bg-[#C4A064]/20 border border-[#C4A064]/40 text-amber-300 text-[10px] uppercase tracking-[0.2em] font-bold rounded-full">
                {post.tags[0]}
              </span>
            )}

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif text-white leading-[1.15]">
              {post.title}
            </h1>

            <div className="flex items-center gap-6 text-[11px] uppercase tracking-[0.15em] text-stone-300 pt-2 font-serif">
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#C4A064]" />
                {post.publishedAt || "Recently"}
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Image */}
      <section className="px-6 -mt-12 mb-16 relative z-20">
        <div className="container mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative aspect-[21/9] overflow-hidden rounded-2xl border border-[#C4A064]/30 shadow-2xl bg-stone-900"
          >
            <Image
              src={isExternalImage ? post.coverImage! : mediaSrc(post.coverImage)}
              alt={post.title}
              fill
              priority
              className="object-cover"
            />
          </motion.div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="px-6 pb-24">
        <div className="container mx-auto max-w-5xl grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Sidebar / Tools */}
          <aside className="hidden lg:block lg:col-span-2">
            <div className="sticky top-40 flex flex-col items-center space-y-6">
              <button className="p-3 rounded-full bg-white border border-[#C4A064]/20 hover:border-[#C4A064] text-[#2B2B2B] hover:text-[#C4A064] transition-all shadow-sm">
                <Share2 className="w-4 h-4" />
              </button>
              <button className="p-3 rounded-full bg-white border border-[#C4A064]/20 hover:border-[#C4A064] text-[#2B2B2B] hover:text-[#C4A064] transition-all shadow-sm">
                <Bookmark className="w-4 h-4" />
              </button>
            </div>
          </aside>

          {/* Main Article Text */}
          <div className="lg:col-span-9 bg-white p-8 md:p-16 rounded-2xl border border-[#C4A064]/20 shadow-xl">
            <article className="prose prose-stone max-w-none prose-headings:font-serif prose-headings:font-normal prose-headings:text-[#2B2B2B] prose-blockquote:font-serif prose-blockquote:italic prose-blockquote:text-[#C4A064] prose-blockquote:border-l-[#C4A064] prose-p:text-[#4A4A4A] prose-p:leading-relaxed prose-p:text-base md:prose-p:text-lg font-serif">
              <div 
                className="blog-content"
                dangerouslySetInnerHTML={{ __html: post.content }} 
              />
            </article>

            {/* Author Signature Block */}
            <div className="mt-16 pt-10 border-t border-stone-200">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#C4A064]/15 flex items-center justify-center text-[#C4A064] font-serif text-xl uppercase font-bold border border-[#C4A064]/30">
                    {post.author?.[0] || 'M'}
                  </div>
                  <div>
                    <p className="text-[9px] uppercase tracking-[0.2em] font-bold text-[#C4A064]">Written By</p>
                    <p className="text-base font-serif italic text-[#2B2B2B]">{post.author || "MaiRii Editorial Team"}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-[9px] uppercase tracking-[0.2em] font-bold text-[#666666]">Share Story</span>
                  <div className="flex gap-2">
                    {['FB', 'TW', 'IG', 'WA'].map((social) => (
                      <button key={social} className="w-7 h-7 rounded-full flex items-center justify-center border border-stone-200 text-[8px] font-bold text-[#2B2B2B] hover:bg-[#2C2A28] hover:text-white transition-all">
                        {social}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recommended Posts */}
      {recommended.length > 0 && (
        <section className="px-6 py-20 bg-white border-t border-stone-200">
          <div className="container mx-auto max-w-6xl">
            <div className="flex flex-col items-center text-center mb-12">
              <span className="text-[#C4A064] uppercase text-[10px] font-bold tracking-[0.4em] mb-2">Discover More</span>
              <h2 className="text-3xl font-serif text-[#2B2B2B]">Continue Your Journey</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {recommended.map((recommendedPost) => {
                const isRecExternal = recommendedPost.coverImage?.startsWith("http");
                return (
                  <Link key={recommendedPost._id || recommendedPost.slug} href={`/blog/${recommendedPost.slug}`} className="group block rounded-xl overflow-hidden bg-[#FAF8F3] border border-[#C4A064]/20 hover:border-[#C4A064] shadow-sm hover:shadow-xl transition-all p-4">
                    <div className="relative aspect-video overflow-hidden rounded-lg mb-4 bg-stone-200">
                      <Image
                        src={isRecExternal ? recommendedPost.coverImage! : mediaSrc(recommendedPost.coverImage)}
                        alt={recommendedPost.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                    <h3 className="text-base font-serif text-[#2B2B2B] group-hover:text-[#A37F43] transition-colors line-clamp-2 leading-snug">
                      {recommendedPost.title}
                    </h3>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      <Footer />

      {/* Global Styling for Rich Article Content */}
      <style jsx global>{`
        .blog-content h1, .blog-content h2, .blog-content h3 {
          margin-top: 2rem;
          margin-bottom: 1rem;
          font-family: var(--font-serif);
          color: #2C2A28;
        }
        .blog-content h1 { font-size: 2.25rem; }
        .blog-content h2 { font-size: 1.85rem; }
        .blog-content h3 { font-size: 1.5rem; }
        .blog-content p {
          margin-bottom: 1.35rem;
          line-height: 1.8;
          color: #4A4A4A;
        }
        .blog-content blockquote {
          border-left: 3px solid #C4A064;
          padding-left: 1.5rem;
          margin: 2.5rem 0;
          font-size: 1.25rem;
          font-style: italic;
          line-height: 1.7;
          color: #A37F43;
          background: #FAF8F3;
          padding-top: 1rem;
          padding-bottom: 1rem;
          border-radius: 0 0.5rem 0.5rem 0;
        }
        .blog-content ul, .blog-content ol {
          margin-bottom: 1.5rem;
          padding-left: 1.5rem;
        }
        .blog-content li {
          margin-bottom: 0.5rem;
          color: #4A4A4A;
        }
        .blog-content img {
          max-width: 100%;
          height: auto;
          border-radius: 0.75rem;
          margin: 2rem 0;
        }
      `}</style>
    </main>
  );
}

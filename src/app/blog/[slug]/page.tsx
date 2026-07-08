"use client";

import React, { use } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BLOG_POSTS } from "@/data/blogs";
import { ArrowLeft, Calendar, Clock, Share2, Bookmark } from "lucide-react";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ slug: string }>;
}

const BlogDetailsPage = ({ params }: PageProps) => {
  const { slug } = use(params);
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-background selection:bg-champagne/30 overflow-x-hidden">
      <Navbar />

      {/* Hero / Header Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center text-center space-y-6"
          >
            <Link 
              href="/blog"
              className="group flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] font-bold text-text-muted hover:text-champagne transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
              Back to Journal
            </Link>

            <span className="px-4 py-1.5 bg-champagne/10 text-champagne text-[10px] uppercase tracking-[0.2em] font-bold rounded-full">
              {post.category}
            </span>

            <h1 className="text-4xl md:text-6xl font-serif text-foreground leading-[1.15]">
              {post.title}
            </h1>

            <div className="flex items-center gap-8 text-[11px] uppercase tracking-[0.15em] text-text-muted pt-4">
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-champagne/60" />
                {post.date}
              </span>
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-champagne/60" />
                {post.readTime}
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Image */}
      <section className="px-6 mb-20 md:mb-32">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative aspect-[21/9] overflow-hidden bg-pearl luxury-shadow"
          >
            <Image
              src={post.image}
              alt={post.title}
              fill
              priority
              className="object-cover"
            />
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="px-6 pb-32">
        <div className="container mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* Sidebar / Tools */}
          <aside className="hidden lg:block lg:col-span-1">
            <div className="sticky top-40 flex flex-col items-center space-y-8">
              <button className="p-3 rounded-full border border-foreground/5 hover:border-champagne hover:text-champagne transition-all group">
                <Share2 className="w-5 h-5" />
              </button>
              <button className="p-3 rounded-full border border-foreground/5 hover:border-champagne hover:text-champagne transition-all group">
                <Bookmark className="w-5 h-5" />
              </button>
            </div>
          </aside>

          {/* Main Content */}
          <div className="lg:col-span-8 lg:col-start-3">
            <article className="prose prose-stone max-w-none prose-headings:font-serif prose-headings:font-normal prose-blockquote:font-serif prose-blockquote:italic prose-blockquote:text-champagne prose-p:text-text-muted prose-p:leading-loose prose-p:text-lg">
              <div 
                className="blog-content"
                dangerouslySetInnerHTML={{ __html: post.content }} 
              />
            </article>

            {/* Author / Footer */}
            <div className="mt-20 pt-12 border-t border-foreground/5">
              <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-champagne/20 flex items-center justify-center text-champagne font-serif text-xl">
                    A
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-foreground">Written By</p>
                    <p className="text-sm font-serif italic text-text-muted">mairii Editorial Team</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-text-muted">Share This Story</span>
                  <div className="flex gap-3">
                    {['FB', 'TW', 'IG', 'LI'].map((social) => (
                      <button key={social} className="w-8 h-8 flex items-center justify-center border border-foreground/5 text-[9px] font-bold hover:bg-foreground hover:text-white transition-all">
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

      {/* Recommended Posts (Optional but good) */}
      <section className="px-6 py-24 bg-pearl/50 border-t border-foreground/5">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col items-center text-center mb-16">
            <span className="text-champagne uppercase text-[10px] font-bold tracking-[0.5em] mb-4">Discover More</span>
            <h2 className="text-3xl md:text-4xl font-serif">Continue Your Journey</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {BLOG_POSTS.filter(p => p.slug !== slug).slice(0, 3).map((recommendedPost) => (
              <Link key={recommendedPost.id} href={`/blog/${recommendedPost.slug}`} className="group block">
                <div className="relative aspect-video overflow-hidden mb-6">
                  <Image
                    src={recommendedPost.image}
                    alt={recommendedPost.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <h3 className="text-lg font-serif group-hover:text-champagne transition-colors line-clamp-2">
                  {recommendedPost.title}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />

      {/* Global CSS for Blog Content */}
      <style jsx global>{`
        .blog-content h3 {
          margin-top: 2.5rem;
          margin-bottom: 1.25rem;
          font-size: 1.75rem;
          color: #2C2A28;
        }
        .blog-content p {
          margin-bottom: 1.5rem;
        }
        .blog-content blockquote {
          border-left: 2px solid #E6D3A3;
          padding-left: 2rem;
          margin: 3rem 0;
          font-size: 1.5rem;
          line-height: 1.6;
        }
      `}</style>
    </main>
  );
};

export default BlogDetailsPage;

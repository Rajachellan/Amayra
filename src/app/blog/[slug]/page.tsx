"use client";

import { useEffect, useState, Suspense } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { api, mediaSrc } from "@/lib/api";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ChevronLeft, Share2, Link2, Clock, User } from "lucide-react";
import { FaFacebookF, FaXTwitter } from "react-icons/fa6";

type Blog = {
  _id: string;
  title: string;
  slug: string;
  content: string;
  coverImage?: string;
  author?: string;
  tags: string[];
  publishedAt?: string;
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string[];
};

function BlogPostContent() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  
  const [post, setPost] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [related, setRelated] = useState<Blog[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    async function fetchPost() {
      try {
        const res = await api<Blog>(`/blogs/${slug}`);
        setPost(res);
        
        // Fetch related posts (simple logic: get recent blogs)
        const all = await api<{ items: Blog[] }>("/blogs?limit=4");
        setRelated(all.items.filter(b => b._id !== res._id).slice(0, 3));
      } catch (error) {
        setErr("Article not found.");
      } finally {
        setLoading(false);
      }
    }
    if (slug) fetchPost();
  }, [slug]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#FDFCF9]" suppressHydrationWarning>
         <div className="w-12 h-12 border-2 border-stone-200 border-t-stone-900 rounded-full animate-spin" suppressHydrationWarning />
      </div>
    );
  }

  if (err || !post) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#FDFCF9] px-4" suppressHydrationWarning>
        <h1 className="text-2xl font-serif text-stone-900 mb-4">{err || "Article not found"}</h1>
        <Link href="/blog" className="text-stone-500 hover:text-stone-900 underline text-xs uppercase tracking-widest">
          Return to The Muse
        </Link>
      </div>
    );
  }

  return (
    <main className="bg-[#FDFCF9] min-h-screen" suppressHydrationWarning>
      <Navbar />

      {/* 1. EDITORIAL HERO */}
      <header className="relative w-full h-[85vh] overflow-hidden">
        <motion.div 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2 }}
          className="absolute inset-0"
        >
          <Image
            src={post.coverImage ? mediaSrc(post.coverImage) : "/images/banner3.jpg"}
            alt={post.title}
            fill
            priority
            className="object-cover brightness-[0.7] contrast-[1.1]"
          />
        </motion.div>
        
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#FDFCF9]" />
        
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="max-w-5xl"
          >
            <span className="inline-block px-6 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-[10px] uppercase tracking-[0.4em] font-bold text-white mb-8">
              {post.tags?.[0] || "Editorial"}
            </span>
            <h1 className="text-4xl md:text-7xl font-serif text-white leading-[1.1] tracking-tight mb-8 drop-shadow-2xl">
              {post.title}
            </h1>
            
            <div className="flex flex-wrap items-center justify-center gap-8 text-[11px] uppercase tracking-[0.2em] font-bold text-white/80">
              <div className="flex items-center gap-2">
                <User className="w-3 h-3" />
                <span>{post.author || "Amayra Editor"}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-3 h-3" />
                <span>{mounted && post.publishedAt ? new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : 'Recently'}</span>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 text-white/40"
        >
          <span className="text-[8px] uppercase tracking-[0.5em] rotate-90 mb-4">Scroll</span>
          <div className="w-px h-12 bg-white/20" />
        </motion.div>
      </header>

      {/* 2. CONTENT SPREAD */}
      <section className="relative px-6 py-24 max-w-4xl mx-auto">
        {/* Floating Share Side */}
        <div className="hidden lg:block absolute left-[-120px] top-24 sticky top-40 space-y-6">
          <p className="text-[9px] uppercase tracking-[0.3em] font-bold text-stone-300 rotate-90 mb-12 origin-left">Share Muse</p>
          <div className="flex flex-col gap-4">
            <button className="w-10 h-10 rounded-full border border-stone-100 flex items-center justify-center text-stone-400 hover:text-stone-900 hover:border-stone-900 transition-all">
              <FaXTwitter className="w-4 h-4" />
            </button>
            <button className="w-10 h-10 rounded-full border border-stone-100 flex items-center justify-center text-stone-400 hover:text-stone-900 hover:border-stone-900 transition-all">
              <FaFacebookF className="w-4 h-4" />
            </button>
            <button className="w-10 h-10 rounded-full border border-stone-100 flex items-center justify-center text-stone-400 hover:text-stone-900 hover:border-stone-900 transition-all">
              <Link2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Article Body */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="editorial-content"
        >
          <div 
            className="prose prose-stone prose-lg md:prose-xl mx-auto 
            prose-headings:font-serif prose-headings:font-normal prose-headings:tracking-tight
            prose-p:text-stone-600 prose-p:leading-relaxed prose-p:font-light
            prose-blockquote:border-l-stone-900 prose-blockquote:font-serif prose-blockquote:italic prose-blockquote:text-stone-800
            prose-img:rounded-sm prose-img:shadow-2xl"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </motion.div>

        {/* Tags Footer */}
        <div className="mt-20 pt-10 border-t border-stone-100">
           <div className="flex flex-wrap gap-3">
              {post.tags?.map(tag => (
                <span key={tag} className="text-[10px] uppercase tracking-widest font-bold px-4 py-1 bg-stone-50 text-stone-400 rounded-full">
                  #{tag}
                </span>
              ))}
           </div>
        </div>
      </section>

      {/* 3. RELATED ARTICLES */}
      {related.length > 0 && (
        <section className="bg-stone-50 py-24 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-12">
               <h2 className="text-3xl font-serif text-stone-900">More From <span className="italic">The Muse</span></h2>
               <Link href="/blog" className="text-[10px] uppercase tracking-[0.3em] font-bold text-stone-400 hover:text-stone-900 transition-colors">View All Archive</Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {related.map((rel) => (
                <article key={rel._id} className="group flex flex-col">
                  <Link href={`/blog/${rel.slug}`} className="relative aspect-[4/3] overflow-hidden rounded-sm mb-6">
                    <Image
                      src={rel.coverImage ? mediaSrc(rel.coverImage) : "/images/banner2.jpg"}
                      alt={rel.title}
                      fill
                      className="object-cover transition-transform duration-1000 group-hover:scale-110"
                    />
                  </Link>
                  <h3 className="text-xl font-serif text-stone-900 group-hover:text-stone-500 transition-colors">
                    <Link href={`/blog/${rel.slug}`}>{rel.title}</Link>
                  </h3>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </main>
  );
}

export default function BlogPostPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-[#FDFCF9]"><div className="w-12 h-12 border-2 border-stone-200 border-t-stone-900 rounded-full animate-spin" /></div>}>
      <BlogPostContent />
    </Suspense>
  );
}

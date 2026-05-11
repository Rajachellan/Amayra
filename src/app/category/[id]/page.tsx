"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ProductCard } from "@/components/products/ProductCard";
import { CategorySlider } from "@/components/products/CategorySlider";
import { products } from "@/data/products";
import { Filter, ChevronDown, X, Star } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const SUBCATEGORY_IMAGES: Record<string, string> = {
  "Kundan": "https://images.unsplash.com/photo-1615655406736-b37c4fabf923?q=80&w=2000&auto=format&fit=crop",
  "Temple": "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=2000&auto=format&fit=crop",
  "Victorian": "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=2000&auto=format&fit=crop",
  "South Indian": "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?q=80&w=2000&auto=format&fit=crop",
  "Jhumkas": "https://images.unsplash.com/photo-1535633302704-b02923cc5c37?q=80&w=2000&auto=format&fit=crop",
  "Daily Wear": "https://images.unsplash.com/photo-1573408302314-199b573b7e17?q=80&w=2000&auto=format&fit=crop",
  "Chandbalis": "https://images.unsplash.com/photo-1630019017578-831633534d02?q=80&w=2000&auto=format&fit=crop",
  "Heritage Sets": "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=2000&auto=format&fit=crop",
  "Brooches": "https://images.unsplash.com/photo-1617038220319-276d3cfab638?q=80&w=2000&auto=format&fit=crop"
};

const COLORS = ["Gold", "Silver", "Rose Gold", "Antique"];
const TYPES = ["Necklace", "Earrings", "Bangles", "Rings", "Bridal Sets"];
const PRICE_RANGES = [
  { label: "Under ₹5,000", max: 5000 },
  { label: "₹5,000 - ₹10,000", min: 5000, max: 10000 },
  { label: "₹10,000 - ₹20,000", min: 10000, max: 20000 },
  { label: "Over ₹20,000", min: 20000 },
];

function CategoryContent() {
  const { id } = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();

  const subQuery = searchParams.get("sub");
  const colorQuery = searchParams.get("color");
  const maxPriceQuery = searchParams.get("maxPrice");

  const [filters, setFilters] = useState({
    color: colorQuery || null,
    type: null,
    maxPrice: maxPriceQuery ? Number(maxPriceQuery) : null,
    rating: null,
  });
  const [sortBy, setSortBy] = useState("Newest Arrivals");
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const currentCategoryProducts = products.filter(p =>
    id === "all" || p.category.toLowerCase() === (id as string).toLowerCase()
  );

  const uniqueSubs = Array.from(new Set(currentCategoryProducts.map(p => p.subCategory).filter(Boolean))) as string[];
  const subCategoryItems = uniqueSubs.map(name => ({
    name,
    image: SUBCATEGORY_IMAGES[name] || "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=500&auto=format&fit=crop"
  }));

  const filteredProducts = currentCategoryProducts.filter((p) => {
    if (subQuery && p.subCategory !== subQuery) return false;
    if (filters.color && p.color !== filters.color) return false;
    if (filters.maxPrice && p.price > filters.maxPrice) return false;
    // Add more filter logic as needed
    return true;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "Price: Low to High") return a.price - b.price;
    if (sortBy === "Price: High to Low") return b.price - a.price;
    return 0;
  });

  const Sidebar = () => (
    <div className="space-y-10">
      {/* Price Range */}
      <div className="space-y-4">
        <h3 className="text-[10px] uppercase tracking-[0.3em] font-bold text-gray-400">Price Range</h3>
        <div className="flex flex-col space-y-2">
          {PRICE_RANGES.map((range) => (
            <label key={range.label} className="flex items-center space-x-3 cursor-pointer group">
              <input
                type="radio"
                name="price"
                checked={filters.maxPrice === range.max}
                onChange={() => setFilters({ ...filters, maxPrice: range.max })}
                className="w-4 h-4 accent-champagne"
              />
              <span className="text-xs uppercase tracking-widest text-gray-600 group-hover:text-champagne transition-colors">{range.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Color */}
      <div className="space-y-4">
        <h3 className="text-[10px] uppercase tracking-[0.3em] font-bold text-gray-400">Finish / Color</h3>
        <div className="flex flex-wrap gap-2">
          {COLORS.map((color) => (
            <button
              key={color}
              onClick={() => setFilters({ ...filters, color: filters.color === color ? null : color })}
              className={`px-4 py-2 text-[10px] uppercase tracking-widest border transition-all ${filters.color === color ? "bg-foreground text-background border-foreground" : "bg-white text-gray-500 border-gray-100 hover:border-champagne"}`}
            >
              {color}
            </button>
          ))}
        </div>
      </div>

      {/* Type */}
      <div className="space-y-4">
        <h3 className="text-[10px] uppercase tracking-[0.3em] font-bold text-gray-400">Category Type</h3>
        <div className="flex flex-col space-y-2">
          {TYPES.map((type) => (
            <label key={type} className="flex items-center space-x-3 cursor-pointer group">
              <input type="checkbox" className="w-4 h-4 accent-champagne border-gray-200" />
              <span className="text-xs uppercase tracking-widest text-gray-600 group-hover:text-champagne transition-colors">{type}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Rating */}
      <div className="space-y-4">
        <h3 className="text-[10px] uppercase tracking-[0.3em] font-bold text-gray-400">Customer Rating</h3>
        <div className="flex flex-col space-y-3">
          {[5, 4, 3].map((star) => (
            <button key={star} className="flex items-center space-x-2 text-gray-400 hover:text-champagne transition-colors">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-3 h-3 ${i < star ? "fill-champagne text-champagne" : "text-gray-200"}`} />
                ))}
              </div>
              <span className="text-[10px] uppercase tracking-widest">& Up</span>
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={() => setFilters({ color: null, type: null, maxPrice: null, rating: null })}
        className="text-[10px] uppercase tracking-[0.2em] font-bold text-maroon hover:underline pt-4"
      >
        Clear All Filters
      </button>
    </div>
  );

  return (
    <>
      <Navbar />

      {/* Premium Category Hero Section */}
      <section className="relative h-[65vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        {/* Background Image with Parallax-like Zoom */}
        <motion.div
          initial={{ scale: 1.15 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="absolute inset-0 z-0"
        >
          <Image
            src={SUBCATEGORY_IMAGES[subQuery || "Heritage Sets"] || "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=2000&auto=format&fit=crop"}
            alt="Collection Background"
            fill
            className="object-cover brightness-[0.65]"
            priority
          />
        </motion.div>

        {/* Multi-layered Overlays for Premium Feel */}
        <div className="absolute inset-0 bg-black/30 z-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60 z-10" />
        <div className="absolute inset-0 bg-brand-emerald/10 mix-blend-multiply z-10" />

        <div className="container mx-auto px-6 relative z-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="max-w-5xl mx-auto"
          >
            {/* Elegant Top Label */}
            <div className="flex items-center justify-center space-x-4 mb-8">
              <motion.div initial={{ width: 0 }} animate={{ width: 40 }} transition={{ delay: 0.5, duration: 1 }} className="h-px bg-champagne/60" />
              <span className="text-champagne text-[11px] uppercase tracking-[0.6em] font-bold">The Amayra Boutique</span>
              <motion.div initial={{ width: 0 }} animate={{ width: 40 }} transition={{ delay: 0.5, duration: 1 }} className="h-px bg-champagne/60" />
            </div>

            {/* Main Title with Serif Font */}
            <h1 className="text-5xl md:text-8xl font-serif text-white mb-10 tracking-tight leading-[1.1] drop-shadow-2xl">
              {subQuery ? subQuery : (id === "all" ? "Amayra" : id)}
            </h1>

            {/* Decorative Gold Rule */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.7, duration: 1.2 }}
              className="w-32 h-[1px] bg-champagne mx-auto mb-12"
            />

            {/* Professional Breadcrumbs */}
            <nav className="flex items-center justify-center space-x-4 text-white/60 text-[10px] uppercase tracking-[0.4em]">
              <Link href="/" className="hover:text-champagne transition-colors duration-300">Home</Link>
              <span className="text-champagne/40">/</span>
              <Link href="/category/all" className="hover:text-champagne transition-colors duration-300">Boutique</Link>
              <span className="text-champagne/40">/</span>
              <span className="text-white font-bold tracking-[0.5em]">{id}</span>
            </nav>
          </motion.div>
        </div>

        {/* Bottom Fade to White Grid */}
        <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-white via-white/40 to-transparent z-20" />
      </section>

      {/* Visual Sub-categories Navigation */}
      {subCategoryItems.length > 0 && (
        <CategorySlider currentCategory={id as string} subCategories={subCategoryItems} />
      )}

      {/* Main Content with Sidebar */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-12">

            {/* Desktop Sidebar */}
            <aside className="hidden lg:block w-72 shrink-0 border-r border-gray-100 pr-10">
              <div className="sticky top-32">
                <div className="flex items-center space-x-3 mb-10">
                  <Filter className="w-4 h-4 text-champagne" />
                  <h2 className="text-xs uppercase tracking-[0.4em] font-bold">Refine By</h2>
                </div>
                <Sidebar />
              </div>
            </aside>

            {/* Main Listing Area */}
            <div className="flex-1">
              {/* Controls Bar */}
              <div className="flex flex-col sm:flex-row items-center justify-between mb-12 border-b border-gray-100 pb-6">
                <div className="flex items-center space-x-6 mb-4 sm:mb-0">
                  <button
                    onClick={() => setIsMobileFilterOpen(true)}
                    className="lg:hidden flex items-center space-x-2 text-brand-emerald hover:text-brand-gold transition-colors font-bold text-[10px] tracking-widest uppercase border px-4 py-2 rounded-sm"
                  >
                    <Filter className="w-3 h-3" />
                    <span>Filter</span>
                  </button>
                  <p className="text-gray-400 font-sans text-[10px] tracking-widest uppercase">
                    Showing <span className="text-foreground font-bold">{sortedProducts.length}</span> Masterpieces
                  </p>
                </div>

                <div className="flex items-center space-x-4">
                  <span className="text-gray-400 text-[10px] tracking-widest uppercase">Sort By</span>
                  <div className="relative">
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="appearance-none bg-transparent border-b border-brand-gold py-1 pr-6 text-xs font-bold tracking-widest uppercase focus:outline-none cursor-pointer text-foreground"
                    >
                      <option>Newest Arrivals</option>
                      <option>Price: Low to High</option>
                      <option>Price: High to Low</option>
                    </select>
                    <ChevronDown className="absolute right-0 top-1 w-3 h-3 text-brand-gold pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Grid */}
              {sortedProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-16">
                  {sortedProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="py-32 text-center bg-gray-50 border border-dashed border-gray-200 rounded-sm">
                  <h3 className="font-serif text-3xl text-gray-300 uppercase tracking-widest mb-6">
                    No Treasures Found
                  </h3>
                  <p className="text-gray-400 mb-8 font-sans tracking-widest text-sm uppercase">Refine your search or view our entire collection</p>
                  <Button variant="gold" onClick={() => router.push("/category/all")}>EXPLORE ALL PRODUCTS</Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Filter Drawer */}
      <Suspense>
        {isMobileFilterOpen && (
          <div className="fixed inset-0 z-[100] lg:hidden">
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsMobileFilterOpen(false)} />
            <div className="absolute right-0 top-0 h-full w-[300px] bg-white p-8 overflow-y-auto">
              <div className="flex justify-between items-center mb-10">
                <h2 className="text-xs uppercase tracking-[0.4em] font-bold">Filters</h2>
                <button onClick={() => setIsMobileFilterOpen(false)}><X className="w-5 h-5" /></button>
              </div>
              <Sidebar />
            </div>
          </div>
        )}
      </Suspense>

      <Footer />
    </>
  );
}

export default function CategoryPage() {
  return (
    <main className="min-h-screen">
      <Suspense fallback={<div className="h-screen flex items-center justify-center bg-brand-emerald text-white font-serif italic text-2xl">Loading the Collection...</div>}>
        <CategoryContent />
      </Suspense>
    </main>
  );
}

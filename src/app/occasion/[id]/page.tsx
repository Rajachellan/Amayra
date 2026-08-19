"use client";

import React, { useState, useEffect, Suspense, use } from "react";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ProductCard } from "@/components/products/ProductCard";
import { shopApi } from "@/lib/api/shop";
import { mapListItemToProduct } from "@/lib/mapProduct";
import { resolveMediaUrl } from "@/lib/apiBase";
import { Filter, ChevronDown, X, Star } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { api } from "@/lib/api";

const COLORS = ["Gold", "Silver", "Rose Gold", "Antique"];
const PRICE_RANGES = [
  { label: "Under ₹5,000", max: 5000 },
  { label: "₹5,000 - ₹10,000", min: 5000, max: 10000 },
  { label: "₹10,000 - ₹20,000", min: 10000, max: 20000 },
  { label: "Over ₹20,000", min: 20000 },
];

interface OccasionDoc {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
}

function OccasionContent() {
  const { id: occasionSlug } = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();

  const colorQuery = searchParams.get("color");
  const maxPriceQuery = searchParams.get("maxPrice");

  const [filters, setFilters] = useState({
    color: colorQuery || null as string | null,
    maxPrice: maxPriceQuery ? Number(maxPriceQuery) : null as number | null,
  });
  const [sortBy, setSortBy] = useState("Newest Arrivals");
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [occasion, setOccasion] = useState<OccasionDoc | null>(null);
  const [rawProducts, setRawProducts] = useState<ReturnType<typeof mapListItemToProduct>[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch occasion details (could add an endpoint for this or just use the name from slug)
    // For now, let's just use the slug to fetch products and maybe find the occasion name
    api<OccasionDoc[]>(`/occasions`).then(list => {
      const found = list.find(o => o.slug === occasionSlug);
      if (found) setOccasion(found);
    });
  }, [occasionSlug]);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    const sortParam =
      sortBy === "Price: Low to High" ? "price_asc" :
      sortBy === "Price: High to Low" ? "price_desc" :
      sortBy === "Trending" ? "trending" :
      sortBy === "Bestsellers" ? "bestseller" : undefined;

    const q: Record<string, string | number | undefined> = {
      page: 1,
      limit: 48,
      sort: sortParam,
      occasion: occasionSlug as string,
    };

    if (filters.color) q.color = filters.color;
    if (filters.maxPrice != null) q.maxPrice = filters.maxPrice;

    shopApi.products(q)
      .then((res) => {
        if (cancelled) return;
        setRawProducts(res.items.map(mapListItemToProduct));
      })
      .catch(() => {
        if (!cancelled) setRawProducts([]);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => { cancelled = true; };
  }, [occasionSlug, sortBy, filters.color, filters.maxPrice]);

  const Sidebar = () => (
    <div className="space-y-10">
      <div className="space-y-4">
        <h3 className="text-[10px] uppercase tracking-[0.3em] font-bold text-gray-400">Price Range</h3>
        <div className="flex flex-col space-y-2">
          {PRICE_RANGES.map((range) => (
            <label key={range.label} className="flex items-center space-x-3 cursor-pointer group">
              <input
                type="radio"
                name="price"
                checked={filters.maxPrice === range.max}
                onChange={() => setFilters({ ...filters, maxPrice: range.max ?? null })}
                className="w-4 h-4 accent-champagne"
              />
              <span className="text-xs uppercase tracking-widest text-gray-600 group-hover:text-champagne transition-colors">{range.label}</span>
            </label>
          ))}
        </div>
      </div>

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

      <button
        type="button"
        onClick={() => setFilters({ color: null, maxPrice: null })}
        className="text-[10px] uppercase tracking-[0.2em] font-bold text-maroon hover:underline pt-4"
      >
        Clear All Filters
      </button>
    </div>
  );

  return (
    <>
      <Navbar />

      <section className="relative h-[70vh] min-h-[480px] flex items-center justify-center overflow-hidden bg-stone-950 pt-16">
        <motion.div
          initial={{ scale: 1.05 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0 z-0"
        >
          <Image
            src={resolveMediaUrl(occasion?.image) || "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=2000&auto=format&fit=crop"}
            alt="Occasion Background"
            fill
            className="object-cover object-[center_35%] brightness-[0.92]"
            priority
          />
        </motion.div>

        {/* Soft Luxury Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-stone-950/50 via-stone-950/15 to-stone-950/70 z-10" />
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#C4A064] to-transparent z-20" />

        <div className="container mx-auto px-6 relative z-20 text-center text-white">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: "easeOut" }} className="max-w-3xl mx-auto space-y-5">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#C4A064]/25 border border-[#C4A064]/40 backdrop-blur-md shadow-md">
              <Star className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
              <span className="text-amber-300 uppercase tracking-[0.4em] text-[10px] font-bold">
                Occasion Collection
              </span>
            </div>

            <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif tracking-tight leading-[1.1] capitalize drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)]">
              {occasion?.name || (occasionSlug as string).replace(/-/g, ' ')}
            </h1>

            <nav className="flex items-center justify-center space-x-3 text-stone-200 text-[11px] uppercase tracking-[0.3em] font-serif pt-2 drop-shadow-md">
              <Link href="/" className="hover:text-amber-300 transition-colors duration-300">
                Home
              </Link>
              <span className="text-amber-300/70">/</span>
              <span className="text-amber-300 font-bold tracking-[0.35em]">{(occasionSlug as string).replace(/-/g, ' ')}</span>
            </nav>
          </motion.div>
        </div>

        {/* Bottom Filigree Line */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#C4A064] to-transparent z-20" />
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-12">
            <aside className="hidden lg:block w-72 shrink-0 border-r border-gray-100 pr-10">
              <div className="sticky top-32">
                <div className="flex items-center space-x-3 mb-10">
                  <Filter className="w-4 h-4 text-champagne" />
                  <h2 className="text-xs uppercase tracking-[0.4em] font-bold">Refine By</h2>
                </div>
                <Sidebar />
              </div>
            </aside>

            <div className="flex-1">
              <div className="flex flex-col sm:flex-row items-center justify-between mb-12 border-b border-gray-100 pb-6">
                <div className="flex items-center space-x-6 mb-4 sm:mb-0">
                  <button
                    type="button"
                    onClick={() => setIsMobileFilterOpen(true)}
                    className="lg:hidden flex items-center space-x-2 text-brand-emerald hover:text-brand-gold transition-colors font-bold text-[10px] tracking-widest uppercase border px-4 py-2 rounded-sm"
                  >
                    <Filter className="w-3 h-3" />
                    <span>Filter</span>
                  </button>
                  <p className="text-gray-400 font-sans text-[10px] tracking-widest uppercase">
                    Showing <span className="text-foreground font-bold">{rawProducts.length}</span> Masterpieces
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
                      <option>Trending</option>
                      <option>Bestsellers</option>
                    </select>
                    <ChevronDown className="absolute right-0 top-1 w-3 h-3 text-brand-gold pointer-events-none" />
                  </div>
                </div>
              </div>

              {loading ? (
                <div className="py-32 text-center text-gray-400 font-serif text-xl">Unveiling collection…</div>
              ) : rawProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-16">
                  {rawProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="py-32 text-center bg-gray-50 border border-dashed border-gray-200 rounded-sm">
                  <h3 className="font-serif text-3xl text-gray-300 uppercase tracking-widest mb-6">No Treasures Found</h3>
                  <p className="text-gray-400 mb-8 font-sans tracking-widest text-sm uppercase">Try adjusting your filters</p>
                  <Button variant="gold" onClick={() => setFilters({ color: null, maxPrice: null })}>CLEAR FILTERS</Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <Suspense>
        {isMobileFilterOpen && (
          <div className="fixed inset-0 z-[100] lg:hidden">
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsMobileFilterOpen(false)} />
            <div className="absolute right-0 top-0 h-full w-[300px] bg-white p-8 overflow-y-auto">
              <div className="flex justify-between items-center mb-10">
                <h2 className="text-xs uppercase tracking-[0.4em] font-bold">Filters</h2>
                <button type="button" onClick={() => setIsMobileFilterOpen(false)}><X className="w-5 h-5" /></button>
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

export default function OccasionPage() {
  return (
    <main className="min-h-screen">
      <Suspense fallback={<div className="h-screen flex items-center justify-center bg-brand-emerald text-white font-serif italic text-2xl">Loading the Collection...</div>}>
        <OccasionContent />
      </Suspense>
    </main>
  );
}

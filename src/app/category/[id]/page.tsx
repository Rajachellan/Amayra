"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ProductCard } from "@/components/products/ProductCard";
import { CategorySlider } from "@/components/products/CategorySlider";
import { shopApi, type CategoryTreeNode } from "@/lib/api/shop";
import { mapListItemToProduct } from "@/lib/mapProduct";
import { resolveMediaUrl } from "@/lib/apiBase";
import { Filter, ChevronDown, X, Star } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const COLORS = ["Gold", "Silver", "Rose Gold", "Antique"];
const PRICE_RANGES = [
  { label: "Under ₹5,000", max: 5000 },
  { label: "₹5,000 - ₹10,000", min: 5000, max: 10000 },
  { label: "₹10,000 - ₹20,000", min: 10000, max: 20000 },
  { label: "Over ₹20,000", min: 20000 },
];

function findInTree(
  nodes: CategoryTreeNode[],
  slug: string,
  parent: CategoryTreeNode | null = null
): { node: CategoryTreeNode; parent: CategoryTreeNode | null } | null {
  for (const n of nodes) {
    if (n.slug === slug) return { node: n, parent };
    const inner = findInTree(n.children || [], slug, n);
    if (inner) return inner;
  }
  return null;
}

function CategoryContent() {
  const { id } = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const categorySlug = id as string;

  const subQuery = searchParams.get("sub");
  const colorQuery = searchParams.get("color");
  const maxPriceQuery = searchParams.get("maxPrice");
  const collectionQuery = searchParams.get("collection");

  const [filters, setFilters] = useState({
    color: colorQuery || null as string | null,
    maxPrice: maxPriceQuery ? Number(maxPriceQuery) : null as number | null,
    rating: null as number | null,
  });
  const [sortBy, setSortBy] = useState("Newest Arrivals");
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [tree, setTree] = useState<CategoryTreeNode[]>([]);
  const [rawProducts, setRawProducts] = useState<ReturnType<typeof mapListItemToProduct>[]>([]);
  const [loading, setLoading] = useState(true);
  const [heroImage, setHeroImage] = useState<string>(
    "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=2000&auto=format&fit=crop"
  );
  const [title, setTitle] = useState(categorySlug);

  useEffect(() => {
    shopApi.categoriesTree().then(setTree).catch(() => setTree([]));
  }, []);

  useEffect(() => {
    const ctx = findInTree(tree, categorySlug);
    if (ctx?.node.image) setHeroImage(resolveMediaUrl(ctx.node.image));
    if (ctx?.node.name) setTitle(ctx.node.name);
    else setTitle(categorySlug);

    if (subQuery) {
      const subCtx = findInTree(tree, subQuery);
      if (subCtx?.node.image) setHeroImage(resolveMediaUrl(subCtx.node.image));
    }
  }, [tree, categorySlug, subQuery]);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    const sortParam =
      sortBy === "Price: Low to High"
        ? "price_asc"
        : sortBy === "Price: High to Low"
          ? "price_desc"
          : sortBy === "Trending"
            ? "trending"
            : sortBy === "Bestsellers"
              ? "bestseller"
              : undefined;

    const q: Record<string, string | number | undefined> = {
      page: 1,
      limit: 48,
      sort: sortParam,
    };

    if (categorySlug && categorySlug !== "all") {
      q.category = categorySlug;
    }
    if (subQuery) {
      q.subCategory = subQuery;
    }
    if (collectionQuery) {
      q.collection = collectionQuery;
    }
    if (filters.color) q.color = filters.color;
    if (filters.maxPrice != null) q.maxPrice = filters.maxPrice;

    shopApi
      .products(q)
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

    return () => {
      cancelled = true;
    };
  }, [categorySlug, subQuery, collectionQuery, sortBy, filters.color, filters.maxPrice]);

  const ctx = findInTree(tree, categorySlug);
  const subCategoryItems =
    ctx && ctx.node.children?.length
      ? ctx.node.children.map((c) => ({
          name: c.name,
          slug: c.slug,
          image: resolveMediaUrl(c.image),
        }))
      : ctx?.parent?.children?.length
        ? ctx.parent.children.map((c) => ({
            name: c.name,
            slug: c.slug,
            image: resolveMediaUrl(c.image),
          }))
        : [];

  const sortedProducts = rawProducts;

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

      <div className="space-y-4">
        <h3 className="text-[10px] uppercase tracking-[0.3em] font-bold text-gray-400">Sort presets</h3>
        <div className="flex flex-col space-y-2">
          {(["Trending", "Bestsellers"] as const).map((label) => (
            <button
              key={label}
              type="button"
              onClick={() => setSortBy(label)}
              className={`text-left text-xs uppercase tracking-widest py-1 ${sortBy === label ? "text-champagne font-bold" : "text-gray-500 hover:text-champagne"}`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-[10px] uppercase tracking-[0.3em] font-bold text-gray-400">Customer Rating</h3>
        <div className="flex flex-col space-y-3">
          {[5, 4, 3].map((star) => (
            <button key={star} type="button" className="flex items-center space-x-2 text-gray-400 hover:text-champagne transition-colors">
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
        type="button"
        onClick={() => setFilters({ color: null, maxPrice: null, rating: null })}
        className="text-[10px] uppercase tracking-[0.2em] font-bold text-maroon hover:underline pt-4"
      >
        Clear All Filters
      </button>
    </div>
  );

  return (
    <>
      <Navbar />

      <section className="relative h-[65vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <motion.div
          initial={{ scale: 1.15 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="absolute inset-0 z-0"
        >
          <Image
            src={heroImage}
            alt="Collection Background"
            fill
            className="object-cover brightness-[0.65]"
            priority
          />
        </motion.div>

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
            <div className="flex items-center justify-center space-x-4 mb-8">
              <motion.div initial={{ width: 0 }} animate={{ width: 40 }} transition={{ delay: 0.5, duration: 1 }} className="h-px bg-champagne/60" />
              <span className="text-champagne text-[11px] uppercase tracking-[0.6em] font-bold">The Amayra Boutique</span>
              <motion.div initial={{ width: 0 }} animate={{ width: 40 }} transition={{ delay: 0.5, duration: 1 }} className="h-px bg-champagne/60" />
            </div>

            <h1 className="text-5xl md:text-8xl font-serif text-white mb-10 tracking-tight leading-[1.1] drop-shadow-2xl capitalize">
              {subQuery ? subQuery.replace(/-/g, " ") : title === "all" ? "Amayra" : title}
            </h1>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.7, duration: 1.2 }}
              className="w-32 h-[1px] bg-champagne mx-auto mb-12"
            />

            <nav className="flex items-center justify-center space-x-4 text-white/60 text-[10px] uppercase tracking-[0.4em]">
              <Link href="/" className="hover:text-champagne transition-colors duration-300">Home</Link>
              <span className="text-champagne/40">/</span>
              <Link href="/category/all" className="hover:text-champagne transition-colors duration-300">Boutique</Link>
              <span className="text-champagne/40">/</span>
              <span className="text-white font-bold tracking-[0.5em]">{categorySlug}</span>
            </nav>
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-white via-white/40 to-transparent z-20" />
      </section>

      {subCategoryItems.length > 0 && (
        <CategorySlider currentCategory={categorySlug} subCategories={subCategoryItems} />
      )}

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
                      <option>Trending</option>
                      <option>Bestsellers</option>
                    </select>
                    <ChevronDown className="absolute right-0 top-1 w-3 h-3 text-brand-gold pointer-events-none" />
                  </div>
                </div>
              </div>

              {loading ? (
                <div className="py-32 text-center text-gray-400 font-serif text-xl">Loading collection…</div>
              ) : sortedProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-16">
                  {sortedProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="py-32 text-center bg-gray-50 border border-dashed border-gray-200 rounded-sm">
                  <h3 className="font-serif text-3xl text-gray-300 uppercase tracking-widest mb-6">No Treasures Found</h3>
                  <p className="text-gray-400 mb-8 font-sans tracking-widest text-sm uppercase">Refine your search or view our entire collection</p>
                  <Button variant="gold" onClick={() => router.push("/category/all")}>EXPLORE ALL PRODUCTS</Button>
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

export default function CategoryPage() {
  return (
    <main className="min-h-screen">
      <Suspense fallback={<div className="h-screen flex items-center justify-center bg-brand-emerald text-white font-serif italic text-2xl">Loading the Collection...</div>}>
        <CategoryContent />
      </Suspense>
    </main>
  );
}

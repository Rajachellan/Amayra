"use client";

import React, { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import {
  Search,
  Layers,
  Sparkles,
  FileText,
  Gem,
  ArrowUpRight,
  ChevronRight,
} from "lucide-react";
import { shopApi, type CollectionDoc, type CategoryDoc } from "@/lib/api/shop";

type ProductLink = {
  _id: string;
  name: string;
  slug: string;
  category?: string;
  price?: number;
};

// Curated static store pages for comprehensive coverage
const STATIC_PAGES = [
  { name: "Home", href: "/", category: "General" },
  { name: "All Jewellery Catalog", href: "/category/all", category: "Catalog" },
  { name: "New Arrivals Archive", href: "/category/all?sort=newest", category: "Catalog" },
  { name: "Bestsellers Collection", href: "/category/all?sort=bestseller", category: "Catalog" },
  { name: "Our Story & Heritage", href: "/about", category: "About" },
  { name: "Atelier Blogs & Journal", href: "/blog", category: "Editorial" },
  { name: "Contact The Atelier", href: "/contact", category: "Support" },
  { name: "Client Account & Track Order", href: "/profile", category: "Account" },
  { name: "My Wishlist", href: "/wishlist", category: "Shopping" },
  { name: "Shopping Bag", href: "/checkout", category: "Shopping" },
  { name: "Shipping & Delivery Policy", href: "/shipping-returns", category: "Policies" },
  { name: "Return & Exchange Policy", href: "/shipping-returns", category: "Policies" },
  { name: "Privacy Policy", href: "/privacy-policy", category: "Policies" },
  { name: "Terms of Service", href: "/terms-of-service", category: "Policies" },
];

export default function SitemapPage() {
  const [categories, setCategories] = useState<CategoryDoc[]>([]);
  const [collections, setCollections] = useState<CollectionDoc[]>([]);
  const [products, setProducts] = useState<ProductLink[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState<"all" | "collections" | "products" | "pages">("all");

  useEffect(() => {
    let cancelled = false;
    async function loadData() {
      try {
        setLoading(true);
        const [catsRes, colsRes, prodsRes] = await Promise.allSettled([
          shopApi.categories(),
          shopApi.collections(),
          shopApi.products({ limit: 1000 }),
        ]);

        if (!cancelled) {
          if (catsRes.status === "fulfilled" && Array.isArray(catsRes.value)) {
            setCategories(catsRes.value);
          }
          if (colsRes.status === "fulfilled" && Array.isArray(colsRes.value)) {
            setCollections(colsRes.value);
          }
          if (prodsRes.status === "fulfilled" && prodsRes.value?.items) {
            setProducts(
              prodsRes.value.items.map((p) => ({
                _id: p._id,
                name: p.name,
                slug: p.slug,
                category: typeof p.category === "object" ? p.category?.name : undefined,
                price: p.salePrice || p.price,
              }))
            );
          }
        }
      } catch (e) {
        console.error("Failed to fetch sitemap data", e);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadData();
    return () => {
      cancelled = true;
    };
  }, []);

  // Filtered collections & categories
  const filteredCollections = useMemo(() => {
    const list = [
      ...collections.map((c) => ({
        title: `${c.name} Collection`,
        href: `/category/all?collection=${c.slug}`,
        type: "Collection",
      })),
      ...categories.map((c) => ({
        title: c.name,
        href: `/category/${c.slug}`,
        type: "Category",
      })),
    ];

    // Ensure signature collections are always listed
    const fallbacks = [
      { title: "Virasat Collection", href: "/category/all?collection=virasat", type: "Collection" },
      { title: "Pehla Tohfa Collection", href: "/category/all?collection=pehla-tohfa", type: "Collection" },
      { title: "AAnchal Collection", href: "/category/all?collection=aanchal", type: "Collection" },
      { title: "Jashn Noor Collection", href: "/category/all?collection=Jashn-noor", type: "Collection" },
      { title: "Darpan Collection", href: "/category/all?collection=darpan", type: "Collection" },
      { title: "Necklace Sets & Haars", href: "/category/necklaces", type: "Category" },
      { title: "Royal Chokers", href: "/category/choker", type: "Category" },
      { title: "Earrings & Jhumkis", href: "/category/earrings", type: "Category" },
      { title: "Bridal Jewellery", href: "/category/bridal", type: "Category" },
      { title: "Kundan Jewellery", href: "/category/kundan", type: "Category" },
    ];

    const merged = [...list];
    fallbacks.forEach((fb) => {
      if (!merged.some((m) => m.href === fb.href || m.title.toLowerCase() === fb.title.toLowerCase())) {
        merged.push(fb);
      }
    });

    if (!searchTerm.trim()) return merged;
    const term = searchTerm.toLowerCase();
    return merged.filter((item) => item.title.toLowerCase().includes(term));
  }, [collections, categories, searchTerm]);

  // Filtered products
  const filteredProducts = useMemo(() => {
    if (!searchTerm.trim()) return products;
    const term = searchTerm.toLowerCase();
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(term) ||
        p.slug.toLowerCase().includes(term) ||
        p.category?.toLowerCase().includes(term)
    );
  }, [products, searchTerm]);

  // Filtered static pages
  const filteredPages = useMemo(() => {
    if (!searchTerm.trim()) return STATIC_PAGES;
    const term = searchTerm.toLowerCase();
    return STATIC_PAGES.filter(
      (p) => p.name.toLowerCase().includes(term) || p.category.toLowerCase().includes(term)
    );
  }, [searchTerm]);

  const totalCount =
    filteredCollections.length + filteredProducts.length + filteredPages.length;

  return (
    <div className="min-h-screen bg-[#FAF9F7] text-neutral-900 selection:bg-[#c4a064] selection:text-white">
      {/* Top Banner & Header */}
      <section className="border-b border-neutral-200 bg-white py-14 sm:py-18">
        <div className="container mx-auto px-6 text-center max-w-4xl">
          <p className="text-[11px] font-bold uppercase tracking-[0.45em] text-[#856d2e] mb-3">
            Maison MaiRii • Directory
          </p>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif tracking-tight text-neutral-900 uppercase">
            SITEMAP
          </h1>

          <div className="mx-auto mt-4 h-px w-24 bg-gradient-to-r from-transparent via-[#c4a064] to-transparent" />

          <p className="mt-4 text-xs sm:text-sm text-neutral-600 max-w-lg mx-auto leading-relaxed">
            Browse our complete directory of handcrafted jewellery collections, product catalog, and store
            information.
          </p>

          {/* Search Bar */}
          <div className="mt-8 mx-auto max-w-md">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search products, collections, or pages…"
                className="w-full rounded-full border border-neutral-300 bg-[#FAF9F7] pl-11 pr-10 py-3 text-xs sm:text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-neutral-900 transition"
              />
              {searchTerm && (
                <button
                  type="button"
                  onClick={() => setSearchTerm("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-neutral-400 hover:text-neutral-700 cursor-pointer"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Tab Filter Pills */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
            {[
              { id: "all", label: `All (${totalCount})` },
              { id: "collections", label: `Collections & Categories (${filteredCollections.length})` },
              { id: "products", label: `Products (${filteredProducts.length})` },
              { id: "pages", label: `Pages (${filteredPages.length})` },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as any)}
                className={`rounded-full px-4 py-1.5 text-xs font-medium transition cursor-pointer ${
                  activeTab === tab.id
                    ? "bg-neutral-900 text-white shadow-xs"
                    : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Sitemap Grid (Matching Rubans multi-column layout) */}
      <section className="container mx-auto px-6 py-12 sm:py-16">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="space-y-4">
                <div className="h-6 w-36 animate-pulse rounded bg-neutral-200" />
                <div className="h-96 w-full animate-pulse rounded-2xl bg-neutral-100" />
              </div>
            ))}
          </div>
        ) : totalCount === 0 ? (
          <div className="rounded-2xl border border-dashed border-neutral-300 bg-white p-12 text-center max-w-lg mx-auto">
            <p className="text-sm text-neutral-600 mb-3">
              No results found matching &quot;{searchTerm}&quot;.
            </p>
            <button
              type="button"
              onClick={() => setSearchTerm("")}
              className="text-xs font-semibold text-[#856d2e] hover:underline cursor-pointer"
            >
              Clear search filter
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 items-start">
            {/* COLUMN 1: COLLECTIONS & CATEGORIES */}
            {(activeTab === "all" || activeTab === "collections") && (
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-neutral-200/90 shadow-2xs">
                <div className="flex items-center gap-2.5 pb-4 border-b border-neutral-100 mb-6">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#FAF8F3] border border-[#c4a064]/40 text-[#856d2e]">
                    <Layers className="h-4 w-4" />
                  </div>
                  <div>
                    <h2 className="text-sm sm:text-base font-bold uppercase tracking-[0.2em] text-neutral-900">
                      Collections
                    </h2>
                    <p className="text-[11px] text-neutral-400">
                      {filteredCollections.length} curated categories
                    </p>
                  </div>
                </div>

                <ul className="space-y-3">
                  {filteredCollections.map((item, idx) => (
                    <li key={`${item.href}-${idx}`}>
                      <Link
                        href={item.href}
                        className="group flex items-center justify-between text-xs sm:text-sm text-neutral-700 hover:text-[#856d2e] hover:translate-x-1 transition-all"
                      >
                        <span className="flex items-center gap-2">
                          <span className="h-1.5 w-1.5 rounded-full bg-[#c4a064] group-hover:scale-125 transition-transform" />
                          <span className="line-clamp-1">{item.title}</span>
                        </span>
                        <ChevronRight className="h-3.5 w-3.5 text-neutral-300 opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* COLUMN 2: PRODUCTS */}
            {(activeTab === "all" || activeTab === "products") && (
              <div
                className={`bg-white rounded-2xl p-6 sm:p-8 border border-neutral-200/90 shadow-2xs ${
                  activeTab === "products" ? "md:col-span-2 lg:col-span-3" : ""
                }`}
              >
                <div className="flex items-center gap-2.5 pb-4 border-b border-neutral-100 mb-6">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#FAF8F3] border border-[#c4a064]/40 text-[#856d2e]">
                    <Gem className="h-4 w-4" />
                  </div>
                  <div>
                    <h2 className="text-sm sm:text-base font-bold uppercase tracking-[0.2em] text-neutral-900">
                      Products
                    </h2>
                    <p className="text-[11px] text-neutral-400">
                      {filteredProducts.length} jewellery pieces
                    </p>
                  </div>
                </div>

                <ul
                  className={`space-y-2.5 max-h-[1400px] overflow-y-auto pr-2 ${
                    activeTab === "products"
                      ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-2.5 space-y-0"
                      : ""
                  }`}
                >
                  {filteredProducts.map((p) => (
                    <li key={p._id}>
                      <Link
                        href={`/product/${p.slug}`}
                        className="group flex items-baseline justify-between text-xs sm:text-[13px] text-neutral-700 hover:text-[#856d2e] hover:translate-x-0.5 transition-all py-0.5"
                      >
                        <span className="flex items-baseline gap-2 overflow-hidden">
                          <span className="text-[10px] text-[#c4a064] shrink-0">•</span>
                          <span className="truncate group-hover:underline">
                            {p.name}
                          </span>
                        </span>
                        <ArrowUpRight className="h-3 w-3 text-neutral-300 opacity-0 group-hover:opacity-100 transition-opacity shrink-0 ml-1.5" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* COLUMN 3: PAGES */}
            {(activeTab === "all" || activeTab === "pages") && (
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-neutral-200/90 shadow-2xs">
                <div className="flex items-center gap-2.5 pb-4 border-b border-neutral-100 mb-6">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#FAF8F3] border border-[#c4a064]/40 text-[#856d2e]">
                    <FileText className="h-4 w-4" />
                  </div>
                  <div>
                    <h2 className="text-sm sm:text-base font-bold uppercase tracking-[0.2em] text-neutral-900">
                      Pages
                    </h2>
                    <p className="text-[11px] text-neutral-400">
                      {filteredPages.length} store & policy links
                    </p>
                  </div>
                </div>

                <ul className="space-y-3">
                  {filteredPages.map((page, idx) => (
                    <li key={`${page.href}-${idx}`}>
                      <Link
                        href={page.href}
                        className="group flex items-center justify-between text-xs sm:text-sm text-neutral-700 hover:text-[#856d2e] hover:translate-x-1 transition-all"
                      >
                        <span className="flex items-center gap-2">
                          <span className="h-1.5 w-1.5 rounded-full bg-neutral-400 group-hover:bg-[#c4a064] transition-colors" />
                          <span>{page.name}</span>
                        </span>
                        <span className="text-[10px] font-medium uppercase tracking-wider text-neutral-400 border border-neutral-100 rounded-md px-1.5 py-0.5 bg-neutral-50">
                          {page.category}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </section>
    </div>
  );
}

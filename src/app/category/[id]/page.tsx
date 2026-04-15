"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ProductCard } from "@/components/products/ProductCard";
import { CategorySlider } from "@/components/products/CategorySlider";
import { FilterSideDrawer } from "@/components/products/FilterSideDrawer";
import { products } from "@/data/products";
import { Filter, ChevronDown, LayoutGrid, List } from "lucide-react";
import { Button } from "@/components/ui/Button";

const SUBCATEGORY_IMAGES: Record<string, string> = {
  "Kundan": "https://images.unsplash.com/photo-1615655406736-b37c4fabf923?q=80&w=500&auto=format&fit=crop",
  "Temple": "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=500&auto=format&fit=crop",
  "Victorian": "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=500&auto=format&fit=crop",
  "South Indian": "https://images.unsplash.com/photo-1626784215021-2e39ccf971cd?q=80&w=500&auto=format&fit=crop",
  "Jhumkas": "https://images.unsplash.com/photo-1598560912005-597659b7524b?q=80&w=500&auto=format&fit=crop",
  "Daily Wear": "https://images.unsplash.com/photo-1535633302704-b02923cc5c37?q=80&w=500&auto=format&fit=crop",
  "Chandbalis": "https://images.unsplash.com/photo-1630019017578-831633534d02?q=80&w=500&auto=format&fit=crop",
  "Heritage Sets": "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=500&auto=format&fit=crop",
  "Brooches": "https://images.unsplash.com/photo-1617038220319-276d3cfab638?q=80&w=500&auto=format&fit=crop"
};

function CategoryContent() {
  const { id } = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const subQuery = searchParams.get("sub");
  const colorQuery = searchParams.get("color");
  const filterQuery = searchParams.get("filter");
  const maxPriceQuery = searchParams.get("maxPrice");

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState({
    color: colorQuery || null,
    material: null,
    maxPrice: maxPriceQuery ? Number(maxPriceQuery) : null,
  });
  const [sortBy, setSortBy] = useState("Newest Arrivals");

  // Get unique sub-categories for the current category to show in slider
  const currentCategoryProducts = products.filter(p => 
    id === "all" || p.category.toLowerCase() === (id as string).toLowerCase()
  );
  
  const uniqueSubs = Array.from(new Set(currentCategoryProducts.map(p => p.subCategory).filter(Boolean))) as string[];
  const subCategoryItems = uniqueSubs.map(name => ({
    name,
    image: SUBCATEGORY_IMAGES[name] || "https://images.unsplash.com/photo-1605100804763-247f67b3f413?q=80&w=500&auto=format&fit=crop"
  }));

  const filteredProducts = currentCategoryProducts.filter((p) => {
    if (subQuery && p.subCategory !== subQuery) return false;
    if (filters.color && p.color !== filters.color) return false;
    if (filters.material && p.material?.indexOf(filters.material) === -1) return false;
    if (filters.maxPrice && p.price > filters.maxPrice) return false;
    if (filterQuery === "isBestSeller" && !p.isBestSeller) return false;
    if (filterQuery === "isNewArrival" && !p.isNewArrival) return false;
    return true;
  });

  // Sort logic
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "Price: Low to High") return a.price - b.price;
    if (sortBy === "Price: High to Low") return b.price - a.price;
    return 0; // Default: data order
  });

  return (
    <>
      <Navbar />
      
      {/* Category Header */}
      <section className="bg-brand-emerald pt-40 pb-20 text-white relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-7xl font-serif mb-4 tracking-widest uppercase">
              {subQuery ? subQuery : (id === "all" ? "Boutique" : id)}
            </h1>
            <div className="w-20 h-1 gold-gradient mb-8" />
            <p className="text-gray-300 font-sans tracking-[0.2em] uppercase text-xs">
              Home {">"} Collections {">"} <span className="text-brand-gold">{id}</span>
            </p>
          </div>
        </div>
        <div className="absolute right-0 bottom-0 w-1/3 h-full bg-white/5 skew-x-12 translate-x-1/2" />
      </section>

      {/* Visual Sub-categories Navigation */}
      {subCategoryItems.length > 0 && (
        <CategorySlider currentCategory={id as string} subCategories={subCategoryItems} />
      )}

      {/* Main Content */}
      <section className="py-12 bg-gray-50/50">
        <div className="container mx-auto px-6">
          {/* Controls Bar */}
          <div className="bg-white p-4 flex flex-col md:flex-row items-center justify-between shadow-sm mb-12 border border-gray-100">
            <div className="flex items-center space-x-6 mb-4 md:mb-0">
              <button 
                onClick={() => setIsFilterOpen(true)}
                className="flex items-center space-x-2 text-brand-emerald hover:text-brand-gold transition-colors font-bold text-xs tracking-widest uppercase border-r pr-6"
              >
                <Filter className="w-4 h-4" />
                <span>Filters</span>
              </button>
              <p className="text-gray-400 font-sans text-[10px] tracking-widest uppercase">
                <span className="text-brand-emerald font-bold">{sortedProducts.length}</span> Products Found
              </p>
            </div>

            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-4">
                <span className="text-gray-400 text-[10px] tracking-widest uppercase">Sort By:</span>
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="appearance-none bg-transparent border-b border-brand-gold py-1 pr-6 text-xs font-bold tracking-widest uppercase focus:outline-none cursor-pointer text-brand-emerald"
                  >
                    <option>Newest Arrivals</option>
                    <option>Price: Low to High</option>
                    <option>Price: High to Low</option>
                    <option>Bestsellers</option>
                  </select>
                  <ChevronDown className="absolute right-0 top-1 w-3 h-3 text-brand-gold pointer-events-none" />
                </div>
              </div>
            </div>
          </div>

          {/* Grid */}
          {sortedProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12">
              {sortedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="py-32 text-center bg-white border border-dashed border-gray-200">
              <h3 className="font-serif text-3xl text-gray-300 uppercase tracking-widest mb-6">
                No Treasures Found
              </h3>
              <p className="text-gray-400 mb-8 font-sans tracking-widest text-sm uppercase">Refine your search or view our entire collection</p>
              <Button variant="gold" onClick={() => router.push("/category/all")}>EXPLORE ALL PRODUCTS</Button>
            </div>
          )}
        </div>
      </section>

      <FilterSideDrawer 
        isOpen={isFilterOpen} 
        onClose={() => setIsFilterOpen(false)} 
        filters={filters}
        setFilters={setFilters}
      />

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

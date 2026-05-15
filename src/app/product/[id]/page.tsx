"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { shopApi } from "@/lib/api/shop";
import { mapDetailToProduct, mapListItemToProduct } from "@/lib/mapProduct";
import { resolveMediaUrl } from "@/lib/apiBase";
import { Button } from "@/components/ui/Button";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { Heart, ShoppingBag, Truck, RotateCcw, ShieldCheck, ChevronRight, Star } from "lucide-react";
import { ProductCard } from "@/components/products/ProductCard";
import type { Product } from "@/types";

function ProductDetail() {
  const params = useParams();
  const slug = params.id as string;
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [product, setProduct] = useState<Product | null>(null);
  const [images, setImages] = useState<string[]>([]);
  const [activeImg, setActiveImg] = useState(0);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    let cancelled = false;
    setLoading(true);
    shopApi
      .productBySlug(slug)
      .then(async (detail) => {
        if (cancelled) return;
        const imgs = (detail.images || []).map((u) => resolveMediaUrl(u));
        setImages(imgs.length ? imgs : [resolveMediaUrl(undefined)]);
        setActiveImg(0);
        setProduct(mapDetailToProduct(detail));
        const catSlug =
          detail.category && typeof detail.category === "object" && "slug" in detail.category
            ? (detail.category as { slug: string }).slug
            : undefined;
        if (catSlug) {
          const r = await shopApi.products({ category: catSlug, limit: 8, page: 1 });
          if (cancelled) return;
          const mapped = r.items
            .filter((i) => i.slug !== detail.slug)
            .slice(0, 4)
            .map(mapListItemToProduct);
          setRelatedProducts(mapped);
        } else {
          setRelatedProducts([]);
        }
      })
      .catch(() => {
        if (!cancelled) setProduct(null);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [slug]);

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-grow flex items-center justify-center py-40">
          <p className="text-gray-400 font-serif tracking-widest text-sm uppercase">Loading…</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-grow flex items-center justify-center py-40">
          <h1 className="text-3xl font-serif">Product Not Found</h1>
        </div>
        <Footer />
      </div>
    );
  }

  const mainSrc =
    typeof product.image === "string" ? product.image : resolveMediaUrl(undefined);
  const thumbs = images.length ? images : [mainSrc];
  const catHref = product.categorySlug ? `/category/${product.categorySlug}` : "/category/all";

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      <div className="pt-32 pb-6 px-6 container mx-auto flex items-center space-x-2 text-xs text-gray-400 uppercase tracking-widest">
        <a href="/" className="hover:text-brand-emerald">Home</a>
        <ChevronRight className="w-3 h-3" />
        <a href={catHref} className="hover:text-brand-emerald">{product.category}</a>
        <ChevronRight className="w-3 h-3" />
        <span className="text-brand-emerald font-bold">{product.name}</span>
      </div>

      <section className="pb-24">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
            <div className="w-full lg:w-[55%] flex flex-col-reverse lg:flex-row gap-4 lg:gap-6">
              {/* Thumbnails */}
              <div className="flex lg:flex-col gap-4 lg:w-24 xl:w-28 flex-shrink-0 overflow-x-auto lg:overflow-y-auto no-scrollbar pb-2 lg:pb-0">
                {thumbs.map((src, i) => (
                  <button
                    type="button"
                    key={src + i}
                    onClick={() => setActiveImg(i)}
                    className={`aspect-[3/4] relative overflow-hidden rounded-2xl flex-shrink-0 w-24 lg:w-full border-2 transition-all ${
                      activeImg === i ? "border-brand-emerald" : "border-transparent hover:border-gray-200"
                    }`}
                  >
                    <Image src={src} alt="" fill sizes="112px" className="object-cover" />
                  </button>
                ))}
              </div>

              {/* Main Image */}
              <div className="relative flex-grow aspect-[3/4] overflow-hidden group rounded-3xl bg-[#F5F5F5]">
                <Image
                  src={thumbs[activeImg] || mainSrc}
                  alt={product.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </div>

            <div className="w-full lg:w-[45%] flex flex-col">
              <div className="mb-4 flex items-center justify-between">
                <span className="text-brand-gold font-bold tracking-[0.3em] uppercase text-xs">
                  {product.category} COLLECTION
                </span>
                <div className="flex items-center text-brand-gold">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="ml-1 text-sm font-bold text-brand-emerald">4.9</span>
                  <span className="ml-2 text-gray-400 text-xs text-brand-emerald font-normal">(Curated)</span>
                </div>
              </div>

              <h1 className="text-4xl md:text-5xl font-serif text-brand-emerald mb-4 tracking-wide">
                {product.name}
              </h1>

              <div className="flex items-baseline space-x-6 mb-8">
                <span className="text-4xl font-bold text-brand-emerald">₹{product.price.toLocaleString()}</span>
                {product.oldPrice != null && (
                  <span className="text-2xl text-gray-400/50 line-through font-light">₹{product.oldPrice.toLocaleString()}</span>
                )}
              </div>

              <p className="text-gray-600 font-sans leading-relaxed mb-10 tracking-widest text-sm">
                {product.description}
              </p>

              {product.sizes && product.sizes.length > 0 && (
                <div className="mb-10">
                  <h4 className="font-serif text-sm tracking-widest uppercase mb-4">Select Size</h4>
                  <div className="flex flex-wrap gap-3">
                    {product.sizes.map((size) => (
                      <button
                        type="button"
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`w-12 h-12 flex items-center justify-center border transition-all duration-300 ${
                          selectedSize === size
                            ? "border-brand-emerald bg-brand-emerald text-white"
                            : "border-gray-200 text-gray-600 hover:border-brand-gold"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4 mb-10 p-6 bg-gray-50 border border-gray-100">
                <div>
                  <h5 className="text-[10px] text-gray-400 uppercase tracking-widest mb-1">Material</h5>
                  <p className="text-brand-emerald font-bold text-sm tracking-widest">{product.material || "—"}</p>
                </div>
                <div>
                  <h5 className="text-[10px] text-gray-400 uppercase tracking-widest mb-1">Weight</h5>
                  <p className="text-brand-emerald font-bold text-sm tracking-widest">{product.weight || "—"}</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Button variant="gold" size="lg" className="flex-grow" onClick={() => addToCart(product)}>
                  <ShoppingBag className="w-5 h-5 mr-3" /> ADD TO BAG
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className={isInWishlist(product.id) ? "bg-brand-gold text-white" : ""}
                  onClick={() => toggleWishlist(product)}
                >
                  <Heart className={`w-5 h-5 ${isInWishlist(product.id) ? "fill-current" : ""}`} />
                </Button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-10 border-t">
                <div className="flex items-center space-x-3 text-xs tracking-widest text-gray-500">
                  <ShieldCheck className="w-5 h-5 text-brand-gold" />
                  <span>BIS HALLMARKED</span>
                </div>
                <div className="flex items-center space-x-3 text-xs tracking-widest text-gray-500">
                  <Truck className="w-5 h-5 text-brand-gold" />
                  <span>FREE TRACKED SHIPPING</span>
                </div>
                <div className="flex items-center space-x-3 text-xs tracking-widest text-gray-500">
                  <RotateCcw className="w-5 h-5 text-brand-gold" />
                  <span>15-DAY EASY RETURN</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {relatedProducts.length > 0 && (
        <section className="py-24 bg-gray-50">
          <div className="container mx-auto px-6">
            <h3 className="font-serif text-3xl mb-12 tracking-widest text-center uppercase">You May Also Like</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </main>
  );
}

export default function ProductPage() {
  return (
    <React.Suspense fallback={<div className="h-screen flex items-center justify-center text-gray-400 font-serif tracking-widest uppercase">Loading Product...</div>}>
      <ProductDetail />
    </React.Suspense>
  );
}

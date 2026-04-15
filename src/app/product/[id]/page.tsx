"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { products } from "@/data/products";
import { Button } from "@/components/ui/Button";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { Heart, ShoppingBag, Truck, RotateCcw, ShieldCheck, ChevronRight, Star } from "lucide-react";
import { ProductCard } from "@/components/products/ProductCard";
import { motion } from "framer-motion";

export default function ProductPage() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  const product = products.find((p) => p.id === id);

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

  const relatedProducts = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* Breadcrumbs */}
      <div className="pt-32 pb-6 px-6 container mx-auto flex items-center space-x-2 text-xs text-gray-400 uppercase tracking-widest">
        <a href="/" className="hover:text-brand-emerald">Home</a>
        <ChevronRight className="w-3 h-3" />
        <a href={`/category/${product.category.toLowerCase()}`} className="hover:text-brand-emerald">{product.category}</a>
        <ChevronRight className="w-3 h-3" />
        <span className="text-brand-emerald font-bold">{product.name}</span>
      </div>

      <section className="pb-24">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-16">
            
            {/* Image Gallery */}
            <div className="w-full lg:w-1/2 space-y-4">
              <div className="relative aspect-[4/5] overflow-hidden group">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <div className="grid grid-cols-4 gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="aspect-square relative opacity-60 hover:opacity-100 cursor-pointer overflow-hidden border border-gray-100">
                    <Image src={product.image} alt={product.name} fill className="object-cover" />
                  </div>
                ))}
              </div>
            </div>

            {/* Product Details */}
            <div className="w-full lg:w-1/2 flex flex-col">
              <div className="mb-4 flex items-center justify-between">
                <span className="text-brand-gold font-bold tracking-[0.3em] uppercase text-xs">
                  {product.category} COLLECTION
                </span>
                <div className="flex items-center text-brand-gold">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="ml-1 text-sm font-bold text-brand-emerald">{product.rating}</span>
                  <span className="ml-2 text-gray-400 text-xs text-brand-emerald font-normal">({product.reviews} Reviews)</span>
                </div>
              </div>

              <h1 className="text-4xl md:text-5xl font-serif text-brand-emerald mb-4 tracking-wide">
                {product.name}
              </h1>

              <div className="flex items-center space-x-4 mb-8">
                <span className="text-3xl font-bold text-brand-emerald">₹{product.price.toLocaleString()}</span>
                {product.oldPrice && (
                  <span className="text-xl text-gray-400 line-through">₹{product.oldPrice.toLocaleString()}</span>
                )}
                {product.discount && (
                  <span className="bg-brand-gold/10 text-brand-gold px-3 py-1 text-xs font-bold tracking-widest">
                    {product.discount}
                  </span>
                )}
              </div>

              <p className="text-gray-600 font-sans leading-relaxed mb-10 tracking-widest text-sm">
                {product.description}
              </p>

              {/* Selection Options */}
              {product.sizes && (
                <div className="mb-10">
                  <h4 className="font-serif text-sm tracking-widest uppercase mb-4">Select Ring Size</h4>
                  <div className="flex flex-wrap gap-3">
                    {product.sizes.map((size) => (
                      <button
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

              {/* Specifications */}
              <div className="grid grid-cols-2 gap-4 mb-10 p-6 bg-gray-50 border border-gray-100">
                <div>
                  <h5 className="text-[10px] text-gray-400 uppercase tracking-widest mb-1">Material</h5>
                  <p className="text-brand-emerald font-bold text-sm tracking-widest">{product.material}</p>
                </div>
                <div>
                  <h5 className="text-[10px] text-gray-400 uppercase tracking-widest mb-1">Weight</h5>
                  <p className="text-brand-emerald font-bold text-sm tracking-widest">{product.weight}</p>
                </div>
              </div>

              {/* Action Buttons */}
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

              {/* Trust Badges */}
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

      {/* Related Products */}
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

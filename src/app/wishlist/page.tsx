"use client";

import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ProductCard } from "@/components/products/ProductCard";
import { useWishlist } from "@/context/WishlistContext";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { Heart } from "lucide-react";

export default function WishlistPage() {
  const { wishlist } = useWishlist();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);


  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* Header */}
      <section className="bg-brand-emerald pt-40 pb-20 text-white relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-7xl font-serif mb-4 tracking-widest uppercase flex items-center">
              Your Favorites <Heart className="ml-6 w-10 h-10 text-brand-gold fill-brand-gold" />
            </h1>
            <p className="text-gray-300 font-sans tracking-[0.2em] uppercase text-xs">
              Saved treasures from mairii
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          {mounted && wishlist.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {wishlist.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="py-32 text-center max-w-xl mx-auto">
              <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-8">
                <Heart className="w-8 h-8 text-gray-200" />
              </div>
              <h3 className="font-serif text-3xl text-brand-emerald uppercase tracking-widest mb-6">
                Your Wishlist is Empty
              </h3>
              <p className="text-gray-500 mb-10 font-sans text-sm tracking-widest uppercase leading-relaxed">
                Explore our collections and save the pieces that speak to your heart. They will appear here for you to revisit.
              </p>
              <Link href="/category/all">
                <Button variant="gold" size="lg">START EXPLORING</Button>
              </Link>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}

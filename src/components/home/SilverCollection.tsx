"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { shopApi } from "@/lib/api/shop";
import { mapListItemToProduct } from "@/lib/mapProduct";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { Heart, ShoppingBag } from "lucide-react";
import toast from "react-hot-toast";
import type { Product } from "@/types";
import { BotanicalDecoration } from "@/components/ui/BotanicalDecoration";

export const SilverCollection = () => {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [products, setProducts] = useState<Product[]>([]);
  const [visibleCount, setVisibleCount] = useState<number>(4);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        let res = await shopApi.products({ category: "silver", limit: 24, page: 1 });
        if (!res.items.length) {
          res = await shopApi.products({ search: "silver", limit: 24, page: 1 });
        }
        if (!res.items.length) {
          res = await shopApi.products({ limit: 24, page: 1 });
        }
        if (isMounted) {
          setProducts(res.items.map(mapListItemToProduct));
        }
      } catch (e) {
        console.error("Failed to load silver collection", e);
      } finally {
        if (isMounted) setLoading(false);
      }
    })();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleExploreMore = () => {
    setVisibleCount((prev) => Math.min(prev + 4, products.length));
  };

  const visibleProducts = products.slice(0, visibleCount);
  const hasMore = visibleCount < products.length;

  return (
    <section
      className="relative overflow-hidden py-16 md:py-24"
      style={{ backgroundColor: "var(--bg-sage-light)" }}
    >
      <BotanicalDecoration className="text-emerald-900" opacity={0.03} />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(196,160,100,0.1) 0%, transparent 60%)",
        }}
      />

      <div className="relative container mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="w-10 h-px bg-amber-400/60" />
            <span className="font-sans font-bold tracking-[0.45em] uppercase text-[12px] text-amber-500">
              Timeless Sterling
            </span>
            <div className="w-10 h-px bg-amber-400/60" />
          </div>

          <h2 className="font-serif text-3xl md:text-5xl mb-4 leading-tight text-[#1C1510]">
            The Silver <span className="italic text-yellow-600 font-serif">Collection</span>
          </h2>

          <p className="font-sans text-xs sm:text-sm tracking-wider leading-relaxed max-w-lg mx-auto text-[#1C1510]/60">
            Handcrafted 925 sterling silver jewelry designed for refined grace and everyday luxury.
          </p>
        </div>

        {/* Product Grid - 4 items per row on desktop */}
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="aspect-[3/4] bg-pearl animate-pulse rounded-xl" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            <AnimatePresence initial={false}>
              {visibleProducts.map((product, idx) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: (idx % 4) * 0.1 }}
                  className="group relative flex flex-col bg-white rounded-xl overflow-hidden border border-black/5 shadow-sm hover:shadow-xl transition-all duration-500"
                >
                  <div className="relative aspect-[3/4] w-full overflow-hidden bg-pearl">
                    <Link href={`/product/${product.slug ?? product.id}`} className="block w-full h-full">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        sizes="(max-width: 768px) 50vw, 25vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </Link>

                    {/* Wishlist Button */}
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        toggleWishlist(product);
                      }}
                      className="absolute top-3 right-3 w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-full bg-white/90 backdrop-blur-md shadow-md z-10 hover:scale-105 transition-all"
                    >
                      <Heart
                        className={`w-4 h-4 text-[#c9a84c] ${
                          isInWishlist(product.id) ? "fill-[#c9a84c]" : ""
                        }`}
                      />
                    </button>
                  </div>

                  {/* Info */}
                  <div className="p-4 flex flex-col flex-grow text-center">
                    <Link href={`/product/${product.slug ?? product.id}`}>
                      <h3 className="font-serif text-sm sm:text-base font-medium text-[#3a2a1a] mb-2 line-clamp-1 group-hover:text-yellow-600 transition-colors">
                        {product.name}
                      </h3>
                    </Link>

                    <div className="flex items-center justify-center gap-2 mb-3">
                      {product.oldPrice && (
                        <span className="text-xs text-gray-400 line-through">
                          ₹{product.oldPrice.toLocaleString()}
                        </span>
                      )}
                      <span className="text-sm sm:text-base font-semibold text-[#c9a84c]">
                        ₹{product.price.toLocaleString()}
                      </span>
                    </div>

                    <button
                      onClick={() => {
                        addToCart(product);
                        toast.success("Added to cart");
                      }}
                      className="mt-auto w-full py-2.5 px-4 rounded-lg bg-[#c9a84c] text-white text-[10px] sm:text-xs uppercase tracking-[0.15em] font-medium flex items-center justify-center gap-2 transition-all duration-300 hover:bg-[#b08d38] shadow-sm"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      Add to Cart
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* Explore More CTA */}
        {hasMore && !loading && (
          <div className="flex justify-center mt-12">
            <button
              onClick={handleExploreMore}
              className="group relative px-8 py-3 rounded-full text-[11px] tracking-[0.2em] uppercase overflow-hidden border border-amber-400 text-yellow-600 hover:text-white transition-colors duration-300"
            >
              <span className="absolute inset-0 bg-yellow-600 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
              <span className="relative z-10 font-bold">Explore More</span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

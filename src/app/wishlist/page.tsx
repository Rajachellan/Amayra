"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";
import { Heart, ShoppingBag, Trash2, ArrowRight } from "lucide-react";
import { BotanicalDecoration } from "@/components/ui/BotanicalDecoration";
import toast from "react-hot-toast";

export default function WishlistPage() {
  const { wishlist, toggleWishlist } = useWishlist();
  const { addToCart, openCart } = useCart();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const handleMoveToCart = (product: typeof wishlist[0]) => {
    addToCart(product);
    toast.success("Added to shopping bag!");
    openCart();
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#FAF8F5] via-white to-[#FAF8F5] text-[#1C1510]">
      <Navbar />

      {/* Header Banner */}
      <section className="relative pt-40 pb-20 md:pt-48 md:pb-24 overflow-hidden bg-[#0B2516] text-white">
        <BotanicalDecoration className="text-white" opacity={0.04} />
        
        {/* Subtle radial glow */}
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_50%_0%,rgba(196,160,100,0.15)_0%,transparent_70%)]" />

        <div className="container relative z-10 mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl mx-auto space-y-4"
          >
            <div className="flex items-center justify-center gap-3">
              <div className="w-10 h-px bg-amber-400/60" />
              <span className="font-sans font-bold tracking-[0.45em] uppercase text-xs text-amber-400">
                Curated Favorites
              </span>
              <div className="w-10 h-px bg-amber-400/60" />
            </div>

            <h1 className="text-4xl md:text-6xl font-serif leading-tight">
              Your Saved <span className="italic text-yellow-600 font-serif">Treasures</span>
            </h1>

            <p className="text-white/60 font-sans text-xs md:text-sm tracking-widest uppercase max-w-md mx-auto leading-relaxed">
              Revisit your cherished Mairii jewellery pieces saved for your special moments.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 md:py-24 relative z-10">
        <div className="container mx-auto px-4 sm:px-6">
          {mounted && wishlist.length > 0 ? (
            <div className="space-y-8">
              {/* Top counter bar */}
              <div className="flex items-center justify-between pb-6 border-b border-black/5 text-xs uppercase tracking-widest text-stone-500">
                <span>Total Saved: <strong className="text-stone-900 font-semibold">{wishlist.length} {wishlist.length === 1 ? 'Item' : 'Items'}</strong></span>
                <Link href="/category/all" className="hover:text-amber-600 transition-colors flex items-center gap-1 font-semibold">
                  <span>Explore More</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                <AnimatePresence>
                  {wishlist.map((product) => (
                    <motion.div
                      key={product.id}
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.4 }}
                      className="group relative flex flex-col bg-white rounded-2xl overflow-hidden border border-stone-200/80 shadow-sm hover:shadow-xl transition-all duration-500"
                    >
                      {/* Image Box */}
                      <div className="relative aspect-square w-full overflow-hidden bg-pearl">
                        <Link href={`/product/${product.slug ?? product.id}`} className="block w-full h-full">
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            sizes="(max-width: 768px) 50vw, 25vw"
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                        </Link>

                        {/* Remove button */}
                        <button
                          onClick={() => toggleWishlist(product)}
                          className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full bg-white/90 backdrop-blur-md text-stone-400 hover:text-red-500 shadow-md z-10 hover:scale-105 transition-all"
                          title="Remove from wishlist"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Product details */}
                      <div className="p-5 flex flex-col flex-grow text-center">
                        <Link href={`/product/${product.slug ?? product.id}`}>
                          <h3 className="font-serif text-sm sm:text-base font-medium text-stone-900 mb-2 line-clamp-1 group-hover:text-amber-600 transition-colors">
                            {product.name}
                          </h3>
                        </Link>

                        <div className="flex items-center justify-center gap-2 mb-4">
                          {product.oldPrice && (
                            <span className="text-xs text-gray-400 line-through">
                              ₹{product.oldPrice.toLocaleString()}
                            </span>
                          )}
                          <span className="text-sm sm:text-base font-semibold text-[#c9a84c]">
                            ₹{product.price.toLocaleString()}
                          </span>
                        </div>

                        {/* Action */}
                        <button
                          onClick={() => handleMoveToCart(product)}
                          className="mt-auto w-full py-2.5 px-4 rounded-xl bg-stone-900 text-white text-[10px] sm:text-xs uppercase tracking-[0.15em] font-semibold flex items-center justify-center gap-2 transition-all duration-300 hover:bg-[#c9a84c] shadow-sm"
                        >
                          <ShoppingBag className="w-3.5 h-3.5" />
                          Move to Bag
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="py-20 md:py-28 text-center max-w-lg mx-auto bg-white rounded-3xl p-8 sm:p-12 border border-stone-100 shadow-xl"
            >
              <div className="w-20 h-20 bg-amber-500/10 rounded-full flex items-center justify-center mx-auto mb-6 text-amber-600">
                <Heart className="w-9 h-9" />
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl text-stone-900 mb-3">
                Your Wishlist is Empty
              </h2>
              <p className="text-stone-500 mb-8 font-sans text-xs tracking-wider uppercase leading-relaxed">
                Explore our fine jewellery collections and save the pieces that speak to your heart.
              </p>
              <Link href="/category/all">
                <button className="px-8 py-3.5 rounded-full bg-stone-900 text-white text-xs uppercase tracking-[0.2em] font-bold hover:bg-amber-600 transition-colors shadow-md">
                  Explore Collections
                </button>
              </Link>
            </motion.div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}


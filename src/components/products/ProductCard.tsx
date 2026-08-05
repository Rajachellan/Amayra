"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Eye, X, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { Product } from "@/types";

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const isFavorite = isInWishlist(product.id);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="group relative bg-white overflow-hidden transition-all duration-500 border border-gray-100 hover:border-champagne/40 hover:shadow-[0_15px_30px_rgba(230,211,163,0.15)] rounded-2xl flex flex-col justify-between"
      >
        {/* Badges */}
        <div className="absolute top-4 left-4 z-10 flex flex-col space-y-2">
          {product.isNewArrival && (
            <span className="bg-[#0B2516] text-white text-[8px] font-bold px-3 py-1 tracking-[0.2em] uppercase rounded-full shadow-sm">
              New Arrival
            </span>
          )}
          {product.isBestSeller && (
            <span className="bg-[#c9a84c] text-[#0B2516] text-[8px] font-bold px-3 py-1 tracking-[0.2em] uppercase rounded-full shadow-sm">
              Bestseller
            </span>
          )}
        </div>

        {/* Permanently Visible Action Icons (Wishlist & Quick View) */}
        <div className="absolute top-4 right-4 z-20 flex flex-col space-y-2">
          <button
            type="button"
            title={isFavorite ? "Remove from wishlist" : "Add to wishlist"}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleWishlist(product);
            }}
            className={`p-2.5 rounded-full shadow-md backdrop-blur-md transition-all duration-300 ${
              isFavorite
                ? "bg-rose-600 text-white shadow-rose-600/30"
                : "bg-white/90 text-stone-700 hover:bg-[#c9a84c] hover:text-[#0B2516]"
            }`}
          >
            <Heart className={`w-3.5 h-3.5 ${isFavorite ? "fill-current" : ""}`} />
          </button>
          <button
            type="button"
            title="Quick view details"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setIsLightboxOpen(true);
            }}
            className="p-2.5 bg-white/90 text-stone-700 rounded-full shadow-md backdrop-blur-md hover:bg-[#0B2516] hover:text-white transition-all duration-300"
          >
            <Eye className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Image Container */}
        <div
          className="relative overflow-hidden aspect-[4/5] cursor-pointer bg-stone-50"
          onClick={() => setIsLightboxOpen(true)}
        >
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            quality={80}
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        </div>

        {/* Product Info & Always-Visible Add to Cart Button */}
        <div className="p-5 flex flex-col items-center text-center flex-grow justify-between space-y-4">
          <div className="w-full space-y-1.5">
            <span className="text-[#c9a84c] text-[9px] uppercase tracking-[0.35em] block font-bold">
              {product.category}
            </span>
            <Link href={`/product/${product.slug ?? product.id}`} className="block group/title w-full">
              <h3 className="font-serif text-base text-stone-900 transition-colors duration-300 group-hover/title:text-[#c9a84c] truncate font-medium">
                {product.name}
              </h3>
            </Link>

            <p className="text-[10px] text-stone-400 uppercase tracking-widest line-clamp-1 h-4">
              {product.description || "Handcrafted Luxury Jewellery"}
            </p>
          </div>

          <div className="w-full space-y-3 pt-2 border-t border-stone-100">
            {/* Price Display */}
            <div className="flex items-baseline justify-center space-x-2.5">
              {product.oldPrice && (
                <span className="text-stone-400 line-through text-xs font-medium">
                  ₹{product.oldPrice.toLocaleString()}
                </span>
              )}
              <span className="text-[#0B2516] font-serif text-lg font-bold">
                ₹{product.price.toLocaleString()}
              </span>
            </div>

            {/* Always Visible Add to Cart Button below price */}
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                addToCart(product);
              }}
              className="relative overflow-hidden w-full bg-gradient-to-r from-[#0B2516] to-[#164228] text-white py-3 px-4 rounded-full text-[9px] uppercase tracking-[0.25em] font-bold shadow-md hover:shadow-xl hover:from-[#c9a84c] hover:to-[#e5ca78] hover:text-[#0B2516] transition-all duration-300 flex items-center justify-center space-x-2 group/btn cursor-pointer"
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 -translate-x-full group-hover/btn:translate-x-full" />
              <ShoppingBag className="w-3.5 h-3.5 transition-transform duration-300 group-hover/btn:scale-110" />
              <span className="relative z-10 font-bold">Add to Bag</span>
            </button>
          </div>
        </div>
      </motion.div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-10"
          >
            <div className="absolute inset-0 bg-stone-900/90 backdrop-blur-md" onClick={() => setIsLightboxOpen(false)} />

            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row z-10"
            >
              <button
                type="button"
                onClick={() => setIsLightboxOpen(false)}
                className="absolute top-4 right-4 z-20 p-2 bg-stone-900/40 text-white hover:bg-stone-900/80 rounded-full backdrop-blur-md transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative w-full md:w-1/2 aspect-[4/5] bg-stone-50">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                  priority
                />
              </div>

              <div className="w-full md:w-1/2 p-8 md:p-10 flex flex-col justify-between overflow-y-auto space-y-6">
                <div>
                  <span className="text-[#c9a84c] text-[10px] uppercase tracking-[0.4em] block mb-2 font-bold">
                    {product.category}
                  </span>
                  <h2 className="text-2xl md:text-3xl font-serif text-stone-900 mb-4 leading-tight">
                    {product.name}
                  </h2>
                  <div className="w-12 h-[1px] bg-[#c9a84c] mb-6" />
                  <p className="text-xs text-stone-500 leading-relaxed font-light italic mb-6">
                    {product.description || "An exquisite masterpiece handcrafted with precision and passion, embodying the timeless heritage of Mairii."}
                  </p>
                  <div className="flex items-baseline space-x-3 mb-6">
                    {product.oldPrice && (
                      <span className="text-stone-400 line-through text-sm font-medium">₹{product.oldPrice.toLocaleString()}</span>
                    )}
                    <span className="text-2xl font-serif font-bold text-[#0B2516]">₹{product.price.toLocaleString()}</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    addToCart(product);
                    setIsLightboxOpen(false);
                  }}
                  className="w-full bg-[#0B2516] hover:bg-[#c9a84c] hover:text-[#0B2516] text-white py-4 rounded-full text-[10px] uppercase tracking-[0.3em] font-bold transition-all duration-300 shadow-lg"
                >
                  Add to Shopping Bag
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

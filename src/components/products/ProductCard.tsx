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
        className="group relative bg-white overflow-hidden transition-all duration-700 border border-gray-100 hover:border-champagne/40 hover:shadow-[0_20px_40px_rgba(230,211,163,0.1)]"
      >
        {/* Badges */}
        <div className="absolute top-4 left-4 z-10 flex flex-col space-y-2">
          {product.isNewArrival && (
            <span className="bg-foreground text-background text-[8px] font-bold px-3 py-1 tracking-[0.2em] uppercase">
              New Arrival
            </span>
          )}
          {product.isBestSeller && (
            <span className="bg-champagne text-white text-[8px] font-bold px-3 py-1 tracking-[0.2em] uppercase">
              Bestseller
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="absolute top-4 right-4 z-20 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-4 group-hover:translate-x-0">
          <button
            onClick={(e) => {
              e.preventDefault();
              toggleWishlist(product);
            }}
            className={`p-2.5 rounded-full shadow-lg transition-all duration-300 ${isFavorite ? "bg-maroon text-white" : "bg-white text-foreground hover:bg-champagne hover:text-white"}`}
          >
            <Heart className={`w-[14px] h-[14px] ${isFavorite ? "fill-current" : ""}`} />
          </button>
          <button 
            onClick={() => setIsLightboxOpen(true)}
            className="p-2.5 bg-white text-foreground rounded-full shadow-lg hover:bg-champagne hover:text-white transition-all duration-300"
          >
            <Eye className="w-[14px] h-[14px]" />
          </button>
        </div>

        {/* Image Container */}
        <div className="relative overflow-hidden aspect-[4/5] cursor-pointer" onClick={() => setIsLightboxOpen(true)}>
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              quality={75}
              className="object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110"
            />
          
          {/* Quick Add Overlay */}
          <div className="absolute inset-x-0 bottom-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-out bg-gradient-to-t from-black/60 to-transparent flex justify-center">
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                addToCart(product);
              }}
              className="bg-white text-foreground px-6 py-2.5 rounded-full text-[9px] uppercase tracking-[0.3em] font-bold hover:bg-champagne hover:text-white transition-all duration-500 flex items-center space-x-2 shadow-xl"
            >
              <ShoppingBag className="w-3 h-3" />
              <span>Add to Bag</span>
            </button>
          </div>
        </div>

        {/* Product Info */}
        <div className="p-6">
          <div className="flex flex-col items-center text-center">
            <span className="text-champagne text-[9px] uppercase tracking-[0.4em] block mb-2 font-bold">
              {product.category}
            </span>
            <Link href={`/product/${product.slug ?? product.id}`} className="block group/title w-full">
              <h3 className="font-serif text-base text-foreground mb-2 transition-colors duration-500 group-hover/title:text-champagne truncate">
                {product.name}
              </h3>
            </Link>
            
            {/* Description - clearly visible on listing page as requested */}
            <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-4 line-clamp-1 h-4">
              {product.description || "Handcrafted Luxury Jewellery"}
            </p>

            <div className="flex items-center justify-center space-x-3 border-t border-gray-50 pt-4 w-full">
              <span className="text-foreground font-serif text-lg font-bold">
                ₹{product.price.toLocaleString()}
              </span>
              {product.oldPrice && (
                <span className="text-gray-300 line-through text-xs font-light">
                  ₹{product.oldPrice.toLocaleString()}
                </span>
              )}
            </div>
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
            <div className="absolute inset-0 bg-black/95 backdrop-blur-md" onClick={() => setIsLightboxOpen(false)} />
            
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-5xl aspect-[4/5] md:aspect-video bg-white overflow-hidden shadow-2xl flex flex-col md:flex-row"
            >
              <button 
                onClick={() => setIsLightboxOpen(false)}
                className="absolute top-6 right-6 z-10 p-2 bg-black/20 text-white hover:bg-black/40 rounded-full backdrop-blur-md transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="relative flex-1 bg-gray-50">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 80vw"
                  className="object-contain"
                  priority
                />
              </div>

              <div className="w-full md:w-[400px] bg-white p-10 flex flex-col justify-center">
                <span className="text-champagne text-[10px] uppercase tracking-[0.5em] block mb-4 font-bold">
                  {product.category}
                </span>
                <h2 className="text-3xl font-serif text-foreground mb-6 leading-tight">
                  {product.name}
                </h2>
                <div className="w-12 h-0.5 bg-champagne mb-8" />
                <p className="text-sm text-gray-500 leading-relaxed mb-8 font-light italic">
                  {product.description || "An exquisite masterpiece handcrafted with precision and passion, embodying the timeless heritage of Mairii. Each detail tells a story of luxury and elegance."}
                </p>
                <div className="flex items-center space-x-4 mb-10">
                  <span className="text-2xl font-serif font-bold text-foreground">₹{product.price.toLocaleString()}</span>
                  {product.oldPrice && (
                    <span className="text-gray-300 line-through text-base">₹{product.oldPrice.toLocaleString()}</span>
                  )}
                </div>
                <button
                  onClick={() => {
                    addToCart(product);
                    setIsLightboxOpen(false);
                  }}
                  className="w-full bg-foreground text-white py-4 rounded-full text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-champagne transition-all duration-500 shadow-xl"
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


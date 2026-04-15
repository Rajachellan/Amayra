"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, ShoppingCart, Eye } from "lucide-react";
import { Button } from "../ui/Button";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { Product } from "@/types";

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  
  const isFavorite = isInWishlist(product.id);
  const savings = product.oldPrice ? product.oldPrice - product.price : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative bg-white overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-700 border border-gray-100 hover:border-brand-gold/30"
    >
      {/* Badges */}
      <div className="absolute top-4 left-4 z-10 flex flex-col space-y-2">
        {product.isNewArrival && (
          <span className="bg-brand-emerald text-white text-[9px] font-bold px-3 py-1 tracking-widest uppercase shadow-sm">
            New Arrival
          </span>
        )}
        {product.isBestSeller && (
          <span className="bg-brand-gold text-brand-emerald text-[9px] font-bold px-3 py-1 tracking-widest uppercase shadow-sm">
            Bestseller
          </span>
        )}
        {product.discount && !product.isNewArrival && (
          <span className="bg-red-500 text-white text-[9px] font-bold px-3 py-1 tracking-widest uppercase shadow-sm">
            {product.discount}
          </span>
        )}
      </div>

      {/* Wishlist Button */}
      <button 
        onClick={(e) => {
          e.preventDefault();
          toggleWishlist(product);
        }}
        className={`absolute top-4 right-4 z-20 p-2.5 rounded-full backdrop-blur-md transition-all duration-500 shadow-md ${isFavorite ? "bg-brand-gold text-brand-emerald" : "bg-white/80 text-brand-emerald hover:bg-brand-gold hover:text-white"}`}
      >
        <Heart className={`w-4 h-4 ${isFavorite ? "fill-brand-emerald" : ""}`} />
      </button>

      {/* Image Container */}
      <Link href={`/product/${product.id}`} className="block relative overflow-hidden aspect-[4/5]">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-1000 group-hover:scale-110"
        />
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-brand-emerald/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center space-x-3">
          <Button 
            variant="gold" 
            size="sm" 
            className="translate-y-10 group-hover:translate-y-0 transition-transform duration-500 delay-75 shadow-xl"
            onClick={(e) => {
              e.preventDefault();
              addToCart(product);
            }}
          >
            <ShoppingCart className="w-4 h-4 mr-2" /> ADD TO BAG
          </Button>
        </div>
      </Link>

      {/* Content */}
      <div className="p-6 text-center bg-white relative">
        <p className="text-[9px] uppercase tracking-[0.25em] text-brand-gold font-bold mb-3">
          {product.subCategory || product.category}
        </p>
        <Link href={`/product/${product.id}`} className="block">
          <h3 className="font-serif text-md font-medium text-brand-emerald hover:text-brand-gold transition-colors duration-300 mb-3 truncate leading-relaxed">
            {product.name}
          </h3>
        </Link>
        <div className="flex flex-col items-center space-y-1">
          <div className="flex items-center justify-center space-x-3">
            <span className="text-brand-emerald font-bold text-lg tracking-tight">
              ₹{product.price.toLocaleString()}
            </span>
            {product.oldPrice && (
              <span className="text-gray-400 line-through text-xs italic">
                ₹{product.oldPrice.toLocaleString()}
              </span>
            )}
          </div>
          {savings > 0 && (
            <p className="text-green-600 text-[10px] font-bold tracking-widest uppercase">
              Save ₹{savings.toLocaleString()}
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
};

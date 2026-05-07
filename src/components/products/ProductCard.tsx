"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, Eye } from "lucide-react";
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative bg-pearl overflow-hidden transition-all duration-1000 border border-foreground/5 hover:border-champagne/40 luxury-shadow hover:shadow-[0_0_30px_rgba(230,211,163,0.15)]"
    >
      {/* Badges */}
      <div className="absolute top-4 left-4 z-10 flex flex-col space-y-2">
        {product.isNewArrival && (
          <span className="bg-champagne/90 text-foreground text-[8px] font-medium px-3 py-1 tracking-[0.2em] uppercase">
            New
          </span>
        )}
      </div>

      {/* Action Buttons */}
      <div className="absolute top-4 right-4 z-20 flex flex-col space-y-3 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-4 group-hover:translate-x-0">
        <button
          onClick={(e) => {
            e.preventDefault();
            toggleWishlist(product);
          }}
          className={`p-2.5 rounded-full transition-all duration-500 ${isFavorite ? "bg-maroon text-white" : "bg-white text-foreground hover:bg-champagne"}`}
        >
          <Heart className={`w-[14px] h-[14px] ${isFavorite ? "fill-current" : ""}`} />
        </button>
        <button className="p-2.5 bg-white text-foreground rounded-full hover:bg-champagne transition-all duration-500">
          <Eye className="w-[14px] h-[14px]" />
        </button>
      </div>

      {/* Image Container */}
      <Link href={`/product/${product.id}`} className="block relative overflow-hidden aspect-[4/5]">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110"
        />
        
        {/* Quick View / Add to Bag Overlay */}
        <div className="absolute inset-x-0 bottom-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-out bg-gradient-to-t from-background to-transparent">
          <button
            onClick={(e) => {
              e.preventDefault();
              addToCart(product);
            }}
            className="w-full bg-foreground text-background py-3 rounded-full text-[10px] uppercase tracking-[0.3em] font-medium hover:bg-champagne hover:text-foreground transition-colors duration-500"
          >
            Add to Bag
          </button>
        </div>
      </Link>

      {/* Product Info */}
      <div className="p-6 text-center">
        <span className="text-champagne text-[9px] uppercase tracking-[0.4em] block mb-3 font-medium">
          {product.category}
        </span>
        <Link href={`/product/${product.id}`} className="block group/title">
          <h3 className="font-serif text-sm text-foreground mb-3 transition-colors duration-500 group-hover/title:text-champagne truncate px-2">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-center justify-center space-x-3">
          <span className="text-foreground font-serif text-base font-semibold">
            ₹{product.price.toLocaleString()}
          </span>
          {product.oldPrice && (
            <span className="text-foreground/30 line-through text-[11px] font-light">
              ₹{product.oldPrice.toLocaleString()}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
};


"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Eye, X, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { usePrefetchProductDetail } from "@/hooks/useProductDetail";
import { Product } from "@/types";

interface ProductCardProps {
  product: Product;
}

export const ProductCard = React.memo(({ product }: ProductCardProps) => {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const prefetchProduct = usePrefetchProductDetail();
  const [imgSrc, setImgSrc] = useState<any>(product.image || "/images/1.jpg");

  const isFavorite = isInWishlist(product.id);
  const productHref = `/product/${product.slug ?? product.id}`;

  const handleMouseEnter = () => {
    if (product.slug) {
      prefetchProduct(product.slug);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      onMouseEnter={handleMouseEnter}
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

      {/* Permanently Visible Action Icons (Wishlist & View Product Details) */}
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
        <Link
          href={productHref}
          title="View product details"
          onMouseEnter={handleMouseEnter}
          className="p-2.5 bg-white/90 text-stone-700 rounded-full shadow-md backdrop-blur-md hover:bg-[#0B2516] hover:text-white transition-all duration-300"
        >
          <Eye className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Image Container - Direct link to dedicated product page */}
      <Link
        href={productHref}
        onMouseEnter={handleMouseEnter}
        className="relative block overflow-hidden aspect-[4/5] cursor-pointer bg-stone-50"
      >
        <Image
          src={imgSrc}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          quality={75}
          loading="lazy"
          decoding="async"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          onError={() => setImgSrc("/images/1.jpg")}
        />
      </Link>

      {/* Product Info & Always-Visible Add to Cart Button */}
      <div className="p-5 flex flex-col items-center text-center flex-grow justify-between space-y-4">
        <div className="w-full space-y-1.5">
          <span className="text-[#c9a84c] text-[9px] uppercase tracking-[0.35em] block font-bold">
            {product.category}
          </span>
          <Link href={productHref} onMouseEnter={handleMouseEnter} className="block group/title w-full">
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
  );
});

ProductCard.displayName = "ProductCard";

"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingBag, Sparkles, Heart } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { shopApi } from "@/lib/api/shop";
import { mapListItemToProduct } from "@/lib/mapProduct";
import type { Product } from "@/types";
import toast from "react-hot-toast";

interface MasterpieceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MasterpieceModal: React.FC<MasterpieceModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { addToCart, openCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!isOpen) return;

    sessionStorage.setItem("mairii_masterpiece_modal_seen", "true");

    let cancelled = false;
    (async () => {
      try {
        setLoading(true);
        let res = await shopApi.products({ masterpiece: "true", limit: 6, page: 1 });
        let picked = res.items.find(
          (item) => Array.isArray(item.images) && item.images.some((u) => !!u?.trim())
        );

        if (!picked) {
          res = await shopApi.products({ limit: 12, page: 1 });
          picked = res.items.find(
            (item) => Array.isArray(item.images) && item.images.some((u) => !!u?.trim())
          );
        }

        if (!picked && res.items.length > 0) {
          picked = res.items[0];
        }

        if (!cancelled && picked) {
          setProduct(mapListItemToProduct(picked));
        }
      } catch (err) {
        console.error("Failed to load masterpiece product", err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [isOpen]);

  const handleAddToCart = () => {
    if (!product) return;
    addToCart(product);
    toast.success(`${product.name} added to cart!`);
    onClose();
    openCart();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm"
        />

        {/* Modal Box */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden z-10 border border-amber-100 p-6 sm:p-8"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2 rounded-full text-gray-400 hover:text-stone-900 hover:bg-stone-100 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Subheading Badge */}
          <div className="flex items-center justify-center gap-2 mb-4 text-amber-600">
            <Sparkles className="w-4 h-4 fill-amber-500/20" />
            <span className="text-[11px] font-bold tracking-[0.3em] uppercase">
              Masterpiece Spotlight
            </span>
          </div>

          {loading || !product ? (
            <div className="py-12 flex flex-col items-center justify-center space-y-4">
              <div className="w-24 h-24 bg-stone-100 animate-pulse rounded-xl" />
              <div className="w-48 h-4 bg-stone-100 animate-pulse rounded" />
              <div className="w-24 h-4 bg-stone-100 animate-pulse rounded" />
            </div>
          ) : (
            <div className="flex flex-col items-center text-center">
              {/* Product Image Container */}
              <div className="relative w-full aspect-square max-h-64 sm:max-h-72 rounded-xl overflow-hidden bg-pearl mb-5 border border-stone-100 shadow-inner group">
                <Link
                  href={`/product/${product.slug ?? product.id}`}
                  onClick={onClose}
                  className="block w-full h-full"
                >
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(max-width: 640px) 100vw, 500px"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </Link>

                {/* Wishlist toggle icon */}
                <button
                  onClick={() => toggleWishlist(product)}
                  className="absolute top-3 right-3 w-9 h-9 flex items-center justify-center rounded-full bg-white/90 backdrop-blur-md shadow-md z-10 hover:scale-105 transition-all"
                  aria-label="Add to Wishlist"
                >
                  <Heart
                    className={`w-4 h-4 text-[#c9a84c] ${
                      isInWishlist(product.id) ? "fill-[#c9a84c]" : ""
                    }`}
                  />
                </button>
              </div>

              {/* Title & Category info */}
              <Link
                href={`/product/${product.slug ?? product.id}`}
                onClick={onClose}
                className="hover:text-amber-600 transition-colors"
              >
                <h3 className="font-serif text-xl sm:text-2xl font-medium text-stone-900 mb-2 line-clamp-1">
                  {product.name}
                </h3>
              </Link>

              {/* Price section */}
              <div className="flex items-center justify-center gap-3 mb-6">
                {product.oldPrice && (
                  <span className="text-xs sm:text-sm text-gray-400 line-through">
                    ₹{product.oldPrice.toLocaleString()}
                  </span>
                )}
                <span className="text-lg sm:text-xl font-semibold text-[#c9a84c]">
                  ₹{product.price.toLocaleString()}
                </span>
                {product.oldPrice && product.oldPrice > product.price && (
                  <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold uppercase tracking-wider">
                    {Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}% OFF
                  </span>
                )}
              </div>

              {/* Action Button */}
              <button
                onClick={handleAddToCart}
                className="w-full py-3.5 px-6 rounded-xl bg-stone-900 text-white text-xs uppercase tracking-[0.2em] font-semibold flex items-center justify-center gap-2 hover:bg-amber-600 transition-colors shadow-lg group"
              >
                <ShoppingBag className="w-4 h-4 transition-transform group-hover:scale-110" />
                <span>Add to Cart</span>
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

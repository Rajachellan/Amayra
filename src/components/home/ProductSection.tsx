"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { shopApi } from "@/lib/api/shop";
import { mapListItemToProduct } from "@/lib/mapProduct";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { Heart, ShoppingBag } from "lucide-react";
import toast from "react-hot-toast";
import type { Product } from "@/types";

export const ProductSection = () => {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        let r = await shopApi.products({ featured: "true", limit: 5, page: 1 });
        if (!r.items.length) {
          r = await shopApi.products({ limit: 5, page: 1 });
        }
        if (!cancelled) setFeaturedProducts(r.items.map(mapListItemToProduct));
      } catch {
        if (!cancelled) setFeaturedProducts([]);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const handleWishlist = (e: React.MouseEvent, product: Product) => {
    e.preventDefault();
    toggleWishlist(product);
  };

  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Decorative vertical line */}
      <div className="absolute left-1/2 top-0 w-px h-full bg-foreground/5 -translate-x-1/2 hidden lg:block" />

      <div className="container mx-auto px-6 mb-20 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <span className="text-champagne uppercase tracking-[0.5em] text-[10px] font-medium block mb-4">
            Curated Masterpieces
          </span>
          <h2 className="text-foreground text-4xl md:text-6xl font-serif leading-tight">
            The Signature <span className="italic font-serif-alt">Edit</span>
          </h2>
          <div className="w-20 h-px bg-champagne/40 mx-auto mt-8" />
        </motion.div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-10 md:gap-14">

          {/* Item 1: Large Featured */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
            className="md:col-span-4 md:row-span-2"
          >
            {featuredProducts[0] && (
            <ProductCard
              product={featuredProducts[0]}
              size="large"
              toggleWishlist={handleWishlist}
              addToCart={addToCart}
              isInWishlist={isInWishlist}
            />
            )}
          </motion.div>

          {/* Item 2: Small adjacent */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="md:col-span-2 mt-0 md:mt-20"
          >
            {featuredProducts[1] && (
            <ProductCard
              product={featuredProducts[1]}
              size="small"
              toggleWishlist={handleWishlist}
              addToCart={addToCart}
              isInWishlist={isInWishlist}
            />
            )}
          </motion.div>

          {/* Item 3: Small below 2 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.4 }}
            className="md:col-span-2"
          >
            {featuredProducts[2] && (
            <ProductCard
              product={featuredProducts[2]}
              size="small"
              toggleWishlist={handleWishlist}
              addToCart={addToCart}
              isInWishlist={isInWishlist}
            />
            )}
          </motion.div>

          {/* Item 4: Medium/Wide */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3 }}
            className="md:col-span-3 -mt-4 md:-mt-24"
          >
            {featuredProducts[3] && (
            <ProductCard
              product={featuredProducts[3]}
              size="medium"
              toggleWishlist={handleWishlist}
              addToCart={addToCart}
              isInWishlist={isInWishlist}
            />
            )}
          </motion.div>

          {/* Item 5: Medium/Wide */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.5 }}
            className="md:col-span-3"
          >
            {featuredProducts[4] && (
            <ProductCard
              product={featuredProducts[4]}
              size="medium"
              toggleWishlist={handleWishlist}
              addToCart={addToCart}
              isInWishlist={isInWishlist}
            />
            )}
          </motion.div>

        </div>
      </div>

      <div className="container mx-auto px-6 text-center mt-24 relative z-10">
        <Link
          href="/category/all"
          className="group inline-flex flex-col items-center"
        >
          <span className="text-[10px] uppercase tracking-[0.4em] text-foreground/40 mb-4 group-hover:text-champagne transition-colors">View All Gallery</span>
          <div className="w-12 h-px bg-champagne group-hover:w-24 transition-all duration-700" />
        </Link>
      </div>
    </section>
  );
};

const ProductCard = ({
  product,
  size,
  toggleWishlist,
  addToCart,
  isInWishlist,
}: {
  product: Product;
  size: "large" | "small" | "medium";
  toggleWishlist: (e: React.MouseEvent, product: Product) => void;
  addToCart: (p: Product) => void;
  isInWishlist: (id: string) => boolean;
}) => {
  const href = `/product/${product.slug ?? product.id}`;
  return (
    <Link href={href} className="group block h-full">
      <div className={`relative overflow-hidden transition-all duration-700 bg-pearl border border-foreground/[0.03] group-hover:border-champagne group-hover:shadow-2xl group-hover:shadow-[var(--gold-glow)] ${size === "large" ? "aspect-[4/3] md:aspect-[5/4]" : "aspect-[4/5] md:aspect-[3/4]"
        }`}>
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-1000 group-hover:scale-110"
        />

        {/* Soft overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

        {/* Overlay Icons */}
        <div className="absolute top-6 right-6 flex flex-col space-y-4 opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500">
          <button
            onClick={(e) => toggleWishlist(e, product)}
            className="w-11 h-11 rounded-full bg-pearl flex items-center justify-center text-foreground hover:bg-maroon hover:text-white transition-all shadow-md"
          >
            <Heart className={`w-[20px] h-[20px] stroke-[1] ${isInWishlist(product.id) ? "fill-current" : ""}`} />
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              addToCart(product);
              toast.success("Added to cart");
            }}
            className="w-11 h-11 rounded-full bg-pearl flex items-center justify-center text-foreground hover:bg-champagne hover:text-white transition-all shadow-md"
          >
            <ShoppingBag className="w-[20px] h-[20px] stroke-[1]" />
          </button>
        </div>

        {/* Floating Tag */}
        {product.isNewArrival && (
          <div className="absolute top-6 left-6">
            <span className="px-4 py-1.5 bg-background text-[8px] uppercase tracking-[0.3em] font-medium text-foreground border border-foreground/5 rounded-full">
              New Edit
            </span>
          </div>
        )}
      </div>

      <div className="mt-8 space-y-2">
        <h3 className="text-foreground text-[11px] md:text-xs uppercase tracking-[0.25em] font-medium transition-colors group-hover:text-champagne">
          {product.name}
        </h3>
        <div className="flex items-center space-x-3">
          <p className="text-foreground text-[14px] md:text-[16px] font-serif font-semibold tracking-wider">
            ₹{product.price.toLocaleString()}
          </p>
          {product.oldPrice && (
            <p className="text-foreground/30 line-through text-[11px] md:text-[13px] font-serif italic tracking-wider">
              ₹{product.oldPrice.toLocaleString()}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
};


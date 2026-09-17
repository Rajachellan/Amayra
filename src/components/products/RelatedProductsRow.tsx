"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/formatPrice";
import type { Product } from "@/types";

type Props = {
  title: string;
  products: Product[];
  shopAllHref: string;
};

function RelatedCard({ product }: { product: Product }) {
  const { addToCartWithQuantity } = useCart();
  const [imgSrc, setImgSrc] = React.useState(product.image || "/images/placeholder.svg");

  React.useEffect(() => {
    setImgSrc(product.image || "/images/placeholder.svg");
  }, [product.image]);

  return (
    <article className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-neutral-200/90 bg-white shadow-xs transition-all hover:shadow-lg min-w-[210px] sm:min-w-[260px] max-w-[280px] shrink-0">
      <Link
        href={`/product/${product.slug ?? product.id}`}
        style={{ position: "relative" }}
        className="relative block aspect-[4/5] overflow-hidden bg-[#f3f0eb]"
      >
        <Image
          src={imgSrc}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 50vw, 25vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          onError={() => setImgSrc("/images/placeholder.svg")}
        />

        {/* Badge styled like reference app */}
        <span className="absolute left-2.5 top-2.5 rounded-sm bg-[#1a2e22]/90 backdrop-blur-xs px-2.5 py-1 text-[8px] sm:text-[9px] font-bold uppercase tracking-widest text-[#e8d7c3] shadow-xs">
          {product.isBestSeller
            ? "Bestseller"
            : product.isNewArrival
            ? "New Arrival"
            : "Exclusive"}
        </span>
      </Link>

      <div className="flex flex-1 flex-col p-3.5 sm:p-5">
        <div className="mb-1 flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-xs bg-[#c4a064]" aria-hidden />
          <span className="text-[10px] uppercase tracking-wider text-neutral-500 font-medium">
            {product.category || "Jewellery"}
          </span>
        </div>

        <Link href={`/product/${product.slug ?? product.id}`}>
          <h3 className="mb-2 line-clamp-1 text-xs sm:text-sm font-semibold leading-snug text-neutral-900 transition-colors group-hover:text-[#c4a064]">
            {product.name}
          </h3>
        </Link>

        <div className="mb-3.5 flex items-baseline gap-2">
          <span className="text-sm sm:text-base font-bold text-neutral-900">
            ₹{formatPrice(product.price)}
          </span>
          {product.oldPrice && (
            <span className="text-[11px] sm:text-xs text-neutral-400 line-through">
              ₹{formatPrice(product.oldPrice)}
            </span>
          )}
        </div>

        <button
          type="button"
          onClick={() => addToCartWithQuantity(product, 1)}
          className="mt-auto w-full rounded-xl bg-neutral-900 py-2.5 sm:py-3 text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.2em] text-white transition hover:bg-neutral-800 hover:shadow-md cursor-pointer active:scale-95"
        >
          Add to Cart
        </button>
      </div>
    </article>
  );
}

function ShopAllCard({ href, image }: { href: string; image?: string }) {
  return (
    <Link
      href={href}
      className="group flex min-w-[210px] sm:min-w-[260px] max-w-[280px] shrink-0 flex-col overflow-hidden rounded-2xl border border-neutral-200/90 bg-white shadow-xs transition-all hover:shadow-lg"
    >
      <div
        style={{ position: "relative" }}
        className="relative flex-1 overflow-hidden bg-gradient-to-br from-[#f8f5ef] to-[#ebdcc7] flex items-center justify-center p-6"
      >
        {image ? (
          <Image
            src={image}
            alt=""
            fill
            sizes="25vw"
            className="object-cover opacity-80 transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="text-center">
            <span className="font-serif text-lg font-bold tracking-[0.2em] text-[#8b7355]">
              MAIRII
            </span>
          </div>
        )}
      </div>
      <div className="flex items-center justify-between border-t border-neutral-100 bg-white px-5 py-4 text-xs font-bold uppercase tracking-[0.2em] text-neutral-900 group-hover:text-[#c4a064] transition-colors">
        <span>Shop All</span>
        <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </div>
    </Link>
  );
}

export function RelatedProductsRow({ title, products, shopAllHref }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);
  if (products.length === 0) return null;

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -280, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 280, behavior: "smooth" });
    }
  };

  return (
    <section className="border-t border-neutral-200/80 bg-[#FAF9F7] py-14 sm:py-18">
      <div className="container mx-auto px-6">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-lg sm:text-2xl font-serif font-bold uppercase tracking-[0.25em] text-neutral-900">
            {title}
          </h2>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={scrollLeft}
              aria-label="Scroll left"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-300 bg-white text-neutral-700 shadow-2xs hover:bg-neutral-50 transition cursor-pointer"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={scrollRight}
              aria-label="Scroll right"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-300 bg-white text-neutral-700 shadow-2xs hover:bg-neutral-50 transition cursor-pointer"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="flex gap-4 sm:gap-6 overflow-x-auto pb-4 no-scrollbar scroll-smooth"
        >
          {products.map((p) => (
            <RelatedCard key={p.id} product={p} />
          ))}
          <ShopAllCard
            href={shopAllHref}
            image={typeof products[0]?.image === "string" ? products[0].image : undefined}
          />
        </div>
      </div>
    </section>
  );
}

"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { useCart } from "@/context/CartContext";
import type { Product } from "@/types";

type Props = {
  title: string;
  products: Product[];
  shopAllHref: string;
};

function RelatedCard({ product }: { product: Product }) {
  const { addToCartWithQuantity } = useCart();

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-neutral-200/80 bg-white shadow-sm transition-shadow hover:shadow-md">
      <Link
        href={`/product/${product.slug ?? product.id}`}
        className="relative block aspect-[4/5] overflow-hidden bg-[#f3f0eb]"
      >
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, 25vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {product.isNewArrival && (
          <span className="absolute left-3 top-3 rounded-md bg-[#d4c4a8] px-2.5 py-1 text-[9px] font-bold uppercase tracking-widest text-neutral-900">
            New Arrival
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <div className="mb-2 flex items-center gap-2">
          <span className="h-3 w-3 rounded-sm bg-[#d4a853]" aria-hidden />
          <span className="text-[11px] text-neutral-500">{product.material || product.category}</span>
        </div>
        <Link href={`/product/${product.slug ?? product.id}`}>
          <h3 className="mb-2 line-clamp-2 min-h-[2.75rem] text-base font-semibold leading-snug text-neutral-900 transition-colors group-hover:text-[#8b7355]">
            {product.name}
          </h3>
        </Link>
        <p className="mb-5 text-lg font-bold text-neutral-900">₹ {product.price.toLocaleString()}</p>
        <button
          type="button"
          onClick={() => addToCartWithQuantity(product, 1)}
          className="mt-auto w-full rounded-lg bg-neutral-900 py-3.5 text-[11px] font-bold uppercase tracking-[0.2em] text-white transition hover:bg-neutral-800"
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
      className="group flex min-h-[420px] flex-col overflow-hidden rounded-2xl border border-neutral-200/80 bg-white shadow-sm transition-shadow hover:shadow-md"
    >
      <div className="relative flex-1 overflow-hidden bg-gradient-to-br from-[#f3f0eb] to-[#e8e0d4]">
        {image ? (
          <Image
            src={image}
            alt=""
            fill
            sizes="25vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : null}
      </div>
      <div className="flex items-center justify-between border-t border-neutral-100 px-6 py-5 text-sm font-bold uppercase tracking-[0.25em] text-neutral-900">
        <span>Shop All</span>
        <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
      </div>
    </Link>
  );
}

export function RelatedProductsRow({ title, products, shopAllHref }: Props) {
  if (products.length === 0) return null;

  const shown = products.slice(0, 3);

  return (
    <section className="border-t border-neutral-100 bg-[#faf9f7] py-16 md:py-20">
      <div className="container mx-auto px-6">
        <h2 className="mb-10 text-center text-xl font-bold uppercase tracking-[0.35em] text-neutral-900 md:text-2xl">
          {title}
        </h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {shown.map((p) => (
            <RelatedCard key={p.id} product={p} />
          ))}
          <ShopAllCard href={shopAllHref} image={typeof shown[0]?.image === "string" ? shown[0].image : undefined} />
        </div>
      </div>
    </section>
  );
}

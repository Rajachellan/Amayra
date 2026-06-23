"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { shopApi, type PromotionalBannerDoc } from "@/lib/api/shop";
import { resolveMediaUrl } from "@/lib/apiBase";

export function PromotionalBannersStrip() {
  const [banners, setBanners] = useState<PromotionalBannerDoc[]>([]);

  useEffect(() => {
    shopApi
      .promotionalBanners()
      .then(setBanners)
      .catch(() => setBanners([]));
  }, []);

  if (!banners.length) return null;

  return (
    <section className="container mx-auto grid gap-4 px-4 py-8 md:grid-cols-2 lg:grid-cols-3">
      {banners.map((b) => (
        <Link
          key={b._id}
          href={b.link || "#"}
          className="group relative block aspect-[16/7] overflow-hidden rounded-2xl border border-foreground/10"
        >
          <picture>
            {b.mobileImage ? (
              <source media="(max-width: 768px)" srcSet={resolveMediaUrl(b.mobileImage)} />
            ) : null}
            <Image
              src={resolveMediaUrl(b.image)}
              alt=""
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </picture>
        </Link>
      ))}
    </section>
  );
}

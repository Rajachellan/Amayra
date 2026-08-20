"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { BotanicalDecoration } from "@/components/ui/BotanicalDecoration";
import { resolveMediaUrl } from "@/lib/apiBase";
import {
  shopApi,
  type LookbookDoc,
  type LookbookHotspotProduct,
} from "@/lib/api/shop";

interface Product {
  name: string;
  collection: string;
  price: string;
  image: string;
  desc: string;
  href: string;
}

interface Dot {
  id: string;
  x: number;
  y: number;
  product: Product;
}

interface Slider {
  id: string;
  title: string;
  subtitle: string;
  mainImage: string;
  dots: Dot[];
}

/** Static fallback when CMS has no published lookbooks yet */
const FALLBACK_SLIDERS: Slider[] = [
  {
    id: "fallback-1",
    title: "Bridal Royale",
    subtitle: "Opulence redefined for the modern bride",
    mainImage: "/images/optimized/bridal_1.webp",
    dots: [],
  },
];

function formatInr(n?: number) {
  if (n == null || Number.isNaN(n)) return "";
  return `₹${n.toLocaleString("en-IN")}`;
}

function productOf(hotspotProduct: string | LookbookHotspotProduct | undefined): LookbookHotspotProduct | null {
  if (!hotspotProduct || typeof hotspotProduct === "string") return null;
  return hotspotProduct;
}

function lookbooksToSliders(lookbooks: LookbookDoc[]): Slider[] {
  const slides: Slider[] = [];

  for (const lb of lookbooks) {
    const gallery = [...(lb.galleryImages ?? [])].sort(
      (a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0)
    );

    if (gallery.length) {
      for (const img of gallery) {
        if (!img.imageUrl) continue;
        const dots: Dot[] = (img.hotspots ?? [])
          .map((h, i) => {
            const p = productOf(h.product);
            if (!p?._id) return null;
            const price = p.salePrice ?? p.price;
            return {
              id: h._id || `${lb._id}-${img._id || i}-hs-${i}`,
              x: h.x,
              y: h.y,
              product: {
                name: h.label || p.name,
                collection: lb.title,
                price: formatInr(price),
                image: resolveMediaUrl(p.images?.[0]),
                desc: p.sku ? `SKU ${p.sku}` : lb.shortDescription || "",
                href: p.slug ? `/product/${p.slug}` : `/product/${p._id}`,
              },
            } satisfies Dot;
          })
          .filter((d): d is Dot => Boolean(d));

        slides.push({
          id: img._id || `${lb._id}-${slides.length}`,
          title: img.title || lb.title,
          subtitle: lb.shortDescription || lb.description || "Shop the look",
          mainImage: resolveMediaUrl(img.imageUrl || img.mobileImageUrl),
          dots,
        });
      }
      continue;
    }

    const urls = [
      lb.coverImage,
      ...(lb.images ?? []),
    ].filter((u): u is string => Boolean(u));

    for (const [i, url] of urls.entries()) {
      slides.push({
        id: `${lb._id}-${i}`,
        title: lb.title,
        subtitle: lb.shortDescription || lb.description || "Shop the look",
        mainImage: resolveMediaUrl(url),
        dots: [],
      });
    }
  }

  return slides;
}

export const PreviewBanner = () => {
  const [sliders, setSliders] = useState<Slider[]>(FALLBACK_SLIDERS);
  const [fromCms, setFromCms] = useState(false);
  const [current, setCurrent] = useState(0);
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);
  const [activeDot, setActiveDot] = useState<string | null>(null);
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    shopApi
      .lookbooks()
      .then((rows) => {
        if (cancelled) return;
        const next = lookbooksToSliders(Array.isArray(rows) ? rows : []);
        if (next.length) {
          setSliders(next);
          setFromCms(true);
        } else {
          setSliders(FALLBACK_SLIDERS);
          setFromCms(false);
        }
        setCurrent(0);
      })
      .catch(() => {
        if (!cancelled) {
          setSliders(FALLBACK_SLIDERS);
          setFromCms(false);
        }
      });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const slide = sliders[current];
    if (slide?.dots?.length) {
      setActiveDot(slide.dots[0].id);
      setActiveProduct(slide.dots[0].product);
    } else {
      setActiveDot(null);
      setActiveProduct(null);
    }
  }, [current, sliders]);

  const slide = sliders[current] ?? sliders[0];

  if (!slide) return null;

  const prev = () => {
    setCurrent((c) => (c - 1 + sliders.length) % sliders.length);
  };

  const next = () => {
    setCurrent((c) => (c + 1) % sliders.length);
  };

  const goTo = (i: number) => {
    setCurrent(i);
  };

  const handleDot = (dot: Dot) => {
    setActiveDot(dot.id);
    setActiveProduct(dot.product);
  };

  return (
    <section
      className="relative flex min-h-screen w-full flex-col items-center justify-center px-4 py-16"
      style={{ backgroundColor: "var(--bg-ivory)" }}
    >
      <BotanicalDecoration className="text-emerald-900" opacity={0.03} />
      <div className="mb-10 text-center">
        <p className="mb-2 font-sans text-[10px] uppercase tracking-[0.3em] text-stone-400">
          {fromCms
            ? `Look ${String(current + 1).padStart(2, "0")} of ${sliders.length}`
            : `Collection ${String(current + 1).padStart(2, "0")} of ${sliders.length}`}
        </p>
        <h2 className="mb-3 font-serif text-3xl font-semibold uppercase tracking-widest text-stone-800 md:text-4xl">
          Shop the Look
        </h2>
        <p className="font-sans text-sm tracking-wide text-stone-400">{slide.subtitle}</p>
      </div>

      <div className="flex w-full max-w-6xl items-center gap-3 md:gap-5">
        <button
          type="button"
          onClick={prev}
          className="flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full border border-stone-200 bg-white shadow-md transition-all hover:bg-stone-50"
          style={{ outline: "none" }}
          aria-label="Previous look"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#78716c" strokeWidth="2">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        <div className="flex min-w-0 flex-1 flex-col items-stretch gap-6 md:flex-row">
          <div className="relative aspect-[3/4] w-full shrink-0 overflow-hidden rounded-md shadow-xl md:w-[48%]">
            <Image
              src={slide.mainImage}
              alt={slide.title}
              fill
              sizes="(max-width: 768px) 100vw, 48vw"
              quality={85}
              className="object-cover object-top transition-all duration-700"
            />

            {slide.dots.map((dot) => (
              <button
                key={dot.id}
                type="button"
                onClick={() => handleDot(dot)}
                className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                style={{
                  left: `${dot.x}%`,
                  top: `${dot.y}%`,
                  outline: "none",
                  background: "transparent",
                  border: "none",
                  padding: 0,
                }}
                aria-label={dot.product.name}
              >
                <span
                  className={`absolute inset-0 animate-ping rounded-full ${
                    activeDot === dot.id ? "bg-amber-400/50" : "bg-white/50"
                  }`}
                />
                <span
                  className={`relative block h-4 w-4 rounded-full border-2 shadow-md transition-all duration-200 ${
                    activeDot === dot.id
                      ? "scale-125 border-amber-500 bg-amber-400"
                      : "border-white/90 bg-white hover:scale-110"
                  }`}
                />
              </button>
            ))}

            <div className="pointer-events-none absolute bottom-0 left-0 right-0 bg-gradient-to-t from-stone-900/50 to-transparent p-6">
              <p className="font-serif text-lg font-semibold uppercase tracking-widest text-white">
                {slide.title}
              </p>
            </div>
          </div>

          <div className="flex min-w-0 flex-1 flex-col gap-3 md:w-[52%]">
            <div className="relative w-full overflow-hidden rounded-md border border-stone-200/70 bg-white shadow-lg" style={{ aspectRatio: "3/4" }}>
              {activeProduct ? (
                <div
                  key={activeDot}
                  className="absolute inset-0 flex flex-col overflow-hidden bg-white shadow-sm"
                  style={{ animation: "fadeSlideIn 0.3s ease-out" }}
                >
                  <div
                    className="relative w-full shrink-0 overflow-hidden bg-[#FAF7F2] group/img cursor-pointer"
                    style={{ height: "66%" }}
                    onClick={() => setZoomedImage(activeProduct.image)}
                    title="Click to view full resolution image"
                  >
                    <Image
                      src={activeProduct.image}
                      alt={activeProduct.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 40vw"
                      quality={95}
                      className="object-contain p-3 md:p-4 transition-transform duration-500 group-hover/img:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover/img:bg-black/5 transition-colors duration-300 pointer-events-none" />

                    {/* Expand Zoom Button */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setZoomedImage(activeProduct.image);
                      }}
                      aria-label="Zoom image"
                      className="absolute bottom-3 right-3 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-white/90 shadow-md text-stone-700 hover:bg-white hover:text-stone-900 transition-all hover:scale-110"
                      style={{ outline: "none", border: "none" }}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="11" cy="11" r="8" />
                        <line x1="21" y1="21" x2="16.65" y2="16.65" />
                        <line x1="11" y1="8" x2="11" y2="14" />
                        <line x1="8" y1="11" x2="14" y2="11" />
                      </svg>
                    </button>

                    {/* Close product panel button */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveProduct(null);
                        setActiveDot(null);
                      }}
                      aria-label="Close product view"
                      className="absolute top-3 right-3 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-white/90 shadow-md text-stone-600 hover:bg-white hover:text-stone-900 transition-all hover:scale-110"
                      style={{ outline: "none", border: "none" }}
                    >
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                      </svg>
                    </button>
                  </div>

                  <div className="flex flex-1 flex-col items-center justify-between p-4 text-center bg-white overflow-hidden">
                    <div className="flex flex-col items-center min-w-0 w-full">
                      <p className="mb-0.5 font-sans text-[9px] font-medium uppercase tracking-[0.25em] text-amber-800/80 truncate w-full">
                        {activeProduct.collection}
                      </p>
                      <h3 className="mb-1 font-serif text-sm md:text-base font-semibold uppercase leading-snug tracking-wider text-stone-800 line-clamp-1 w-full">
                        {activeProduct.name}
                      </h3>
                      {activeProduct.desc ? (
                        <p className="mb-1 line-clamp-1 font-sans text-xs leading-relaxed text-stone-400 w-full">
                          {activeProduct.desc}
                        </p>
                      ) : null}
                      {activeProduct.price ? (
                        <p className="font-serif text-base md:text-lg font-bold text-[#d4af37]">
                          {activeProduct.price}
                        </p>
                      ) : null}
                    </div>
                    <Link
                      href={activeProduct.href}
                      className="mt-2 w-full rounded-sm bg-stone-900 py-2.5 md:py-3 text-center font-sans text-[10px] md:text-[11px] font-semibold uppercase tracking-[0.2em] text-white transition-all duration-300 hover:bg-stone-800 hover:shadow-md"
                    >
                      View Product
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center rounded-sm border border-dashed border-stone-200 px-6 text-center">
                  <div className="mb-4 flex h-8 w-8 items-center justify-center rounded-full border-2 border-stone-300 bg-white shadow-sm">
                    <span className="block h-2 w-2 rounded-full bg-stone-300" />
                  </div>
                  <p className="font-sans text-[10px] uppercase leading-loose tracking-[0.15em] text-stone-400">
                    {slide.dots.length
                      ? "Tap a dot on the image to explore the look"
                      : "Browse this look — add hotspots in admin to shop pieces"}
                  </p>
                </div>
              )}
            </div>

            {slide.dots.length ? (
              <div className="flex justify-center gap-4">
                {slide.dots.map((dot, i) => (
                  <button
                    key={dot.id}
                    type="button"
                    onClick={() => handleDot(dot)}
                    className="cursor-pointer font-sans text-[10px] uppercase tracking-wider transition-colors duration-200"
                    style={{
                      background: "transparent",
                      border: "none",
                      outline: "none",
                      boxShadow: "none",
                      paddingBottom: "2px",
                      borderBottom: activeDot === dot.id ? "1px solid #f59e0b" : "1px solid transparent",
                      color: activeDot === dot.id ? "#d97706" : "#a8a29e",
                    }}
                  >
                    Item {i + 1}
                  </button>
                ))}
              </div>
            ) : null}
          </div>
        </div>

        <button
          type="button"
          onClick={next}
          className="flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full border border-stone-200 bg-white shadow-md transition-all hover:bg-stone-50"
          style={{ outline: "none" }}
          aria-label="Next look"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#78716c" strokeWidth="2">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>

      <div className="mt-10 flex items-center gap-2">
        {sliders.map((_, i) => (
          <button
            key={sliders[i].id}
            type="button"
            onClick={() => goTo(i)}
            className={`cursor-pointer rounded-full transition-all duration-300 ${
              i === current ? "h-1.5 w-6 bg-stone-700" : "h-1.5 w-1.5 bg-stone-300 hover:bg-stone-400"
            }`}
            style={{ outline: "none", border: "none" }}
            aria-label={`Go to look ${i + 1}`}
          />
        ))}
      </div>

      {/* Lightbox Zoom Modal for full clear product inspection */}
      {zoomedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm transition-opacity duration-300"
          onClick={() => setZoomedImage(null)}
        >
          <div
            className="relative max-h-[90vh] max-w-[90vw] overflow-hidden rounded-xl bg-white p-4 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setZoomedImage(null)}
              className="absolute top-3 right-3 z-10 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-stone-900/80 text-white shadow-lg transition-all hover:bg-stone-900 hover:scale-110"
              aria-label="Close zoom modal"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
            <div className="relative flex max-h-[82vh] max-w-[85vw] items-center justify-center">
              <img
                src={zoomedImage}
                alt="Full product view"
                className="max-h-[82vh] max-w-full rounded-md object-contain shadow-sm"
              />
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
};

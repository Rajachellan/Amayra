"use client";

import { useState } from "react";

interface Product {
  name: string;
  collection: string;
  price: string;
  image: string;
  desc: string;
}

interface Dot {
  id: string;
  x: number;
  y: number;
  product: Product;
}

interface Slider {
  id: number;
  title: string;
  subtitle: string;
  mainImage: string;
  dots: Dot[];
}

const sliders: Slider[] = [
  {
    id: 1,
    title: "Bridal Royale",
    subtitle: "Opulence redefined for the modern bride",
    mainImage: "/images/bridal_collections/bridal_collections (2).jpg",
    dots: [
      { id: "d1a", x: 18, y: 77, product: { name: "Kundan Maang Tikka", collection: "Bridal Royale", price: "$124.00", image: "/images/luxury/bangles_1.jpg", desc: "Hand-crafted kundan setting with pearl drops" } },
      { id: "d1b", x: 40, y: 43, product: { name: "Polki Choker Necklace", collection: "Bridal Royale", price: "$219.00", image: "images/luxury/neckles.jpg", desc: "Layered polki choker with emerald accents" } },
      { id: "d1c", x: 65, y: 36, product: { name: "Gold Bangle Set", collection: "Bridal Royale", price: "$89.00", image: "/images/luxury/jumka.jpg", desc: "Set of 6 intricately carved gold-tone bangles" } },
    ],
  },
  {
    id: 2,
    title: "Basraa Wedding",
    subtitle: "Timeless elegance for every ceremony",
    mainImage: "/images/bride_2.jpg",
    dots: [
      { id: "d2a", x: 53, y: 44, product: { name: "Basra Trellis Choker", collection: "Basraa Wedding", price: "$59.34", image: "/images/ring.jpg", desc: "Geometric trellis pattern with gold finish" } },
      { id: "d2b", x: 34, y: 53, product: { name: "Pearl Drop Earrings", collection: "Basraa Wedding", price: "$44.00", image: "https://images.unsplash.com/photo-1590548784585-643d2b9f2925?w=400&q=80", desc: "Freshwater pearl drops in antique gold" } },
      { id: "d2c", x: 40, y: 77, product: { name: "Meenakari Ring", collection: "Basraa Wedding", price: "$32.00", image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&q=80", desc: "Vibrant meenakari enamel floral ring" } },
    ],
  },
  {
    id: 3,
    title: "Regal Heritage",
    subtitle: "Heirlooms reimagined for today",
    mainImage: "/images/bride5.jpg",
    dots: [
      { id: "d3a", x: 79, y: 48, product: { name: "Jadau Matha Patti", collection: "Regal Heritage", price: "$178.00", image: "/images/ring5.jpg", desc: "Traditional jadau headpiece with ruby inlay" } },
      { id: "d3b", x: 45, y: 70, product: { name: "Temple Necklace", collection: "Regal Heritage", price: "$245.00", image: "/images/pendant.jpg", desc: "South Indian temple motif gold necklace" } },
    ],
  },
];

export const PreviewBanner = () => {
  const [current, setCurrent] = useState<number>(0);
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);
  const [activeDot, setActiveDot] = useState<string | null>(null);

  const slide = sliders[current];

  const prev = () => {
    setActiveProduct(null);
    setActiveDot(null);
    setCurrent((c) => (c - 1 + sliders.length) % sliders.length);
  };

  const next = () => {
    setActiveProduct(null);
    setActiveDot(null);
    setCurrent((c) => (c + 1) % sliders.length);
  };

  const goTo = (i: number) => {
    setActiveProduct(null);
    setActiveDot(null);
    setCurrent(i);
  };

  const handleDot = (dot: Dot) => {
    if (activeDot === dot.id) {
      setActiveDot(null);
      setActiveProduct(null);
    } else {
      setActiveDot(dot.id);
      setActiveProduct(dot.product);
    }
  };

  return (
    <section className="w-full min-h-screen bg-stone-50 flex flex-col items-center justify-center py-16 px-4">

      {/* Header */}
      <div className="text-center mb-10">
        <p className="text-[10px] tracking-[0.3em] text-stone-400 uppercase mb-2 font-sans">
          Collection {String(current + 1).padStart(2, "0")} of {sliders.length}
        </p>
        <h2 className="text-3xl md:text-4xl font-semibold tracking-widest uppercase text-stone-800 mb-3 font-serif">
          Shop the Look
        </h2>
        <p className="text-sm text-stone-400 tracking-wide font-sans">
          {slide.subtitle}
        </p>
      </div>

      {/* Slider Container — arrows are inline flex items, no absolute positioning */}
      <div className="w-full max-w-5xl flex items-center gap-3">

        {/* Left Arrow */}
        <button
          onClick={prev}
          className="shrink-0 w-10 h-10 rounded-full bg-white shadow-md border border-stone-200 flex items-center justify-center hover:bg-stone-50 transition-all cursor-pointer"
          style={{ outline: "none" }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#78716c" strokeWidth="2">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        {/* Main Content — fills the space between the two arrows */}
        <div className="flex flex-col md:flex-row items-stretch gap-6 flex-1 min-w-0">

          {/* Large Image with Dots */}
          <div className="relative w-full md:w-[45%] aspect-[3/4] rounded-sm overflow-hidden shadow-lg shrink-0">
            <img
              src={slide.mainImage}
              alt={slide.title}
              className="w-full h-full object-cover object-top transition-all duration-700"
            />

            {/* Interactive Dots */}
            {slide.dots.map((dot) => (
              <button
                key={dot.id}
                onClick={() => handleDot(dot)}
                className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                style={{ left: `${dot.x}%`, top: `${dot.y}%`, outline: "none", background: "transparent", border: "none", padding: 0 }}
              >
                <span
                  className={`absolute inset-0 rounded-full animate-ping ${activeDot === dot.id ? "bg-amber-400/50" : "bg-white/50"
                    }`}
                />
                <span
                  className={`relative block w-4 h-4 rounded-full border-2 shadow-md transition-all duration-200 ${activeDot === dot.id
                      ? "bg-amber-400 border-amber-500 scale-125"
                      : "bg-white border-white/90 hover:scale-110"
                    }`}
                />
              </button>
            ))}

            {/* Title Overlay */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-stone-900/50 to-transparent p-6 pointer-events-none">
              <p className="text-white text-lg font-semibold tracking-widest uppercase font-serif">
                {slide.title}
              </p>
            </div>
          </div>

          {/* Product Preview Panel — fixed aspect-[3/4] matches main image height, no layout shift */}
          <div className="flex-1 flex flex-col gap-3 min-w-0">
            {/* Fixed-height box: always aspect-[3/4] — same as the main image */}
            <div className="relative w-full overflow-hidden rounded-sm" style={{ aspectRatio: "3/4" }}>
              {activeProduct ? (
                <div
                  key={activeDot}
                  className="absolute inset-0 bg-white shadow-sm border border-stone-100 flex flex-col overflow-hidden"
                  style={{ animation: "fadeSlideIn 0.3s ease-out" }}
                >
                  {/* Product Image — fixed 55% of panel height */}
                  <div className="relative w-full shrink-0" style={{ height: "55%" }}>
                    <img
                      src={activeProduct.image}
                      alt={activeProduct.name}
                      className="w-full h-full object-cover object-center"
                    />
                    <button
                      onClick={() => { setActiveProduct(null); setActiveDot(null); }}
                      className="absolute top-3 right-3 w-7 h-7 bg-white/90 rounded-full flex items-center justify-center shadow-sm hover:bg-white transition-all cursor-pointer"
                      style={{ outline: "none", border: "none" }}
                    >
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#78716c" strokeWidth="2.5">
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                      </svg>
                    </button>
                  </div>

                  {/* Product Info — fills remaining height */}
                  <div className="flex-1 flex flex-col items-center justify-center p-4 text-center overflow-hidden">
                    <p className="text-[9px] tracking-[0.25em] text-stone-400 uppercase font-sans mb-1">
                      {activeProduct.collection}
                    </p>
                    <h3 className="text-sm font-semibold text-stone-800 tracking-wider uppercase mb-1 font-serif leading-snug">
                      {activeProduct.name}
                    </h3>
                    <p className="text-xs text-stone-400 font-sans mb-2 leading-relaxed line-clamp-2">
                      {activeProduct.desc}
                    </p>
                    <p className="text-base font-medium text-stone-600 mb-3 font-serif">
                      {activeProduct.price}
                    </p>
                    <button
                      className="w-full bg-stone-800 text-white text-[10px] tracking-[0.2em] uppercase py-2.5 hover:bg-stone-700 transition-colors duration-200 font-sans cursor-pointer"
                      style={{ outline: "none", border: "none" }}
                    >
                      View Product
                    </button>
                  </div>
                </div>
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 border border-dashed border-stone-200 rounded-sm">
                  <div className="w-8 h-8 rounded-full bg-white border-2 border-stone-300 flex items-center justify-center mb-4 shadow-sm">
                    <span className="w-2 h-2 rounded-full bg-stone-300 block" />
                  </div>
                  <p className="text-[10px] text-stone-400 tracking-[0.15em] uppercase font-sans leading-loose">
                    Tap a dot on the image<br />to explore the look
                  </p>
                </div>
              )}
            </div>

            {/* Dot Legend — outside the fixed box, doesn't affect section height */}
            <div className="flex gap-4 justify-center">
              {slide.dots.map((dot, i) => (
                <button
                  key={dot.id}
                  onClick={() => handleDot(dot)}
                  className="text-[10px] tracking-wider font-sans uppercase transition-colors duration-200 cursor-pointer"
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
          </div>
        </div>
        {/* Right Arrow */}
        <button
          onClick={next}
          className="shrink-0 w-10 h-10 rounded-full bg-white shadow-md border border-stone-200 flex items-center justify-center hover:bg-stone-50 transition-all cursor-pointer"
          style={{ outline: "none" }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#78716c" strokeWidth="2">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>

      {/* Pagination */}
      <div className="flex gap-2 mt-10 items-center">
        {sliders.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`rounded-full transition-all duration-300 cursor-pointer ${i === current
                ? "w-6 h-1.5 bg-stone-700"
                : "w-1.5 h-1.5 bg-stone-300 hover:bg-stone-400"
              }`}
            style={{ outline: "none", border: "none" }}
          />
        ))}
      </div>

      <style>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}
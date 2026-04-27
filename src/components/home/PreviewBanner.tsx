"use client";

import { useState } from "react";
import Image from "next/image";

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
    mainImage:"/images/bridal_collections/bridal_collections (2).jpg",
    dots: [
      { id: "d1a", x: 20, y: 75, product: { name: "Kundan Maang Tikka", collection: "Bridal Royale", price: "$124.00", image: "/images/luxury/bangles_1.jpg", desc: "Hand-crafted kundan setting with pearl drops" } },
      { id: "d1b", x: 42, y: 40, product: { name: "Polki Choker Necklace", collection: "Bridal Royale", price: "$219.00", image: "images/luxury/neckles.jpg", desc: "Layered polki choker with emerald accents" } },
      { id: "d1c", x: 64, y: 35, product: { name: "Gold Bangle Set", collection: "Bridal Royale", price: "$89.00", image: "/images/luxury/jumka.jpg", desc: "Set of 6 intricately carved gold-tone bangles" } },
    ],
  },
  {
    id: 2,
    title: "Basraa Wedding",
    subtitle: "Timeless elegance for every ceremony",
    mainImage: "/images/bride_2.jpg",
    dots: [
      { id: "d2a", x: 53, y: 44, product: { name: "Basra Trellis Choker", collection: "Basraa Wedding", price: "$59.34", image: "/images/ring.jpg", desc: "Geometric trellis pattern with gold finish" } },
      { id: "d2b", x: 30, y: 55, product: { name: "Pearl Drop Earrings", collection: "Basraa Wedding", price: "$44.00", image: "https://images.unsplash.com/photo-1590548784585-643d2b9f2925?w=400&q=80", desc: "Freshwater pearl drops in antique gold" } },
      { id: "d2c", x: 40, y: 77, product: { name: "Meenakari Ring", collection: "Basraa Wedding", price: "$32.00", image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&q=80", desc: "Vibrant meenakari enamel floral ring" } },
    ],
  },
  {
    id: 3,
    title: "Regal Heritage",
    subtitle: "Heirlooms reimagined for today",
    mainImage: "/images/bride5.jpg",
    dots: [
      { id: "d3a", x: 78, y: 55, product: { name: "Jadau Matha Patti", collection: "Regal Heritage", price: "$178.00", image: "/images/ring5.jpg", desc: "Traditional jadau headpiece with ruby inlay" } },
      { id: "d3b", x: 45, y: 80, product: { name: "Temple Necklace", collection: "Regal Heritage", price: "$245.00", image: "/images/pendant.jpg", desc: "South Indian temple motif gold necklace" } },
    ],
  },
  // {
  //   id: 4,
  //   title: "Festive Bloom",
  //   subtitle: "Colors that celebrate every occasion",
  //   mainImage: "https://images.unsplash.com/photo-1631135460920-5a11a9d94e7d?w=800&q=80",
  //   dots: [
  //     { id: "d4a", x: 42, y: 30, product: { name: "Floral Jhumka Set", collection: "Festive Bloom", price: "$67.00", image: "https://images.unsplash.com/photo-1629224316810-9d8805b95e76?w=400&q=80", desc: "Filigree flower jhumkas with beaded drops" } },
  //     { id: "d4b", x: 38, y: 52, product: { name: "Enamel Collar Necklace", collection: "Festive Bloom", price: "$112.00", image: "https://images.unsplash.com/photo-1586882829491-b81178aa622e?w=400&q=80", desc: "Bold collar with multicolor enamel petals" } },
  //     { id: "d4c", x: 50, y: 72, product: { name: "Charm Anklet Pair", collection: "Festive Bloom", price: "$38.00", image: "https://images.unsplash.com/photo-1543294001-f7cd5d7fb516?w=400&q=80", desc: "Delicate anklet with tiny floral charms" } },
  //   ],
  // },
  // {
  //   id: 5,
  //   title: "Moonlit Affair",
  //   subtitle: "Ethereal pieces for enchanted evenings",
  //   mainImage: "https://images.unsplash.com/photo-1612336307429-8a898d10e223?w=800&q=80",
  //   dots: [
  //     { id: "d5a", x: 46, y: 26, product: { name: "Crystal Maang Tikka", collection: "Moonlit Affair", price: "$54.00", image: "https://images.unsplash.com/photo-1600717535275-0b18ede2f7fc?w=400&q=80", desc: "Swarovski crystal centrepiece with chain" } },
  //     { id: "d5b", x: 52, y: 44, product: { name: "Silver Hasli Necklace", collection: "Moonlit Affair", price: "$143.00", image: "https://images.unsplash.com/photo-1598560917505-59a3ad559071?w=400&q=80", desc: "Oxidised silver rigid collar necklace" } },
  //     { id: "d5c", x: 40, y: 66, product: { name: "Moonstone Bracelet", collection: "Moonlit Affair", price: "$76.00", image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&q=80", desc: "Cabochon moonstone set in twisted silver" } },
  //   ],
  // },
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

      {/* Slider Container */}
      <div className="relative w-full max-w-5xl flex items-center justify-center">

        {/* Left Arrow */}
        <button
          onClick={prev}
          className="absolute left-0 z-20 w-10 h-10 rounded-full bg-white shadow-md border border-stone-200 flex items-center justify-center hover:bg-stone-50 transition-all cursor-pointer"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#78716c" strokeWidth="2">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        {/* Main Content */}
        <div className="flex flex-col md:flex-row items-center gap-8 w-full px-14">

          {/* Large Image with Dots */}
          <div className="relative w-full md:w-[38%] aspect-[3/4] rounded-sm overflow-hidden shadow-lg flex-shrink-0">
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
                style={{ left: `${dot.x}%`, top: `${dot.y}%` }}
              >
                {/* Pulse ring */}
                <span
                  className={`absolute inset-0 rounded-full animate-ping ${
                    activeDot === dot.id ? "bg-amber-400/50" : "bg-white/50"
                  }`}
                />
                {/* Dot */}
                <span
                  className={`relative block w-4 h-4 rounded-full border-2 shadow-md transition-all duration-200 ${
                    activeDot === dot.id
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

          {/* Product Preview Panel */}
          <div className="w-full md:w-[30%] flex flex-col items-center gap-4">
            {activeProduct ? (
              <div
                key={activeDot}
                className="w-full bg-white rounded-sm shadow-sm border border-stone-100 overflow-hidden"
                style={{ animation: "fadeSlideIn 0.3s ease-out" }}
              >
                {/* Product Image */}
                <div className="relative w-full aspect-square overflow-hidden bg-stone-50">
                  <img
                    src={activeProduct.image}
                    alt={activeProduct.name}
                    className="w-full h-full object-cover object-center"
                  />
                  <button
                    onClick={() => { setActiveProduct(null); setActiveDot(null); }}
                    className="absolute top-3 right-3 w-7 h-7 bg-white/90 rounded-full flex items-center justify-center shadow-sm hover:bg-white transition-all cursor-pointer"
                  >
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#78716c" strokeWidth="2.5">
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </button>
                </div>

                {/* Product Info */}
                <div className="p-5 text-center">
                  <p className="text-[9px] tracking-[0.25em] text-stone-400 uppercase font-sans mb-1">
                    {activeProduct.collection}
                  </p>
                  <h3 className="text-sm font-semibold text-stone-800 tracking-wider uppercase mb-2 font-serif">
                    {activeProduct.name}
                  </h3>
                  <p className="text-xs text-stone-400 font-sans mb-3 leading-relaxed">
                    {activeProduct.desc}
                  </p>
                  <p className="text-lg font-medium text-stone-600 mb-4 font-serif">
                    {activeProduct.price}
                  </p>
                  <button className="w-full bg-stone-800 text-white text-[10px] tracking-[0.2em] uppercase py-3 hover:bg-stone-700 transition-colors duration-200 font-sans cursor-pointer">
                    View Product
                  </button>
                </div>
              </div>
            ) : (
              <div className="w-full flex flex-col items-center justify-center text-center py-16 px-6 border border-dashed border-stone-200 rounded-sm">
                <div className="w-8 h-8 rounded-full bg-white border-2 border-stone-300 flex items-center justify-center mb-4 shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-stone-300 block" />
                </div>
                <p className="text-[10px] text-stone-400 tracking-[0.15em] uppercase font-sans leading-loose">
                  Tap a dot on the image<br />to explore the look
                </p>
              </div>
            )}

            {/* Dot Legend */}
            <div className="flex gap-5 mt-1">
              {slide.dots.map((dot, i) => (
                <button
                  key={dot.id}
                  onClick={() => handleDot(dot)}
                  className={`text-[10px] tracking-wider font-sans uppercase transition-all pb-0.5 cursor-pointer bg-transparent border-none ${
                    activeDot === dot.id
                      ? "text-amber-600 border-b border-amber-400"
                      : "text-stone-400 hover:text-stone-600"
                  }`}
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
          className="absolute right-0 z-20 w-10 h-10 rounded-full bg-white shadow-md border border-stone-200 flex items-center justify-center hover:bg-stone-50 transition-all cursor-pointer"
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
            className={`rounded-full transition-all duration-300 cursor-pointer ${
              i === current
                ? "w-6 h-1.5 bg-stone-700"
                : "w-1.5 h-1.5 bg-stone-300 hover:bg-stone-400"
            }`}
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
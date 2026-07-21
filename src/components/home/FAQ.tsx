"use client";

import { useState, useRef, useEffect } from "react";
import localFont from "next/font/local";
import { Playfair_Display, DM_Sans } from "next/font/google";
import { BotanicalDecoration } from "@/components/ui/BotanicalDecoration";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-dm",
});

const faqs = [
  {
    id: 1,
    category: "Materials & Craftsmanship",
    question: "What materials are used in your jewelry collections?",
    answer:
      "Every piece in our atelier is crafted from the finest materials — 18k and 22k gold, platinum, sterling silver, and ethically sourced gemstones including diamonds, rubies, sapphires, and emeralds. Each stone is individually hand-selected by our master gemologists to ensure exceptional brilliance and clarity.",
  },
  {
    id: 2,
    category: "Authenticity",
    question: "How do I verify the authenticity of my piece?",
    answer:
      "All our jewelry comes with a Certificate of Authenticity, hallmarked and engraved with unique identification codes. Each piece undergoes rigorous third-party certification from internationally recognized gemological laboratories such as GIA or IGI, guaranteeing the provenance and quality of every stone.",
  },
  {
    id: 3,
    category: "Custom Orders",
    question: "Can I request a bespoke or custom jewelry design?",
    answer:
      "Absolutely. Our bespoke service offers a private consultation with our master jewelers who will bring your vision to life. From initial sketches to the final setting, the entire process is handled with utmost discretion and artistry. Custom orders typically require 6–10 weeks and begin with a complimentary design session.",
  },
  {
    id: 4,
    category: "Care & Maintenance",
    question: "How should I care for my fine jewelry?",
    answer:
      "We recommend storing each piece individually in our signature velvet-lined pouches, away from direct sunlight and moisture. For routine cleaning, use a soft brush with warm soapy water. Avoid exposure to harsh chemicals, perfumes, and ultrasonic cleaners for gemstone-set pieces. We offer complimentary annual cleaning and inspection at our boutiques.",
  },
  {
    id: 5,
    category: "Shipping & Delivery",
    question: "How is my order packaged and delivered?",
    answer:
      "Your jewelry arrives in our signature ivory and gold gift box, nestled in hand-stitched velvet, accompanied by your certificate and a personal note. All shipments are fully insured and dispatched via secure, signature-required courier. Complimentary white-glove delivery is available for orders above ₹1,00,000.",
  },
  {
    id: 6,
    category: "Returns & Resizing",
    question: "What is your return and resizing policy?",
    answer:
      "We offer a 30-day return policy for unworn pieces in their original condition. Ring resizing is complimentary within the first year of purchase. Our dedicated concierge team ensures every concern is addressed with the care and attention your investment deserves.",
  },
  {
    id: 7,
    category: "Sustainability",
    question: "Are your gemstones ethically sourced?",
    answer:
      "Yes. We are committed to responsible luxury. All our diamonds are conflict-free, compliant with the Kimberley Process, and we work exclusively with mining partners who uphold fair trade and environmental standards. Our gold is recycled or sourced from certified responsible mines, reflecting our pledge to a sustainable future for fine jewelry.",
  },
];

// ── Gem icon ─────────────────────────────────────────────────────────────────
const GemIcon = ({ size = 10, className = "" }: { size?: number; className?: string }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M12 2L2 9l10 13L22 9z" />
  </svg>
);

// ── Animated answer panel ────────────────────────────────────────────────────
const AnimatedPanel = ({
  isOpen,
  children,
}: {
  isOpen: boolean;
  children: React.ReactNode;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) setHeight(isOpen ? ref.current.scrollHeight : 0);
  }, [isOpen]);

  return (
    <div
      style={{
        height,
        transition: "height 0.42s cubic-bezier(0.4, 0, 0.2, 1)",
        overflow: "hidden",
      }}
    >
      <div ref={ref}>{children}</div>
    </div>
  );
};

// ── Single FAQ row ───────────────────────────────────────────────────────────
const FAQItem = ({
  faq,
  isOpen,
  onToggle,
  index,
}: {
  faq: (typeof faqs)[0];
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}) => (
  <div
    className="border-b border-stone-200 group"
    style={{
      animation: `fadeUp 0.5s ease ${index * 70}ms both`,
    }}
  >
    <button
      onClick={onToggle}
      aria-expanded={isOpen}
      className="w-full flex items-start gap-2 py-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2"
    >
      {/* Number */}
      <span
        className="shrink-0 pt-0.5 text-[11px] tracking-widest text-amber-600"
        style={{ fontFamily: "var(--font-playfair)", minWidth: "20px" }}
      >
        {String(faq.id).padStart(2, "0")}
      </span>

      {/* Text block */}
      <div className="flex-1 min-w-0">
        {/* <p className="text-[10px] tracking-[0.22em] uppercase text-stone-400 mb-1.5 font-medium" style={{ fontFamily: "var(--font-dm)" }}>
          {faq.category}
        </p> */}
        <h3
          className="text-base sm:text-lg leading-snug text-stone-800 transition-colors duration-200 group-hover:text-amber-700"
          style={{ fontFamily: "var(--font-playfair)", fontWeight: 400 }}
        >
          {faq.question}
        </h3>
      </div>

      {/* Toggle icon */}
      <div
        className={`shrink-0 w-7 h-7 rounded-full border flex items-center justify-center mt-0.5 transition-all duration-300 ${
          isOpen
            ? "bg-amber-500 border-amber-500"
            : "bg-transparent border-stone-300 group-hover:border-amber-400"
        }`}
      >
        <svg
          width="11"
          height="11"
          viewBox="0 0 11 11"
          fill="none"
          className="transition-transform duration-350"
          style={{ transform: isOpen ? "rotate(45deg)" : "rotate(0deg)" }}
        >
          <line
            x1="5.5" y1="1" x2="5.5" y2="10"
            stroke={isOpen ? "#fff" : "#78716c"}
            strokeWidth="1.3"
            strokeLinecap="round"
          />
          <line
            x1="1" y1="5.5" x2="10" y2="5.5"
            stroke={isOpen ? "#fff" : "#703308ff"}
            strokeWidth="1.3"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </button>

    {/* Answer */}
    <AnimatedPanel isOpen={isOpen}>
      <div className="pb-2 pl-[52px] pr-4">
        <div className="border-l border-amber-300/60 pl-5">
          <p
            className="text-sm sm:text-[15px] text-stone-500 leading-[1.85]"
            style={{ fontFamily: "var(--font-dm)", fontWeight: 300 }}
          >
            {faq.answer}
          </p>
        </div>
      </div>
    </AnimatedPanel>
  </div>
);

// ── Main component ───────────────────────────────────────────────────────────
export default function FAQ() {
  const [openId, setOpenId] = useState<number | null>(null);

  const toggle = (id: number) =>
    setOpenId((prev) => (prev === id ? null : id));

  return (
    <div className={`${playfair.variable} ${dmSans.variable}`}>
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }
        .shimmer-gold {
          background: linear-gradient(90deg, #92700a 0%, #c9a84c 30%, #f0d080 55%, #c9a84c 75%, #92700a 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 5s linear infinite;
        }
      `}</style>

      <section className=" flex items-center justify-center px-4 py-10 sm:px-8 relative overflow-hidden" >
        <BotanicalDecoration className="text-emerald-900" opacity={0.03} />
        <div className="w-full relative z-10 max-w-5xl">

          {/* ── Header ── */}
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-7">
            <div>
              {/* Eyebrow */}
              {/* <div className="flex items-center gap-3 mb-3">
                <div className="h-px w-10 bg-amber-400/60" />
                <GemIcon size={9} className="text-amber-500" />
                <span
                  className="text-[14px] tracking-[0.3em] uppercase text-yellow-600"
                  style={{ fontFamily: "var(--font-dm)", fontWeight: 500 }}
                >
                  Maison Lumière
                </span>
              </div> */}

              {/* Heading */}
              <h1
                className="text-4xl  lg:text-5xl leading-[1.05] tracking-tight"
                style={{ fontFamily: "var(--font-playfair)", fontWeight: 400 }}
              >
                <span className="text-stone-800">Frequently</span>
              
                <span className="shimmer-gold italic">Asked</span>
                
                <span className="text-stone-800">Questions</span>
              </h1>
            </div>

          
          </div>

          {/* ── Two-column layout on large screens ── */}
          <div className="">
            {/* FAQ list */}
            <div>
              {/* Top rule */}
              <div className="border-t border-stone-200" />

              {faqs.map((faq, i) => (
                <FAQItem
                  key={faq.id}
                  faq={faq}
                  isOpen={openId === faq.id}
                  onToggle={() => toggle(faq.id)}
                  index={i}
                />
              ))}                     
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
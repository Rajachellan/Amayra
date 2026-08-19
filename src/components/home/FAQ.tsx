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
    question: "How do i lace an order?",
    answer:
      "Simply add your favourite pieces to the cart and check out using any of our accepted payment methods. You'll receive an order confirmation via email and SMS right away.",
  },
  {
    id: 2,
    category: "Authenticity",
    question: "How do I track my order?",
    answer:
      "Once shipped, you'll receive a tracking link via email, SMS, and WhatsApp. You can also track it anytime from 'My Orders' on our website.",
  },
  {
    id: 3,
    category: "Custom Orders",
    question: "Do I need an account to shop with MaiRii??",
    answer:
      "You can check out as a guest, but creating an account lets you track orders, save addresses, and view your order history.",
  },
  {
    id: 4,
    category: "Care & Maintenance",
    question: "I was charged but didn't get an order confirmation. What do I do?",
    answer:
      "Please write to us at connectconnect@mairiijewels.com with your payment reference — we'll verify and resolve it within 24–48 hours.",
  },
  {
    id: 5,
    category: "Is MaiRii jewellery real gold or silver?",
    question: "Is MaiRii jewellery real gold or silver?",
    answer:
      "Unless specifically described as gold-plated, silver, or certified, MaiRii pieces are artificial/imitation fashion jewellery, crafted to look beautiful and last with proper care.",
  },
  {
    id: 6,
    category: "How do I take care of my jewellery?",
    question: "How do I take care of my jewellery?",
    answer:
      "Keep it away from water, perfume, and direct sunlight, and store it in the pouch provided. This helps preserve the plating and finish for longer.",
  },
  {
    id: 7,
    category: "Sustainability",
    question: "Will the plating fade over time?",
    answer:
      "With normal wear and proper care, plating is designed to last, but like all fashion jewellery, it may show natural wear over extended use — this isn't a manufacturing defect.",
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
        className={`shrink-0 w-7 h-7 rounded-full border flex items-center justify-center mt-0.5 transition-all duration-300 ${isOpen
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
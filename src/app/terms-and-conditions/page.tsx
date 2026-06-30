"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ChevronRight } from "lucide-react";

const sections = [
  { id: "intro", title: "Introduction", content: "Welcome to Mairii. By accessing this website, you agree to be bound by these Terms and Conditions. Our services are provided to you subject to the following notices, terms, and conditions." },
  { id: "products", title: "Product Information", content: "We make every effort to display the colors and details of our jewellery as accurately as possible. However, as the actual colors you see will depend on your monitor, we cannot guarantee that your monitor's display of any color will be accurate. Weights mentioned are approximate and may vary slightly." },
  { id: "pricing", title: "Pricing & Payments", content: "Prices for our products are subject to change without notice. We reserve the right at any time to modify or discontinue the Service without notice. All transactions are processed in INR unless otherwise specified." },
  { id: "shipping", title: "Shipping & Delivery", content: "Domestic shipping within India is complimentary for all orders above ₹50,000. For international orders, shipping rates and customs duties will apply as per the destination country's regulations." },
  { id: "returns", title: "Return & Exchange Policy", content: "We offer a 7-day exchange policy for unworn jewellery in its original packaging with the certificate of authenticity. Custom-made or personalized pieces are not eligible for returns or exchanges." },
  { id: "warranty", title: "Warranty & Liability", content: "All our jewellery comes with a lifetime warranty against manufacturing defects. This does not cover normal wear and tear, accidental damage, or loss of gemstones." },
];

export default function TermsPage() {
  const [activeTab, setActiveTab] = useState("intro");

  const scrollToSection = (id: string) => {
    setActiveTab(id);
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />

      <section className="pt-40 pb-24">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-20"
          >
            <span className="text-[10px] uppercase tracking-[0.5em] text-champagne mb-4 block">Legal Framework</span>
            <h1 className="text-5xl font-serif">Terms & Conditions</h1>
            <div className="w-20 h-[1px] bg-champagne mx-auto mt-8" />
          </motion.div>

          <div className="flex flex-col lg:flex-row gap-16">
            {/* Sticky Sidebar */}
            <aside className="lg:w-1/4">
              <div className="sticky top-32 space-y-2">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className={`w-full text-left px-6 py-4 transition-all flex items-center justify-between group ${activeTab === section.id
                      ? "bg-champagne/10 text-champagne border-l-2 border-champagne"
                      : "text-foreground/40 hover:text-foreground/70"
                      }`}
                  >
                    <span className="text-[10px] uppercase tracking-widest font-medium">
                      {section.title}
                    </span>
                    <ChevronRight className={`w-3 h-3 transition-transform ${activeTab === section.id ? "rotate-90" : "group-hover:translate-x-1"}`} />
                  </button>
                ))}
              </div>
            </aside>

            {/* Content Area */}
            <div className="lg:w-3/4 space-y-24">
              {sections.map((section) => (
                <div key={section.id} id={section.id} className="scroll-mt-32">
                  <h2 className="text-2xl font-serif mb-8 text-foreground/80">{section.title}</h2>
                  <div className="w-full h-[1px] bg-gradient-to-r from-champagne/30 to-transparent mb-8" />
                  <p className="text-foreground/60 font-light leading-loose text-editorial text-lg">
                    {section.content}
                  </p>
                  <p className="text-foreground/60 font-light leading-loose text-editorial text-lg mt-6">
                    Quisque facilisis eros in metus varius, non scelerisque sem interdum.
                    Curabitur varius, justo at interdum aliquet, libero lacus congue nunc,
                    id ultrices tellus diam id ligula. Nullam sit amet magna ex.
                    Sed feugiat porta nisi, sed convallis metus.
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

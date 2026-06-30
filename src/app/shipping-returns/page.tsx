"use client";

import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { motion } from "framer-motion";
import { Truck, ShieldCheck, RefreshCw, Globe } from "lucide-react";
import { PageBanner } from "@/components/layout/PageBanner";

const ShippingReturns = () => {
  return (
    <main className="min-h-screen bg-[#FDFBF9]">
      <Navbar />

      <PageBanner 
        title="Shipping & Returns"
        subtitle="Client Services"
        image="/images/banner-9.jpg"
      />

      {/* Policy Sections */}
      <section className="py-20 container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          
          {/* Shipping Policy */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-12"
          >
            <div>
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-10 h-10 rounded-full bg-champagne/10 flex items-center justify-center">
                  <Truck className="w-5 h-5 text-champagne" />
                </div>
                <h2 className="text-2xl font-serif tracking-wide">Shipping Policy</h2>
              </div>
              <div className="space-y-6 text-sm text-foreground/70 leading-loose">
                <p>
                  <strong className="text-foreground font-semibold">Complimentary Shipping:</strong> We are pleased to offer 
                  complimentary insured shipping on all orders over ₹100,000 within India. 
                  For orders below this amount, a standard fee of ₹500 applies.
                </p>
                <p>
                  <strong className="text-foreground font-semibold">Dispatch Time:</strong> Ready-to-ship pieces are 
                  dispatched within 48 hours. Bespoke or made-to-order creations 
                  typically require 3-4 weeks for production and dispatch.
                </p>
                <p>
                  <strong className="text-foreground font-semibold">Delivery Partners:</strong> We partner with premium 
                  courier services specializing in high-value shipments to ensure 
                  secure and timely delivery to your doorstep.
                </p>
              </div>
            </div>

            <div>
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-10 h-10 rounded-full bg-champagne/10 flex items-center justify-center">
                  <Globe className="w-5 h-5 text-champagne" />
                </div>
                <h2 className="text-2xl font-serif tracking-wide">International Delivery</h2>
              </div>
              <p className="text-sm text-foreground/70 leading-loose mb-4">
                Mairii ships to select countries worldwide. International shipping 
                fees and delivery times vary by destination. Please note that customs 
                duties and taxes are the responsibility of the recipient.
              </p>
              <ul className="text-xs space-y-2 text-foreground/60 italic">
                <li>• North America: 7-10 Business Days</li>
                <li>• Europe & UK: 5-8 Business Days</li>
                <li>• Middle East: 3-5 Business Days</li>
              </ul>
            </div>
          </motion.div>

          {/* Returns Policy */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-12"
          >
            <div>
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-10 h-10 rounded-full bg-champagne/10 flex items-center justify-center">
                  <RefreshCw className="w-5 h-5 text-champagne" />
                </div>
                <h2 className="text-2xl font-serif tracking-wide">Returns & Exchanges</h2>
              </div>
              <div className="space-y-6 text-sm text-foreground/70 leading-loose">
                <p>
                  <strong className="text-foreground font-semibold">14-Day Return Window:</strong> If for any reason you are not 
                  completely satisfied with your purchase, you may return it within 
                  14 days of receipt for an exchange or a full refund.
                </p>
                <p>
                  <strong className="text-foreground font-semibold">Conditions for Return:</strong> Pieces must be in their original, 
                  unworn condition, accompanied by all original packaging, 
                  certificates, and proof of purchase.
                </p>
                <p>
                  <strong className="text-foreground font-semibold">Exclusions:</strong> Please note that custom-made or personalized 
                  items, and pieces that have been altered, are final sale and 
                  cannot be returned or exchanged.
                </p>
              </div>
            </div>

            <div>
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-10 h-10 rounded-full bg-champagne/10 flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5 text-champagne" />
                </div>
                <h2 className="text-2xl font-serif tracking-wide">Security & Insurance</h2>
              </div>
              <p className="text-sm text-foreground/70 leading-loose">
                Every shipment from Mairii is fully insured against loss or damage 
                during transit. Your signature is required upon delivery for all 
                orders, ensuring your treasure reaches only your hands.
              </p>
            </div>
          </motion.div>

        </div>
      </section>

      {/* Support CTA */}
      <section className="py-20 bg-foreground text-white text-center">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-serif mb-6">Need Further Assistance?</h2>
          <p className="text-white/60 mb-10 max-w-xl mx-auto text-sm leading-relaxed">
            Our concierge team is available to assist you with any questions 
            regarding your shipment or return request.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href="mailto:concierge@Mairii.com" className="px-8 py-3 bg-champagne text-white text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-white hover:text-foreground transition-all duration-300">
              Email Support
            </a>
            <a href="tel:+919876543210" className="px-8 py-3 border border-white/20 text-white text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-white hover:text-foreground transition-all duration-300">
              Call Us
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default ShippingReturns;

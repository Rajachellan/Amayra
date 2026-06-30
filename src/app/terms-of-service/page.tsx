"use client";

import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { motion } from "framer-motion";
import { PageBanner } from "@/components/layout/PageBanner";

const TermsOfService = () => {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <PageBanner 
        title="Terms of Service"
        subtitle="Legal"
        image="/images/banner1.jpg"
        height="h-[65vh]"
      />

      <section className="pb-24 container mx-auto px-6 max-w-4xl pt-20">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="prose prose-stone max-w-none space-y-12 text-foreground/80 leading-relaxed"
        >
          <section>
            <h2 className="text-2xl font-serif text-foreground mb-6">1. Agreement to Terms</h2>
            <p>
              By accessing or using the Mairii website, you agree to be bound by these 
              Terms of Service and all applicable laws and regulations. If you do 
              not agree with any of these terms, you are prohibited from using or 
              accessing this site.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-serif text-foreground mb-6">2. Use License</h2>
            <p>
              Permission is granted to temporarily download one copy of the materials 
              (information or software) on Mairii's website for personal, non-commercial 
              transitory viewing only.
            </p>
            <p className="mt-4">This license shall automatically terminate if you violate any of these restrictions and may be terminated by Mairii at any time.</p>
          </section>

          <section>
            <h2 className="text-2xl font-serif text-foreground mb-6">3. Product Accuracy</h2>
            <p>
              The products displayed on our website are handcrafted, and as such, 
              there may be slight variations in stone weights, metal weights, and 
              visual appearance compared to the images shown. We strive to provide 
              the most accurate information possible, but we do not warrant that 
              product descriptions or other content are error-free.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-serif text-foreground mb-6">4. Pricing and Payment</h2>
            <p>
              Prices for our products are subject to change without notice. We 
              reserve the right at any time to modify or discontinue the Service 
              (or any part or content thereof) without notice at any time.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-serif text-foreground mb-6">5. Limitations</h2>
            <p>
              In no event shall Mairii or its suppliers be liable for any damages 
              (including, without limitation, damages for loss of data or profit, 
              or due to business interruption) arising out of the use or inability 
              to use the materials on Mairii's website.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-serif text-foreground mb-6">6. Governing Law</h2>
            <p>
              These terms and conditions are governed by and construed in accordance 
              with the laws of Mumbai, India and you irrevocably submit to the 
              exclusive jurisdiction of the courts in that State or location.
            </p>
          </section>

          <div className="pt-12 border-t border-foreground/10 text-sm italic">
            If you have any questions about these Terms, please contact us at <a href="mailto:legal@Mairii.com" className="text-champagne underline">legal@Mairii.com</a>.
          </div>
        </motion.div>
      </section>

      <Footer />
    </main>
  );
};

export default TermsOfService;

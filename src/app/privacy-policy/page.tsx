"use client";

import React from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Lock, Eye, FileText, Database, ShieldCheck, UserCheck } from "lucide-react";

const policies = [
  {
    icon: <Database className="w-6 h-6 stroke-[1]" />,
    title: "Information We Collect",
    content: "We collect personal information such as your name, contact details, and shipping address when you make a purchase or register an account. We also collect browsing data to improve your experience."
  },
  {
    icon: <Eye className="w-6 h-6 stroke-[1]" />,
    title: "How We Use Information",
    content: "Your data is used solely for order processing, customer support, and, with your consent, sending exclusive collection previews. We never sell your data to third-party markters."
  },
  {
    icon: <ShieldCheck className="w-6 h-6 stroke-[1]" />,
    title: "Data Protection & Security",
    content: "We employ industry-standard SSL encryption and secure payment gateways (PCI DSS compliant) to ensure your sensitive financial information remains protected."
  },
  {
    icon: <FileText className="w-6 h-6 stroke-[1]" />,
    title: "Cookies Policy",
    content: "Our website uses cookies to remember your preferences (like your wishlist) and provide a personalized experience. You can manage cookie settings in your browser at any time."
  },
  {
    icon: <Lock className="w-6 h-6 stroke-[1]" />,
    title: "Third-Party Services",
    content: "We may share data with trusted logistics partners (like BlueDart or FedEx) solely for delivery purposes. These partners are bound by strict confidentiality agreements."
  },
  {
    icon: <UserCheck className="w-6 h-6 stroke-[1]" />,
    title: "User Rights",
    content: "You have the right to access, correct, or delete your personal data. To exercise these rights, please contact our Data Protection Officer at privacy@shreeaarna.com."
  }
];

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />

      <section className="pt-40 pb-24">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center mb-24"
            >
              <div className="w-16 h-16 bg-champagne/10 rounded-full flex items-center justify-center mx-auto mb-8">
                <Lock className="w-8 h-8 text-champagne stroke-[1]" />
              </div>
              <h1 className="text-5xl font-serif mb-6">Privacy Policy</h1>
              <p className="text-foreground/40 text-[10px] uppercase tracking-[0.5em]">LAST UPDATED: APRIL 2026</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {policies.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="p-10 bg-pearl/30 border border-white hover:border-champagne/30 transition-all duration-700"
                >
                  <div className="text-champagne mb-8">{item.icon}</div>
                  <h3 className="text-xl font-serif mb-4 italic">{item.title}</h3>
                  <p className="text-sm font-light text-foreground/50 leading-loose">
                    {item.content}
                  </p>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="mt-20 p-12 bg-champagne/5 border-l border-champagne text-center"
            >
              <p className="text-foreground/60 font-light italic mb-6">
                {"“Your trust is the most precious jewel we hold.”"}
              </p>
              <button className="text-[10px] uppercase tracking-widest font-semibold text-champagne border-b border-champagne pb-1">
                Contact Data Officer
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

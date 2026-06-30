"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { 
  Phone, 
  Mail, 
  Clock, 
  MapPin, 
  MessageCircle, 
  ChevronRight,
  Send,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import { api } from "@/lib/api/index";

const STORES = [
  {
    name: "DLF Promenade",
    address: "Mairii, Shop No. FBC 232, First Floor, DLF Promenade, Plot No. 3, Nelson Mandela Marg, Vasant Kunj, New Delhi 110070",
    contact: "+91 9110 540 540"
  },
  {
    name: "DLF Mall of India",
    address: "Shop No. S-45, First Floor, DLF Mall of India, Sector-18, Noida, Uttar Pradesh 201301",
    contact: "+91 120 1234567"
  },
  {
    name: "Palladium Mall",
    address: "Mairii Jewels - Shop No. 11-B, First Floor, Palladium Mall, Sarkhej-Gandhinagar Highway, Thaltej, Ahmedabad, Gujarat 380054",
    contact: "+91 79 12345678"
  },
  {
    name: "Phoenix Marketcity",
    address: "Mairii Phoenix Marketcity, Unit No. G-17, Ground Floor, Phoenix Marketcity Mall, LBS Marg, Kurla West, Mumbai 400070",
    contact: "+91 22 12345678"
  }
];

const SUPPORT_CHANNELS = [
  {
    title: "Online Booking & Custom Styling",
    whatsapp: "+91 9110 540 540",
    hours: "Available Mon - Sat, 10 AM to 7 PM"
  },
  {
    title: "Marketing, PR & Media",
    whatsapp: "+91 9876 543 210",
    hours: "Available Mon - Fri, 11 AM to 6 PM"
  },
  {
    title: "Wedding Trousseau & Bulk Orders",
    whatsapp: "+91 9988 776 655",
    hours: "Available Daily, 10 AM to 8 PM"
  }
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [err, setErr] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setErr("Please fill out all required fields.");
      return;
    }

    setStatus("submitting");
    setErr("");

    try {
      await api("/leads", {
        method: "POST",
        body: JSON.stringify({ ...form, source: "contact_page" }),
      });
      setStatus("success");
      setForm({ name: "", email: "", phone: "", message: "" });
    } catch (error) {
      setStatus("error");
      setErr(error instanceof Error ? error.message : "Failed to send message. Please try again later.");
    }
  }

  return (
    <main className="bg-white selection:bg-champagne/30">
      <Navbar/>
      {/* 1. Hero Experience */}
      <section className="relative h-[80vh] min-h-[600px] w-full overflow-hidden">
        <Image
          src="/images/woman-wears-gold-sari-with-green-gold-jewelry.jpg"
          alt="Contact Mairii"
          fill
          priority
          sizes="100vw"
          className="object-cover brightness-75 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
        
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="space-y-4"
          >
            <span className="text-champagne uppercase tracking-[0.6em] text-[10px] md:text-xs font-bold block mb-4">
              Connect with Excellence
            </span>
            <h1 className="text-white text-5xl md:text-7xl lg:text-8xl font-serif leading-tight">
              Hello.... <br />
              <span className="italic font-light opacity-90">Sunte Ho??</span>
            </h1>
          </motion.div>
        </div>
      </section>

      {/* 2. Primary Contact & Issues */}
      <section className="py-24 border-b border-stone-100">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl"
            >
              <Image
                src="/images/hand_work.jpg" // Using existing craftsmanship image
                alt="Mairii Craftsmanship"
                fill
                className="object-cover"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <span className="text-champagne uppercase tracking-[0.4em] text-[10px] font-bold block mb-2">
                  Customer Care
                </span>
                <h2 className="text-4xl font-serif text-stone-900">Facing Issues?</h2>
              </div>
              
              <p className="text-stone-600 leading-relaxed font-light text-lg">
                Our support team is available <span className="font-semibold text-stone-900">Monday to Friday, 10 AM to 6 PM</span>. 
                Whether you have a question about our collections or an existing order, we're here to provide clarity.
              </p>

              <div className="space-y-4 pt-4">
                <div className="flex items-center gap-4 text-stone-800">
                  <div className="w-10 h-10 rounded-full bg-champagne/10 flex items-center justify-center">
                    <Mail className="w-5 h-5 text-champagne" />
                  </div>
                  <span className="text-sm font-medium tracking-wide">concierge@Mairiijewels.com</span>
                </div>
                <div className="flex items-center gap-4 text-stone-800">
                  <div className="w-10 h-10 rounded-full bg-champagne/10 flex items-center justify-center">
                    <Phone className="w-5 h-5 text-champagne" />
                  </div>
                  <span className="text-sm font-medium tracking-wide">+91 9110 540 540</span>
                </div>
              </div>

              <div className="pt-6">
                <button className="px-8 py-4 bg-stone-900 text-white text-[10px] uppercase tracking-[0.3em] font-bold rounded-full hover:bg-champagne hover:text-white transition-all duration-500 shadow-xl">
                  Order Status & Tracking
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. Our Ateliers */}
      <section className="py-24 bg-stone-50">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-2xl mx-auto mb-16">
            <h2 className="text-4xl font-serif text-stone-900 mb-4 uppercase tracking-widest">Our Stores</h2>
            <div className="h-px w-24 bg-champagne mx-auto mb-6" />
            <p className="text-stone-500 text-xs uppercase tracking-[0.3em]">Visit us at our physical luxury boutiques</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {STORES.map((store, i) => (
              <motion.div
                key={store.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-8 rounded-2xl border border-stone-100 shadow-sm hover:shadow-xl transition-all duration-500"
              >
                <h3 className="font-serif text-xl text-stone-900 mb-4">{store.name}</h3>
                <p className="text-stone-500 text-xs leading-relaxed mb-6 line-clamp-4 uppercase tracking-wider">
                  {store.address}
                </p>
                <div className="flex items-center justify-center gap-2 text-champagne text-[10px] font-bold tracking-widest pt-4 border-t border-stone-50">
                  <Phone className="w-3 h-3" />
                  <span>{store.contact}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Specialised Support */}
      <section className="py-24 overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-10 lg:order-1 order-2"
            >
              <div>
                <h2 className="text-4xl font-serif text-stone-900 uppercase tracking-widest">Specialised Support</h2>
                <p className="text-stone-500 mt-2 text-xs uppercase tracking-[0.2em]">Dedicated channels for your unique requirements</p>
              </div>

              <div className="space-y-8">
                {SUPPORT_CHANNELS.map((channel, i) => (
                  <div key={i} className="group cursor-pointer">
                    <h3 className="font-serif text-lg text-stone-800 mb-1 group-hover:text-champagne transition-colors">{channel.title}</h3>
                    <p className="text-stone-400 text-[10px] uppercase tracking-widest mb-3">{channel.hours}</p>
                    <div className="flex items-center gap-3 text-stone-900 font-bold text-sm tracking-widest">
                      <MessageCircle className="w-4 h-4 text-emerald-500 fill-emerald-500/20" />
                      <span>{channel.whatsapp}</span>
                      <ChevronRight className="w-4 h-4 text-stone-300 group-hover:translate-x-2 transition-transform" />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative aspect-square rounded-2xl overflow-hidden shadow-2xl lg:order-2 order-1"
            >
              <Image
                src="/images/jewels-banner.jpg" // Using existing support image
                alt="Styling Support"
                fill
                className="object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* 5. Contact Form */}
      <section className="py-24 bg-stone-900 text-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-serif mb-4 uppercase tracking-widest">Leave a Message</h2>
              <p className="text-white/40 text-xs uppercase tracking-[0.4em]">Our concierge will respond within 24 hours</p>
            </div>

            <div className="bg-white/5 backdrop-blur-xl rounded-[32px] p-8 md:p-16 border border-white/10 shadow-2xl">
              {status === "success" ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12 space-y-6"
                >
                  <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-10 h-10 text-emerald-500" />
                  </div>
                  <h3 className="text-2xl font-serif">Inquiry Received</h3>
                  <p className="text-white/60 max-w-md mx-auto text-sm leading-relaxed uppercase tracking-widest">
                    Your interest in Mairii has been recorded. Our team is reviewing your message and will reach out shortly.
                  </p>
                  <button
                    onClick={() => setStatus("idle")}
                    className="mt-8 px-10 py-4 bg-white text-stone-900 text-[10px] uppercase tracking-[0.4em] font-bold rounded-full hover:bg-champagne hover:text-white transition-all duration-500"
                  >
                    New Message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-10">
                  <div className="grid md:grid-cols-2 gap-10">
                    <div className="relative group">
                      <label className="text-[10px] uppercase tracking-[0.3em] font-bold text-white/40 block mb-3 group-focus-within:text-champagne transition-colors">Full Name *</label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="w-full bg-transparent border-b border-white/10 py-3 focus:outline-none focus:border-champagne transition-colors text-sm tracking-widest uppercase"
                      />
                    </div>
                    <div className="relative group">
                      <label className="text-[10px] uppercase tracking-[0.3em] font-bold text-white/40 block mb-3 group-focus-within:text-champagne transition-colors">Email Address *</label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full bg-transparent border-b border-white/10 py-3 focus:outline-none focus:border-champagne transition-colors text-sm tracking-widest uppercase"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-10">
                    <div className="relative group">
                      <label className="text-[10px] uppercase tracking-[0.3em] font-bold text-white/40 block mb-3 group-focus-within:text-champagne transition-colors">WhatsApp Number</label>
                      <input
                        type="tel"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className="w-full bg-transparent border-b border-white/10 py-3 focus:outline-none focus:border-champagne transition-colors text-sm tracking-widest uppercase"
                      />
                    </div>
                    <div className="relative group">
                      <label className="text-[10px] uppercase tracking-[0.3em] font-bold text-white/40 block mb-3 group-focus-within:text-champagne transition-colors">Subject</label>
                      <select className="w-full bg-transparent border-b border-white/10 py-3 focus:outline-none focus:border-champagne transition-colors text-sm tracking-widest uppercase appearance-none cursor-pointer">
                        <option value="general" className="bg-stone-900">General Inquiry</option>
                        <option value="styling" className="bg-stone-900">Personal Styling</option>
                        <option value="order" className="bg-stone-900">Order Assistance</option>
                        <option value="bulk" className="bg-stone-900">Bulk & Corporate</option>
                      </select>
                    </div>
                  </div>

                  <div className="relative group">
                    <label className="text-[10px] uppercase tracking-[0.3em] font-bold text-white/40 block mb-3 group-focus-within:text-champagne transition-colors">Your Message *</label>
                    <textarea
                      required
                      rows={4}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full bg-transparent border-b border-white/10 py-3 focus:outline-none focus:border-champagne transition-colors text-sm tracking-widest uppercase resize-none"
                    />
                  </div>

                  {err && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="flex items-center gap-3 text-red-400 text-[10px] uppercase tracking-widest"
                    >
                      <AlertCircle className="w-4 h-4" />
                      <span>{err}</span>
                    </motion.div>
                  )}

                  <div className="flex justify-center pt-6">
                    <button
                      type="submit"
                      disabled={status === "submitting"}
                      className="group flex items-center gap-4 px-14 py-5 bg-white text-stone-900 text-[11px] uppercase tracking-[0.4em] font-bold rounded-full hover:bg-champagne hover:text-white transition-all duration-500 shadow-[0_20px_50px_rgba(0,0,0,0.3)] disabled:opacity-50"
                    >
                      {status === "submitting" ? "Sending..." : (
                        <>
                          <span>Submit Inquiry</span>
                          <Send className="w-4 h-4 group-hover:translate-x-2 group-hover:-translate-y-1 transition-transform" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
      <Footer/>
    </main>
  );
}


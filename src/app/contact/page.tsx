"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
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
  AlertCircle,
  Sparkles,
  HeartHandshake
} from "lucide-react";
import { api } from "@/lib/api/index";

const STORES = [
  {
    name: "DLF Promenade",
    city: "New Delhi",
    address: "MaiRii, Shop No. FBC 232, First Floor, DLF Promenade, Plot No. 3, Nelson Mandela Marg, Vasant Kunj, New Delhi 110070",
    contact: "+91 9110 540 540"
  },
  {
    name: "DLF Mall of India",
    city: "Noida",
    address: "Shop No. S-45, First Floor, DLF Mall of India, Sector-18, Noida, Uttar Pradesh 201301",
    contact: "+91 120 1234567"
  },
  {
    name: "Palladium Mall",
    city: "Ahmedabad",
    address: "MaiRii Jewels - Shop No. 11-B, First Floor, Palladium Mall, SG Highway, Thaltej, Ahmedabad 380054",
    contact: "+91 79 12345678"
  },
  {
    name: "Phoenix Marketcity",
    city: "Mumbai",
    address: "MaiRii Phoenix Marketcity, Unit No. G-17, Ground Floor, Phoenix Marketcity Mall, LBS Marg, Kurla West, Mumbai 400070",
    contact: "+91 22 12345678"
  }
];

const SUPPORT_CHANNELS = [
  {
    title: "Online Booking & Custom Styling",
    whatsapp: "+91 9110 540 540",
    hours: "Available Mon - Sat, 10 AM to 7 PM IST",
    desc: "Personalized styling advice for your occasion or bridal trousseau."
  },
  {
    title: "Marketing, PR & Media Enquiries",
    whatsapp: "+91 9876 543 210",
    hours: "Available Mon - Fri, 11 AM to 6 PM IST",
    desc: "Collaborations, editorial loans, and brand partnerships."
  },
  {
    title: "Wedding Trousseau & Bulk Orders",
    whatsapp: "+91 9988 776 655",
    hours: "Available Daily, 10 AM to 8 PM IST",
    desc: "Dedicated concierge for custom bridal packages and gift sets."
  }
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "general", message: "" });
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
      setForm({ name: "", email: "", phone: "", subject: "general", message: "" });
    } catch (error) {
      setStatus("error");
      setErr(error instanceof Error ? error.message : "Failed to send message. Please try again later.");
    }
  }

  return (
    <main className="min-h-screen bg-[#FAF8F3] selection:bg-[#C4A064]/30 overflow-x-hidden">
      <Navbar />

      {/* 1. Hero Experience */}
      <section className="relative h-[75vh] min-h-[620px] w-full overflow-hidden bg-stone-950">
        <Image
          src="/images/optimized/banner (1).png"
          alt="Contact MaiRii Luxury Concierge"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_35%] brightness-65 scale-105"
         
        />
        {/* <div className="absolute inset-0 bg-gradient-to-b from-stone-950/70 via-stone-950/40 to-[#FAF8F3]" /> */}

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 pt-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="space-y-6 max-w-3xl"
          >
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#C4A064]/20 border border-[#C4A064]/40 backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span className="text-amber-300 uppercase tracking-[0.4em] text-[10px] font-bold">
                At Your Service
              </span>
            </div>

            <h1 className="text-white text-4xl sm:text-6xl lg:text-7xl font-serif leading-tight">
              Connect With <br />
              <span className="italic font-light text-amber-300">MaiRii Concierge</span>
            </h1>

            <p className="text-stone-300 font-serif text-sm sm:text-base font-light tracking-wide max-w-xl mx-auto">
              Whether you seek personal styling guidance, boutique locations, or order assistance, our dedicated team is at your service.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. Quick Contact Stats & Direct Care */}
      <section className="container mx-auto px-6 -mt-12 relative z-30 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="p-8 rounded-2xl bg-white border border-[#C4A064]/20 shadow-xl flex items-start gap-5 hover:border-[#C4A064] transition-all"
          >
            <div className="w-12 h-12 rounded-full bg-[#FAF8F3] text-[#C4A064] flex items-center justify-center shrink-0 border border-[#C4A064]/20 shadow-inner">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[9px] uppercase tracking-[0.3em] font-bold text-[#C4A064] block mb-1">Email Concierge</span>
              <p className="text-base font-serif text-[#2B2B2B] font-medium">connect@mairiijewels.com</p>
              <p className="text-xs text-[#666666] font-light mt-1">24h response time guaranteed</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="p-8 rounded-2xl bg-white border border-[#C4A064]/20 shadow-xl flex items-start gap-5 hover:border-[#C4A064] transition-all"
          >
            <div className="w-12 h-12 rounded-full bg-[#FAF8F3] text-[#C4A064] flex items-center justify-center shrink-0 border border-[#C4A064]/20 shadow-inner">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[9px] uppercase tracking-[0.3em] font-bold text-[#C4A064] block mb-1">Direct Phone Support</span>
              <p className="text-base font-serif text-[#2B2B2B] font-medium">+91 9566571655</p>
              <p className="text-xs text-[#666666] font-light mt-1">Mon - Sat, 10 AM to 7 PM IST</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="p-8 rounded-2xl bg-white border border-[#C4A064]/20 shadow-xl flex items-start gap-5 hover:border-[#C4A064] transition-all"
          >
            <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-200 shadow-inner">
              <MessageCircle className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[9px] uppercase tracking-[0.3em] font-bold text-emerald-700 block mb-1">Instant WhatsApp</span>
              <p className="text-base font-serif text-[#2B2B2B] font-medium">+91 9566571655</p>
              <p className="text-xs text-[#666666] font-light mt-1">Instant bridal & order styling</p>
            </div>
          </motion.div>

        </div>
      </section>

      {/* 3. Primary Customer Care Spotlight */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-12 items-center bg-white rounded-3xl border border-[#C4A064]/20 shadow-xl overflow-hidden p-8 md:p-12">

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-6 relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg border border-stone-200"
          >
            <Image
              src="/images/hand_work.jpg"
              alt="MaiRii Customer Support Atelier"
              fill
              className="object-cover hover:scale-105 transition-transform duration-1000"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-white p-4 rounded-xl bg-stone-900/60 backdrop-blur-md border border-white/20">
              <p className="font-serif italic text-sm text-amber-200">
                &ldquo;Every question is answered with patient care and devotion to craft.&rdquo;
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-6 space-y-6"
          >
            <div>
              <span className="text-[#C4A064] uppercase tracking-[0.4em] text-[10px] font-bold block mb-2">
                CUSTOMER ASSISTANCE
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif text-[#2B2B2B] leading-tight">
                How Can We Help You Today?
              </h2>
            </div>

            <p className="text-[#555555] leading-relaxed font-serif text-base md:text-lg font-light">
              Our dedicated support concierge is available <span className="font-semibold text-[#2B2B2B]">Monday through Saturday</span> to assist with product inquiries, order tracking, custom sizing, and gift options.
            </p>

            <div className="p-6 rounded-xl bg-[#FAF8F3] border border-[#C4A064]/20 space-y-4">
              <div className="flex items-center gap-3 text-[#2B2B2B]">
                <Clock className="w-4 h-4 text-[#C4A064]" />
                <span className="text-xs uppercase tracking-widest font-bold">Standard Support Hours</span>
              </div>
              <p className="text-xs text-[#666666] font-serif leading-relaxed">
                Monday &ndash; Saturday: 10:00 AM &ndash; 7:00 PM IST <br />
                Sunday: Closed (WhatsApp messages returned next business day)
              </p>
            </div>

            <div className="pt-2 flex flex-wrap gap-4">
              <Link
                href="/profile"
                className="px-8 py-3.5 bg-[#2C2A28] text-white text-[10px] uppercase tracking-[0.3em] font-bold rounded-full hover:bg-[#C4A064] transition-all duration-300 shadow-md"
              >
                Track Your Order
              </Link>
              <a
                href="https://wa.me/9566571655"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3.5 border border-[#C4A064] text-[#2B2B2B] hover:text-[#A37F43] text-[10px] uppercase tracking-[0.3em] font-bold rounded-full hover:bg-[#C4A064]/10 transition-all duration-300"
              >
                Chat On WhatsApp
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 4. Luxury Boutiques & Flagship Locations */}
      {/* <section className="py-24 bg-white border-y border-stone-200">
        <div className="container mx-auto px-6 max-w-7xl text-center">
          <div className="max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-[#C4A064] block">
              PHYSICAL STORES
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif text-[#2B2B2B]">Visit Our Boutiques</h2>
            <div className="h-px w-24 bg-[#C4A064] mx-auto" />
            <p className="text-[#666666] text-xs font-serif italic">Experience MaiRii craftsmanship in person at our flagship locations.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 text-left">
            {STORES.map((store, i) => (
              <motion.div
                key={store.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-[#FAF8F3] p-8 rounded-2xl border border-[#C4A064]/20 hover:border-[#C4A064] shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full bg-[#C4A064]/10 text-[#A37F43] text-[9px] uppercase tracking-widest font-bold">
                      {store.city}
                    </span>
                    <MapPin className="w-4 h-4 text-[#C4A064]" />
                  </div>

                  <h3 className="font-serif text-xl text-[#2B2B2B] font-medium">{store.name}</h3>

                  <p className="text-[#666666] text-xs leading-relaxed font-serif">
                    {store.address}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-[#C4A064]/20 flex items-center justify-between text-[#C4A064]">
                  <span className="text-[10px] font-bold tracking-widest">{store.contact}</span>
                  <ChevronRight className="w-4 h-4 text-[#C4A064]" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section> */}

      {/* 5. Specialised Support Channels */}
      {/* <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-12 items-center">

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7 space-y-8"
          >
            <div>
              <span className="text-[#C4A064] uppercase tracking-[0.4em] text-[10px] font-bold block mb-2">
                DEDICATED CONCIERGE
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif text-[#2B2B2B]">Specialized Support Channels</h2>
            </div>

            <div className="space-y-6">
              {SUPPORT_CHANNELS.map((channel, i) => (
                <div key={i} className="p-6 rounded-2xl bg-white border border-[#C4A064]/20 hover:border-[#C4A064] transition-all shadow-sm group">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h3 className="font-serif text-lg text-[#2B2B2B] group-hover:text-[#A37F43] transition-colors">{channel.title}</h3>
                      <p className="text-xs text-[#666666] font-serif font-light mt-1">{channel.desc}</p>
                      <p className="text-[#C4A064] text-[9px] uppercase tracking-widest font-bold mt-2">{channel.hours}</p>
                    </div>

                    <a
                      href={`https://wa.me/${channel.whatsapp.replace(/[^0-9]/g, "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-emerald-50 hover:bg-emerald-600 text-emerald-700 hover:text-white transition-all duration-300 text-xs font-bold shrink-0"
                    >
                      <MessageCircle className="w-4 h-4 fill-current" />
                      <span>{channel.whatsapp}</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="lg:col-span-5 relative aspect-square rounded-3xl overflow-hidden shadow-2xl border border-[#C4A064]/30"
          >
            <Image
              src="/images/jewels-banner.jpg"
              alt="MaiRii Bridal Styling"
              fill
              className="object-cover hover:scale-105 transition-transform duration-1000"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-8 left-8 right-8 text-white p-6 rounded-2xl bg-stone-950/70 backdrop-blur-md border border-white/20">
              <span className="text-amber-300 uppercase text-[9px] font-bold tracking-[0.3em] block mb-1">Bridal Consultation</span>
              <p className="font-serif italic text-sm text-stone-200">
                Book a private styling appointment with our master consultants for your wedding trousseau.
              </p>
            </div>
          </motion.div>
        </div>
      </section> */}

      {/* 6. Luxury Glass Contact Form */}
      <section className="py-24 bg-gradient-to-r from-[#2C2A28] via-[#3B3732] to-[#2C2A28] text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#C4A064] via-amber-300 to-[#C4A064]" />

        <div className="container mx-auto px-6 max-w-4xl relative z-10">
          <div className="text-center mb-16 space-y-4">
            <span className="text-amber-300 uppercase tracking-[0.4em] text-[10px] font-bold block">
              LEAVE A MESSAGE
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif text-white">Send Us An Enquiry</h2>
            <p className="text-stone-300 text-xs font-serif tracking-widest uppercase">Our concierge will review and reply within 24 hours.</p>
          </div>

          <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 md:p-14 border border-white/15 shadow-2xl">
            {status === "success" ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12 space-y-6"
              >
                <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto border border-emerald-400">
                  <CheckCircle2 className="w-10 h-10 text-emerald-400" />
                </div>
                <h3 className="text-3xl font-serif text-white">Enquiry Received</h3>
                <p className="text-stone-300 max-w-md mx-auto text-sm leading-relaxed font-serif">
                  Thank you for reaching out to MaiRii. Your message has been assigned to our concierge team and we will be in touch shortly.
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="mt-6 px-10 py-3.5 bg-[#C4A064] text-stone-950 text-[10px] uppercase tracking-[0.3em] font-bold rounded-full hover:bg-amber-300 transition-all duration-300 shadow-lg"
                >
                  Send Another Message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="relative group">
                    <label className="text-[10px] uppercase tracking-[0.3em] font-bold text-stone-400 block mb-2 group-focus-within:text-amber-300 transition-colors">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Bandana Sharma"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder:text-stone-500 focus:outline-none focus:border-amber-300 transition-colors font-serif"
                    />
                  </div>

                  <div className="relative group">
                    <label className="text-[10px] uppercase tracking-[0.3em] font-bold text-stone-400 block mb-2 group-focus-within:text-amber-300 transition-colors">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. name@example.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder:text-stone-500 focus:outline-none focus:border-amber-300 transition-colors font-serif"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div className="relative group">
                    <label className="text-[10px] uppercase tracking-[0.3em] font-bold text-stone-400 block mb-2 group-focus-within:text-amber-300 transition-colors">
                      WhatsApp Phone Number
                    </label>
                    <input
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder:text-stone-500 focus:outline-none focus:border-amber-300 transition-colors font-serif"
                    />
                  </div>

                  <div className="relative group">
                    <label className="text-[10px] uppercase tracking-[0.3em] font-bold text-stone-400 block mb-2 group-focus-within:text-amber-300 transition-colors">
                      Inquiry Category
                    </label>
                    <select
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      className="w-full bg-stone-900 border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:border-amber-300 transition-colors font-serif cursor-pointer"
                    >
                      <option value="general">General & Order Inquiry</option>
                      <option value="styling">Personal & Bridal Styling</option>
                      <option value="store">Store Location Appointment</option>
                      <option value="bulk">Wedding & Corporate Bulk Orders</option>
                    </select>
                  </div>
                </div>

                <div className="relative group">
                  <label className="text-[10px] uppercase tracking-[0.3em] font-bold text-stone-400 block mb-2 group-focus-within:text-amber-300 transition-colors">
                    Your Message *
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Tell us about your requirements or questions..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-sm text-white placeholder:text-stone-500 focus:outline-none focus:border-amber-300 transition-colors font-serif resize-none"
                  />
                </div>

                {err && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="flex items-center gap-3 text-red-400 text-xs font-serif"
                  >
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{err}</span>
                  </motion.div>
                )}

                <div className="flex justify-center pt-4">
                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="group flex items-center gap-4 px-12 py-4 bg-[#C4A064] text-stone-950 text-[10px] uppercase tracking-[0.3em] font-bold rounded-full hover:bg-amber-300 transition-all duration-300 shadow-xl disabled:opacity-50"
                  >
                    {status === "submitting" ? (
                      "Sending Message..."
                    ) : (
                      <>
                        <span>Send Message</span>
                        <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

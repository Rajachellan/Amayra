"use client";

import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { motion } from "framer-motion";
import { MapPin, Phone, Clock, Navigation } from "lucide-react";
import Image from "next/image";
import { PageBanner } from "@/components/layout/PageBanner";

const StoreLocator = () => {
  const stores = [
    {
      city: "Mumbai",
      name: "MaiRii Flagship Atelier",
      address: "123 Diamond Avenue, Jewellery Park, Mumbai, MH – 400001",
      phone: "+91 98765 43210",
      hours: "Mon - Sat: 11:00 AM - 8:00 PM",
      image: "/images/luxury/neckles.jpg"
    },
    {
      city: "New Delhi",
      name: "The Imperial Collection",
      address: "45 Regent Square, Chanakyapuri, New Delhi – 110021",
      phone: "+91 98110 12345",
      hours: "Mon - Sun: 10:30 AM - 7:30 PM",
      image: "/images/luxury/bangles_1.jpg"
    },
    {
      city: "Hyderabad",
      name: "Banjara Hills Boutique",
      address: "8-2-293/K/31, Road No. 12, Banjara Hills, Hyderabad – 500034",
      phone: "+91 40 1234 5678",
      hours: "Tue - Sun: 11:00 AM - 8:00 PM",
      image: "/images/luxury/jumka.jpg"
    }
  ];

  return (
    <main className="min-h-screen bg-[#FDFBF9]">
      <Navbar />

      <PageBanner 
        title="Our Boutiques"
        subtitle="Visit Us"
        image="/images/luxury/pexels-nirav-jani-1955297-20736197.jpg"
        height="h-[60vh]"
      />

      <section className="py-20 container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-2xl">
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex items-center gap-4 text-xs tracking-widest uppercase text-foreground/50"
          >
            <span className="w-8 h-px bg-foreground/20" />
            <span>3 Global Locations</span>
          </motion.div>
        </div>
      </div>

        {/* Mock Map / Hero Image */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 1 }}
          className="relative h-[400px] md:h-[500px] w-full rounded-sm overflow-hidden mb-24 shadow-xl"
        >
          <Image
            src="/images/luxury/pexels-theamritdev-36523473.jpg"
            alt="Store Locations Map"
            fill
            className="object-cover transition-all duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-10 left-10 text-white">
            <p className="text-sm tracking-widest uppercase mb-2">Exclusive Experience</p>
            <h2 className="text-3xl font-serif">Private Consultations Available</h2>
          </div>
        </motion.div>

        {/* Store List */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-24">
          {stores.map((store, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group bg-white border border-foreground/5 p-8 hover:shadow-2xl transition-all duration-500"
            >
              <div className="relative h-48 w-full mb-8 overflow-hidden transition-all duration-700">
                <Image
                  src={store.image}
                  alt={store.name}
                  fill
                  className="object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4 px-3 py-1 bg-white text-[9px] tracking-widest uppercase font-bold text-foreground">
                  {store.city}
                </div>
              </div>

              <h3 className="text-xl font-serif mb-6 group-hover:text-champagne transition-colors">{store.name}</h3>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-champagne shrink-0 mt-0.5" />
                  <p className="text-xs text-foreground/70 leading-relaxed">{store.address}</p>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-champagne shrink-0" />
                  <p className="text-xs text-foreground/70">{store.phone}</p>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-champagne shrink-0" />
                  <p className="text-xs text-foreground/70">{store.hours}</p>
                </div>
              </div>

              <button className="w-full py-3.5 border border-foreground/10 text-[10px] tracking-[0.2em] uppercase font-bold flex items-center justify-center gap-2 group-hover:bg-foreground group-hover:text-white transition-all duration-300">
                <Navigation className="w-3 h-3" />
                Get Directions
              </button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Appointment CTA */}
      <section className="py-24 bg-white text-center border-t border-foreground/5">
        <div className="container mx-auto px-6">
          <span className="text-[10px] tracking-[0.4em] uppercase text-champagne font-bold mb-4 block">Personalized Service</span>
          <h2 className="text-3xl md:text-5xl font-serif mb-8 italic">Experience MaiRii in person</h2>
          <p className="text-foreground/50 max-w-xl mx-auto text-sm leading-relaxed mb-10">
            Book a private appointment at any of our boutiques for a curated 
            consultation with our jewellery experts.
          </p>
          <button className="px-12 py-4 bg-champagne text-white text-[10px] uppercase tracking-[0.3em] font-bold hover:shadow-xl hover:shadow-champagne/20 transition-all duration-300">
            Book an Appointment
          </button>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default StoreLocator;

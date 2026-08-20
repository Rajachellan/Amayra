"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const techniques = [
  {
    title: "Hand Casting",
    desc: "Ancient sand-casting methods preserved for weight and texture.",
    img: "/images/luxury/artisan_crafting_jewellery.png"
  },
  {
    title: "Stone Setting",
    desc: "Each gemstone is handset by master lapidaries with surgical precision.",
    img: "/images/hand_work.jpg"
  },
  {
    title: "Filigree Work",
    desc: "The art of delicate wire manipulation to create lace-like patterns.",
    img: "/images/hand_work3.jpg"
  }
];

export const Craftsmanship = () => {
  return (
    <section className="section-padding bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {/* <span className="text-[10px] uppercase tracking-[0.5em] text-champagne mb-4 block">ion</span> */}
            <h2 className="text-4xl font-serif mb-6">Mastery in Every Detail</h2>
            <div className="w-20 h-[1px] bg-champagne mx-auto mb-8" />
            <p className="text-foreground/60 font-light leading-relaxed">
              {"Artisans spend hundreds of hours on a single piece, ensuring that the balance is perfect and the soul of the craft is visible."}
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {techniques.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2 }}
              className="group cursor-pointer"
            >
              <div className="overflow-hidden mb-8 relative aspect-[3/4] w-full">
                <Image
                  src={item.img}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              </div>
              <h3 className="text-xl font-serif mb-3 group-hover:text-champagne transition-colors">{item.title}</h3>
              <p className="text-sm font-light text-foreground/50 leading-loose">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

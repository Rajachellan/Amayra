import React from "react";
import Link from "next/link";
import { Phone, MapPin, Globe } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-background border-t border-foreground/5 pt-24 pb-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-20">
          
          {/* Brand Info */}
          <div className="lg:col-span-4">
            <div className="mb-8">
              <span className="text-xl font-serif tracking-[0.2em] block uppercase">
                Gems of
              </span>
              <span className="text-sm font-serif tracking-[0.5em] text-champagne block mt-[-4px] uppercase">
                Shree Aarna
              </span>
            </div>
            <p className="text-foreground/50 text-sm font-light leading-loose max-w-sm mb-10 text-editorial">
              Crafting stories of elegance since 1990. We specialize in handcrafted diamond and gold jewellery that speaks to the soul of modern royalty. Every piece is a bridge between heritage and sophisticated grace.
            </p>
            <div className="flex space-x-6 text-champagne">
              <Link href="#" className="hover:text-foreground transition-colors"><Globe className="w-5 h-5 stroke-[1.5]" /></Link>
              <Link href="#" className="hover:text-foreground transition-colors"><Globe className="w-5 h-5 stroke-[1.5]" /></Link>
              <Link href="#" className="hover:text-foreground transition-colors"><Globe className="w-5 h-5 stroke-[1.5]" /></Link>
              <Link href="#" className="hover:text-foreground transition-colors"><Globe className="w-5 h-5 stroke-[1.5]" /></Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h4 className="text-[10px] uppercase tracking-[0.3em] font-medium mb-8">Collections</h4>
            <ul className="space-y-4 text-foreground/60 text-xs font-light tracking-widest">
              <li><Link href="/category/all" className="hover:text-champagne transition-colors uppercase">Shop All</Link></li>
              <li><Link href="/category/bridal" className="hover:text-champagne transition-colors uppercase">Bridal Couture</Link></li>
              <li><Link href="/category/necklaces?sub=Temple" className="hover:text-champagne transition-colors uppercase">Temple Gems</Link></li>
              <li><Link href="/category/earrings?sub=Daily Wear" className="hover:text-champagne transition-colors uppercase">Daily Elegance</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div className="lg:col-span-2">
            <h4 className="text-[10px] uppercase tracking-[0.3em] font-medium mb-8">Company</h4>
            <ul className="space-y-4 text-foreground/60 text-xs font-light tracking-widest">
              <li><Link href="/about" className="hover:text-champagne transition-colors uppercase">Our Story</Link></li>
              <li><Link href="/shipping" className="hover:text-champagne transition-colors uppercase">Shipping</Link></li>
              <li><Link href="/privacy-policy" className="hover:text-champagne transition-colors uppercase">Privacy Policy</Link></li>
              <li><Link href="/terms-and-conditions" className="hover:text-champagne transition-colors uppercase">Terms of Service</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="lg:col-span-4">
            <h4 className="text-[10px] uppercase tracking-[0.3em] font-medium mb-8">Newsletter</h4>
            <p className="text-foreground/50 text-xs font-light mb-8">
              Join our mailing list for exclusive launches and heritage stories.
            </p>
            <div className="relative group">
              <input
                type="email"
                placeholder="YOUR EMAIL"
                className="w-full bg-pearl/50 border border-foreground/5 px-6 py-4 rounded-full text-xs tracking-widest focus:outline-none focus:border-champagne transition-all"
              />
              <button className="absolute right-2 top-2 bottom-2 bg-foreground text-background px-6 rounded-full text-[10px] uppercase tracking-widest hover:bg-champagne transition-colors">
                Join
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-foreground/5 flex flex-col md:flex-row items-center justify-between text-[10px] text-foreground/30 tracking-[0.3em] uppercase">
          <p>© 2026 GEMS OF SHREE AARNA. ALL RIGHTS RESERVED.</p>
          <div className="flex space-x-8 mt-6 md:mt-0">
            <span className="flex items-center gap-2"><MapPin className="w-3 h-3" /> Mumbai</span>
            <span className="flex items-center gap-2"><Phone className="w-3 h-3" /> +91 98765 43210</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

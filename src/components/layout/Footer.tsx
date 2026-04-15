import React from "react";
import Link from "next/link";
import { Mail, Phone, MapPin, Globe } from "lucide-react";
import { Button } from "../ui/Button";

export const Footer = () => {
  return (
    <footer className="bg-brand-emerald text-white pt-20 pb-10">
      <div className="container mx-auto px-6">
        {/* Newsletter Section */}
        <div className="flex flex-col lg:flex-row items-center justify-between pb-16 border-b border-white/10">
          <div className="mb-8 lg:mb-0">
            <h3 className="text-2xl font-serif font-bold tracking-widest mb-2 uppercase">
              Join the Elite
            </h3>
            <p className="text-gray-400 max-w-md">
              Subscribe to receive updates on new collections, exclusive offers, and jewellery care tips.
            </p>
          </div>
          <div className="w-full lg:w-auto flex space-x-2">
            <input
              type="email"
              placeholder="YOUR EMAIL"
              className="bg-transparent border border-white/20 px-6 py-3 text-white focus:outline-none focus:border-brand-gold flex-grow lg:w-80 font-sans tracking-widest"
            />
            <Button variant="gold" size="md">
              JOIN
            </Button>
          </div>
        </div>

        {/* Links Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 py-16">
          {/* Brand Info */}
          <div>
            <div className="mb-6">
              <span className="text-xl font-serif font-bold tracking-[0.2em] block">
                GEMS OF
              </span>
              <span className="text-sm font-serif font-medium tracking-[0.5em] text-brand-gold block mt-[-4px]">
                SHREE AARNA
              </span>
            </div>
            <p className="text-gray-400 mb-8 leading-relaxed">
              Crafting stories of elegance since 1990. We specialize in handcrafted diamond and gold jewellery that speaks to the soul.
            </p>
            <div className="flex space-x-6 text-[10px] font-bold tracking-[0.2em]">
              <Link href="#" className="hover:text-brand-gold transition-colors">INSTA</Link>
              <Link href="#" className="hover:text-brand-gold transition-colors">FB</Link>
              <Link href="#" className="hover:text-brand-gold transition-colors">TWITTER</Link>
              <Link href="#" className="hover:text-brand-gold transition-colors">YOUTUBE</Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-brand-gold text-lg font-bold tracking-widest mb-8">
              COLLECTIONS
            </h4>
            <ul className="space-y-4 text-gray-400 font-sans tracking-widest text-xs uppercase">
              <li><Link href="/category/gold" className="hover:text-white transition-colors">Gold Jewellery</Link></li>
              <li><Link href="/category/diamond" className="hover:text-white transition-colors">Diamond Collection</Link></li>
              <li><Link href="/category/bridal" className="hover:text-white transition-colors">Bridal Couture</Link></li>
              <li><Link href="/category/traditional" className="hover:text-white transition-colors">Traditional Gems</Link></li>
              <li><Link href="/category/silver" className="hover:text-white transition-colors">Pure Silver</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-serif text-brand-gold text-lg font-bold tracking-widest mb-8">
              COMPANY
            </h4>
            <ul className="space-y-4 text-gray-400 font-sans tracking-widest text-xs uppercase">
              <li><Link href="/about" className="hover:text-white transition-colors">Our Story</Link></li>
              <li><Link href="/shipping" className="hover:text-white transition-colors">Shipping & Returns</Link></li>
              <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
              <li><Link href="/stores" className="hover:text-white transition-colors">Store Locator</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-serif text-brand-gold text-lg font-bold tracking-widest mb-8">
              CONTACT
            </h4>
            <ul className="space-y-4 text-gray-400">
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-brand-gold shrink-0 mt-1" />
                <span>123 Diamond Avenue, Jewellery Park, Mumbai, MH - 400001</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-brand-gold shrink-0" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-brand-gold shrink-0" />
                <span>concierge@shreeaarna.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between text-xs text-gray-500 uppercase tracking-widest">
          <p>© 2026 GEMS OF SHREE AARNA. ALL RIGHTS RESERVED.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <span>Powered by Luxury Tech</span>
            <div className="flex space-x-2">
              {/* Payment Mock Icons */}
              <div className="w-8 h-5 bg-white/10 rounded flex items-center justify-center">VISA</div>
              <div className="w-8 h-5 bg-white/10 rounded flex items-center justify-center">MC</div>
              <div className="w-8 h-5 bg-white/10 rounded flex items-center justify-center">AMEX</div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

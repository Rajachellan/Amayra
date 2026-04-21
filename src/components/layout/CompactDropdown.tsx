"use client";

import React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { NavItem } from "@/data/navigation";

interface CompactDropdownProps {
  item: NavItem;
  isOpen: boolean;
}

export const CompactDropdown: React.FC<CompactDropdownProps> = ({ item, isOpen }) => {
  if (!item.subItems) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 8, scale: 0.98 }}
          transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
          className="absolute top-[calc(100%+5px)] left-1/2 -translate-x-1/2 min-w-[200px] bg-white border border-champagne/30 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)] rounded-[16px] py-5 z-50 overflow-hidden"
        >
          {/* Top accent line */}
          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-champagne/40 to-transparent" />
          
          <div className="flex flex-col">
            {item.subItems.slice(0, 5).map((sub) => (
              <Link
                key={sub.name}
                href={sub.href}
                className="px-8 py-2.5 text-[10px] uppercase tracking-[0.2em] font-medium text-foreground/60 hover:text-foreground hover:bg-blush/30 transition-all duration-300"
              >
                {sub.name}
              </Link>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};


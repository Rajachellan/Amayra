"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Filter } from "lucide-react";
import { Button } from "../ui/Button";

interface FilterSideDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  filters: {
    color: string | null;
    material: string | null;
    maxPrice: number | null;
  };
  setFilters: (filters: any) => void;
}

const COLORS = ["Emerald", "Ruby", "Blue", "Gold", "White", "Multi"];
const MATERIALS = ["18k Gold", "22k Gold", "Platinum", "925 Silver", "Kundan"];
const PRICE_RANGES = [
  { label: "Under ₹1,000", max: 1000 },
  { label: "₹1,000 - ₹5,000", max: 5000 },
  { label: "₹5,000 - ₹25,000", max: 25000 },
  { label: "Over ₹25,000", max: 1000000 },
];

export const FilterSideDrawer = ({ isOpen, onClose, filters, setFilters }: FilterSideDrawerProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 z-[100]"
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 h-full w-full max-w-[350px] bg-white z-[110] shadow-2xl overflow-y-auto"
          >
            <div className="p-8">
              <div className="flex justify-between items-center mb-10 pb-4 border-b border-gray-100">
                <div className="flex items-center space-x-3">
                  <Filter className="w-5 h-5 text-brand-emerald" />
                  <span className="font-serif text-2xl text-brand-emerald">Filters</span>
                </div>
                <button onClick={onClose} className="text-gray-400 hover:text-brand-emerald p-2">
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Price Range */}
              <div className="mb-10">
                <h4 className="text-[11px] uppercase tracking-widest font-bold text-gray-400 mb-6">Shop by Price</h4>
                <div className="flex flex-col space-y-3">
                  {PRICE_RANGES.map((range) => (
                    <button
                      key={range.label}
                      onClick={() => setFilters({ ...filters, maxPrice: range.max })}
                      className={`text-left py-2 px-4 border rounded-none text-sm transition-all ${filters.maxPrice === range.max ? "bg-brand-emerald text-white border-brand-emerald" : "bg-white text-gray-600 border-gray-200 hover:border-brand-gold"}`}
                    >
                      {range.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color */}
              <div className="mb-10">
                <h4 className="text-[11px] uppercase tracking-widest font-bold text-gray-400 mb-6">Stone Color</h4>
                <div className="grid grid-cols-2 gap-3">
                  {COLORS.map((color) => (
                    <button
                      key={color}
                      onClick={() => setFilters({ ...filters, color: filters.color === color ? null : color })}
                      className={`py-2 px-3 border rounded-none text-xs transition-all ${filters.color === color ? "bg-brand-gold text-white border-brand-gold" : "bg-white text-gray-600 border-gray-200 hover:border-brand-gold"}`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>

              {/* Material */}
              <div className="mb-12">
                <h4 className="text-[11px] uppercase tracking-widest font-bold text-gray-400 mb-6">Material</h4>
                <div className="flex flex-col space-y-3">
                  {MATERIALS.map((material) => (
                    <button
                      key={material}
                      onClick={() => setFilters({ ...filters, material: filters.material === material ? null : material })}
                      className={`text-left py-2 px-4 border rounded-none text-sm transition-all ${filters.material === material ? "bg-brand-emerald text-white border-brand-emerald" : "bg-white text-gray-600 border-gray-200 hover:border-brand-gold"}`}
                    >
                      {material}
                    </button>
                  ))}
                </div>
              </div>

              <div className="sticky bottom-0 bg-white pt-6 border-t border-gray-100 flex space-x-4">
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => setFilters({ color: null, material: null, maxPrice: null })}
                >
                  RESET
                </Button>
                <Button 
                  variant="primary" 
                  className="flex-1"
                  onClick={onClose}
                >
                  APPLY
                </Button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

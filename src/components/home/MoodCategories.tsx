"use client";

import React, { useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useQueryClient } from "@tanstack/react-query";
import { resolveOptionalMediaUrl } from "@/lib/apiBase";
import { useOccasions } from "@/hooks/useCatalogMetadata";
import { shopApi } from "@/lib/api/shop";
import { queryKeys } from "@/lib/queryKeys";
import { mapListItemToProduct } from "@/lib/mapProduct";
import { BotanicalDecoration } from "@/components/ui/BotanicalDecoration";

export const MoodCategories = () => {
  const { data: occasions = [], isLoading: loading } = useOccasions();
  const queryClient = useQueryClient();

  const handlePrefetchOccasion = useCallback(
    (slug: string) => {
      if (!slug) return;
      const filters: Record<string, string | number | undefined> = {
        page: 1,
        limit: 100,
        sort: undefined,
        occasions: slug,
      };
      queryClient.prefetchQuery({
        queryKey: queryKeys.products.list(filters),
        queryFn: async () => {
          const res = await shopApi.products(filters);
          return {
            items: (res.items || []).map(mapListItemToProduct),
            total: res.total || 0,
            page: res.page || 1,
            pages: res.pages || 0,
          };
        },
        staleTime: 5 * 60 * 1000,
      });
    },
    [queryClient]
  );

  return (
    <section className="py-24 overflow-hidden relative" style={{ backgroundColor: 'var(--bg-ivory)' }}>
      <BotanicalDecoration className="text-emerald-900" opacity={0.03} />
      <div className="container relative z-10 mx-auto px-4 sm:px-6">
        <div className="max-w-xl mb-16">
          <span className="text-yellow-600 uppercase tracking-[0.2em] text-[14px] font-bold block mb-4">
            Curated Experiences
          </span>
          <h2 className="text-foreground text-4xl md:text-5xl font-serif">
            Shop by <span className="italic font-serif-alt text-[#3D3934]/90">Mood</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {loading ? (
            [1, 2, 3, 4].map((i) => (
              <div key={i} className="aspect-[4/5] bg-pearl animate-pulse rounded-[24px]" />
            ))
          ) : (
            occasions.map((occ, index) => {
              const imgUrl = resolveOptionalMediaUrl(occ.image);
              return (
              <motion.div
                key={occ._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "120px" }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                onMouseEnter={() => handlePrefetchOccasion(occ.slug)}
                onTouchStart={() => handlePrefetchOccasion(occ.slug)}
                className="group relative overflow-hidden flex flex-col rounded-[24px] aspect-[4/5] bg-pearl border border-foreground/10 transition-all duration-700 hover:shadow-2xl hover:-translate-y-2"
              >
                <Link href={`/occasion/${occ.slug}`} className="block h-full relative flex flex-col">
                  <div className="absolute inset-[16px] bottom-[110px] overflow-hidden rounded-[16px] bg-stone-200/60">
                    {imgUrl && (
                      <Image
                        src={imgUrl}
                        alt={occ.name}
                        fill
                        quality={70}
                        decoding="async"
                        sizes="(max-width: 768px) 90vw, (max-width: 1024px) 45vw, 25vw"
                        className="object-cover transition-transform duration-[2s] group-hover:scale-110"
                      />
                    )}
                    <div className="absolute inset-0 bg-foreground/5 group-hover:bg-foreground/5 transition-colors" />
                  </div>

                  <div className="absolute bottom-0 inset-x-0 p-5 pt-2 flex flex-col items-center text-center z-10 bg-pearl/90 backdrop-blur-sm">
                    <h3 className="text-foreground text-xl font-serif mb-1 group-hover:text-champagne transition-colors duration-300 mb-4">
                      {occ.name}
                    </h3>
                    {/* <p className="text-[#6B6661] text-[10px] uppercase tracking-[0.15em] font-medium mb-3 line-clamp-1">
                      {occ.description || "Curated collection"}
                    </p> */}
                    <span className="relative group/btn overflow-hidden w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#1a3d2f] to-[#2e5a44] text-white text-[10px] uppercase tracking-[0.2em] font-bold shadow-md transition-all duration-300 group-hover:shadow-[0_6px_20px_rgba(26,61,47,0.4)] flex items-center justify-center">
                      <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 -translate-x-full group-hover:translate-x-full" />
                      <span className="relative z-10 font-bold text-white">Explore More</span>
                    </span>
                  </div>

                  {/* Subtle border detail */}
                  <div className="absolute inset-4 border border-foreground/10 rounded-[20px] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                </Link>
              </motion.div>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
};


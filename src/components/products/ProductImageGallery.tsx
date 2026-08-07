"use client";

import React, { useCallback, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Props = {
  images: string[];
  alt: string;
  activeIndex: number;
  onActiveIndexChange: (index: number) => void;
};

export function ProductImageGallery({ images, alt, activeIndex, onActiveIndexChange }: Props) {
  const [zoom, setZoom] = useState({ x: 50, y: 50, active: false });

  const safeIndex = Math.min(activeIndex, Math.max(0, images.length - 1));
  const src = images[safeIndex] ?? images[0];

  const goPrev = useCallback(() => {
    onActiveIndexChange(safeIndex <= 0 ? images.length - 1 : safeIndex - 1);
  }, [images.length, onActiveIndexChange, safeIndex]);

  const goNext = useCallback(() => {
    onActiveIndexChange(safeIndex >= images.length - 1 ? 0 : safeIndex + 1);
  }, [images.length, onActiveIndexChange, safeIndex]);

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoom({ x, y, active: true });
  };

  return (
    <div className="w-full">
      <div
        className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-[#f3f0eb]"
        onMouseMove={onMouseMove}
        onMouseLeave={() => setZoom((z) => ({ ...z, active: false }))}
      >
        <Image
          src={src}
          alt={alt}
          fill
          unoptimized
          priority
          className="object-cover transition-transform duration-300 ease-out will-change-transform"
          style={{
            transform: zoom.active ? "scale(2.2)" : "scale(1)",
            transformOrigin: `${zoom.x}% ${zoom.y}%`,
          }}
        />

        {images.length > 1 && (
          <>
            <button
              type="button"
              aria-label="Previous image"
              onClick={goPrev}
              className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/90 p-2.5 text-neutral-800 shadow-md transition hover:bg-white"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              aria-label="Next image"
              onClick={goNext}
              className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/90 p-2.5 text-neutral-800 shadow-md transition hover:bg-white"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        )}
      </div>

      {images.length > 1 && (
        <div className="mt-4 flex gap-3 overflow-x-auto pb-1 no-scrollbar">
          {images.map((thumb, i) => (
            <button
              type="button"
              key={`${thumb}-${i}`}
              onClick={() => onActiveIndexChange(i)}
              className={`relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl border-2 transition-all ${
                safeIndex === i ? "border-[#c4a574]" : "border-transparent opacity-70 hover:opacity-100"
              }`}
            >
              <Image src={thumb} alt="" fill sizes="80px" className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

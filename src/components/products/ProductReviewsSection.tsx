"use client";

import React, { useState, useEffect, useRef } from "react";
import { Star, Check, ChevronLeft, ChevronRight, PenSquare } from "lucide-react";
import { shopApi, type ReviewItem } from "@/lib/api/shop";
import { WriteReviewModal } from "./WriteReviewModal";

type Props = {
  productSlug: string;
  productId?: string;
  productName: string;
  productImage?: string;
};

export function ProductReviewsSection({
  productSlug,
  productId,
  productName,
  productImage,
}: Props) {
  const [reviews, setReviews] = useState<ReviewItem[]>([]);
  const [total, setTotal] = useState(0);
  const [averageRating, setAverageRating] = useState(5.0);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    async function loadReviews() {
      if (!productSlug) return;
      try {
        setLoading(true);
        const res = await shopApi.productReviews(productSlug);
        if (!cancelled) {
          setReviews(res.items || []);
          setTotal(res.total || (res.items ? res.items.length : 0));
          setAverageRating(res.averageRating || 5.0);
        }
      } catch (err) {
        console.error("Failed to load reviews:", err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    loadReviews();
    return () => {
      cancelled = true;
    };
  }, [productSlug]);

  const handleReviewSubmitted = (newReview: ReviewItem) => {
    setReviews((prev) => [newReview, ...prev]);
    setTotal((prev) => prev + 1);
  };

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -340, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 340, behavior: "smooth" });
    }
  };

  const formatDate = (dateStr: string) => {
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
    } catch {
      return "Recently";
    }
  };

  return (
    <section className="border-t border-neutral-200 bg-[#FAF9F7] py-14 sm:py-20">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="mb-8 sm:mb-12 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-serif font-bold tracking-wide text-neutral-900">
              Customer Reviews
            </h2>
            <div className="mt-1.5 flex items-center gap-3 text-xs sm:text-sm text-neutral-600">
              <span className="font-semibold text-neutral-800">
                {total} {total === 1 ? "review" : "reviews"}
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-[#e8f5f1] px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider text-[#1e6f5c] border border-[#cbebe1]">
                <Check className="h-3 w-3" /> Verified
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setModalOpen(true)}
              className="inline-flex items-center gap-2 rounded-xl bg-neutral-900 px-5 sm:px-7 py-3 text-[11px] font-bold uppercase tracking-[0.2em] text-white transition hover:bg-neutral-800 hover:shadow-md cursor-pointer"
            >
              <PenSquare className="h-3.5 w-3.5" />
              Write a review
            </button>

            {/* Carousel navigation arrows */}
            {reviews.length > 2 && (
              <div className="flex items-center gap-1.5 ml-2">
                <button
                  type="button"
                  onClick={scrollLeft}
                  aria-label="Previous reviews"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-300 bg-white text-neutral-700 shadow-2xs hover:bg-neutral-50 hover:border-neutral-400 transition cursor-pointer"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={scrollRight}
                  aria-label="Next reviews"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-300 bg-white text-neutral-700 shadow-2xs hover:bg-neutral-50 hover:border-neutral-400 transition cursor-pointer"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Reviews Cards Slider / Grid */}
        {loading ? (
          <div className="flex gap-4 overflow-hidden">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-44 min-w-[300px] flex-1 animate-pulse rounded-2xl bg-neutral-200/60"
              />
            ))}
          </div>
        ) : reviews.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-neutral-300 bg-white p-12 text-center">
            <p className="text-sm text-neutral-600 mb-4">
              There are no reviews for this piece yet. Be the first to share your experience!
            </p>
            <button
              type="button"
              onClick={() => setModalOpen(true)}
              className="rounded-xl bg-neutral-900 px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-white hover:bg-neutral-800 transition"
            >
              Write a review
            </button>
          </div>
        ) : (
          <div
            ref={scrollRef}
            className="flex gap-4 sm:gap-6 overflow-x-auto pb-4 pt-1 no-scrollbar scroll-smooth"
          >
            {reviews.map((rev) => (
              <article
                key={rev._id}
                className="group flex flex-col justify-between rounded-2xl border border-neutral-200/90 bg-white p-5 sm:p-6 shadow-xs transition-shadow hover:shadow-md min-w-[280px] sm:min-w-[340px] max-w-[360px] shrink-0"
              >
                <div className="space-y-3">
                  {/* Stars */}
                  <div className="flex items-center gap-1 text-[#d4a853]">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star
                        key={s}
                        className={`h-4 w-4 ${
                          rev.rating >= s
                            ? "fill-[#d4a853] text-[#d4a853]"
                            : "fill-neutral-200 text-neutral-200"
                        }`}
                      />
                    ))}
                  </div>

                  {/* Reviewer & Date */}
                  <div className="flex items-baseline justify-between gap-2 border-b border-neutral-100 pb-2.5">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="font-semibold text-xs sm:text-sm text-neutral-900">
                        {rev.reviewerName}
                      </span>
                      {rev.verified && (
                        <span className="rounded-full bg-neutral-100 px-1.5 py-0.2 text-[9px] font-medium text-neutral-600 border border-neutral-200">
                          Verified
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] text-neutral-400 shrink-0">
                      {formatDate(rev.createdAt)}
                    </span>
                  </div>

                  {/* Title & Comment */}
                  <div>
                    <h4 className="font-serif text-xs sm:text-sm font-bold text-neutral-900 line-clamp-1 mb-1">
                      {rev.title}
                    </h4>
                    <p className="text-xs sm:text-sm leading-relaxed text-neutral-600 line-clamp-4">
                      {rev.comment}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      {/* 3-Step Interactive Modal */}
      <WriteReviewModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        productName={productName}
        productSlug={productSlug}
        productId={productId}
        productImage={productImage}
        onReviewSubmitted={handleReviewSubmitted}
      />
    </section>
  );
}

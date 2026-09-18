"use client";

import React, { useState } from "react";
import Image from "next/image";
import { X, Star, ArrowLeft, CheckCircle2 } from "lucide-react";
import { shopApi, type ReviewItem } from "@/lib/api/shop";
import toast from "react-hot-toast";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  productName: string;
  productSlug: string;
  productId?: string;
  productImage?: string;
  onReviewSubmitted: (review: ReviewItem) => void;
};

export function WriteReviewModal({
  isOpen,
  onClose,
  productName,
  productSlug,
  productId,
  productImage,
  onReviewSubmitted,
}: Props) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [email, setEmail] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleRatingClick = (r: number) => {
    setRating(r);
    // Smooth transition to step 2 after selecting star rating
    setTimeout(() => {
      setStep(2);
    }, 250);
  };

  const handleNextFromStep2 = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) {
      toast.error("Please enter your review content");
      return;
    }
    if (!title.trim()) {
      toast.error("Please enter a review title");
      return;
    }
    setStep(3);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }
    if (!displayName.trim() && !isAnonymous) {
      toast.error("Please enter your display name or choose anonymous");
      return;
    }

    setSubmitting(true);
    try {
      const res = await shopApi.submitReview({
        productSlug,
        productId,
        rating,
        title: title.trim(),
        comment: content.trim(),
        reviewerEmail: email.trim(),
        reviewerName: isAnonymous ? "Anonymous" : displayName.trim(),
        isAnonymous,
      });

      setSubmitted(true);
      toast.success("Thank you! Your review was submitted for approval.");
      if (res.review && (res.review as any).status === "approved") {
        onReviewSubmitted(res.review);
      }
      setTimeout(() => {
        handleClose();
      }, 2200);
    } catch (err: any) {
      toast.error(err?.message || "Failed to submit review. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleClose = () => {
    onClose();
    // Reset after closing animation
    setTimeout(() => {
      setStep(1);
      setSubmitted(false);
      setContent("");
      setTitle("");
      setEmail("");
      setDisplayName("");
      setIsAnonymous(false);
    }, 300);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-lg overflow-hidden rounded-2xl bg-white p-6 sm:p-8 shadow-2xl transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          type="button"
          onClick={handleClose}
          aria-label="Close modal"
          className="absolute right-4 top-4 rounded-full p-2 text-neutral-500 hover:bg-neutral-100 hover:text-neutral-800 transition cursor-pointer"
        >
          <X className="h-5 w-5" />
        </button>

        {submitted ? (
          <div className="py-12 text-center space-y-4">
            <CheckCircle2 className="mx-auto h-16 w-16 text-emerald-600 animate-in zoom-in-75 duration-300" />
            <h3 className="text-2xl font-serif font-medium text-neutral-900">Thank you!</h3>
            <p className="text-sm text-neutral-600 max-w-xs mx-auto leading-relaxed">
              Your review has been submitted for moderation and will appear on the product page as soon as it is approved by our team.
            </p>
          </div>
        ) : (
          <>
            {/* STEP 1: Star Rating & Product Preview */}
            {step === 1 && (
              <div className="text-center pt-2 pb-4 space-y-6">
                <div>
                  <h2 className="text-2xl font-serif font-normal text-neutral-900 mb-2">
                    How would you rate this product?
                  </h2>
                  <p className="text-xs sm:text-sm text-neutral-500">
                    We would love it if you would share a bit about your experience.
                  </p>
                </div>

                <div className="flex flex-col items-center justify-center space-y-3">
                  <div className="relative h-28 w-28 overflow-hidden rounded-xl bg-[#FAF8F3] border border-neutral-100 shadow-inner">
                    {productImage ? (
                      <Image
                        src={productImage}
                        alt={productName}
                        fill
                        className="object-cover"
                        sizes="112px"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-xs text-neutral-400">
                        Jewellery
                      </div>
                    )}
                  </div>
                  <h3 className="font-serif text-sm sm:text-base font-medium text-neutral-800 max-w-xs px-2 line-clamp-2">
                    {productName}
                  </h3>
                </div>

                {/* Stars selector */}
                <div className="pt-2">
                  <div className="flex items-center justify-center gap-2 sm:gap-3">
                    {[1, 2, 3, 4, 5].map((starVal) => {
                      const filled = (hoverRating || rating) >= starVal;
                      return (
                        <button
                          key={starVal}
                          type="button"
                          onMouseEnter={() => setHoverRating(starVal)}
                          onMouseLeave={() => setHoverRating(0)}
                          onClick={() => handleRatingClick(starVal)}
                          className="p-1 transition-transform hover:scale-125 cursor-pointer focus:outline-none"
                          aria-label={`Rate ${starVal} out of 5 stars`}
                        >
                          <Star
                            className={`h-8 w-8 sm:h-9 sm:w-9 transition-colors ${
                              filled ? "fill-neutral-900 text-neutral-900" : "text-neutral-300"
                            }`}
                          />
                        </button>
                      );
                    })}
                  </div>
                  <div className="mx-auto mt-2 flex max-w-[220px] justify-between text-[11px] font-medium text-neutral-400">
                    <span>Poor</span>
                    <span>Great</span>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2: Review Content & Title */}
            {step === 2 && (
              <form onSubmit={handleNextFromStep2} className="pt-2 space-y-5">
                <div className="text-center">
                  <h3 className="font-serif text-base sm:text-lg font-medium text-neutral-900 line-clamp-1">
                    {productName}
                  </h3>
                  <div className="mt-2 flex justify-center gap-1.5">
                    {[1, 2, 3, 4, 5].map((starVal) => (
                      <button
                        key={starVal}
                        type="button"
                        onClick={() => setRating(starVal)}
                        className="cursor-pointer focus:outline-none"
                      >
                        <Star
                          className={`h-5 w-5 ${
                            rating >= starVal
                              ? "fill-neutral-900 text-neutral-900"
                              : "text-neutral-300"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                  <div className="mx-auto mt-1 flex max-w-[150px] justify-between text-[10px] font-medium text-neutral-400">
                    <span>Poor</span>
                    <span>Great</span>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-[11px] font-bold uppercase tracking-[0.2em] text-neutral-800">
                    Review Content
                  </label>
                  <textarea
                    rows={4}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Start writing here..."
                    required
                    className="w-full rounded-md border border-neutral-300 px-3.5 py-2.5 text-xs sm:text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-900"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-[11px] font-bold uppercase tracking-[0.2em] text-neutral-800">
                    Review Title
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Give your review a title"
                    required
                    className="w-full rounded-md border border-neutral-300 px-3.5 py-2.5 text-xs sm:text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-900"
                  />
                </div>

                <p className="text-[11px] leading-relaxed text-neutral-500 text-center pt-1">
                  We&apos;ll only contact you about your review if necessary. By submitting your review,
                  you agree to our terms and conditions and privacy policy.
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-neutral-100">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="flex items-center gap-1 text-xs font-medium text-neutral-600 hover:text-neutral-900 transition cursor-pointer"
                  >
                    <ArrowLeft className="h-3.5 w-3.5" /> Back
                  </button>
                  <button
                    type="submit"
                    disabled={!content.trim() || !title.trim()}
                    className="rounded-md bg-neutral-900 px-7 py-2.5 text-xs font-semibold tracking-wider text-white transition hover:bg-black disabled:opacity-50 cursor-pointer"
                  >
                    Next
                  </button>
                </div>
              </form>
            )}

            {/* STEP 3: Reviewer Information & Submit */}
            {step === 3 && (
              <form onSubmit={handleSubmit} className="pt-2 space-y-5">
                <div className="text-center">
                  <h2 className="text-2xl font-serif font-normal text-neutral-900 mb-1">
                    About you
                  </h2>
                  <p className="text-xs sm:text-sm text-neutral-500">
                    Please tell us more about you.
                  </p>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-[11px] font-bold uppercase tracking-[0.2em] text-neutral-800">
                    Email Address (Required)
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email address"
                    required
                    className="w-full rounded-md border border-neutral-300 px-3.5 py-2.5 text-xs sm:text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-900"
                  />
                  <p className="text-[10px] text-neutral-400">We respect your privacy.</p>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-[11px] font-bold uppercase tracking-[0.2em] text-neutral-800">
                    Display Name (Required)
                  </label>
                  <input
                    type="text"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    placeholder="Display name"
                    disabled={isAnonymous}
                    required={!isAnonymous}
                    className="w-full rounded-md border border-neutral-300 px-3.5 py-2.5 text-xs sm:text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-900 disabled:bg-neutral-100 disabled:text-neutral-400"
                  />
                </div>

                <div className="pt-1">
                  <label className="flex items-center gap-2.5 text-xs font-semibold uppercase tracking-wider text-neutral-700 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isAnonymous}
                      onChange={(e) => {
                        setIsAnonymous(e.target.checked);
                        if (e.target.checked) setDisplayName("Anonymous");
                        else setDisplayName("");
                      }}
                      className="h-4 w-4 rounded border-neutral-300 text-neutral-900 focus:ring-neutral-900 cursor-pointer"
                    />
                    Post review as anonymous
                  </label>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-neutral-100">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    disabled={submitting}
                    className="flex items-center gap-1 text-xs font-medium text-neutral-600 hover:text-neutral-900 transition cursor-pointer"
                  >
                    <ArrowLeft className="h-3.5 w-3.5" /> Back
                  </button>
                  <button
                    type="submit"
                    disabled={submitting || !email.trim() || (!displayName.trim() && !isAnonymous)}
                    className="rounded-md bg-neutral-900 px-7 py-2.5 text-xs font-semibold tracking-wider text-white transition hover:bg-black disabled:opacity-50 cursor-pointer"
                  >
                    {submitting ? "Submitting…" : "Submit Review"}
                  </button>
                </div>
              </form>
            )}
          </>
        )}
      </div>
    </div>
  );
}

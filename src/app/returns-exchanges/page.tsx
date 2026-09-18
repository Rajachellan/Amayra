"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { api } from "@/lib/api";
import { formatPrice } from "@/lib/formatPrice";
import {
  Package,
  RotateCcw,
  RefreshCw,
  Search,
  CheckCircle2,
  AlertCircle,
  Clock,
  ShieldCheck,
  ArrowRight,
  ChevronRight,
  Truck,
  MessageCircle,
  HelpCircle,
  Building2,
  Wallet,
  X,
  FileText,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

type ItemEligibility = {
  productId: string;
  sku?: string;
  name: string;
  size?: string;
  unitPrice?: number;
  image?: string;
  orderedQuantity: number;
  returnedQuantity: number;
  exchangedQuantity: number;
  lockedQuantity: number;
  remainingEligibleQuantity: number;
  returnEligible: boolean;
  exchangeEligible: boolean;
  returnWindowExpiresAt: string | null;
  exchangeWindowExpiresAt: string | null;
  futureReversePickupAllowed: boolean;
  reason?: string;
};

type VerifiedOrder = {
  _id: string;
  orderNumber: string;
  orderStatus: string;
  status: string;
  isDelivered: boolean;
  deliveredAt?: string;
  items: ItemEligibility[];
  shippingAddress: {
    fullName: string;
    phone: string;
    line1: string;
    city: string;
    state: string;
    pincode: string;
  };
  total: number;
  currency: string;
};

type ReasonOption = {
  _id: string;
  title: string;
  code: string;
  type: string;
};

type LookupResponse = {
  verified: boolean;
  verificationToken: string;
  order: VerifiedOrder;
  reasons: ReasonOption[];
};

type ReturnResponse = {
  _id: string;
  returnNumber: string;
  status: string;
  requestType: string;
};

export default function ReturnsExchangesPage() {
  // Step 1: Lookup Form states
  const [orderNumber, setOrderNumber] = useState("");
  const [identifier, setIdentifier] = useState("");
  const [searching, setSearching] = useState(false);
  const [lookupError, setLookupError] = useState("");

  // Step 2: Verified Order Data
  const [lookupResult, setLookupResult] = useState<LookupResponse | null>(null);
  const [reviewMode, setReviewMode] = useState(false);

  // Step 2: Request Form States
  const [requestType, setRequestType] = useState<"RETURN" | "EXCHANGE">("EXCHANGE");
  const [selectedItems, setSelectedItems] = useState<Record<string, number>>({});
  const [reasonCode, setReasonCode] = useState("");
  const [description, setDescription] = useState("");

  // Exchange fields
  const [preferredSize, setPreferredSize] = useState("");
  const [exchangeNotes, setExchangeNotes] = useState("");

  // Return fields (Refund)
  const [refundMethod, setRefundMethod] = useState<"VOUCHER" | "BANK">("VOUCHER");
  const [accountHolder, setAccountHolder] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [ifscCode, setIfscCode] = useState("");
  const [bankName, setBankName] = useState("");
  const [upiId, setUpiId] = useState("");

  // Evidence
  const [evidenceUrl, setEvidenceUrl] = useState("");

  // Submission states
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submittedReturn, setSubmittedReturn] = useState<ReturnResponse | null>(null);

  // Policy Modal & Accordion states
  const [isPolicyModalOpen, setIsPolicyModalOpen] = useState(false);
  const [isPolicyExpanded, setIsPolicyExpanded] = useState(false);

  // Handle escape key and body scroll lock for policy modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsPolicyModalOpen(false);
    };
    if (isPolicyModalOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isPolicyModalOpen]);

  // Handle Order Lookup
  const handleLookup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLookupError("");
    setSubmitError("");
    setSubmittedReturn(null);

    const cleanOrder = orderNumber.trim();
    const cleanId = identifier.trim();

    if (!cleanOrder) {
      setLookupError("Please enter your Order Number (e.g. AMY-20260917-001).");
      return;
    }
    if (!cleanId) {
      setLookupError("Please enter your Email Address or Phone Number.");
      return;
    }

    setSearching(true);
    try {
      const res = await api<LookupResponse>("/returns/lookup", {
        method: "POST",
        skipAuthRedirect: true,
        body: JSON.stringify({
          orderNumber: cleanOrder,
          identifier: cleanId,
        }),
      });

      setLookupResult(res);
      setReviewMode(false);
      // Reset request selection
      setSelectedItems({});
      setReasonCode("");
      setDescription("");
      setPreferredSize("");
      setExchangeNotes("");

      if (typeof window !== "undefined") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } catch (err) {
      setLookupResult(null);
      setLookupError(
        err instanceof Error
          ? err.message
          : "Could not locate your order. Please check your details and try again."
      );
    } finally {
      setSearching(false);
    }
  };

  // Toggle item selection
  const handleToggleItem = (productId: string, maxQty: number) => {
    setSelectedItems((prev) => {
      const copy = { ...prev };
      if (copy[productId]) {
        delete copy[productId];
      } else {
        copy[productId] = 1; // Default select 1
      }
      return copy;
    });
  };

  // Change selected quantity
  const handleQtyChange = (productId: string, qty: number) => {
    setSelectedItems((prev) => ({
      ...prev,
      [productId]: qty,
    }));
  };

  // Handle Return / Exchange Submission
  const handleSubmitRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!lookupResult) return;

    setSubmitError("");

    const selectedKeys = Object.keys(selectedItems).filter(
      (k) => (selectedItems[k] || 0) > 0
    );

    if (selectedKeys.length === 0) {
      setSubmitError("Please select at least one item to return or exchange.");
      return;
    }

    if (!reasonCode) {
      setSubmitError("Please select a reason for this request.");
      return;
    }

    const itemsPayload = selectedKeys.map((pId) => ({
      product: pId,
      quantity: selectedItems[pId],
      size: preferredSize || undefined,
    }));

    const selectedReasonObj = lookupResult.reasons.find(
      (r) => r.code === reasonCode || r._id === reasonCode
    );

    const payload: any = {
      orderId: lookupResult.order._id,
      verificationToken: lookupResult.verificationToken,
      items: itemsPayload,
      requestType,
      reason: selectedReasonObj?.code || reasonCode,
      reasonTitle: selectedReasonObj?.title || reasonCode,
      description: description.trim() || undefined,
    };

    if (requestType === "EXCHANGE") {
      payload.exchangeDetails = {
        preferredSize: preferredSize.trim() || undefined,
        notes: exchangeNotes.trim() || undefined,
      };
    } else if (requestType === "RETURN" && refundMethod === "BANK") {
      if (!upiId && (!accountNumber || !ifscCode)) {
        setSubmitError("Please provide either your UPI ID or Bank Account Details for refund.");
        return;
      }
      payload.bankDetails = {
        accountHolderName: accountHolder.trim() || undefined,
        accountNumber: accountNumber.trim() || undefined,
        ifscCode: ifscCode.trim().toUpperCase() || undefined,
        bankName: bankName.trim() || undefined,
        upiId: upiId.trim() || undefined,
      };
    }

    if (evidenceUrl.trim()) {
      payload.evidenceFiles = [
        {
          fileUrl: evidenceUrl.trim(),
          fileType: "IMAGE",
        },
      ];
    }

    setSubmitting(true);
    try {
      const res = await api<ReturnResponse>("/returns", {
        method: "POST",
        skipAuthRedirect: true,
        body: JSON.stringify(payload),
      });

      setSubmittedReturn(res);
    } catch (err) {
      setSubmitError(
        err instanceof Error
          ? err.message
          : "Failed to submit request. Please try again or contact customer support."
      );
    } finally {
      setSubmitting(false);
    }
  };

  // Filter reasons by requestType
  const availableReasons = lookupResult?.reasons
    ? lookupResult.reasons.filter(
        (r) => r.type === requestType || r.type === "BOTH" || !r.type
      )
    : [];

  return (
    <main className="min-h-screen bg-[#FAF8F5] text-stone-800 flex flex-col justify-between">
      <Navbar />

      <div className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full">
        {/* Header Section (Rubans Style) */}
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0B2516]/5 border border-[#c4a064]/30 text-[#0B2516] text-[11px] font-semibold tracking-widest uppercase">
            <RotateCcw className="w-3.5 h-3.5 text-[#c4a064]" />
            <span>Dedicated Self-Service Portal</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl text-[#0B2516] font-medium tracking-wide">
            Returns & Exchanges
          </h1>

          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-light">
            Please provide your order number along with either your email address or phone number in order to locate your order. To determine if your order qualifies for a return or exchange, please consult the policy guidelines below.
          </p>

          <div className="p-4 bg-white rounded-2xl border border-stone-200/80 shadow-xs text-left text-xs text-stone-600 space-y-2">
            <div className="flex items-start gap-2.5">
              <Clock className="w-4 h-4 text-[#c4a064] shrink-0 mt-0.5" />
              <p className="leading-relaxed">
                <strong className="text-stone-900">Exchange & Return Window:</strong> We offer a{" "}
                <span className="text-[#0B2516] font-semibold">5-day hassle-free exchange & return policy</span> for unworn, unwashed jewellery with intact tags and original royal packaging.
              </p>
            </div>
            <div className="flex items-start gap-2.5">
              <MessageCircle className="w-4 h-4 text-[#00A859] shrink-0 mt-0.5" />
              <p className="leading-relaxed">
                <strong className="text-stone-900">Immediate Concierge Help:</strong> Need instant assistance? You can also reach our support concierge on WhatsApp at{" "}
                <a
                  href="https://wa.me/919566571655"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-[#0B2516] hover:text-[#c4a064] underline underline-offset-2"
                >
                  +91 9566571655
                </a>
                .
              </p>
            </div>
          </div>
        </div>

        {/* STEP 1: ORDER LOOKUP FORM */}
        {!lookupResult && !submittedReturn && (
          <div className="bg-white rounded-3xl border border-stone-200 shadow-xl shadow-stone-200/40 p-6 sm:p-10 mb-10 transition-all">
            <form onSubmit={handleLookup} className="space-y-6 max-w-xl mx-auto">
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1.5">
                    Order Number <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="e.g. AMY-20260917-001"
                      value={orderNumber}
                      onChange={(e) => setOrderNumber(e.target.value)}
                      disabled={searching}
                      required
                      className="w-full px-4 py-3.5 bg-stone-50 border border-stone-300 rounded-xl text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:border-[#0B2516] focus:ring-1 focus:ring-[#0B2516] transition-all font-mono"
                    />
                    <Package className="w-4 h-4 text-stone-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1.5">
                    Email or Phone Number <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter email or 10-digit mobile number"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    disabled={searching}
                    required
                    className="w-full px-4 py-3.5 bg-stone-50 border border-stone-300 rounded-xl text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:border-[#0B2516] focus:ring-1 focus:ring-[#0B2516] transition-all"
                  />
                  <p className="text-[11px] text-stone-400 mt-1">
                    Enter the phone number or email address provided during checkout.
                  </p>
                </div>
              </div>

              {lookupError && (
                <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start gap-3">
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                  <p className="leading-relaxed">{lookupError}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={searching}
                className="w-full py-4 bg-[#0B2516] hover:bg-[#123822] text-[#FAF7F0] text-xs uppercase tracking-[0.2em] font-semibold rounded-xl transition-all shadow-md hover:shadow-lg disabled:opacity-60 flex items-center justify-center gap-2 cursor-pointer"
              >
                {searching ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-[#c4a064]" />
                    <span>Locating Order…</span>
                  </>
                ) : (
                  <>
                    <Search className="w-4 h-4 text-[#c4a064]" />
                    <span>Find Your Order</span>
                  </>
                )}
              </button>

              <div className="text-center pt-2 space-y-2">
                <p className="text-xs text-stone-500">
                  Check our return & cancellation policy{" "}
                  <button
                    type="button"
                    onClick={() => setIsPolicyModalOpen(true)}
                    className="text-[#0B2516] font-semibold underline underline-offset-4 hover:text-[#c4a064] transition-colors cursor-pointer"
                  >
                    here
                  </button>
                </p>
                <div>
                  <button
                    type="button"
                    onClick={() => setIsPolicyExpanded(!isPolicyExpanded)}
                    className="inline-flex items-center gap-1.5 text-[11px] font-medium text-stone-600 hover:text-[#0B2516] transition-colors py-1 px-3 rounded-full bg-stone-100 hover:bg-stone-200/70"
                  >
                    <FileText className="w-3.5 h-3.5 text-[#c4a064]" />
                    <span>{isPolicyExpanded ? "Hide Return Guidelines" : "Read Detailed Policy on this Page"}</span>
                    {isPolicyExpanded ? (
                      <ChevronUp className="w-3.5 h-3.5" />
                    ) : (
                      <ChevronDown className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </div>
            </form>

            {/* Inline Expandable Policy Guide */}
            {isPolicyExpanded && (
              <div className="mt-8 pt-6 border-t border-stone-100 space-y-5 text-xs text-stone-600 animate-in fade-in duration-300">
                <div className="flex items-center gap-2 text-stone-900 font-semibold uppercase tracking-wider text-xs">
                  <ShieldCheck className="w-4 h-4 text-[#c4a064]" />
                  <span>Return & Exchange Policy Guidelines</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200/70 space-y-1.5">
                    <p className="font-semibold text-stone-900 text-xs flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#c4a064]" />
                      <span>5-Day Policy Window</span>
                    </p>
                    <p className="text-[11px] leading-relaxed text-stone-600">
                      Returns & exchanges are accepted within 5 days of confirmed delivery for unused, unworn items.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200/70 space-y-1.5">
                    <p className="font-semibold text-stone-900 text-xs flex items-center gap-1.5">
                      <Package className="w-3.5 h-3.5 text-[#c4a064]" />
                      <span>Packaging & Tags Intact</span>
                    </p>
                    <p className="text-[11px] leading-relaxed text-stone-600">
                      Items must be in original royal packaging with security tags, certificates, and sealed box intact.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200/70 space-y-1.5">
                    <p className="font-semibold text-stone-900 text-xs flex items-center gap-1.5">
                      <Truck className="w-3.5 h-3.5 text-[#c4a064]" />
                      <span>Doorstep Reverse Pickup</span>
                    </p>
                    <p className="text-[11px] leading-relaxed text-stone-600">
                      Our insured courier partner will be assigned to collect the package directly from your shipping address.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200/70 space-y-1.5">
                    <p className="font-semibold text-stone-900 text-xs flex items-center gap-1.5">
                      <Wallet className="w-3.5 h-3.5 text-[#c4a064]" />
                      <span>Fast Refunds & Exchanges</span>
                    </p>
                    <p className="text-[11px] leading-relaxed text-stone-600">
                      Instant store credits upon QC verification or bank settlement within 5–7 working days.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* STEP 2: VERIFIED ORDER & RETURN / EXCHANGE SELECTION */}
        {lookupResult && !submittedReturn && (
          <div className="space-y-8 animate-in fade-in duration-300">
            {/* Navigation Header */}
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => {
                  setLookupResult(null);
                  setReviewMode(false);
                }}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-700 hover:text-[#0B2516] bg-white hover:bg-stone-50 border border-stone-200 px-3.5 py-1.5 rounded-full shadow-xs transition-colors cursor-pointer"
              >
                ← Search Another Order
              </button>
              {reviewMode && (
                <span className="px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-amber-100 text-amber-900 border border-amber-300 flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                  <span>Review / Preview Mode</span>
                </span>
              )}
            </div>

            {/* Order Overview Banner */}
            <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-md">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-100 pb-5">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs uppercase tracking-wider text-stone-400 font-semibold">
                      Order Located
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-emerald-50 text-emerald-700 border border-emerald-200">
                      Verified
                    </span>
                  </div>
                  <h2 className="font-serif text-xl sm:text-2xl text-stone-900 font-medium mt-1">
                    Order #{lookupResult.order.orderNumber}
                  </h2>
                </div>

                <div className="text-left sm:text-right">
                  <p className="text-xs text-stone-400 uppercase tracking-wider font-semibold">Fulfillment Status</p>
                  <p className="text-sm font-semibold capitalize text-stone-900 mt-0.5">
                    {lookupResult.order.orderStatus?.replace(/_/g, " ") || lookupResult.order.status}
                  </p>
                </div>
              </div>

              {/* Delivery Check Notification */}
              {!lookupResult.order.isDelivered && !reviewMode ? (
                <div className="mt-6 p-5 rounded-2xl bg-amber-50/80 border border-amber-200/80 space-y-4">
                  <div className="flex items-start gap-3 text-amber-900">
                    <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                    <div className="space-y-1 text-xs leading-relaxed">
                      <p className="font-semibold text-sm">Order Is Not Delivered Yet</p>
                      <p>
                        Your order is currently{" "}
                        <strong className="capitalize">
                          {lookupResult.order.orderStatus?.replace(/_/g, " ") || lookupResult.order.status}
                        </strong>
                        . In live customer operations, returns and exchanges are opened once your package is marked as Delivered. You can preview the full return/exchange request form below to review all options.
                      </p>
                    </div>
                  </div>
                  <div className="pt-2 flex flex-wrap gap-3">
                    <button
                      type="button"
                      onClick={() => setReviewMode(true)}
                      className="px-4 py-2.5 bg-[#0B2516] text-[#FAF7F0] text-xs font-semibold uppercase tracking-wider rounded-full hover:bg-[#123822] transition shadow-xs cursor-pointer flex items-center gap-1.5"
                    >
                      <span>Preview Return & Exchange Form</span>
                      <ChevronRight className="w-3.5 h-3.5 text-[#c4a064]" />
                    </button>
                    <Link href={`/profile/orders/${lookupResult.order.orderNumber}`}>
                      <button type="button" className="px-4 py-2.5 bg-white border border-stone-300 text-stone-700 text-xs font-semibold uppercase tracking-wider rounded-full hover:border-[#0B2516] transition cursor-pointer">
                        Track Order Progress
                      </button>
                    </Link>
                    <button
                      type="button"
                      onClick={() => {
                        setLookupResult(null);
                        setReviewMode(false);
                      }}
                      className="px-4 py-2.5 bg-white border border-stone-300 text-stone-700 text-xs font-semibold uppercase tracking-wider rounded-full hover:border-[#0B2516] transition cursor-pointer"
                    >
                      Search Another Order
                    </button>
                  </div>
                </div>
              ) : (
                /* DELIVERED ORDER RETURN/EXCHANGE FORM */
                <form onSubmit={handleSubmitRequest} className="mt-8 space-y-8">
                  {reviewMode && !lookupResult.order.isDelivered && (
                    <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2.5">
                        <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                        <p className="leading-relaxed">
                          <strong>Preview Mode Active:</strong> This order is in status <span className="font-semibold uppercase">{lookupResult.order.orderStatus}</span>. Item selection and all options are unlocked so you can test and review the full return and exchange form.
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setReviewMode(false)}
                        className="text-xs font-semibold underline text-amber-900 hover:text-amber-700 shrink-0 cursor-pointer"
                      >
                        Exit Preview
                      </button>
                    </div>
                  )}

                  {/* Request Type Selector */}
                  <div className="space-y-3">
                    <label className="block text-xs font-semibold uppercase tracking-[0.15em] text-stone-900">
                      Step 1: Choose Request Type
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <label
                        className={`cursor-pointer rounded-2xl border p-4.5 flex items-start gap-3.5 transition-all ${
                          requestType === "EXCHANGE"
                            ? "border-[#0B2516] bg-[#0B2516]/5 shadow-xs"
                            : "border-stone-200 bg-stone-50/50 hover:bg-stone-50"
                        }`}
                      >
                        <input
                          type="radio"
                          name="reqType"
                          value="EXCHANGE"
                          checked={requestType === "EXCHANGE"}
                          onChange={() => setRequestType("EXCHANGE")}
                          className="mt-1 text-[#0B2516] focus:ring-[#0B2516]"
                        />
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <RefreshCw className="w-4 h-4 text-[#c4a064]" />
                            <span className="font-semibold text-sm text-stone-900">
                              Exchange for Size or Replacement
                            </span>
                          </div>
                          <p className="text-xs text-stone-500 font-light leading-relaxed">
                            Fastest option. Exchange for another size or replacement item with priority dispatch.
                          </p>
                        </div>
                      </label>

                      <label
                        className={`cursor-pointer rounded-2xl border p-4.5 flex items-start gap-3.5 transition-all ${
                          requestType === "RETURN"
                            ? "border-[#0B2516] bg-[#0B2516]/5 shadow-xs"
                            : "border-stone-200 bg-stone-50/50 hover:bg-stone-50"
                        }`}
                      >
                        <input
                          type="radio"
                          name="reqType"
                          value="RETURN"
                          checked={requestType === "RETURN"}
                          onChange={() => setRequestType("RETURN")}
                          className="mt-1 text-[#0B2516] focus:ring-[#0B2516]"
                        />
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <RotateCcw className="w-4 h-4 text-[#c4a064]" />
                            <span className="font-semibold text-sm text-stone-900">
                              Return for Refund or Store Credit
                            </span>
                          </div>
                          <p className="text-xs text-stone-500 font-light leading-relaxed">
                            Return item for wallet credit (instant) or direct bank transfer upon QC approval.
                          </p>
                        </div>
                      </label>
                    </div>
                  </div>

                  {/* Step 2: Item Selection */}
                  <div className="space-y-3">
                    <label className="block text-xs font-semibold uppercase tracking-[0.15em] text-stone-900">
                      Step 2: Select Items & Quantity
                    </label>

                    <div className="divide-y divide-stone-200 border border-stone-200 rounded-2xl overflow-hidden bg-white">
                      {lookupResult.order.items.map((item) => {
                        const isEligible = reviewMode
                          ? true
                          : (requestType === "EXCHANGE"
                              ? item.exchangeEligible && item.remainingEligibleQuantity > 0
                              : item.returnEligible && item.remainingEligibleQuantity > 0);

                        const maxSelectableQty =
                          item.remainingEligibleQuantity > 0
                            ? item.remainingEligibleQuantity
                            : item.orderedQuantity || 1;

                        const isSelected = Boolean(selectedItems[item.productId]);

                        return (
                          <div
                            key={item.productId}
                            className={`p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors ${
                              isSelected ? "bg-[#0B2516]/5" : isEligible ? "hover:bg-stone-50/80" : "bg-stone-50/50 opacity-70"
                            }`}
                          >
                            <div className="flex items-start sm:items-center gap-4">
                              <input
                                type="checkbox"
                                checked={isSelected}
                                disabled={!isEligible}
                                onChange={() => handleToggleItem(item.productId, maxSelectableQty)}
                                className="mt-1 sm:mt-0 h-4 w-4 rounded border-stone-300 text-[#0B2516] focus:ring-[#0B2516] cursor-pointer disabled:cursor-not-allowed"
                              />

                              {item.image ? (
                                <div className="relative w-14 h-14 rounded-xl overflow-hidden border border-stone-200 shrink-0 bg-stone-100">
                                  <Image
                                    src={item.image}
                                    alt={item.name}
                                    fill
                                    className="object-cover"
                                  />
                                </div>
                              ) : null}

                              <div className="space-y-1">
                                <p className="font-serif text-stone-900 text-sm font-medium">
                                  {item.name}
                                </p>
                                <p className="text-xs text-stone-500">
                                  Purchased: {item.orderedQuantity} {item.unitPrice ? `· ₹${formatPrice(item.unitPrice)}` : ""}{" "}
                                  {item.size ? `· Size: ${item.size}` : ""}
                                </p>
                                <div className="flex flex-wrap items-center gap-2 pt-0.5">
                                  <span className="text-[11px] font-medium text-stone-600">
                                    Eligible Qty: <strong className="text-[#0B2516]">{reviewMode && item.remainingEligibleQuantity === 0 ? item.orderedQuantity : item.remainingEligibleQuantity}</strong>
                                  </span>
                                  {!isEligible && !reviewMode && (
                                    <span className="text-[10px] text-rose-600 font-medium bg-rose-50 px-2 py-0.5 rounded-full border border-rose-100">
                                      {item.reason || "Not eligible for this request type"}
                                    </span>
                                  )}
                                  {reviewMode && !lookupResult.order.isDelivered && (
                                    <span className="text-[10px] text-amber-700 font-medium bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                                      Unlocked for Review
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>

                            {/* Quantity Selector */}
                            {isSelected && (
                              <div className="flex items-center gap-2 self-end sm:self-center pl-8 sm:pl-0">
                                <span className="text-xs font-semibold text-stone-600">Qty:</span>
                                <select
                                  value={selectedItems[item.productId] || 1}
                                  onChange={(e) => handleQtyChange(item.productId, Number(e.target.value))}
                                  className="px-3 py-1.5 border border-stone-300 rounded-lg text-xs bg-white focus:outline-none focus:border-[#0B2516]"
                                >
                                  {Array.from(
                                    { length: maxSelectableQty },
                                    (_, idx) => idx + 1
                                  ).map((q) => (
                                    <option key={q} value={q}>
                                      {q}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Step 3: Reason & Explanation */}
                  <div className="space-y-4">
                    <label className="block text-xs font-semibold uppercase tracking-[0.15em] text-stone-900">
                      Step 3: Reason for {requestType === "EXCHANGE" ? "Exchange" : "Return"} <span className="text-rose-500">*</span>
                    </label>

                    <select
                      value={reasonCode}
                      onChange={(e) => setReasonCode(e.target.value)}
                      required
                      className="w-full px-4 py-3 bg-stone-50 border border-stone-300 rounded-xl text-xs sm:text-sm text-stone-900 focus:outline-none focus:border-[#0B2516] focus:ring-1 focus:ring-[#0B2516]"
                    >
                      <option value="">Select a reason…</option>
                      {availableReasons.map((r) => (
                        <option key={r._id || r.code} value={r.code || r._id}>
                          {r.title}
                        </option>
                      ))}
                      <option value="SIZE_FIT">Size / Fit issue</option>
                      <option value="DEFECTIVE_DAMAGED">Defective / Damaged in transit</option>
                      <option value="DIFFERENT_FROM_PICTURE">Different from picture or description</option>
                      <option value="QUALITY_ISSUE">Quality did not meet expectations</option>
                      <option value="OTHER">Other reason</option>
                    </select>

                    <div>
                      <label className="block text-xs font-medium text-stone-700 mb-1">
                        Detailed Description / Additional Notes
                      </label>
                      <textarea
                        rows={3}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Please share any helpful details regarding why you'd like to return or exchange..."
                        className="w-full p-3 bg-stone-50 border border-stone-300 rounded-xl text-xs sm:text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:border-[#0B2516]"
                      />
                    </div>
                  </div>

                  {/* Step 4: Exchange specifics OR Return Refund specifics */}
                  {requestType === "EXCHANGE" ? (
                    <div className="p-5 rounded-2xl bg-[#0B2516]/5 border border-[#0B2516]/20 space-y-4">
                      <h3 className="font-semibold text-xs uppercase tracking-wider text-[#0B2516] flex items-center gap-2">
                        <RefreshCw className="w-4 h-4 text-[#c4a064]" />
                        <span>Exchange Preferences</span>
                      </h3>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-medium text-stone-700 mb-1">
                            Preferred Size / Variant
                          </label>
                          <input
                            type="text"
                            placeholder="e.g. Size 2.6, Large, or Silver finish"
                            value={preferredSize}
                            onChange={(e) => setPreferredSize(e.target.value)}
                            className="w-full px-3.5 py-2.5 bg-white border border-stone-300 rounded-xl text-xs sm:text-sm text-stone-900 focus:outline-none focus:border-[#0B2516]"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-stone-700 mb-1">
                            Specific Requests for Stylist
                          </label>
                          <input
                            type="text"
                            placeholder="e.g. Please expedite before wedding"
                            value={exchangeNotes}
                            onChange={(e) => setExchangeNotes(e.target.value)}
                            className="w-full px-3.5 py-2.5 bg-white border border-stone-300 rounded-xl text-xs sm:text-sm text-stone-900 focus:outline-none focus:border-[#0B2516]"
                          />
                        </div>
                      </div>
                    </div>
                  ) : (
                    /* RETURN REFUND METHOD */
                    <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200 space-y-4">
                      <h3 className="font-semibold text-xs uppercase tracking-wider text-stone-900 flex items-center gap-2">
                        <Wallet className="w-4 h-4 text-[#c4a064]" />
                        <span>Refund Disbursement Preference</span>
                      </h3>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <label
                          className={`cursor-pointer rounded-xl border p-3.5 flex items-start gap-3 transition-all ${
                            refundMethod === "VOUCHER"
                              ? "border-[#0B2516] bg-white shadow-xs"
                              : "border-stone-200 bg-white/60"
                          }`}
                        >
                          <input
                            type="radio"
                            name="refundMethod"
                            checked={refundMethod === "VOUCHER"}
                            onChange={() => setRefundMethod("VOUCHER")}
                            className="mt-0.5 text-[#0B2516] focus:ring-[#0B2516]"
                          />
                          <div className="text-xs">
                            <p className="font-semibold text-stone-900">
                              Store Credit / Gift Voucher (Instant)
                            </p>
                            <p className="text-stone-500 font-light mt-0.5">
                              Issued immediately once reverse pickup is received & inspected.
                            </p>
                          </div>
                        </label>

                        <label
                          className={`cursor-pointer rounded-xl border p-3.5 flex items-start gap-3 transition-all ${
                            refundMethod === "BANK"
                              ? "border-[#0B2516] bg-white shadow-xs"
                              : "border-stone-200 bg-white/60"
                          }`}
                        >
                          <input
                            type="radio"
                            name="refundMethod"
                            checked={refundMethod === "BANK"}
                            onChange={() => setRefundMethod("BANK")}
                            className="mt-0.5 text-[#0B2516] focus:ring-[#0B2516]"
                          />
                          <div className="text-xs">
                            <p className="font-semibold text-stone-900">
                              Direct Bank Transfer / UPI
                            </p>
                            <p className="text-stone-500 font-light mt-0.5">
                              Credited within 5–7 banking days after QC verification.
                            </p>
                          </div>
                        </label>
                      </div>

                      {refundMethod === "BANK" && (
                        <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs">
                          <div className="sm:col-span-2">
                            <label className="block text-stone-700 font-medium mb-1">
                              UPI ID (Faster Settlement)
                            </label>
                            <input
                              type="text"
                              placeholder="e.g. yourname@okhdfcbank or 9876543210@paytm"
                              value={upiId}
                              onChange={(e) => setUpiId(e.target.value)}
                              className="w-full px-3 py-2 bg-white border border-stone-300 rounded-lg text-xs text-stone-900 focus:outline-none focus:border-[#0B2516]"
                            />
                          </div>
                          <div>
                            <label className="block text-stone-700 font-medium mb-1">
                              Account Holder Name
                            </label>
                            <input
                              type="text"
                              placeholder="Full Name as in Bank"
                              value={accountHolder}
                              onChange={(e) => setAccountHolder(e.target.value)}
                              className="w-full px-3 py-2 bg-white border border-stone-300 rounded-lg text-xs text-stone-900 focus:outline-none focus:border-[#0B2516]"
                            />
                          </div>
                          <div>
                            <label className="block text-stone-700 font-medium mb-1">
                              Bank Account Number
                            </label>
                            <input
                              type="text"
                              placeholder="Account Number"
                              value={accountNumber}
                              onChange={(e) => setAccountNumber(e.target.value)}
                              className="w-full px-3 py-2 bg-white border border-stone-300 rounded-lg text-xs text-stone-900 focus:outline-none focus:border-[#0B2516]"
                            />
                          </div>
                          <div>
                            <label className="block text-stone-700 font-medium mb-1">
                              IFSC Code
                            </label>
                            <input
                              type="text"
                              placeholder="e.g. HDFC0001234"
                              value={ifscCode}
                              onChange={(e) => setIfscCode(e.target.value.toUpperCase())}
                              className="w-full px-3 py-2 bg-white border border-stone-300 rounded-lg text-xs text-stone-900 focus:outline-none focus:border-[#0B2516] font-mono uppercase"
                            />
                          </div>
                          <div>
                            <label className="block text-stone-700 font-medium mb-1">
                              Bank Name
                            </label>
                            <input
                              type="text"
                              placeholder="e.g. HDFC Bank, ICICI Bank"
                              value={bankName}
                              onChange={(e) => setBankName(e.target.value)}
                              className="w-full px-3 py-2 bg-white border border-stone-300 rounded-lg text-xs text-stone-900 focus:outline-none focus:border-[#0B2516]"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Step 5: Optional Evidence Link */}
                  <div className="space-y-2">
                    <label className="block text-xs font-semibold uppercase tracking-[0.15em] text-stone-900">
                      Step 4: Evidence / Photo Link (Optional)
                    </label>
                    <input
                      type="url"
                      placeholder="Paste image or unboxing video URL (Google Drive, Cloudinary, Imgur, etc.)"
                      value={evidenceUrl}
                      onChange={(e) => setEvidenceUrl(e.target.value)}
                      className="w-full px-4 py-3 bg-stone-50 border border-stone-300 rounded-xl text-xs sm:text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:border-[#0B2516]"
                    />
                    <p className="text-[11px] text-stone-400">
                      For damaged or defective pieces, providing an unboxing picture/video accelerates QC verification.
                    </p>
                  </div>

                  {submitError && (
                    <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start gap-3">
                      <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                      <p className="leading-relaxed">{submitError}</p>
                    </div>
                  )}

                  {/* Submission CTAs */}
                  <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-stone-200">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="flex-1 py-4 bg-[#0B2516] hover:bg-[#123822] text-[#FAF7F0] text-xs uppercase tracking-[0.2em] font-semibold rounded-xl transition-all shadow-md hover:shadow-lg disabled:opacity-60 flex items-center justify-center gap-2 cursor-pointer"
                    >
                      {submitting ? (
                        <>
                          <RefreshCw className="w-4 h-4 animate-spin text-[#c4a064]" />
                          <span>Submitting Request…</span>
                        </>
                      ) : (
                        <>
                          <CheckCircle2 className="w-4 h-4 text-[#c4a064]" />
                          <span>Submit {requestType === "EXCHANGE" ? "Exchange" : "Return"} Request</span>
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setLookupResult(null);
                        setReviewMode(false);
                      }}
                      disabled={submitting}
                      className="px-6 py-4 border border-stone-300 hover:border-stone-400 text-stone-700 text-xs uppercase tracking-wider font-semibold rounded-xl bg-white hover:bg-stone-50 transition cursor-pointer"
                    >
                      Cancel / New Search
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}

        {/* STEP 3: SUBMITTED SUCCESS CARD */}
        {submittedReturn && (
          <div className="bg-white rounded-3xl border border-stone-200 shadow-2xl p-8 sm:p-12 text-center max-w-xl mx-auto space-y-6 animate-in zoom-in-95 duration-300">
            <div className="w-20 h-20 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <span className="px-3 py-1 rounded-full bg-[#0B2516]/5 border border-[#c4a064]/30 text-[#0B2516] text-[10px] font-bold tracking-widest uppercase">
                Request Registered
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl text-stone-900 font-medium pt-1">
                {submittedReturn.requestType === "EXCHANGE" ? "Exchange" : "Return"} Request Confirmed
              </h2>
              <p className="text-xs text-stone-500 font-mono">
                Request ID: <strong className="text-stone-900">{submittedReturn.returnNumber}</strong>
              </p>
            </div>

            <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200/80 text-left text-xs text-stone-600 space-y-2.5">
              <p className="font-semibold text-stone-900 flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-[#c4a064]" />
                <span>Next Steps for Reverse Pickup:</span>
              </p>
              <ul className="list-disc list-inside space-y-1 text-[11px] leading-relaxed pl-1 text-stone-600">
                <li>Keep the item safe in its original packaging with all tags attached.</li>
                <li>Our concierge logistics partner will contact you within 24–48 hours to collect the parcel.</li>
                <li>Upon receiving and QC verification at our Jaipur atelier, your replacement will be dispatched or refund disbursed.</li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
              <button
                onClick={() => {
                  setSubmittedReturn(null);
                  setLookupResult(null);
                  setOrderNumber("");
                  setIdentifier("");
                }}
                className="px-6 py-3 bg-[#0B2516] text-[#FAF7F0] text-xs uppercase tracking-wider font-semibold rounded-full hover:bg-[#123822] transition shadow-md"
              >
                Lookup Another Order
              </button>
              <Link href="/">
                <button className="w-full sm:w-auto px-6 py-3 border border-stone-300 hover:border-stone-400 text-stone-700 text-xs uppercase tracking-wider font-semibold rounded-full bg-white transition">
                  Return to Home
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* RETURN & EXCHANGE POLICY MODAL */}
      {isPolicyModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="policy-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setIsPolicyModalOpen(false)}
        >
          <div
            className="relative w-full max-w-2xl max-h-[90vh] bg-white rounded-3xl shadow-2xl border border-stone-200 flex flex-col overflow-hidden animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-5 bg-[#0B2516] text-[#FAF7F0] border-b border-[#0B2516]">
              <div className="space-y-0.5">
                <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#c4a064]">
                  Maison Mairii Jewels
                </span>
                <h2 id="policy-modal-title" className="font-serif text-xl sm:text-2xl font-medium tracking-wide">
                  Return & Exchange Policy
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setIsPolicyModalOpen(false)}
                className="p-2 rounded-full text-stone-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                aria-label="Close policy modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Summary Highlights Banner */}
            <div className="grid grid-cols-3 gap-2 px-6 py-3 bg-[#FAF7F0] border-b border-stone-200 text-center">
              <div className="space-y-0.5">
                <p className="text-[10px] uppercase tracking-wider text-stone-500 font-semibold">Window</p>
                <p className="text-xs font-bold text-stone-900">5 Days</p>
              </div>
              <div className="space-y-0.5 border-x border-stone-200 px-2">
                <p className="text-[10px] uppercase tracking-wider text-stone-500 font-semibold">Pickup</p>
                <p className="text-xs font-bold text-stone-900">Doorstep Reverse</p>
              </div>
              <div className="space-y-0.5">
                <p className="text-[10px] uppercase tracking-wider text-stone-500 font-semibold">Refund Mode</p>
                <p className="text-xs font-bold text-stone-900">Voucher / Bank</p>
              </div>
            </div>

            {/* Modal Scrollable Content */}
            <div className="overflow-y-auto p-6 sm:p-8 space-y-6 text-xs sm:text-sm text-stone-600 leading-relaxed">
              {/* Section 1: Overview */}
              <div className="space-y-2">
                <h3 className="font-semibold text-stone-900 text-sm flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#c4a064]" />
                  <span>1. 5-Day Return & Exchange Guarantee</span>
                </h3>
                <p>
                  At Mairii Jewels, each piece is handcrafted to perfection. If you are not completely satisfied with your order, you can raise an exchange or return request within <strong className="text-stone-900">5 days of delivery</strong> directly on this page using your Order Number and phone or email.
                </p>
              </div>

              {/* Section 2: Condition & Quality Check */}
              <div className="space-y-2">
                <h3 className="font-semibold text-stone-900 text-sm flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#c4a064]" />
                  <span>2. Eligibility & Quality Standards</span>
                </h3>
                <ul className="list-disc list-inside space-y-1.5 pl-1 text-stone-600">
                  <li>Jewellery must be <strong className="text-stone-900">unused, unworn, and unwashed</strong> with zero signs of wear, perfume scent, or makeup residue.</li>
                  <li>The tamper-proof security tag, brand barcode tag, and authenticity guarantee card must remain fully attached and intact.</li>
                  <li>Items must be returned inside the original protective velvet box / pouch and packed in the outer transit box.</li>
                </ul>
              </div>

              {/* Section 3: Reverse Pickup & Logistics */}
              <div className="space-y-2">
                <h3 className="font-semibold text-stone-900 text-sm flex items-center gap-2">
                  <Truck className="w-4 h-4 text-[#c4a064]" />
                  <span>3. Hassle-Free Reverse Pickup</span>
                </h3>
                <p>
                  Once your request is registered, our concierge courier partners will attempt pickup from your doorstep within <strong className="text-stone-900">24 to 48 working hours</strong>. You will receive SMS & WhatsApp tracking updates. Please ensure the parcel is securely packed and sealed before handing it to the pickup courier executive.
                </p>
              </div>

              {/* Section 4: Refund Timelines & Methods */}
              <div className="space-y-2">
                <h3 className="font-semibold text-stone-900 text-sm flex items-center gap-2">
                  <Wallet className="w-4 h-4 text-[#c4a064]" />
                  <span>4. Refund & Settlement Processing</span>
                </h3>
                <p>
                  Once the parcel reaches our Jaipur inspection atelier and passes quality check (within 48 hours of receipt):
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200">
                    <p className="font-semibold text-stone-900 text-xs mb-1">Mairii Gift Card / Store Voucher</p>
                    <p className="text-[11px] text-stone-500">
                      Disbursed immediately via email/WhatsApp. 100% value with no deduction, valid for 1 year across all collections.
                    </p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200">
                    <p className="font-semibold text-stone-900 text-xs mb-1">Bank / UPI / Original Mode</p>
                    <p className="text-[11px] text-stone-500">
                      Processed directly to your verified bank account or source card within 7 to 10 working days.
                    </p>
                  </div>
                </div>
              </div>

              {/* Section 5: Unboxing Video for Damaged/Defective claims */}
              <div className="space-y-2 p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80">
                <h3 className="font-semibold text-amber-900 text-xs uppercase tracking-wider flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>Mandatory Unboxing Video for Transit Claims</span>
                </h3>
                <p className="text-xs text-amber-800 leading-relaxed">
                  In the rare event that an item arrives broken, damaged, or with a missing gemstone, an uncut, continuous 360° unboxing video recorded while opening the outer courier parcel is required. Please attach a link (Google Drive / cloud link) in your request or share it directly with our team on WhatsApp.
                </p>
              </div>

              {/* Section 6: Non-Returnable Items */}
              <div className="space-y-2">
                <h3 className="font-semibold text-stone-900 text-sm flex items-center gap-2">
                  <FileText className="w-4 h-4 text-[#c4a064]" />
                  <span>5. Non-Returnable Items</span>
                </h3>
                <p className="text-xs text-stone-600">
                  The following items cannot be returned or exchanged:
                </p>
                <ul className="list-disc list-inside space-y-1 pl-1 text-[11px] text-stone-500">
                  <li>Custom-engraved or personalized bespoke jewellery.</li>
                  <li>Items bought during "Final Clearance" or special flash sale events marked as Non-Returnable.</li>
                  <li>Pierced earrings whose hygiene safety sticker has been opened or tampered with.</li>
                </ul>
              </div>

              {/* Section 7: Concierge Contact */}
              <div className="pt-2 border-t border-stone-200">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 rounded-2xl bg-stone-50 border border-stone-200">
                  <div>
                    <p className="font-semibold text-stone-900 text-xs">Need Direct Support?</p>
                    <p className="text-[11px] text-stone-500">Our customer concierge is available Mon-Sat, 10 AM - 7 PM IST</p>
                  </div>
                  <a
                    href="https://wa.me/919566571655?text=Hi%20Mairii%20Jewels,%20I%20have%20a%20question%20regarding%20Return%20and%20Exchange."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-semibold rounded-full shadow-sm transition-colors shrink-0"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>WhatsApp Concierge</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="sticky bottom-0 z-10 flex items-center justify-end gap-3 px-6 py-4 bg-stone-50 border-t border-stone-200">
              <button
                type="button"
                onClick={() => setIsPolicyModalOpen(false)}
                className="px-6 py-2.5 bg-[#0B2516] hover:bg-[#123822] text-[#FAF7F0] text-xs uppercase tracking-wider font-semibold rounded-xl transition shadow-sm cursor-pointer"
              >
                Close Policy
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </main>
  );
}

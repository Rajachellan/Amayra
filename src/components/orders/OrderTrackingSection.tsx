"use client";

import React, { useEffect, useState } from "react";
import { ExternalLink, Loader2, Package, Truck } from "lucide-react";
import { api } from "@/lib/api";

type TrackingActivity = {
  date: string;
  status: string;
  activity: string;
  location?: string;
};

type TrackingPayload = {
  orderStatus: string;
  shiprocket: {
    awbCode?: string;
    courierName?: string;
    trackingUrl?: string;
    lastStatus?: string;
  } | null;
  tracking: {
    awbCode: string;
    currentStatus?: string;
    courierName?: string;
    expectedDelivery?: string;
    trackingUrl?: string;
    activities: TrackingActivity[];
    message?: string;
  } | null;
  message?: string;
};

const FULFILLMENT_STEPS = [
  { key: "paid", label: "Confirmed" },
  { key: "processing", label: "Preparing" },
  { key: "shipped", label: "Shipped" },
  { key: "delivered", label: "Delivered" },
] as const;

function stepIndex(status: string) {
  const idx = FULFILLMENT_STEPS.findIndex((s) => s.key === status);
  if (idx >= 0) return idx;
  if (status === "paid") return 0;
  return 0;
}

function formatDate(value?: string) {
  if (!value) return null;
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return value;
  return d.toLocaleDateString(undefined, { weekday: "short", day: "numeric", month: "short", year: "numeric" });
}

export function OrderTrackingSection({ orderId, orderStatus }: { orderId: string; orderStatus: string }) {
  const [data, setData] = useState<TrackingPayload | null>(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    setLoading(true);
    api<TrackingPayload>(`/orders/${encodeURIComponent(orderId)}/tracking`)
      .then((res) => {
        setData(res);
        setErr("");
      })
      .catch((e) => setErr(e instanceof Error ? e.message : "Could not load tracking"))
      .finally(() => setLoading(false));
  }, [orderId]);

  const activeStep = stepIndex(data?.orderStatus ?? orderStatus);
  const tracking = data?.tracking;
  const trackUrl = tracking?.trackingUrl ?? data?.shiprocket?.trackingUrl;
  const hasAwb = Boolean(data?.shiprocket?.awbCode ?? tracking?.awbCode);

  return (
    <div className="mb-8 border-t pt-8">
      <div className="flex items-center gap-3 mb-6">
        <Truck className="w-5 h-5 text-brand-gold" />
        <h2 className="text-sm font-bold uppercase tracking-widest text-gray-500">Delivery tracking</h2>
      </div>

      <div className="mb-8">
        <div className="flex justify-between gap-2">
          {FULFILLMENT_STEPS.map((step, i) => {
            const done = i <= activeStep;
            const current = i === activeStep;
            return (
              <div key={step.key} className="flex-1 text-center">
                <div
                  className={`mx-auto mb-2 h-2 rounded-full transition-colors ${
                    done ? "bg-brand-gold" : "bg-gray-100"
                  } ${current ? "ring-2 ring-brand-gold/30" : ""}`}
                />
                <p className={`text-[9px] uppercase tracking-widest font-bold ${done ? "text-brand-emerald" : "text-gray-300"}`}>
                  {step.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {loading ? (
        <div className="flex items-center gap-3 text-sm text-gray-500 py-4">
          <Loader2 className="w-5 h-5 animate-spin text-brand-emerald" />
          Loading tracking…
        </div>
      ) : err ? (
        <p className="text-sm text-red-500">{err}</p>
      ) : !hasAwb ? (
        <div className="flex items-start gap-4 p-5 bg-gray-50 border border-gray-100">
          <Package className="w-5 h-5 text-brand-gold shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-bold text-brand-emerald uppercase tracking-widest mb-1">Order confirmed</p>
            <p className="text-sm text-gray-600">
              {data?.message ?? "Your payment is received. We will share tracking details once your order ships."}
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            {tracking?.currentStatus && (
              <div>
                <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-1">Current status</p>
                <p className="font-bold text-brand-emerald uppercase tracking-wide">{tracking.currentStatus}</p>
              </div>
            )}
            {tracking?.expectedDelivery && (
              <div>
                <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-1">Expected delivery</p>
                <p className="font-bold text-brand-emerald">{formatDate(tracking.expectedDelivery)}</p>
              </div>
            )}
            {(tracking?.courierName ?? data?.shiprocket?.courierName) && (
              <div>
                <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-1">Courier</p>
                <p className="font-bold text-gray-700">{tracking?.courierName ?? data?.shiprocket?.courierName}</p>
              </div>
            )}
            {tracking?.awbCode && (
              <div>
                <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-1">AWB / tracking ID</p>
                <p className="font-mono text-gray-700">{tracking.awbCode}</p>
              </div>
            )}
          </div>

          {trackUrl && (
            <a
              href={trackUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand-gold hover:text-brand-emerald transition-colors"
            >
              Track on courier site <ExternalLink className="w-4 h-4" />
            </a>
          )}

          {tracking?.message && !tracking.activities.length && (
            <p className="text-sm text-gray-500">{tracking.message}</p>
          )}

          {tracking?.activities && tracking.activities.length > 0 && (
            <div>
              <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-4">Shipment updates</p>
              <ul className="space-y-4 border-l-2 border-brand-gold/30 pl-5">
                {tracking.activities.map((a, i) => (
                  <li key={`${a.date}-${i}`} className="relative">
                    <span className="absolute -left-[1.35rem] top-1.5 w-2 h-2 rounded-full bg-brand-gold" />
                    <p className="text-sm font-medium text-brand-emerald">{a.activity || a.status}</p>
                    <p className="text-[10px] text-gray-400 uppercase tracking-widest mt-0.5">
                      {[a.location, a.date].filter(Boolean).join(" · ")}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

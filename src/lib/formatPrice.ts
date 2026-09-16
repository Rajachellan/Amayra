/**
 * Utility functions for rounding and formatting currency without decimals across the application.
 */

export function roundOff(amount: number | string | null | undefined): number {
  const num = typeof amount === "number" ? amount : Number(amount) || 0;
  return Math.round(num);
}

export function formatPrice(amount: number | string | null | undefined): string {
  const rounded = roundOff(amount);
  return rounded.toLocaleString("en-IN", { maximumFractionDigits: 0 });
}

export function formatCurrency(amount: number | string | null | undefined): string {
  return `₹${formatPrice(amount)}`;
}

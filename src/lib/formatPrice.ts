/**
 * Utility functions for rounding and formatting currency without decimals across the application.
 */

export function roundOff(amount: number | string | null | undefined): number {
  if (amount == null || amount === "") return 0;
  let num: number;
  if (typeof amount === "string") {
    const cleaned = amount.replace(/[^0-9.-]/g, "");
    num = parseFloat(cleaned);
  } else {
    num = amount;
  }
  return isNaN(num) ? 0 : Math.round(num);
}

export function formatPrice(amount: number | string | null | undefined): string {
  const rounded = roundOff(amount);
  return rounded.toLocaleString("en-IN", { maximumFractionDigits: 0 });
}

export function formatCurrency(amount: number | string | null | undefined): string {
  return `₹${formatPrice(amount)}`;
}

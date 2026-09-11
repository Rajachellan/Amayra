/**
 * Formats a price value:
 * Converts decimal values to a whole number first (truncates the decimal part),
 * then formats and displays the final amount in decimal format with 2 decimal places (.00).
 *
 * Example:
 *   2300.45 -> treated as 2300 -> displayed as "2,300.00"
 *   2300    -> treated as 2300 -> displayed as "2,300.00"
 */
export function formatPrice(value: number | string | null | undefined): string {
  if (value == null || value === "") return "0.00";

  let num: number;
  if (typeof value === "string") {
    const cleaned = value.replace(/[^0-9.-]/g, "");
    num = parseFloat(cleaned);
  } else {
    num = value;
  }

  if (isNaN(num)) return "0.00";

  // Convert the value to a whole number first (truncating any decimals)
  const wholeNumber = Math.floor(Math.abs(num)) * (num < 0 ? -1 : 1);

  // Display the final amount in decimal format (with .00)
  return wholeNumber.toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

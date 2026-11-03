export const JEWELLERY_COLORS = [
  "Antique/Metallic",
  "Black",
  "Blue/ Teal",
  "Golden/Yellow",
  "Green/Mint",
  "Grey/Smokey",
  "Ivory/White",
  "Multicolour",
  "Orange/Peach",
  "Pink/Magenta",
  "Purple/Voilet/Lavendar",
  "Red/ Maroon",
] as const;

export const CATALOG_PRICE_RANGES = [
  { label: "Under ₹5,000", min: 0, max: 5000 },
  { label: "₹5,000 - ₹10,000", min: 5000, max: 10000 },
  { label: "₹10,000 - ₹20,000", min: 10000, max: 20000 },
  { label: "Over ₹20,000", min: 20000, max: 1000000 },
];

export function matchesCanonicalColor(
  productColor: string | undefined | null,
  targetColor: string
): boolean {
  if (!productColor) return false;
  const p = productColor.trim().toLowerCase();
  const t = targetColor.toLowerCase();

  if (p === t) return true;

  switch (targetColor) {
    case "Antique/Metallic":
      return p.includes("antique") || p.includes("metallic");
    case "Black":
      return p.includes("black") || p.includes("oxidised");
    case "Blue/ Teal":
      return (
        p.includes("blue") ||
        p.includes("teal") ||
        p.includes("sapphire") ||
        p.includes("turquoise")
      );
    case "Golden/Yellow":
      return p.includes("gold") || p.includes("golden") || p.includes("yellow");
    case "Green/Mint":
      return p.includes("green") || p.includes("mint") || p.includes("emerald");
    case "Grey/Smokey":
      return (
        p.includes("grey") ||
        p.includes("gray") ||
        p.includes("silver") ||
        p.includes("smok")
      );
    case "Ivory/White":
      return (
        p.includes("white") ||
        p.includes("ivory") ||
        p.includes("pearl") ||
        p.includes("kundan")
      );
    case "Multicolour":
      return p.includes("multi") || p.includes("navratan");
    case "Orange/Peach":
      return (
        p.includes("orange") ||
        p.includes("peach") ||
        p.includes("coral") ||
        p.includes("rust")
      );
    case "Pink/Magenta":
      return (
        p.includes("pink") ||
        p.includes("magenta") ||
        p.includes("blush") ||
        p.includes("rose") ||
        p.includes("rani")
      );
    case "Purple/Voilet/Lavendar":
      return (
        p.includes("purple") ||
        p.includes("violet") ||
        p.includes("voilet") ||
        p.includes("lavender") ||
        p.includes("lavendar") ||
        p.includes("lilac") ||
        p.includes("mauve")
      );
    case "Red/ Maroon":
      return (
        p.includes("red") ||
        p.includes("maroon") ||
        p.includes("ruby") ||
        p.includes("wine") ||
        p.includes("crimson")
      );
    default:
      return p.includes(t);
  }
}


import type { Product } from "@/types";
import { resolveMediaUrl } from "./apiBase";
import type { ProductDetail, ProductListItem } from "./api/shop";

function effectiveStock(p: { stock?: number; variants?: { stock?: number }[] }): number {
  const base = typeof p.stock === "number" && !Number.isNaN(p.stock) ? p.stock : 0;
  if (base > 0) return base;
  if (!p.variants?.length) return base;
  return p.variants.reduce((sum, v) => sum + (typeof v.stock === "number" ? v.stock : 0), 0);
}

function sizesFromVariants(
  v: ProductDetail["variants"]
): string[] | undefined {
  if (!v?.length) return undefined;
  const s = v
    .map((x) => x.attributes && (x.attributes as Record<string, string>).size)
    .filter((x): x is string => Boolean(x));
  return s.length ? [...new Set(s)] : undefined;
}

function categoryName(
  c: ProductListItem["category"]
): string {
  if (c && typeof c === "object" && "name" in c) return c.name;
  if (typeof c === "string") return c;
  return "Jewellery";
}

function categorySlug(c: ProductListItem["category"]): string | undefined {
  if (c && typeof c === "object" && "slug" in c) return (c as { slug: string }).slug;
  return undefined;
}

function subCategoryName(s: ProductListItem["subCategory"]): string | undefined {
  if (s && typeof s === "object" && "name" in s) return s.name;
  if (typeof s === "string") return s;
  return undefined;
}

function subCategorySlug(s: ProductListItem["subCategory"]): string | undefined {
  if (s && typeof s === "object" && "slug" in s) return (s as { slug: string }).slug;
  return undefined;
}

export function mapListItemToProduct(p: ProductListItem): Product {
  const img = p.images?.[0];
  const hasSale = p.salePrice != null && p.salePrice < p.price;
  const created = p.createdAt ? new Date(p.createdAt) : null;
  const isNewArrival =
    created != null && !Number.isNaN(created.getTime())
      ? Date.now() - created.getTime() < 45 * 24 * 60 * 60 * 1000
      : false;

  return {
    id: p._id,
    slug: p.slug,
    name: p.name,
    price: hasSale ? (p.salePrice as number) : p.price,
    oldPrice: hasSale ? p.price : undefined,
    image: resolveMediaUrl(img),
    category: categoryName(p.category),
    categorySlug: categorySlug(p.category),
    subCategory: subCategoryName(p.subCategory),
    subCategorySlug: subCategorySlug(p.subCategory),
    description: p.shortDescription || p.description || "",
    color: p.color,
    material: p.material,
    weight: p.weight,
    stock: effectiveStock(p),
    isNewArrival,
    isBestSeller: (p.soldCount ?? 0) >= 40,
    tags: p.tags,
  };
}

export function mapDetailToProduct(p: ProductDetail): Product {
  return {
    ...mapListItemToProduct(p),
    description: p.description || p.shortDescription || "",
    sizes: sizesFromVariants(p.variants),
    lookbooks: Array.isArray(p.lookbooks)
      ? p.lookbooks.map((lb: any) => ({
          id: lb._id,
          title: lb.title || lb.name || "Lookbook",
          slug: lb.slug,
          images: Array.isArray(lb.images) ? lb.images.map((u: string) => resolveMediaUrl(u)) : undefined,
          coverImage: resolveMediaUrl(lb.coverImage),
        }))
      : undefined,
  };
}

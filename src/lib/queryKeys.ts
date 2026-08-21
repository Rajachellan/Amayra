export const queryKeys = {
  products: {
    all: ["products"] as const,
    list: (filters: Record<string, unknown>) => ["products", "list", filters] as const,
    detail: (slug: string) => ["products", "detail", slug] as const,
    spotlight: ["products", "spotlight"] as const,
  },
  categories: {
    all: ["categories"] as const,
    tree: ["categories", "tree"] as const,
  },
  collections: {
    all: ["collections"] as const,
    detail: (slug: string) => ["collections", slug] as const,
  },
  lookbooks: {
    all: ["lookbooks"] as const,
  },
  occasions: {
    all: ["occasions"] as const,
  },
  coupons: ["coupons"] as const,
  homepage: ["homepage", "settings"] as const,
};

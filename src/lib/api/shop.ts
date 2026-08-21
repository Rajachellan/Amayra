import { getPublicApiUrl } from "../apiBase";

async function fetchJson<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${getPublicApiUrl()}${path}`, {
    ...init,
    headers: { Accept: "application/json", ...init?.headers },
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || res.statusText);
  }
  return res.json() as Promise<T>;
}

export type CategoryTreeNode = {
  _id: string;
  name: string;
  slug: string;
  image?: string;
  featured: boolean;
  order: number;
  active: boolean;
  children: CategoryTreeNode[];
};

export type CategoryDoc = {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  featured: boolean;
  showOnHomepage: boolean;
  order: number;
  active: boolean;
};

export type BannerDoc = {
  _id: string;
  title: string;
  subtitle?: string;
  image: string;
  mobileImageUrl?: string;
  link?: string;
  redirectLink?: string;
  buttonText?: string;
  ctaLabel?: string;
  order: number;
};

export type PromoLayoutMode =
  | "one_banner"
  | "two_equal"
  | "three_cards"
  | "one_large_two_small"
  | "one_large_four_small"
  | "grid_2x2"
  | "grid_3x2"
  | "masonry"
  | "carousel"
  | "horizontal_scroll"
  | "auto_responsive";

export type PromotionLayoutDoc = {
  layout: PromoLayoutMode;
  columns?: number;
  gap?: number;
  aspectRatio?: "auto" | "16/9" | "16/7" | "4/3" | "1/1" | "3/4";
  cardHeight?: string;
  borderRadius?: string;
  shadow?: boolean;
  sectionPadding?: string;
  backgroundColor?: string;
  containerWidth?: "full" | "boxed";
  autoHeight?: boolean;
  equalHeight?: boolean;
  responsive?: {
    desktop?: { columns?: number; gap?: number; cardSize?: string; stackOrder?: string };
    tablet?: { columns?: number; gap?: number; cardSize?: string; stackOrder?: string };
    mobile?: { columns?: number; gap?: number; cardSize?: string; stackOrder?: string };
  };
};

export type PromotionalBannerDoc = {
  _id: string;
  name?: string;
  title?: string;
  subtitle?: string;
  description?: string;
  badge?: string;
  image: string;
  mobileImage?: string;
  backgroundImage?: string;
  icon?: string;
  buttonText?: string;
  buttonUrl?: string;
  couponCode?: string;
  backgroundColor?: string;
  textColor?: string;
  borderStyle?: "none" | "thin" | "gold" | "luxury";
  animation?: "none" | "fade" | "slide" | "zoom" | "glow";
  priority?: number;
  link: string;
  order: number;
};

export type PromotionsPayload = {
  layout: PromotionLayoutDoc;
  cards: PromotionalBannerDoc[];
};

export type CartPricingResponse = {
  subtotal: number;
  automaticDiscount: number;
  couponDiscount: number;
  totalDiscount: number;
  taxableValue: number;
  gstRate: number;
  gstAmount: number;
  finalAmount: number;
  currency: string;
  appliedCoupon: {
    code: string;
    discountType: string;
    discountValue: number;
    discountAmount: number;
  } | null;
  discountSlab: {
    minimumCartValue: number;
    discountPercentage: number;
  };
  upsell: {
    available: boolean;
    nextThreshold?: number;
    currentCartValue?: number;
    amountToUnlock?: number;
    currentDiscountPercentage?: number;
    nextDiscountPercentage?: number;
    currentPayable?: number;
    newPayable?: number;
    additionalPayment?: number;
  };
  freeGift?: {
    enabled: boolean;
    threshold: number;
    name: string;
    unlocked: boolean;
  };
  items: Array<{
    productId: string;
    name: string;
    slug: string;
    unitPrice: number;
    quantity: number;
    lineTotal: number;
    image?: string;
  }>;
};

export type AnnouncementDoc = {
  _id: string;
  text: string;
  link?: string;
  order: number;
};

export type HomepageSettingsDoc = {
  showBanner: boolean;
  showCollections: boolean;
  showCategories: boolean;
  showLookbooks: boolean;
  showBlogSection: boolean;
};

export type CollectionDoc = {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  featured: boolean;
  order: number;
};

export type LookbookHotspotProduct = {
  _id: string;
  name: string;
  slug?: string;
  price?: number;
  salePrice?: number;
  images?: string[];
  sku?: string;
};

export type LookbookHotspotDoc = {
  _id?: string;
  product: string | LookbookHotspotProduct;
  x: number;
  y: number;
  label?: string;
};

export type LookbookGalleryImage = {
  _id?: string;
  imageUrl: string;
  mobileImageUrl?: string;
  alt?: string;
  title?: string;
  description?: string;
  sortOrder?: number;
  isFeatured?: boolean;
  hotspots?: LookbookHotspotDoc[];
};

export type LookbookDoc = {
  _id: string;
  title: string;
  slug: string;
  coverImage?: string;
  shortDescription?: string;
  description?: string;
  featured: boolean;
  status?: string;
  images?: string[];
  galleryImages?: LookbookGalleryImage[];
};

export type ProductListItem = {
  _id: string;
  slug: string;
  name: string;
  shortDescription?: string;
  description?: string;
  images: string[];
  price: number;
  salePrice?: number;
  stock: number;
  category?: { name: string; slug: string } | string;
  subCategory?: { name: string; slug: string } | string;
  soldCount?: number;
  trendingScore?: number;
  featured?: boolean;
  trending?: boolean;
  masterpiece?: boolean;
  createdAt?: string;
  color?: string;
  material?: string;
  weight?: string;
  sku?: string;
  length?: string;
  breadth?: string;
  height?: string;
  specifications?: Record<string, string>;
  keyHighlights?: string[];
  productFeatures?: Array<{ title?: string; description?: string } | string>;
  careLabel?: string[];
  stylingTips?: string[];
  stylingInspiration?: string[];
  tags?: string[];
};

export type ProductDetail = ProductListItem & {
  collections?: { name: string; slug: string }[];
  occasions?: { name: string; slug: string }[];
  lookbooks?: { title: string; slug: string; images?: string[]; coverImage?: string }[];
  variants?: { name: string; sku?: string; stock: number; price?: number; salePrice?: number; attributes?: Record<string, string> }[];
  seoTitle?: string;
  seoDescription?: string;
};

export type ProductListResponse = {
  items: ProductListItem[];
  total: number;
  page: number;
  pages: number;
};

export type HomepageSectionPublic = {
  _id: string;
  sectionType: string;
  title: string;
  order: number;
  referenceType: string;
  referenceIds: string[];
  items: unknown[];
};

export interface PublicCouponDoc {
  _id: string;
  code: string;
  title?: string;
  description?: string;
  discountType: "percentage" | "fixed";
  discountValue: number;
  minCartValue?: number;
  maxDiscount?: number;
}

export const shopApi = {
  coupons: () => fetchJson<PublicCouponDoc[]>("/coupons/public"),
  banners: () => fetchJson<BannerDoc[]>("/banners"),
  promotionalBanners: async () => {
    const data = await fetchJson<PromotionsPayload | PromotionalBannerDoc[]>("/promotional-banners");
    if (Array.isArray(data)) {
      return {
        layout: {
          layout: "auto_responsive" as const,
          gap: 16,
          aspectRatio: "16/7" as const,
          borderRadius: "1rem",
          shadow: true,
          containerWidth: "boxed" as const,
          autoHeight: true,
          equalHeight: true,
          sectionPadding: "2rem 0",
          backgroundColor: "transparent",
        },
        cards: data,
      } satisfies PromotionsPayload;
    }
    return data;
  },
  promotionLayout: () => fetchJson<PromotionLayoutDoc>("/promotion-layout"),
  announcements: () => fetchJson<AnnouncementDoc[]>("/announcements"),
  homepageSettings: () => fetchJson<HomepageSettingsDoc>("/homepage-settings"),
  categoriesTree: () => fetchJson<CategoryTreeNode[]>("/categories/tree"),
  categories: (q?: { featured?: boolean }) => {
    const sp = new URLSearchParams();
    if (q?.featured) sp.set("featured", "true");
    const qs = sp.toString();
    return fetchJson<CategoryDoc[]>(`/categories${qs ? `?${qs}` : ""}`);
  },
  collections: (q?: { featured?: boolean }) => {
    const sp = new URLSearchParams();
    if (q?.featured) sp.set("featured", "true");
    const qs = sp.toString();
    return fetchJson<CollectionDoc[]>(`/collections${qs ? `?${qs}` : ""}`);
  },
  lookbooks: (q?: { featured?: boolean }) => {
    const sp = new URLSearchParams();
    if (q?.featured) sp.set("featured", "true");
    const qs = sp.toString();
    return fetchJson<LookbookDoc[]>(`/lookbooks${qs ? `?${qs}` : ""}`);
  },
  occasions: () => fetchJson<{ _id: string; name: string; slug: string }[]>("/occasions"),
  homepageSections: () => fetchJson<HomepageSectionPublic[]>("/homepage-sections"),
  products: (q: Record<string, string | number | undefined>) => {
    const sp = new URLSearchParams();
    Object.entries(q).forEach(([k, v]) => {
      if (v !== undefined && v !== "") sp.set(k, String(v));
    });
    return fetchJson<ProductListResponse>(`/products?${sp.toString()}`);
  },
  productBySlug: (slug: string) => fetchJson<ProductDetail>(`/products/${encodeURIComponent(slug)}`),
  blogs: (q?: { page?: number; limit?: number }) => {
    const sp = new URLSearchParams();
    if (q?.page) sp.set("page", String(q.page));
    if (q?.limit) sp.set("limit", String(q.limit));
    const qs = sp.toString();
    return fetchJson<{ items: any[]; total: number }>(`/blogs${qs ? `?${qs}` : ""}`);
  },
  calculateCart: (items: Array<{ slug?: string; productId?: string; quantity: number }>, couponCode?: string) =>
    fetchJson<CartPricingResponse>("/cart/calculate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items, couponCode }),
    }),
  validateCartBatch: (items: Array<{ id?: string; slug?: string }>) =>
    fetchJson<Array<{ id: string; slug: string; stock: number; price: number; valid: boolean }>>(
      "/cart/validate-batch",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items }),
      }
    ),
};

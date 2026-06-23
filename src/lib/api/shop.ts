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

export type PromotionalBannerDoc = {
  _id: string;
  image: string;
  mobileImage?: string;
  link: string;
  order: number;
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

export type LookbookDoc = {
  _id: string;
  title: string;
  slug: string;
  coverImage?: string;
  description?: string;
  featured: boolean;
  images?: string[];
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

export const shopApi = {
  banners: () => fetchJson<BannerDoc[]>("/banners"),
  promotionalBanners: () => fetchJson<PromotionalBannerDoc[]>("/promotional-banners"),
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
  homepageSections: () => fetchJson<HomepageSectionPublic[]>("/homepage-sections"),
  products: (q: Record<string, string | number | undefined>) => {
    const sp = new URLSearchParams();
    Object.entries(q).forEach(([k, v]) => {
      if (v !== undefined && v !== "") sp.set(k, String(v));
    });
    return fetchJson<ProductListResponse>(`/products?${sp.toString()}`);
  },
  productBySlug: (slug: string) => fetchJson<ProductDetail>(`/products/${encodeURIComponent(slug)}`),
};

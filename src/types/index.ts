import { StaticImageData } from "next/image";

export interface Product {
  id: string;
  /** URL slug from CMS; preferred for product links. */
  slug?: string;
  name: string;
  price: number;
  oldPrice?: number;
  image: string | StaticImageData;
  category: string;
  /** Populated from API for routing (e.g. `/category/:slug`). */
  categorySlug?: string;
  subCategory?: string;
  subCategorySlug?: string;
  description: string;
  color?: string;
  isNew?: boolean;
  isBestSeller?: boolean;
  isNewArrival?: boolean;
  discount?: string;
  rating?: number;
  reviews?: number;
  material?: string;
  weight?: string;
  sizes?: string[];
  tags?: string[];
  stock: number;
  lookbooks?: {
    id: string;
    title: string;
    slug: string;
    images?: string[];
    coverImage?: string;
  }[];
}

export interface CartItem extends Product {
  quantity: number;
}

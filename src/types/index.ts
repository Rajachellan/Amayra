import { StaticImageData } from "next/image";

export interface Product {
  id: string;
  name: string;
  price: number;
  oldPrice?: number;
  image: string | StaticImageData;
  category: string;
  subCategory?: string;
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
  stock: number;
}

export interface CartItem extends Product {
  quantity: number;
}

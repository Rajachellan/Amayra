export interface NavItem {
  name: string;
  href: string;
  description?: string;
  previewImage?: string;
  subItems?: {
    name: string;
    href: string;
    description?: string;
  }[];
}

export const navigationData: NavItem[] = [
  {
    name: "Shop",
    href: "/category/all",
    description: "Explore our complete gallery of handcrafted brilliance.",
    previewImage: "/images/luxury/shop-preview.png",
    subItems: [
      { name: "New Arrivals", href: "/category/new" },
      { name: "Best Sellers", href: "/category/all?filter=best" },
      { name: "Limited Edition", href: "/category/all?filter=limited" },
      { name: "View All", href: "/category/all" },
    ],
  },
  {
    name: "Collections",
    href: "/category/necklaces",
    description: "Curated series of heritage and modern masterpieces.",
    previewImage: "/images/luxury/collections-preview.png",
    subItems: [
      { name: "Heritage Series", href: "/category/necklaces?sub=Kundan" },
      { name: "Victorian Classics", href: "/category/necklaces?sub=Victorian" },
      { name: "Temple Art", href: "/category/necklaces?sub=Temple" },
      { name: "Modern Minimal", href: "/category/earrings?sub=Daily Wear" },
    ],
  },
  {
    name: "Bridal",
    href: "/category/bridal",
    description: "Designed for timeless wedding elegance and royal charm.",
    previewImage: "/images/luxury/bridal-preview.png",
    subItems: [
      { name: "Royal Sets", href: "/category/bridal?sub=Heritage Sets" },
      { name: "Mathapattis", href: "/category/bridal?sub=Maang Tikka" },
      { name: "Nose Pins", href: "/category/bridal?sub=Maang Tikka" },
      { name: "Waist Belts", href: "/category/bridal?sub=Heritage Sets" },
    ],
  },
  {
    name: "New Arrivals",
    href: "/category/new",
  },
  {
    name: "About",
    href: "/about",
  },
];


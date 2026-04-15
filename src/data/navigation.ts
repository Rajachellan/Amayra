export interface NavItem {
  name: string;
  href: string;
  subItems?: {
    name: string;
    href: string;
    description?: string;
  }[];
}

export const navigationData: NavItem[] = [
  {
    name: "Shop New",
    href: "/category/new",
    subItems: [
      { name: "New Arrivals", href: "/category/new?filter=isNewArrival" },
      { name: "Best Sellers", href: "/category/new?filter=isBestSeller" },
      { name: "Instagram Reels", href: "/category/reels", description: "Shop the latest looks from our reels" },
    ],
  },
  {
    name: "Necklaces",
    href: "/category/necklaces",
    subItems: [
      { name: "Kundan Sets", href: "/category/necklaces?sub=Kundan" },
      { name: "Victorian Diamond Sets", href: "/category/necklaces?sub=Victorian" },
      { name: "South Indian Sets", href: "/category/necklaces?sub=South Indian" },
      { name: "Temple Jewellery", href: "/category/necklaces?sub=Temple" },
      { name: "Handcrafted Hasli", href: "/category/necklaces?sub=South Indian" },
      { name: "Antique Necklace Sets", href: "/category/necklaces?sub=Kundan" },
      { name: "American Diamond Sets", href: "/category/necklaces?sub=Victorian" },
    ],
  },
  {
    name: "Earrings",
    href: "/category/earrings",
    subItems: [
      { name: "Daily Wear Studs", href: "/category/earrings?sub=Daily Wear" },
      { name: "Jhumkas", href: "/category/earrings?sub=Jhumkas" },
      { name: "Chandbalis", href: "/category/earrings?sub=Chandbalis" },
      { name: "Ear Chains", href: "/category/earrings?sub=Jhumkas" },
      { name: "Hoops", href: "/category/earrings?sub=Hoops" },
    ],
  },
  {
    name: "Bridal Couture",
    href: "/category/bridal",
    subItems: [
      { name: "Bridal Sets", href: "/category/bridal?sub=Heritage Sets" },
      { name: "Maang Tikka", href: "/category/bridal?sub=Maang Tikka" },
      { name: "Heritage Collections", href: "/category/bridal?sub=Heritage Sets" },
      { name: "Nose Pins", href: "/category/bridal?sub=Maang Tikka" },
    ],
  },
  {
    name: "Brooches & More",
    href: "/category/other",
    subItems: [
      { name: "Brooches", href: "/category/other?sub=Brooches" },
      { name: "Bracelets", href: "/category/other?sub=Bracelets" },
      { name: "Bangles", href: "/category/other?sub=Temple" },
      { name: "Rings", href: "/category/other?sub=Solitaire" },
    ],
  },
  {
    name: "Shop by Color",
    href: "/category/all",
    subItems: [
      { name: "Emerald Green", href: "/category/all?color=Emerald" },
      { name: "Ruby Red", href: "/category/all?color=Ruby" },
      { name: "Sapphire Blue", href: "/category/all?color=Blue" },
      { name: "Classic Gold", href: "/category/all?color=Gold" },
      { name: "Silver & White", href: "/category/all?color=White" },
    ],
  },
  {
    name: "Gifting",
    href: "/category/all",
    subItems: [
      { name: "Gifts Under ₹999", href: "/category/all?maxPrice=999" },
      { name: "Gifts Under ₹1999", href: "/category/all?maxPrice=1999" },
      { name: "Luxury Gifting", href: "/category/all?minPrice=5000" },
      { name: "Bestseller Gifts", href: "/category/all?filter=isBestSeller" },
    ],
  },
];

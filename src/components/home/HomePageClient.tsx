"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { shopApi, type HomepageSettingsDoc } from "@/lib/api/shop";
import { Hero } from "@/components/home/Hero";
import { SmallNavigationMenu } from "@/components/home/SmallNavigateMenu";
import { OffersSection } from "@/components/home/OfferBanner";
import { NecklacesSection } from "@/components/home/NecklacesSection";
import { CategorySection } from "@/components/home/MainCategorySection";
import { SignatureBlocks } from "@/components/home/SignatureBlocks";
import { MoodCategories } from "@/components/home/MoodCategories";
import { ProductSpotlight } from "@/components/home/ProductSpotlight";
/** Below-fold: load only when needed so heavy assets stay out of the initial bundle */
const PreviewBanner = dynamic(
  () => import("@/components/home/PreviewBanner").then((m) => m.PreviewBanner),
  { ssr: false }
);
const SilverCollection = dynamic(
  () => import("@/components/home/SilverCollection").then((m) => m.SilverCollection),
  { ssr: false }
);
const Craftsmanship = dynamic(
  () => import("@/components/home/Craftsmanship").then((m) => m.Craftsmanship),
  { ssr: false }
);
const PremiumHighlights = dynamic(
  () => import("@/components/home/PremiumHighlights").then((m) => m.PremiumHighlights),
  { ssr: false }
);
const MagazineGallery = dynamic(
  () => import("@/components/home/MagazineGallery").then((m) => m.MagazineGallery),
  { ssr: false }
);
const CollectionStory = dynamic(
  () => import("@/components/home/CollectionStory").then((m) => m.CollectionStory),
  { ssr: false }
);
const WhyChooseUs = dynamic(
  () => import("@/components/about/WhyChooseUs").then((m) => m.WhyChooseUs),
  { ssr: false }
);
const FAQ = dynamic(() => import("@/components/home/FAQ"), { ssr: false });
const ReviewsSlider = dynamic(
  () => import("@/components/home/ReviewsSlider").then((m) => m.ReviewsSlider),
  { ssr: false }
);

const DEFAULT_SETTINGS: HomepageSettingsDoc = {
  showBanner: true,
  showCollections: true,
  showCategories: true,
  showLookbooks: true,
  showBlogSection: true,
};

export function HomePageClient() {
  const [settings, setSettings] = useState<HomepageSettingsDoc>(DEFAULT_SETTINGS);

  useEffect(() => {
    shopApi
      .homepageSettings()
      .then(setSettings)
      .catch(() => setSettings(DEFAULT_SETTINGS));
  }, []);

  return (
    <>
      {settings.showBanner ? <Hero /> : null}
      <SmallNavigationMenu />
      <OffersSection />
      <NecklacesSection />
      {settings.showCategories ? <CategorySection /> : null}
      {settings.showCollections ? <SignatureBlocks /> : null}
      <MoodCategories />
      <ProductSpotlight />
      <PreviewBanner />
      <SilverCollection />
      <Craftsmanship />
      <PremiumHighlights />
      {settings.showBlogSection ? <MagazineGallery /> : null}
      {settings.showLookbooks ? <CollectionStory /> : null}
      <WhyChooseUs />
      <FAQ />
      <ReviewsSlider />
    </>
  );
}

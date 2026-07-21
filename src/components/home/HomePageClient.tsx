"use client";

import { useEffect, useState } from "react";
import { shopApi, type HomepageSettingsDoc } from "@/lib/api/shop";
import { Hero } from "@/components/home/Hero";
import { SmallNavigationMenu } from "@/components/home/SmallNavigateMenu";
import { OffersSection } from "@/components/home/OfferBanner";
import { CategorySection } from "@/components/home/MainCategorySection";
import { SignatureBlocks } from "@/components/home/SignatureBlocks";
import { CelebritySpotlight } from "@/components/home/CelebritySpotlight";
import { InstagramGrid } from "@/components/home/InstagramGrid";
import { MoodCategories } from "@/components/home/MoodCategories";
import { ProductSpotlight } from "@/components/home/ProductSpotlight";
import { Craftsmanship } from "@/components/home/Craftsmanship";
import { PremiumHighlights } from "@/components/home/PremiumHighlights";
import { MagazineGallery } from "@/components/home/MagazineGallery";
import { PreviewBanner } from "@/components/home/PreviewBanner";
import { CollectionStory } from "@/components/home/CollectionStory";
import { WhyChooseUs } from "@/components/about/WhyChooseUs";
import { SilverCollection } from "@/components/home/SilverCollection";
import FAQ from "@/components/home/FAQ";
import { ReviewsSlider } from "@/components/home/ReviewsSlider";
import { CompanyBanners } from "@/components/home/CompanyBanners";
import { PromotionalBannersStrip } from "@/components/home/PromotionalBannersStrip";

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
      <PromotionalBannersStrip />
      {settings.showCategories ? <CategorySection /> : null}
      {settings.showCollections ? <SignatureBlocks /> : null}
      {/* <CelebritySpotlight /> */}
      {/* <InstagramGrid /> */}
      <MoodCategories />
      <ProductSpotlight />
      <PreviewBanner />
      <Craftsmanship />
      <PremiumHighlights />
      {settings.showBlogSection ? <MagazineGallery /> : null}
      {settings.showLookbooks ? <CollectionStory /> : null}
      <WhyChooseUs />
      <SilverCollection />
      <FAQ />
      <ReviewsSlider />
      <CompanyBanners />
    </>
  );
}

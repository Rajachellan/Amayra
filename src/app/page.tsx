import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/home/Hero";
import { MoodCategories } from "@/components/home/MoodCategories";
import { ProductSpotlight } from "@/components/home/ProductSpotlight";
import { Craftsmanship } from "@/components/home/Craftsmanship";
import { ReviewsSlider } from "@/components/home/ReviewsSlider";
import { InstagramGrid } from "@/components/home/InstagramGrid";
import { PremiumHighlights } from "@/components/home/PremiumHighlights";
import { MagazineGallery } from "@/components/home/MagazineGallery";
import { ClientStories } from "@/components/home/ClientStories";
import { LimitedOfferBanner } from "@/components/home/LimitedOfferBanner";
import { PreviewBanner } from "@/components/home/PreviewBanner"
export default function Home() {
  return (
    <main className="min-h-screen bg-background selection:bg-champagne/30 overflow-x-hidden">
      <Navbar />

      {/* 1. Hero Experience */}
      <Hero />

      {/* 2. Shop by Mood - Aesthetic Entry Points */}
      <MoodCategories />

      {/* 3. Featured Jewelry Spotlight - Single Masterpiece Story */}
      <ProductSpotlight />

      {/* 4. Craftsmanship Section - Heritage & Process */}
      <Craftsmanship />

      {/* 6. Instagram Reels Section - 3x2 Video Grid (Hover Play) */}
      <InstagramGrid />

      {/* 7. Why Choose Us - Premium Highlights */}
      <PremiumHighlights />

      {/* 8. Editorial Gallery - Magazine-style Spreads */}
      <MagazineGallery />

      {/* 9. Client Stories - Testimonials with Imagery */}
      <ClientStories />
      <PreviewBanner />
      {/* 10. Limited Offer Banner - Selective CTA */}
      <LimitedOfferBanner />
      {/* 5. Customer Reviews - Voices of Elegance (Auto-Scroll) */}
      <ReviewsSlider />
      <Footer />
    </main>
  );
}


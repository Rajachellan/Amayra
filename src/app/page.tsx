import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/home/Hero";
import { Collections } from "@/components/home/Collections";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { CategoryCircularNav } from "@/components/home/CategoryCircularNav";
import { OccasionSection } from "@/components/home/OccasionSection";
import { InstagramBridalCarousel } from "@/components/home/InstagramBridalCarousel";
import { CelebritySection } from "@/components/home/CelebritySection";
import { BridalSection } from "@/components/home/BridalSection";
import { BridalGallery } from "@/components/home/BridalGallery";
import { OffersSection } from "@/components/home/OffersSection";
import { CollectionStory } from "@/components/home/CollectionStory";
import { StylingGuide } from "@/components/home/StylingGuide";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      {/* 1. Hero Section - Luxurious & Visually Striking */}
      <Hero />

      {/* 2. Offers Section - Immediate Value Perception */}
      <OffersSection />

      {/* 3. Quick Category Navigation - Effortless Entry */}
      <CategoryCircularNav />

      {/* 4. Instagram Bridal Video Section - Modern Reel Feedback */}
      <InstagramBridalCarousel />

      {/* 5. Featured Collections - Elegant Portals */}
      <Collections />

      {/* 6. Bridal Image Gallery - Masonry Visual Richness */}
      <BridalGallery />

      {/* 7. Shop by Occasion */}
      <OccasionSection />

      {/* 8. Immersive Bridal Showcase / Luxe Banner */}
      <BridalSection />

      {/* 9. Celebrity Endorsements */}
      <CelebritySection />

      {/* 10. Heritage Story & Heritage Grid */}
      <CollectionStory />

      {/* 11. Why Choose Us Benefits */}
      <WhyChooseUs />

      {/* 12. Styling & Inspiration */}
      <StylingGuide />

      <Footer />
    </main>
  );
}

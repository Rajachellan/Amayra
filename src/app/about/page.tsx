"use client";

import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AboutHero } from "@/components/about/AboutHero";
import { BrandStory } from "@/components/about/BrandStory";
import { OurVision } from "@/components/about/OurVision";
import { Craftsmanship } from "@/components/about/Craftsmanship";
import { Materials } from "@/components/about/Materials";
import { SignatureCollections } from "@/components/about/SignatureCollections";
import { WhyChooseUs } from "@/components/about/WhyChooseUs";
import { Testimonials } from "@/components/about/Testimonials";
import { StoreExperience } from "@/components/about/StoreExperience";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />
      
      <div className="relative">
        <AboutHero />
        
        <div id="our-story" className="relative z-10 space-y-0">
          <BrandStory />
          <OurVision />
          <Craftsmanship />
          <Materials />
          {/* <SignatureCollections /> */}
          <WhyChooseUs />
          {/* <Testimonials /> */}
          {/* <StoreExperience /> */}
        </div>
      </div>

      <Footer />
    </main>
  );
}

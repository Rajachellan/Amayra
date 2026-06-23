import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HomePageClient } from "@/components/home/HomePageClient";

export default function Home() {
  return (
    <main className="min-h-screen bg-background selection:bg-champagne/30 overflow-x-hidden">
      <Navbar />
      <HomePageClient />
      <Footer />
    </main>
  );
}

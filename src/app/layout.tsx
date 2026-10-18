import React from "react";
import { Playfair_Display, Inter, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { Metadata } from "next";
import { AppProviders } from "@/components/AppProviders";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://mairiijewels.com"),
  title: {
    default: "MaiRii | Premium Imitation Statement Jewellery",
    template: "%s | MaiRii Jewellery",
  },
  description:
    "Exquisite premium artificial jewellery for your special moments. Experience high-end luxury with MaiRii.",
  keywords: [
    "MaiRii",
    "MaiRii Jewels",
    "premium imitation statement jewellery",
    "imitation statement jewellery",
    "statement jewellery",
    "premium artificial jewellery",
    "artificial jewellery",
    "luxury jewellery",
    "imitation jewellery",
    "bridal jewellery",
    "kundan jewellery",
    "polki necklaces",
    "choker sets",
    "Indian wedding jewellery",
  ],
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "MaiRii | Premium Imitation Statement Jewellery",
    description:
      "Exquisite premium artificial jewellery for your special moments. Experience high-end luxury with MaiRii.",
    url: "https://mairiijewels.com",
    siteName: "MaiRii",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MaiRii | Premium Imitation Statement Jewellery",
    description:
      "Exquisite premium artificial jewellery for your special moments. Experience high-end luxury with MaiRii.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://assets.mairiijewels.com" />
        <link rel="dns-prefetch" href="https://assets.mairiijewels.com" />
        <link rel="preconnect" href="https://images.unsplash.com" />
      </head>
      <body
        className={`${playfair.variable} ${inter.variable} ${cormorant.variable} min-h-full flex flex-col`}
        suppressHydrationWarning
      >
        <AppProviders>
          {children}
        </AppProviders>
      </body>
    </html>
  );
}

import React from "react";
import { Playfair_Display, Inter, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { Metadata } from "next";
import Script from "next/script";
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
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon-48x48.png", sizes: "48x48", type: "image/png" },
      { url: "/icon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/icon-144x144.png", sizes: "144x144", type: "image/png" },
      { url: "/icon-192x192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
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
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-29ZP7RZ7SE"
          strategy="afterInteractive"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-29ZP7RZ7SE');
            `,
          }}
        />
        <Script
          id="microsoft-clarity"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(c,l,a,r,i,t,y){
                  c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                  t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                  y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "z3nnx30lcj");
            `,
          }}
        />
      </body>
    </html>
  );
}

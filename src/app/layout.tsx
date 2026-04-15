import type { Metadata } from "next";
import { Playfair_Display, Montserrat } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: "Gems of Shree Aarna | Premium Luxury Jewellery",
  description: "Exquisite gold, diamond, and bridal jewellery for your special moments. Experience luxury with Gems of Shree Aarna.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <body className={`${playfair.variable} ${montserrat.variable} min-h-full flex flex-col`}>
        <CartProvider>
          <WishlistProvider>
            <Toaster position="top-right" />
            {children}
          </WishlistProvider>
        </CartProvider>
      </body>
    </html>
  );
}

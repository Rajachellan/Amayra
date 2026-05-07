import { Playfair_Display, Inter, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import { Metadata } from "next";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Amayra | High-End Luxury Jewellery",
  description: "Exquisite gold, diamond, and bridal jewellery for your special moments. Experience high-end luxury with Amayra.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <body className={`${playfair.variable} ${inter.variable} ${cormorant.variable} min-h-full flex flex-col`}>
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

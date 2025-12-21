import type { Metadata } from "next";
import { Inter, Playfair_Display, Instrument_Serif } from "next/font/google"; // Correct imports
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-instrument",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Utkarsh Bansal | Product & AI",
  description: "A cinematic journey through the mind of a Product Manager.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} ${instrument.variable} antialiased selection:bg-accent-acid/30`}>
        {/* We will add SmoothScroll provider here later if needed, but for now just rendering children */}
        {children}
      </body>
    </html>
  );
}

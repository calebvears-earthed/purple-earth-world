import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { CartProvider } from "@/components/CartProvider";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { LaunchCapture } from "@/components/LaunchCapture";
import { siteUrl } from "@/lib/catalog";
import "./globals.css";

const display = localFont({
  src: [
    { path: "../fonts/playfair-roman.woff2", weight: "400", style: "normal" },
    { path: "../fonts/playfair-roman.woff2", weight: "500", style: "normal" },
    { path: "../fonts/playfair-italic.woff2", weight: "400", style: "italic" },
    { path: "../fonts/playfair-italic.woff2", weight: "500", style: "italic" },
  ],
  variable: "--font-display",
  display: "swap",
  adjustFontFallback: "Times New Roman",
});

const body = localFont({
  src: [
    { path: "../fonts/cormorant-roman.woff2", weight: "400", style: "normal" },
    { path: "../fonts/cormorant-italic.woff2", weight: "400", style: "italic" },
  ],
  variable: "--font-body",
  display: "swap",
  adjustFontFallback: "Times New Roman",
});

const label = localFont({
  src: [
    { path: "../fonts/dm-sans.woff2", weight: "400", style: "normal" },
    { path: "../fonts/dm-sans.woff2", weight: "500", style: "normal" },
  ],
  variable: "--font-label",
  display: "swap",
  adjustFontFallback: "Arial",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Purple Earth",
    template: "%s. Purple Earth",
  },
  description: "Ritual wear from Adelaide. Drop 01 is a 14 day numbered pre-order. Register a size now. Payment opens when checkout is connected.",
  applicationName: "Purple Earth",
  icons: { icon: "/brand/logo/purple-earth-symbol.svg" },
  openGraph: {
    title: "Purple Earth",
    description: "Ritual wear from Adelaide. Drop 01 is a 14 day numbered pre-order.",
    locale: "en_AU",
    type: "website",
    siteName: "Purple Earth",
  },
};

export const viewport: Viewport = {
  themeColor: "#F2EDE4",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-AU" className={`${display.variable} ${body.variable} ${label.variable}`}>
      <body>
        <CartProvider>
          <Header />
          <main id="content">{children}</main>
          <LaunchCapture />
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}

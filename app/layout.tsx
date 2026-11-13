import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, DM_Sans, Playfair_Display } from "next/font/google";
import { CartProvider } from "@/components/CartProvider";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { siteUrl } from "@/lib/catalog";
import "./globals.css";

const display = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const body = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-body",
  display: "swap",
});

const label = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-label",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Purple Earth",
    template: "%s. Purple Earth",
  },
  description: "Ritual wear from Adelaide. Drop 01 is a 14 day numbered pre-order. Prices and words on this preview are drafts.",
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
  themeColor: "#2B1830",
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
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}

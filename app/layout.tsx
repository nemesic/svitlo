import type { Metadata } from "next";
import { Manrope, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import StoreProvider from "./store-provider";
import Preloader from "@/components/Preloader";
import FullscreenNav from "@/components/FullscreenNav";
import AnnouncementMarquee from "@/components/AnnouncementMarquee";
import Header from "@/components/Header";
import ServiceStrip from "@/components/ServiceStrip";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import PreferencesModal from "@/components/PreferencesModal";
import DaylightSync from "@/components/DaylightSync";
import { DAYLIGHT_INLINE_SCRIPT } from "@/lib/daylight";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "SVITŁO — SS26",
  description:
    "SVITŁO — a considered wardrobe of garment-dyed essentials, made in small runs by hand in Kyiv.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      data-light="day"
      suppressHydrationWarning
      className={`${manrope.variable} ${jetbrainsMono.variable} antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: DAYLIGHT_INLINE_SCRIPT }} />
      </head>
      <body>
        <StoreProvider>
          <DaylightSync />
          <Preloader />
          <FullscreenNav />
          <AnnouncementMarquee />
          <Header />
          {children}
          <ServiceStrip />
          <Footer />
          <CartDrawer />
          <PreferencesModal />
        </StoreProvider>
      </body>
    </html>
  );
}

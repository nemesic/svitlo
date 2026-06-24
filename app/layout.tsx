import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import StoreProvider from "./store-provider";
import Preloader from "@/components/Preloader";
import FullscreenNav from "@/components/FullscreenNav";
import AnnouncementMarquee from "@/components/AnnouncementMarquee";
import Header from "@/components/Header";
import ServiceStrip from "@/components/ServiceStrip";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import WishlistDrawer from "@/components/WishlistDrawer";
import PreferencesModal from "@/components/PreferencesModal";
import SmoothScroll from "@/components/SmoothScroll";
import ScrollProgress from "@/components/ScrollProgress";
import CreditBar from "@/components/CreditBar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SVITŁO",
  description:
    "SVITŁO — a considered wardrobe of garment-dyed essentials, made in small runs by hand in Kyiv.",
  formatDetection: { telephone: false, date: false, address: false, email: false },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body>
        <StoreProvider>
          <SmoothScroll />
          <ScrollProgress />
          <Preloader />
          <FullscreenNav />
          <AnnouncementMarquee />
          <Header />
          {children}
          <ServiceStrip />
          <Footer />
          <CreditBar />
          <CartDrawer />
          <WishlistDrawer />
          <PreferencesModal />
        </StoreProvider>
      </body>
    </html>
  );
}
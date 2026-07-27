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
import ChromeHeight from "@/components/ChromeHeight";

/* Подмножества: latin одного мало.
   cyrillic  — без него ВЕСЬ украинский текст сайта уходил в системный
               шрифт: диапазон latin это U+0000-00FF, кириллицы там нет.
               Отсюда и ощущение «дефолтный sans без характера» — в UA
               режиме Geist просто не применялся.
   latin-ext — диапазон U+20AD-20C0, в нём знак гривны ₴ (U+20B4).
               Без него ₴ подхватывался системным шрифтом, вплоть до
               цветного эмодзи-начертания. € (U+20AC) и $ (U+0024)
               в latin есть, они рендерились правильно всегда.

   Списки заданы литералами: next/font читает аргументы статически на
   этапе сборки, вынесенная в константу и раскрытая спредом переменная
   ломает сборку. */
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin", "latin-ext", "cyrillic"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin", "latin-ext", "cyrillic"],
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
          <ChromeHeight />
          <Preloader />
          <FullscreenNav />
          <AnnouncementMarquee />
          <Header />
          {children}
          <ServiceStrip />
          <Footer />
          <CartDrawer />
          <WishlistDrawer />
          <PreferencesModal />
        </StoreProvider>
      </body>
    </html>
  );
}
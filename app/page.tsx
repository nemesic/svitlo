"use client";

import Link from "next/link";
import ArrowLink from "@/components/ArrowLink";
import Cta from "@/components/Cta";
import { useStore } from "@/app/store-provider";
import Eyebrow from "@/components/Eyebrow";
import MonoImage from "@/components/MonoImage";
import ProductCard from "@/components/ProductCard";
import Reveal from "@/components/Reveal";
import { PRODUCTS } from "@/lib/products";
import { catLabel } from "@/lib/i18n";

const CATEGORY_TILES: {
  label: string;
  category: string;
  image?: string;
  video?: string;
}[] = [
  {
    label: "Outerwear",
    category: "Outerwear",
    image: "/images/editorial/Outerwear.webp",
    video: "/images/editorial/Outerwear.mp4",
  },
  {
    label: "T-Shirts",
    category: "Tops",
    image: "/images/editorial/t-shirts-2.webp",
    video: "/images/editorial/t-shirts.mp4?v=2",
  },
  {
    label: "Trousers",
    category: "Bottoms",
    image: "/images/editorial/Trousers.webp",
    video: "/images/editorial/Trousers.mp4",
  },
];

export default function Home() {
  const { t, lang } = useStore();
  const arrivals = PRODUCTS.slice(0, 8);

  return (
    <div>
      <section className="relative grid grid-cols-1 items-stretch overflow-hidden border-b border-line md:overflow-visible md:grid-cols-2">
        <div className="relative z-10 flex min-h-[calc(100svh-99px)] flex-col justify-end gap-7 px-[clamp(20px,5vw,56px)] pb-[clamp(36px,6vw,72px)] pt-[clamp(72px,8vw,88px)] text-white md:min-h-[64vh] md:justify-center md:text-ink">
          <div>
            <h1 className="m-0 text-[clamp(46px,7.5vw,116px)] font-light leading-[0.94] tracking-[-0.035em]">
              {t("hero.title")}
            </h1>
            <p className="mt-[30px] max-w-[480px] text-[17px] leading-[1.6] text-white/85 md:text-ink-soft">
              {t("hero.body")}
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Cta
                href="/shop"
                variant="primary"
                arrow
                className="px-[30px] py-4 font-mono text-xs uppercase tracking-[0.16em]"
              >
                {t("hero.shop")}
              </Cta>
              <Cta
                href="/lookbook"
                variant="bare"
                className="group inline-flex items-center justify-center gap-2.5 border border-ink bg-white px-[30px] py-4 font-mono text-xs uppercase tracking-[0.16em] text-ink transition-colors hover:bg-ink hover:text-bg"
              >
                {t("hero.lookbook")}
                <span
                  aria-hidden
                  className="transition-transform duration-300 ease-out group-hover:translate-x-1 motion-reduce:transition-none"
                >
                  →
                </span>
              </Cta>
            </div>
          </div>
        </div>
        <div className="group absolute inset-0 z-0 overflow-hidden bg-placeholder md:relative md:min-h-[64vh]">
          <video
            className="absolute inset-0 h-full w-full object-cover object-[center_30%]"
            src="/images/editorial/hero.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-hidden
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/65 from-[5%] via-black/30 via-[45%] to-black/10 md:hidden" />
        </div>
      </section>

      <section className="px-[clamp(18px,5vw,40px)] pb-10 pt-[clamp(72px,10vw,120px)]">
        <div className="mb-[42px] flex flex-wrap items-end justify-between gap-6">
          <div>
            <Eyebrow>01 — {t("home.collection")}</Eyebrow>
            <h2 className="mt-3.5 text-[clamp(32px,5vw,64px)] font-light leading-[0.98] tracking-[-0.03em]">
              {t("arrivals.title")}
            </h2>
          </div>
          <ArrowLink href="/shop">
            {t("arrivals.viewAll")} ({PRODUCTS.length})
          </ArrowLink>
        </div>
        <div className="grid grid-cols-2 gap-x-3 gap-y-3.5 md:grid-cols-[repeat(auto-fill,minmax(230px,1fr))]">
          {arrivals.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </section>

      <section className="mt-6 grid grid-cols-1 border-y border-line md:grid-cols-2">
        <div className="group relative min-h-[560px] overflow-hidden bg-placeholder md:min-h-[660px]">
          <video
            className="absolute inset-0 h-full w-full object-cover object-center"
            src="/images/editorial/making.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-hidden
          />
        </div>
        <div className="flex flex-col justify-center border-l border-line px-[clamp(22px,5vw,64px)] py-[clamp(44px,8vw,80px)]">
          <Eyebrow>02 — {t("home.story")}</Eyebrow>
          <h2 className="mt-5 text-[clamp(28px,3.6vw,52px)] font-light leading-[1.06] tracking-[-0.025em]">
            {t("story.title")}
          </h2>
          <p className="mt-6 max-w-[440px] text-base leading-[1.65] text-ink-soft">
            {t("story.body")}
          </p>
          <ArrowLink href="/shop" className="mt-[34px]">
            {t("story.link")}
          </ArrowLink>
        </div>
      </section>

      <section className="px-[clamp(18px,5vw,40px)] pb-10 pt-[clamp(48px,8vw,86px)]">
        <div className="mb-[38px]">
          <Eyebrow>03 — {t("home.categories")}</Eyebrow>
        </div>
        <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-3">
          {CATEGORY_TILES.map((c) => (
            <Reveal key={c.label}>
              <Link
                href={`/shop?category=${encodeURIComponent(c.category)}`}
                className="group block hover:opacity-90"
              >
                <div className="relative aspect-[3/4] overflow-hidden bg-placeholder">
                  {c.image && (
                    <MonoImage
                      src={c.image}
                      alt={c.label}
                      sizes="(max-width: 640px) 100vw, 33vw"
                      zoom={!c.video}
                      className={
                        c.video
                          ? "opacity-0 transition-opacity duration-[400ms] ease-out md:opacity-100 md:group-hover:opacity-0"
                          : ""
                      }
                    />
                  )}
                  {c.video && (
                    <video
                      className="absolute inset-0 h-full w-full object-cover object-center opacity-100 transition-opacity duration-[400ms] ease-out md:opacity-0 md:group-hover:opacity-100"
                      src={c.video}
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="metadata"
                      aria-hidden
                    />
                  )}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/35 transition-colors duration-[400ms] ease-out group-hover:bg-black/15">
                    <span className="text-[24px] uppercase tracking-[-0.02em] text-white transition-transform duration-[400ms] ease-out group-hover:scale-105">
                      {catLabel(c.label, lang)}
                    </span>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
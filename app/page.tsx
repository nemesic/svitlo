"use client";

import Link from "next/link";
import { useStore } from "@/app/store-provider";
import Eyebrow from "@/components/Eyebrow";
import MonoImage from "@/components/MonoImage";
import ProductCard from "@/components/ProductCard";
import Reveal from "@/components/Reveal";
import { PRODUCTS } from "@/lib/products";

const CATEGORY_TILES = [
  { label: "Outerwear", image: "/images/products/cropped-bomber-jacket.jpg" },
  { label: "Knitwear", image: "/images/products/ribbed-merino-crew.jpg" },
  { label: "Trousers", image: "/images/products/wide-pleated-trouser.jpg" },
];

export default function Home() {
  const { t } = useStore();
  const arrivals = PRODUCTS.slice(0, 8);

  return (
    <div>
      {/* HERO */}
      <section className="grid grid-cols-1 items-stretch border-b border-line md:grid-cols-2">
        <div className="flex min-h-[64vh] flex-col justify-between gap-12 px-[clamp(20px,5vw,56px)] py-[clamp(36px,6vw,72px)]">
          <div className="flex items-center gap-3.5 font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
            <span className="h-px w-[34px] bg-[rgba(23,21,15,0.4)]" />
            <span>{t("hero.eyebrow")}</span>
          </div>
          <div>
            <h1 className="m-0 text-[clamp(46px,7.5vw,116px)] font-light leading-[0.94] tracking-[-0.035em]">
              {t("hero.title")}
            </h1>
            <p className="mt-[30px] max-w-[480px] text-[17px] leading-[1.6] text-ink-soft">
              {t("hero.body")}
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                href="/shop"
                className="inline-flex items-center gap-2.5 bg-ink px-[30px] py-4 font-mono text-xs uppercase tracking-[0.16em] text-bg hover:bg-[#2e2a20]"
              >
                {t("hero.shop")} →
              </Link>
              <Link
                href="/lookbook"
                className="inline-flex items-center border border-[rgba(23,21,15,0.25)] px-[30px] py-4 font-mono text-xs uppercase tracking-[0.16em] hover:border-ink"
              >
                {t("hero.lookbook")}
              </Link>
            </div>
          </div>
          <span className="font-mono text-[11px] tracking-[0.16em] text-muted">
            (01 / 04)
          </span>
        </div>
        <div className="group relative min-h-[64vh] overflow-hidden bg-placeholder">
          <MonoImage
            src="/images/editorial/hero.jpg"
            alt="SS26 campaign"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        </div>
      </section>

      {/* NEW ARRIVALS */}
      <section className="px-[clamp(18px,5vw,40px)] pb-10 pt-[clamp(48px,8vw,86px)]">
        <div className="mb-[42px] flex flex-wrap items-end justify-between gap-6">
          <div>
            <Eyebrow>01 — The collection</Eyebrow>
            <h2 className="mt-3.5 text-[clamp(32px,5vw,64px)] font-light leading-[0.98] tracking-[-0.03em]">
              {t("arrivals.title")}
            </h2>
          </div>
          <Link
            href="/shop"
            className="border-b border-ink pb-1 font-mono text-xs uppercase tracking-[0.12em] hover:opacity-55"
          >
            {t("arrivals.viewAll")} →
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-x-3 gap-y-3.5 md:grid-cols-[repeat(auto-fill,minmax(230px,1fr))]">
          {arrivals.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </section>

      {/* EDITORIAL */}
      <section className="mt-6 grid grid-cols-1 border-t border-line md:grid-cols-2">
        <div className="group relative min-h-[520px] overflow-hidden bg-placeholder">
          <MonoImage
            src="/images/editorial/making.jpg"
            alt="Lookbook"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
        <div className="flex flex-col justify-center border-l border-line px-[clamp(22px,5vw,64px)] py-[clamp(44px,8vw,80px)]">
          <Eyebrow>02 — The making</Eyebrow>
          <h2 className="mt-5 text-[clamp(28px,3.6vw,52px)] font-light leading-[1.06] tracking-[-0.025em]">
            {t("making.title")}
          </h2>
          <p className="mt-6 max-w-[440px] text-base leading-[1.65] text-ink-soft">
            {t("making.body")}
          </p>
          <Link
            href="/lookbook"
            className="mt-[34px] w-fit border-b border-ink pb-1 font-mono text-xs uppercase tracking-[0.12em] hover:opacity-55"
          >
            {t("making.link")} →
          </Link>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="px-[clamp(18px,5vw,40px)] pb-10 pt-[clamp(48px,8vw,86px)]">
        <div className="mb-[38px]">
          <Eyebrow>03 — Shop by category</Eyebrow>
        </div>
        <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-3">
          {CATEGORY_TILES.map((c) => (
            <Reveal key={c.label}>
              <Link href="/shop" className="group block hover:opacity-90">
                <div className="relative aspect-[3/4] overflow-hidden bg-placeholder">
                  <MonoImage
                    src={c.image}
                    alt={c.label}
                    sizes="(max-width: 640px) 100vw, 33vw"
                  />
                </div>
                <div className="mt-3.5 flex items-center justify-between">
                  <span className="text-[22px] tracking-[-0.02em]">{c.label}</span>
                  <span className="font-mono text-base text-muted">→</span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}

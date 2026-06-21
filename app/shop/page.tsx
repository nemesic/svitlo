"use client";

import Link from "next/link";
import { useState } from "react";
import { useStore } from "@/app/store-provider";
import ProductCard from "@/components/ProductCard";
import { CATEGORIES, PRODUCTS } from "@/lib/products";

export default function ShopPage() {
  const { t } = useStore();
  const [filter, setFilter] = useState<(typeof CATEGORIES)[number]>("All");

  const visible = PRODUCTS.filter(
    (p) => filter === "All" || p.category === filter,
  );

  return (
    <div>
      <section className="border-b border-line px-[clamp(18px,5vw,40px)] pb-[30px] pt-[clamp(36px,6vw,56px)]">
        <div className="mb-[18px] font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
          <Link href="/" className="hover:opacity-60">
            Home
          </Link>
          <span className="px-2 opacity-40">/</span>
          <span className="text-ink">Shop — All</span>
        </div>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h1 className="m-0 text-[clamp(36px,6vw,76px)] font-light leading-[0.98] tracking-[-0.035em]">
            {t("shop.title")}
          </h1>
          <span className="font-mono text-xs uppercase tracking-[0.1em] text-muted">
            {visible.length} items
          </span>
        </div>
      </section>

      <div className="sticky top-[55px] z-40 flex flex-wrap items-center justify-between gap-5 border-b border-line bg-[rgba(241,239,234,0.92)] px-[clamp(18px,5vw,40px)] py-3.5 backdrop-blur-[10px]">
        <div className="flex flex-wrap gap-[22px]">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setFilter(c)}
              className={`border-b py-1.5 font-mono text-xs uppercase tracking-[0.1em] ${
                filter === c
                  ? "border-ink text-ink"
                  : "border-transparent text-muted"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
        <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-muted">
          Sort — Featured
        </span>
      </div>

      <section className="px-[clamp(18px,5vw,40px)] pb-10 pt-[30px]">
        <div className="grid grid-cols-2 gap-x-3 gap-y-3.5 md:grid-cols-[repeat(auto-fill,minmax(230px,1fr))]">
          {visible.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
}

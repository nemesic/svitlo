"use client";

import Link from "next/link";
import { useState } from "react";
import { useStore } from "@/app/store-provider";
import Gallery from "@/components/Gallery";
import { colourLabel, productName } from "@/lib/i18n";
import type { Product } from "@/lib/products";
import BuyBox from "./buy-box";

export default function ProductView({ product }: { product: Product }) {
  const { t, lang } = useStore();
  const [colour, setColour] = useState(0);
  const active = product.colours[colour];
  const name = productName(product.slug, lang, product.name);

  return (
    <div>
      <div className="px-[clamp(18px,5vw,40px)] pt-[26px] font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
        <Link href="/" className="hover:opacity-60">
          {t("nav.home")}
        </Link>
        <span className="px-2 opacity-40">/</span>
        <Link href="/shop" className="hover:opacity-60">
          {t("nav.shop")}
        </Link>
        <span className="px-2 opacity-40">/</span>
        <span className="text-ink">{name}</span>
      </div>

      <section className="grid grid-cols-1 items-start gap-[clamp(20px,3vw,40px)] px-[clamp(18px,5vw,40px)] pb-10 pt-6 md:grid-cols-2">
        <Gallery
          images={active.images}
          alt={`${name} — ${colourLabel(active.name, lang)}`}
        />
        <BuyBox product={product} colour={colour} onColour={setColour} />
      </section>
    </div>
  );
}

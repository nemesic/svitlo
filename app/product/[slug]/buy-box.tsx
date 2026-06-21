"use client";

import { useState } from "react";
import { useStore } from "@/app/store-provider";
import type { Product } from "@/lib/products";

const SIZES = ["XS", "S", "M", "L", "XL"];

export default function BuyBox({ product }: { product: Product }) {
  const { addItem, price, t } = useStore();
  const [size, setSize] = useState("M");

  return (
    <div className="sticky top-[90px] pl-0 pt-3.5 md:pl-[clamp(0px,4vw,56px)]">
      <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
        SVITŁO — SS26
      </span>
      <h1 className="mt-3.5 text-[clamp(30px,4vw,48px)] font-light leading-[1.04] tracking-[-0.025em]">
        {product.name}
      </h1>
      <div className="mt-[18px] flex items-center gap-3.5">
        <span className="text-[22px] font-medium">{price(product.eur)}</span>
        <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-muted">
          VAT included
        </span>
      </div>
      <p className="mt-6 max-w-[440px] text-[15px] leading-[1.7] text-ink-soft">
        {t("product.body")}
      </p>

      <div className="mt-[30px]">
        <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
          Colour — Stone
        </span>
        <div className="mt-3 flex gap-2.5">
          {["#cabfab", "#1a1a1a", "#e8e4da"].map((hex, i) => (
            <button
              key={hex}
              type="button"
              title={hex}
              className={`h-7 w-7 border ${
                i === 0
                  ? "border-ink outline outline-2 outline-offset-2 outline-ink"
                  : "border-[rgba(23,21,15,0.2)] hover:border-ink"
              }`}
              style={{ background: hex }}
            />
          ))}
        </div>
      </div>

      <div className="mt-[26px]">
        <div className="flex items-center justify-between">
          <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
            Size
          </span>
          <span className="border-b border-muted font-mono text-[11px] uppercase tracking-[0.08em] text-muted">
            Size guide
          </span>
        </div>
        <div className="mt-3 grid grid-cols-5 gap-2">
          {SIZES.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setSize(s)}
              className={`py-3.5 text-[13px] font-medium ${
                size === s
                  ? "border border-ink bg-ink text-bg"
                  : "border border-[rgba(23,21,15,0.2)] text-ink"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-[30px] flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => addItem(product.name, product.eur)}
          className="min-w-[200px] flex-1 bg-ink p-[18px] font-mono text-xs uppercase tracking-[0.14em] text-bg hover:bg-[#2e2a20]"
        >
          {t("product.add")} — {price(product.eur)}
        </button>
        <button
          type="button"
          title="Wishlist"
          className="w-[58px] shrink-0 border border-[rgba(23,21,15,0.25)] text-lg hover:border-ink"
        >
          ♡
        </button>
      </div>

      <div className="mt-[34px] border-t border-line">
        {[
          t("product.materials"),
          t("product.shipping"),
          t("product.sustainability"),
        ].map((row) => (
          <div
            key={row}
            className="flex items-center justify-between border-b border-line py-[18px] text-sm font-medium"
          >
            <span>{row}</span>
            <span className="text-muted">+</span>
          </div>
        ))}
      </div>
    </div>
  );
}

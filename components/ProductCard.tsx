"use client";

import Link from "next/link";
import { useStore } from "@/app/store-provider";
import type { Product } from "@/lib/products";
import MonoImage from "./MonoImage";
import Price from "./Price";

export default function ProductCard({ product }: { product: Product }) {
  const { addItem } = useStore();

  return (
    <div className="flex flex-col">
      <Link
        href={`/product/${product.slug}`}
        className="group relative block aspect-[3/4] overflow-hidden bg-placeholder"
      >
        {product.badge && (
          <span className="absolute left-3 top-3 z-10 bg-bg px-[7px] py-[3px] font-mono text-[10px] uppercase tracking-[0.16em] text-ink">
            {product.badge}
          </span>
        )}
        <MonoImage src={product.image} alt={product.name} />
        <button
          type="button"
          title="Add to bag"
          onClick={(e) => {
            e.preventDefault();
            addItem(product.name, product.eur);
          }}
          className="absolute bottom-2.5 right-2.5 z-10 flex h-9 w-9 items-center justify-center border border-[rgba(23,21,15,0.2)] bg-bg text-lg leading-none text-ink transition-colors hover:border-ink hover:bg-ink hover:text-bg"
        >
          +
        </button>
      </Link>
      <div className="mt-3 flex items-baseline justify-between gap-2.5">
        <span className="text-sm font-medium tracking-[-0.01em]">
          {product.name}
        </span>
        <Price eur={product.eur} className="text-sm font-medium" />
      </div>
      <span className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.1em] text-muted">
        {product.colours} colours
      </span>
    </div>
  );
}

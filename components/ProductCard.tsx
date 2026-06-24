"use client";

import { motion, type PanInfo } from "motion/react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useStore } from "@/app/store-provider";
import { colourLabel, productName } from "@/lib/i18n";
import type { Product } from "@/lib/products";
import MonoImage from "./MonoImage";
import Price from "./Price";
import QuickAdd from "./QuickAdd";

export default function ProductCard({ product }: { product: Product }) {
  const { addItem, toggleWish, isWished, t, lang } = useStore();
  const href = `/product/${product.slug}`;
  const name = productName(product.slug, lang, product.name);
  const [active, setActive] = useState(0);
  const [photo, setPhoto] = useState(0);
  const saved = isWished(product.slug);

  const shots = product.colours[active].images;
  const multi = shots.length > 1;

  const selectColour = (i: number) => {
    setActive(i);
    setPhoto(0);
  };
  const go = (i: number) =>
    setPhoto(Math.max(0, Math.min(shots.length - 1, i)));

  // Live drag carousel — the slide follows the finger, snaps on release.
  const containerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const measure = () => setWidth(containerRef.current?.offsetWidth ?? 0);
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);
  const swiped = useRef(false);
  const onDragEnd = (_e: PointerEvent, info: PanInfo) => {
    const threshold = (width || 1) * 0.18;
    if (info.offset.x < -threshold || info.velocity.x < -500) go(photo + 1);
    else if (info.offset.x > threshold || info.velocity.x > 500) go(photo - 1);
    requestAnimationFrame(() => {
      swiped.current = false;
    });
  };

  return (
    <div className="group flex flex-col">
      <div
        ref={containerRef}
        className="relative aspect-[3/4] overflow-hidden bg-placeholder"
      >
        <motion.div
          className="flex h-full"
          drag={multi ? "x" : false}
          dragConstraints={{ left: -(shots.length - 1) * width, right: 0 }}
          dragElastic={0.12}
          dragMomentum={false}
          animate={{ x: -photo * width }}
          transition={{ type: "spring", stiffness: 360, damping: 40 }}
          onDragStart={() => {
            swiped.current = true;
          }}
          onDragEnd={onDragEnd}
        >
          {shots.map((src, i) => (
            <Link
              key={`${active}-${i}`}
              href={href}
              aria-label={i === 0 ? name : ""}
              tabIndex={i === photo ? 0 : -1}
              draggable={false}
              onClick={(e) => {
                if (swiped.current) e.preventDefault();
              }}
              className="relative block h-full w-full shrink-0 basis-full"
            >
              <MonoImage
                src={src}
                alt={i === 0 ? name : ""}
                zoom={false}
                draggable={false}
              />
            </Link>
          ))}
        </motion.div>

        {multi && (
          <>
            <button
              type="button"
              onClick={() => go(photo - 1)}
              aria-label={t("product.prevImage")}
              className="absolute left-2 top-1/2 z-20 grid h-8 w-8 -translate-y-1/2 place-items-center text-white opacity-0 transition-opacity duration-300 hover:scale-110 group-hover:opacity-100 [@media(hover:none)]:opacity-100"
            >
              <Chevron dir="left" />
            </button>
            <button
              type="button"
              onClick={() => go(photo + 1)}
              aria-label={t("product.nextImage")}
              className="absolute right-2 top-1/2 z-20 grid h-8 w-8 -translate-y-1/2 place-items-center text-white opacity-0 transition-opacity duration-300 hover:scale-110 group-hover:opacity-100 [@media(hover:none)]:opacity-100"
            >
              <Chevron dir="right" />
            </button>

            <div className="pointer-events-none absolute inset-x-0 bottom-[52px] z-20 flex items-center justify-center gap-1.5 opacity-0 transition-opacity duration-300 group-hover:opacity-100 [@media(hover:none)]:opacity-100">
              {shots.map((src, i) => (
                <span
                  key={src}
                  className={`h-[3px] rounded-full bg-white transition-all duration-300 ${
                    i === photo ? "w-4 opacity-100" : "w-1.5 opacity-50"
                  }`}
                />
              ))}
            </div>
          </>
        )}

        {product.badge && (
          <span className="pointer-events-none absolute left-3 top-3 z-20 bg-ink px-2 py-[3px] font-mono text-[10px] uppercase tracking-[0.18em] text-bg">
            {product.badge === "New" ? t("badge.new") : product.badge}
          </span>
        )}

        <button
          type="button"
          onClick={() => toggleWish(product.slug)}
          aria-pressed={saved}
          aria-label={t(saved ? "product.saved" : "product.save")}
          title={t(saved ? "product.saved" : "product.save")}
          className={`absolute right-3.5 top-3.5 z-20 grid h-7 w-7 place-items-center transition-[transform,opacity] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-110 active:scale-90 [@media(hover:none)]:opacity-100 ${
            saved ? "opacity-100" : "opacity-0 group-hover:opacity-100"
          }`}
        >
          <motion.svg
            viewBox="0 0 24 24"
            aria-hidden
            strokeWidth={1.4}
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={false}
            animate={{ scale: saved ? [1, 1.28, 1] : 1 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className={`h-[21px] w-[21px] drop-shadow-[0_1px_3px_rgba(10,10,10,0.4)] transition-[fill,stroke] duration-300 ease-out ${
              saved
                ? "fill-white stroke-white"
                : "fill-transparent stroke-white/95"
            }`}
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 1 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </motion.svg>
        </button>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-1/3 bg-gradient-to-t from-[rgba(10,10,10,0.5)] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        <QuickAdd
          eur={product.eur}
          onAdd={() =>
            addItem(product.slug, product.eur, product.colours[0].name, "M")
          }
        />
      </div>

      <div className="mt-3.5 flex items-baseline justify-between gap-2.5">
        <Link
          href={href}
          className="text-sm font-medium tracking-[-0.01em] hover:opacity-55"
        >
          {name}
        </Link>
        <Price eur={product.eur} className="text-sm font-medium" />
      </div>

      <div
        className="mt-2 flex items-center gap-1.5"
        onMouseLeave={() => selectColour(0)}
      >
        {product.colours.map((c, i) => (
          <button
            key={c.name}
            type="button"
            onMouseEnter={() => selectColour(i)}
            onFocus={() => selectColour(i)}
            onClick={() => selectColour(i)}
            aria-label={colourLabel(c.name, lang)}
            aria-pressed={i === active}
            title={colourLabel(c.name, lang)}
            className="grid h-5 w-5 place-items-center"
          >
            <span
              className={`h-2.5 w-2.5 rounded-full border transition-transform duration-200 ${
                i === active
                  ? "scale-125 border-ink"
                  : "border-[rgba(10,10,10,0.25)]"
              }`}
              style={{ background: c.hex }}
            />
          </button>
        ))}
        <span className="ml-1 font-mono text-[10px] uppercase tracking-[0.1em] text-muted">
          {product.colours.length} {t("product.colours")}
        </span>
      </div>
    </div>
  );
}

function Chevron({ dir }: { dir: "left" | "right" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden
      fill="none"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-[18px] w-[18px] stroke-current drop-shadow-[0_1px_3px_rgba(10,10,10,0.45)]"
    >
      <path d={dir === "left" ? "M15 5l-7 7 7 7" : "M9 5l7 7-7 7"} />
    </svg>
  );
}

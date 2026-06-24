"use client";

import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useStore } from "@/app/store-provider";
import Cta from "@/components/Cta";
import { colourLabel, productName, productText, type MessageKey } from "@/lib/i18n";
import type { Product } from "@/lib/products";

const SIZES = ["XS", "S", "M", "L", "XL"];
const SOLD_OUT = new Set(["XS"]);

const PILL = { type: "spring", stiffness: 380, damping: 32, mass: 0.8 } as const;
const ROLL = { type: "spring", stiffness: 520, damping: 34, mass: 0.7 } as const;

const ACCORDIONS: { title: MessageKey; body: MessageKey }[] = [
  { title: "product.materials", body: "product.materialsBody" },
  { title: "product.shipping", body: "product.shippingBody" },
  { title: "product.sustainability", body: "product.sustainabilityBody" },
];

export default function BuyBox({
  product,
  colour,
  onColour,
}: {
  product: Product;
  colour: number;
  onColour: (i: number) => void;
}) {
  const { addItem, toggleWish, isWished, price, t, lang } = useStore();
  const [size, setSize] = useState("M");
  const wished = isWished(product.slug);
  const [added, setAdded] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  const add = () => {
    addItem(product.slug, product.eur, product.colours[colour].name, size);
    setAdded(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setAdded(false), 1700);
  };

  return (
    <div className="sticky top-[90px] pl-0 pt-3.5 md:pl-[clamp(0px,4vw,56px)]">
      <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
        {product.brand ?? "SVITŁO — SS26"}
      </span>
      <h1 className="mt-3.5 text-[clamp(30px,4vw,48px)] font-light leading-[1.04] tracking-[-0.025em]">
        {productName(product.slug, lang, product.name)}
      </h1>
      <div className="mt-[18px] flex items-center gap-3.5">
        <span className="text-[22px] font-medium">{price(product.eur)}</span>
        <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-muted">
          {t("product.vat")}
        </span>
      </div>
      <div className="mt-2.5 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.1em] text-muted-2">
        <span className="h-1.5 w-1.5 rounded-full bg-[#1f7a4d]" />
        {t("product.stock")}
      </div>
      <p className="mt-6 max-w-[440px] text-[15px] leading-[1.7] text-ink-soft">
        {productText("pbody", product.slug, lang, t("product.body"))}
      </p>

      <div className="mt-[30px]">
        <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
          {t("product.colourLabel")} — {colourLabel(product.colours[colour].name, lang)}
        </span>
        <div className="relative mt-3 flex gap-2.5">
          <motion.span
            aria-hidden
            initial={false}
            animate={{ x: colour * 62 }}
            transition={PILL}
            className="pointer-events-none absolute left-0 top-0 z-10 aspect-[3/4] w-[52px] border-2 border-ink"
          />
          {product.colours.map((c, i) => (
            <button
              key={c.name}
              type="button"
              onClick={() => onColour(i)}
              aria-label={colourLabel(c.name, lang)}
              aria-pressed={colour === i}
              title={colourLabel(c.name, lang)}
              className="relative aspect-[3/4] w-[52px] shrink-0 overflow-hidden bg-placeholder"
            >
              <Image
                src={c.swatch}
                alt={colourLabel(c.name, lang)}
                fill
                sizes="52px"
                className={`object-cover transition-opacity ${
                  colour === i ? "opacity-100" : "opacity-85 hover:opacity-100"
                }`}
              />
            </button>
          ))}
        </div>
      </div>

      <div className="mt-[26px]">
        <div className="flex items-center justify-between">
          <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
            {t("product.sizeLabel")}
          </span>
          <button
            type="button"
            className="border-b border-muted font-mono text-[11px] uppercase tracking-[0.08em] text-muted transition-colors hover:border-ink hover:text-ink"
          >
            {t("product.sizeGuide")}
          </button>
        </div>
        <div className="mt-3 grid grid-cols-5 gap-2">
          {SIZES.map((s) => {
            const oos = SOLD_OUT.has(s);
            const on = size === s && !oos;
            return (
              <button
                key={s}
                type="button"
                disabled={oos}
                onClick={() => setSize(s)}
                aria-pressed={on}
                aria-disabled={oos}
                title={oos ? t("product.oos") : undefined}
                className={`relative border border-[rgba(10,10,10,0.2)] py-3.5 text-[13px] font-medium ${
                  oos ? "cursor-not-allowed bg-[rgba(10,10,10,0.02)]" : ""
                }`}
              >
                {on && (
                  <motion.span
                    layoutId="pdp-size"
                    transition={PILL}
                    className="absolute inset-0 bg-ink"
                  />
                )}
                <span
                  className={`relative transition-colors duration-200 ${
                    oos
                      ? "text-muted line-through decoration-[1.5px]"
                      : on
                        ? "text-bg"
                        : "text-ink"
                  }`}
                >
                  {s}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-[30px] flex flex-wrap gap-3">
        <Cta
          onClick={add}
          variant="primary"
          aria-label={added ? t("product.added") : t("product.add")}
          className="min-w-[200px] flex-1 overflow-hidden p-[18px] font-mono text-xs uppercase tracking-[0.14em]"
        >
          <span className="relative block h-[15px] overflow-hidden">
            <AnimatePresence mode="wait" initial={false}>
              {added ? (
                <motion.span
                  key="added"
                  initial={{ y: "120%" }}
                  animate={{ y: 0 }}
                  exit={{ y: "-120%" }}
                  transition={ROLL}
                  className="flex items-center justify-center gap-1.5"
                >
                  <span aria-hidden>✓</span> {t("product.added")}
                </motion.span>
              ) : (
                <motion.span
                  key="add"
                  initial={{ y: "120%" }}
                  animate={{ y: 0 }}
                  exit={{ y: "-120%" }}
                  transition={ROLL}
                  className="block whitespace-nowrap"
                >
                  {t("product.add")} — {price(product.eur)}
                </motion.span>
              )}
            </AnimatePresence>
          </span>
        </Cta>
        <button
          type="button"
          onClick={() => toggleWish(product.slug)}
          aria-pressed={wished}
          aria-label={t(wished ? "product.saved" : "product.save")}
          title={t(wished ? "product.saved" : "product.save")}
          className="w-[58px] shrink-0 border border-[rgba(10,10,10,0.25)] text-lg transition-colors hover:border-ink"
        >
          <motion.span
            key={wished ? "on" : "off"}
            initial={{ scale: 0.6 }}
            animate={{ scale: wished ? [1, 1.35, 1] : 1 }}
            transition={{ duration: 0.32, ease: "easeOut" }}
            className="inline-block"
          >
            {wished ? "♥" : "♡"}
          </motion.span>
        </button>
      </div>

      <div className="mt-4 flex flex-wrap gap-x-5 gap-y-1.5 font-mono text-[10px] uppercase tracking-[0.1em] text-muted">
        <span>{t("product.shipTrust")}</span>
        <span>{t("product.returnsTrust")}</span>
        <span>{t("product.originTrust")}</span>
      </div>

      <div className="mt-[34px] border-t border-line">
        {ACCORDIONS.map((row) => {
          const body =
            row.body === "product.materialsBody"
              ? productText("pcare", product.slug, lang, t(row.body))
              : t(row.body);
          return <Accordion key={row.title} title={t(row.title)} body={body} />;
        })}
      </div>
    </div>
  );
}

function Accordion({ title, body }: { title: string; body: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-line">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex w-full items-center justify-between py-[18px] text-left text-sm font-medium"
      >
        <span>{title}</span>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="text-lg leading-none text-muted"
        >
          +
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <p className="max-w-[420px] pb-[18px] text-[13px] leading-[1.7] text-ink-soft">
              {body}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

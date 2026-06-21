"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { useStore } from "@/app/store-provider";
import { type Currency, SYMBOLS } from "@/lib/currency";
import type { Lang, MessageKey } from "@/lib/i18n";

const LINKS: { n: string; href: string; key: MessageKey; prev: string }[] = [
  { n: "01", href: "/", key: "nav.home", prev: "/images/editorial/hero.jpg" },
  { n: "02", href: "/shop", key: "nav.shop", prev: "/images/products/garment-dyed-hoodie.jpg" },
  { n: "03", href: "/lookbook", key: "nav.lookbook", prev: "/images/editorial/lookbook-hero.jpg" },
  { n: "04", href: "/account", key: "nav.account", prev: "/images/editorial/account.jpg" },
];

export default function FullscreenNav() {
  const { navOpen, closeNav, lang, currency, setLang, setCurrency, t } =
    useStore();
  const [preview, setPreview] = useState(LINKS[0].prev);

  return (
    <AnimatePresence>
      {navOpen && (
        <motion.div
          className="fixed inset-0 z-[150] flex flex-col overflow-y-auto bg-bg"
          initial={{ y: "-101%" }}
          animate={{ y: 0 }}
          exit={{ y: "-101%" }}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="flex items-center justify-between border-b border-line px-[clamp(20px,5vw,40px)] py-[18px]">
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted">
              Index — 00
            </span>
            <button
              type="button"
              onClick={closeNav}
              className="flex items-center gap-3 hover:opacity-50"
            >
              <span className="font-mono text-xs uppercase tracking-[0.16em]">
                {t("nav.close")}
              </span>
              <span className="text-xl leading-none">×</span>
            </button>
          </div>

          <div className="grid flex-1 grid-cols-1 md:grid-cols-[1.3fr_1fr]">
            <div className="flex flex-col justify-center px-[clamp(20px,5vw,56px)] py-[clamp(40px,7vw,80px)]">
              {LINKS.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={closeNav}
                  onMouseEnter={() => setPreview(l.prev)}
                  className="flex items-baseline gap-5 py-[clamp(7px,1.2vw,12px)] text-[clamp(40px,7vw,88px)] font-light leading-[1.04] tracking-[-0.03em] transition-[padding,opacity] hover:pl-[18px] hover:opacity-50"
                >
                  <span className="font-mono text-xs font-normal tracking-[0.1em] opacity-50">
                    {l.n}
                  </span>
                  {t(l.key)}
                </Link>
              ))}

              <div className="mt-[clamp(28px,4vw,48px)] flex flex-wrap gap-7 border-t border-line pt-7">
                <PrefGroup
                  label={t("prefs.language")}
                  options={["UA", "EN"] as Lang[]}
                  active={lang}
                  onPick={(v) => setLang(v as Lang)}
                />
                <PrefGroup
                  label={t("prefs.currency")}
                  options={["UAH", "EUR", "USD"] as Currency[]}
                  active={currency}
                  onPick={(v) => setCurrency(v as Currency)}
                  render={(v) => `${SYMBOLS[v as Currency]} ${v}`}
                />
              </div>
            </div>

            <div className="relative hidden overflow-hidden bg-placeholder md:block">
              <Image
                src={preview}
                alt="preview"
                fill
                sizes="40vw"
                className="object-cover grayscale contrast-[1.03] transition-opacity duration-[400ms]"
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function PrefGroup({
  label,
  options,
  active,
  onPick,
  render,
}: {
  label: string;
  options: string[];
  active: string;
  onPick: (v: string) => void;
  render?: (v: string) => string;
}) {
  return (
    <div>
      <span className="mb-2.5 block font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
        {label}
      </span>
      <div className="flex gap-2">
        {options.map((o) => (
          <button
            key={o}
            type="button"
            onClick={() => onPick(o)}
            className={`border px-3.5 py-2 font-mono text-xs tracking-[0.06em] ${
              active === o
                ? "border-ink bg-ink text-bg"
                : "border-[rgba(23,21,15,0.22)] text-ink"
            }`}
          >
            {render ? render(o) : o}
          </button>
        ))}
      </div>
    </div>
  );
}

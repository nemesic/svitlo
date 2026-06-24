"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { useStore } from "@/app/store-provider";
import { type Currency, SYMBOLS } from "@/lib/currency";
import type { Lang, MessageKey } from "@/lib/i18n";
import { scrollToTop } from "@/lib/scroll";

const LINKS: { n: string; href: string; key: MessageKey; prev: string }[] = [
  { n: "01", href: "/", key: "nav.home", prev: "/images/editorial/home.mp4" },
  { n: "02", href: "/shop", key: "nav.shop", prev: "/images/editorial/shop.jpg" },
  { n: "03", href: "/lookbook", key: "nav.lookbook", prev: "/images/editorial/lookbyk.jpg" },
  { n: "04", href: "/account", key: "nav.account", prev: "/images/editorial/acc.jpg" },
];

export default function FullscreenNav() {
  const { navOpen, closeNav, lang, currency, setLang, setCurrency, t } =
    useStore();
  const [preview, setPreview] = useState(LINKS[0].prev);

  const navigate = () => {
    closeNav();
    setTimeout(scrollToTop, 80);
  };

  return (
    <AnimatePresence>
      {navOpen && (
        <motion.div
          data-lenis-prevent
          className="fixed inset-0 z-[150] flex flex-col overflow-y-auto bg-bg antialiased [backface-visibility:hidden]"
          initial={{ y: "-101%" }}
          animate={{ y: 0 }}
          exit={{ y: "-101%" }}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="flex items-center justify-between border-b border-line px-[clamp(20px,5vw,40px)] py-[18px]">
            <Link
              href="/"
              onClick={navigate}
              aria-label={t("nav.home")}
              className="text-[clamp(16px,3vw,20px)] font-semibold uppercase tracking-[0.24em] transition-opacity hover:opacity-60"
            >
              SVITŁO
            </Link>
            <button
              type="button"
              onClick={closeNav}
              className="flex items-center gap-2.5 hover:opacity-50"
            >
              <span className="font-mono text-xs uppercase leading-none tracking-[0.16em]">
                {t("nav.close")}
              </span>
              <svg
                aria-hidden
                viewBox="0 0 12 12"
                className="h-[11px] w-[11px]"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.4"
              >
                <path d="M1.5 1.5 10.5 10.5 M10.5 1.5 1.5 10.5" />
              </svg>
            </button>
          </div>

          <div className="grid flex-1 grid-cols-1 md:grid-cols-[1.3fr_1fr]">
            <div className="flex flex-col justify-center px-[clamp(20px,5vw,56px)] py-[clamp(40px,7vw,80px)]">
              {LINKS.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={navigate}
                  onMouseEnter={() => setPreview(l.prev)}
                  className="flex items-baseline gap-5 py-[clamp(7px,1.2vw,12px)] text-[clamp(40px,7vw,88px)] font-light leading-[1.04] tracking-[-0.03em] text-[#111] transition-[padding,opacity] hover:pl-[18px] hover:opacity-50"
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
                  layoutId="nav-lang"
                  options={["UA", "EN"] as Lang[]}
                  active={lang}
                  onPick={(v) => setLang(v as Lang)}
                />
                <PrefGroup
                  label={t("prefs.currency")}
                  layoutId="nav-cur"
                  options={["UAH", "EUR", "USD"] as Currency[]}
                  active={currency}
                  onPick={(v) => setCurrency(v as Currency)}
                  render={(v) => `${SYMBOLS[v as Currency]} ${v}`}
                />
              </div>
            </div>

            <div className="relative hidden overflow-hidden bg-placeholder md:block">
              {preview.endsWith(".mp4") ? (
                <video
                  key={preview}
                  src={preview}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="absolute inset-0 h-full w-full object-cover transition-opacity duration-[400ms]"
                />
              ) : (
                <Image
                  src={preview}
                  alt="preview"
                  fill
                  sizes="40vw"
                  className="object-cover transition-opacity duration-[400ms]"
                />
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

const PILL = { type: "spring", stiffness: 380, damping: 32, mass: 0.8 } as const;

function PrefGroup({
  label,
  layoutId,
  options,
  active,
  onPick,
  render,
}: {
  label: string;
  layoutId: string;
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
        {options.map((o) => {
          const on = active === o;
          return (
            <button
              key={o}
              type="button"
              onClick={() => onPick(o)}
              aria-pressed={on}
              className="relative border border-[rgba(10,10,10,0.22)] px-3.5 py-2 font-mono text-xs tracking-[0.06em]"
            >
              {on && (
                <motion.span
                  layoutId={layoutId}
                  transition={PILL}
                  className="absolute inset-0 bg-ink"
                />
              )}
              <span
                className={`relative transition-colors duration-200 ${
                  on ? "text-bg" : "text-ink"
                }`}
              >
                {render ? render(o) : o}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

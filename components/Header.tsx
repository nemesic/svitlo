"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useStore } from "@/app/store-provider";
import { SYMBOLS } from "@/lib/currency";
import { scrollToTop } from "@/lib/scroll";

export default function Header() {
  const {
    openNav,
    openPrefs,
    openDrawer,
    openWish,
    count,
    wishCount,
    lang,
    currency,
    t,
  } = useStore();

  const [bump, setBump] = useState(false);
  const prevCount = useRef(count);
  useEffect(() => {
    if (count > prevCount.current) {
      setBump(true);
      const id = setTimeout(() => setBump(false), 420);
      prevCount.current = count;
      return () => clearTimeout(id);
    }
    prevCount.current = count;
  }, [count]);

  return (
    <header className="sticky top-0 z-[80] border-b border-line bg-[rgba(250,250,250,0.72)] backdrop-blur-[20px] backdrop-saturate-150">
      <div className="flex items-center justify-between px-[clamp(18px,5vw,40px)] py-[15px]">
        <div className="flex flex-1 items-center">
          <button
            type="button"
            onClick={openNav}
            className="flex items-center gap-[11px] py-1.5 hover:opacity-55"
          >
            <span className="flex w-[18px] flex-col gap-1">
              <span className="h-px w-full bg-current" />
              <span className="h-px w-full bg-current" />
              <span className="h-px w-full bg-current" />
            </span>
            <span className="font-mono text-xs uppercase tracking-[0.16em]">
              {t("nav.menu")}
            </span>
          </button>
        </div>

        <Link
          href="/"
          onClick={scrollToTop}
          aria-label={t("nav.home")}
          className="shrink-0 pl-[0.24em] text-[clamp(19px,4.5vw,25px)] font-semibold uppercase tracking-[0.24em] transition-opacity hover:opacity-60"
        >
          SVITŁO
        </Link>

        <div className="flex flex-1 items-center justify-end gap-[clamp(12px,2vw,24px)]">
          <button
            type="button"
            onClick={openPrefs}
            className="hidden items-center py-1.5 font-mono text-xs tracking-[0.1em] hover:opacity-55 sm:flex"
          >
            {lang} / {SYMBOLS[currency]}
          </button>
          <button
            type="button"
            onClick={openWish}
            aria-label={`${t("nav.saved")} (${wishCount})`}
            className="group relative flex items-center py-1.5"
          >
            <svg
              viewBox="0 0 24 24"
              aria-hidden
              strokeWidth={1.7}
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`h-[18px] w-[18px] stroke-current transition-[fill,transform] duration-200 ease-out group-hover:scale-[1.08] ${
                wishCount > 0
                  ? "fill-current"
                  : "fill-none group-hover:fill-current"
              }`}
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 1 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
            {wishCount > 0 && (
              <span className="absolute -right-2 -top-0.5 grid h-[15px] min-w-[15px] place-items-center rounded-full bg-ink px-1 font-mono text-[9px] font-medium leading-none text-bg">
                {wishCount}
              </span>
            )}
          </button>
          <Link
            href="/account"
            aria-label={t("nav.account")}
            className="group flex items-center py-1.5 hover:opacity-55"
          >
            <svg
              viewBox="0 0 24 24"
              aria-hidden
              strokeWidth={1.7}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-[20px] w-[20px] fill-none stroke-current transition-[fill,transform] duration-200 ease-out group-hover:fill-current sm:hidden motion-reduce:transition-none"
            >
              <circle cx="12" cy="8.1" r="3.6" />
              <path d="M4.9 20.9a7.1 7.1 0 0 1 14.2 0Z" />
            </svg>
            <span className="hidden font-mono text-xs uppercase tracking-[0.1em] sm:inline">
              {t("nav.account")}
            </span>
          </Link>
          <button
            type="button"
            onClick={openDrawer}
            aria-label={`${t("nav.bag")} (${count})`}
            className="group relative flex items-center py-1.5"
          >
            <svg
              viewBox="0 0 24 24"
              aria-hidden
              strokeWidth={1.7}
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`h-[20px] w-[20px] stroke-current transition-transform duration-200 ease-out group-hover:scale-[1.08] motion-reduce:transition-none ${
                bump ? "scale-[1.18]" : ""
              }`}
            >
              <path fill="none" d="M8.7 8V6.2a3.3 3.3 0 0 1 6.6 0V8" />
              <path
                d="M4.7 8h14.6l-1.1 12.1a2.1 2.1 0 0 1-2.1 1.9H7.9a2.1 2.1 0 0 1-2.1-1.9L4.7 8Z"
                className={`transition-[fill] duration-200 ease-out ${
                  count > 0 ? "fill-current" : "fill-none group-hover:fill-current"
                }`}
              />
            </svg>
            {count > 0 && (
              <span className="absolute -right-2 -top-0.5 grid h-[15px] min-w-[15px] place-items-center rounded-full bg-ink px-1 font-mono text-[9px] font-medium leading-none text-bg">
                {count}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}

"use client";

import Link from "next/link";
import { useStore } from "@/app/store-provider";
import { SYMBOLS } from "@/lib/currency";

export default function Header() {
  const { openNav, openPrefs, openDrawer, count, lang, currency, t } =
    useStore();

  return (
    <header className="sticky top-0 z-[80] border-b border-line bg-[rgba(241,239,234,0.86)] backdrop-blur-[14px]">
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
          className="shrink-0 pl-[0.24em] text-[clamp(19px,4.5vw,25px)] font-semibold uppercase tracking-[0.24em]"
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
          <Link
            href="/account"
            className="hidden py-1.5 font-mono text-xs uppercase tracking-[0.1em] hover:opacity-55 sm:block"
          >
            {t("nav.account")}
          </Link>
          <button
            type="button"
            onClick={openDrawer}
            className="py-1.5 font-mono text-xs uppercase tracking-[0.12em] hover:opacity-55"
          >
            Bag ({count})
          </button>
        </div>
      </div>
    </header>
  );
}

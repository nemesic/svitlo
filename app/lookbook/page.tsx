"use client";

import Image from "next/image";
import Link from "next/link";
import { useStore } from "@/app/store-provider";
import Reveal from "@/components/Reveal";
import type { MessageKey } from "@/lib/i18n";

const PRINCIPLES: { n: string; title: MessageKey; body: MessageKey }[] = [
  { n: "01", title: "principle.1.title", body: "principle.1.body" },
  { n: "02", title: "principle.2.title", body: "principle.2.body" },
  { n: "03", title: "principle.3.title", body: "principle.3.body" },
  { n: "04", title: "principle.4.title", body: "principle.4.body" },
];

const LOOKS = [
  { src: "/images/editorial/making.jpg", offset: false },
  { src: "/images/editorial/lookbook-2.jpg", offset: true },
  { src: "/images/editorial/hero.jpg", offset: false },
];

export default function LookbookPage() {
  const { t } = useStore();

  return (
    <div>
      <section className="relative flex min-h-[62vh] items-end overflow-hidden bg-placeholder">
        <Image
          src="/images/editorial/lookbook-hero.jpg"
          alt="Lookbook"
          fill
          sizes="100vw"
          priority
          className="object-cover grayscale contrast-[1.04]"
        />
        <div className="relative w-full bg-gradient-to-t from-[rgba(241,239,234,0.92)] to-transparent px-[clamp(20px,5vw,40px)] pb-[clamp(32px,5vw,52px)] pt-[clamp(28px,5vw,48px)]">
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-2">
            SS26 — Lookbook
          </span>
          <h1 className="mt-4 text-[clamp(40px,7vw,116px)] font-light leading-[0.94] tracking-[-0.035em] text-ink">
            {t("lookbook.title")}
          </h1>
        </div>
      </section>

      <section className="max-w-[780px] px-[clamp(18px,5vw,40px)] pb-[30px] pt-[clamp(44px,7vw,80px)]">
        <p className="m-0 text-[clamp(20px,2.4vw,30px)] font-light leading-[1.5] tracking-[-0.015em]">
          {t("lookbook.intro")}
        </p>
      </section>

      <section className="px-[clamp(18px,5vw,40px)] pt-10">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {LOOKS.map((l) => (
            <div
              key={l.src}
              className={`relative aspect-[3/4] overflow-hidden bg-placeholder ${
                l.offset ? "sm:mt-12" : ""
              }`}
            >
              <Image
                src={l.src}
                alt="look"
                fill
                sizes="(max-width: 640px) 100vw, 33vw"
                className="object-cover grayscale contrast-[1.03]"
              />
            </div>
          ))}
        </div>
      </section>

      <section className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-10 px-[clamp(18px,5vw,40px)] pb-10 pt-[clamp(52px,8vw,90px)]">
        {PRINCIPLES.map((p) => (
          <Reveal key={p.n}>
            <span className="text-[44px] font-light tracking-[-0.03em]">
              {p.n}
            </span>
            <h3 className="mb-2 mt-3.5 text-lg font-semibold">{t(p.title)}</h3>
            <p className="m-0 text-sm leading-[1.6] text-ink-soft">
              {t(p.body)}
            </p>
          </Reveal>
        ))}
      </section>

      <section className="px-[clamp(18px,5vw,40px)] pb-2.5 pt-10">
        <Link
          href="/shop"
          className="inline-flex items-center gap-3 bg-ink px-[34px] py-[18px] font-mono text-xs uppercase tracking-[0.16em] text-bg hover:bg-[#2e2a20]"
        >
          {t("lookbook.shop")} →
        </Link>
      </section>
    </div>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import Cta from "@/components/Cta";
import { useStore } from "@/app/store-provider";
import Reveal from "@/components/Reveal";
import type { MessageKey } from "@/lib/i18n";
import { getProduct } from "@/lib/products";

const LOOKS: { n: string; img: string; caption: MessageKey; pieces: string[] }[] =
  [
    {
      n: "01",
      img: "/images/editorial/2.jpg",
      caption: "look.01",
      pieces: ["super-baggy", "illustration-print-tee"],
    },
    {
      n: "02",
      img: "/images/editorial/3.jpg",
      caption: "look.02",
      pieces: ["stwd-studio-hoodie", "skater-joggers"],
    },
    {
      n: "03",
      img: "/images/editorial/4.jpg",
      caption: "look.03",
      pieces: ["washed-faux-leather-bomber", "graphic-tee"],
    },
  ];

export default function LookbookPage() {
  const { t, price } = useStore();

  return (
    <div>

      <section className="mx-auto grid max-w-[1500px] grid-cols-1 items-start gap-x-[clamp(28px,4vw,72px)] gap-y-[clamp(32px,5vw,48px)] border-b border-line px-[clamp(20px,5vw,56px)] pb-[clamp(48px,8vw,96px)] pt-[clamp(36px,6vw,80px)] md:grid-cols-[1fr_1fr]">
        <div>
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-2">
            SS26 — Lookbook
          </span>
          <h1 className="mt-5 max-w-[12ch] text-balance text-[clamp(38px,4.6vw,76px)] font-light leading-[0.96] tracking-[-0.035em] text-ink">
            {t("lookbook.title")}
          </h1>
          <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
            {t("lookbook.meta")}
          </p>

          <div className="mt-[clamp(32px,4vw,56px)] border-t border-line pt-[clamp(24px,3vw,36px)]">
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-2">
              SS26 — Edit
            </span>
            <p className="mt-5 max-w-[20ch] text-balance text-[clamp(24px,2.6vw,42px)] font-light leading-[1.12] tracking-[-0.025em] text-ink">
              {t("lookbook.intro")}
            </p>
          </div>
        </div>

        <div className="relative aspect-4/5 w-full max-w-[620px] overflow-hidden bg-placeholder">
          <Image
            src="/images/editorial/1.jpg"
            alt=""
            fill
            sizes="(max-width: 768px) 100vw, 620px"
            quality={90}
            priority
            className="object-cover"
          />
        </div>
      </section>

      <section className="mx-auto max-w-[1500px] px-[clamp(20px,5vw,56px)] pt-[clamp(36px,6vw,64px)]">

        <div className="flex items-baseline justify-between border-t border-line pt-4">
          <h2 className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink">
            {t("lookbook.looks")}
          </h2>
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
            {LOOKS.length} / SS26
          </span>
        </div>

        <div className="flex flex-col gap-[clamp(56px,9vw,128px)] pt-[clamp(40px,6vw,80px)]">
          {LOOKS.map((look, i) => {
            const pieces = look.pieces
              .map((slug) => getProduct(slug))
              .filter((p): p is NonNullable<typeof p> => Boolean(p));
            const mirrored = i % 2 === 1;

            return (
              <Reveal key={look.n}>

                <article
                  className={`grid grid-cols-1 gap-x-[clamp(24px,3vw,48px)] gap-y-6 md:items-start ${
                    mirrored
                      ? "md:grid-cols-[1fr_1.15fr_clamp(70px,7vw,150px)]"
                      : "md:grid-cols-[clamp(70px,7vw,150px)_1.15fr_1fr]"
                  }`}
                >
                  <div className="relative aspect-4/5 w-full max-w-[620px] overflow-hidden bg-placeholder md:order-2 md:justify-self-center">
                    <Image
                      src={look.img}
                      alt=""
                      fill
                      sizes="(max-width: 768px) 100vw, 620px"
                      quality={90}
                      className="object-cover"
                    />
                  </div>

                  <span
                    className={`block text-[clamp(40px,7vw,140px)] font-light leading-[0.8] tracking-[-0.04em] text-ink ${
                      mirrored ? "md:order-3 md:text-right" : "md:order-1"
                    }`}
                  >
                    {look.n}
                  </span>

                  <div className={mirrored ? "md:order-1" : "md:order-3"}>
                    <p className="max-w-[22ch] text-balance text-[clamp(18px,1.7vw,26px)] font-light leading-[1.25] tracking-[-0.015em] text-ink">
                      {t(look.caption)}
                    </p>

                    <ul className="mt-7 border-t border-line">
                      {pieces.map((p) => (
                        <li key={p.slug}>
                          <Link
                            href={`/product/${p.slug}`}
                            className="group flex items-center gap-4 border-b border-line py-3"
                          >
                            <span className="relative h-[82px] w-[64px] shrink-0 overflow-hidden bg-placeholder">
                              <Image
                                src={p.image}
                                alt=""
                                fill
                                sizes="64px"
                                className="object-cover transition-transform duration-500 ease-out group-hover:scale-105 motion-reduce:transition-none"
                              />
                            </span>
                            <span className="min-w-0 flex-1">
                              <span className="block truncate text-[15px] tracking-[-0.01em] transition-opacity group-hover:opacity-60">
                                {p.name}
                              </span>
                              {p.brand && (
                                <span className="mt-1 block font-mono text-[11px] uppercase tracking-[0.08em] text-muted">
                                  {p.brand}
                                </span>
                              )}
                            </span>
                            <span className="shrink-0 font-mono text-[13px] tracking-[0.02em] text-ink">
                              {price(p.eur)}
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section className="mx-auto mt-[clamp(56px,9vw,120px)] max-w-[1500px] border-t border-line px-[clamp(20px,5vw,56px)] py-[clamp(48px,8vw,90px)]">
        <p className="max-w-[26ch] text-balance text-[clamp(22px,3vw,40px)] font-light leading-[1.15] tracking-[-0.02em] text-ink">
          {t("lookbook.outro")}
        </p>
        <div className="mt-9">
          <Cta
            href="/shop"
            variant="primary"
            className="px-[34px] py-[18px] font-mono text-xs uppercase tracking-[0.16em]"
          >
            {t("lookbook.shop")}
          </Cta>
        </div>
      </section>
    </div>
  );
}

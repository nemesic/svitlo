"use client";

import Image from "next/image";
import Link from "next/link";
import ArrowLink from "@/components/ArrowLink";
import Cta from "@/components/Cta";
import { useStore } from "@/app/store-provider";
import Reveal from "@/components/Reveal";
import { getProduct } from "@/lib/products";

const LOOKS: {
  n: string;
  img: string;
  caption: { EN: string; UA: string };
  pieces: string[]; 
}[] = [
  {
    n: "01",
    img: "/images/editorial/2.jpg",
    caption: { EN: "Denim, worn loose.", UA: "Денім, вільно." },
    pieces: ["super-baggy", "illustration-print-tee"],
  },
  {
    n: "02",
    img: "/images/editorial/3.jpg",
    caption: { EN: "The weekend uniform.", UA: "Уніформа вихідного." },
    pieces: ["stwd-studio-hoodie", "skater-joggers"],
  },
  {
    n: "03",
    img: "/images/editorial/4.jpg",
    caption: { EN: "Layered for the cold snap.", UA: "Шари на похолодання." },
    pieces: ["washed-faux-leather-bomber", "graphic-tee"],
  },
];

export default function LookbookPage() {
  const { t, lang, price } = useStore();

  return (
    <div>
      <section className="grid grid-cols-1 items-stretch border-b border-line md:grid-cols-2">
        <div className="flex flex-col justify-end px-[clamp(20px,5vw,56px)] pb-[clamp(32px,5vw,56px)] pt-[clamp(48px,8vw,96px)]">
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-2">
            SS26 — Lookbook
          </span>
          <h1 className="mt-5 text-[clamp(44px,6.4vw,104px)] font-light leading-[0.92] tracking-[-0.035em] text-ink">
            {t("lookbook.title")}
          </h1>
          <p className="mt-7 border-t border-line pt-5 font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
            {t("lookbook.meta")}
          </p>
        </div>
        <div className="relative min-h-[58vh] overflow-hidden bg-placeholder md:min-h-[74vh]">
          <Image
            src="/images/editorial/1.jpg"
            alt="SS26 lookbook"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
            className="object-cover"
          />
        </div>
      </section>

      <section className="px-[clamp(20px,5vw,56px)] pb-[clamp(28px,5vw,48px)] pt-[clamp(48px,8vw,96px)]">
        <p className="max-w-[18ch] font-mono text-[11px] uppercase tracking-[0.2em] text-muted-2 sm:max-w-none">
          SS26 — Edit
        </p>
        <p className="mt-6 max-w-[20ch] text-[clamp(28px,4.4vw,64px)] font-light leading-[1.08] tracking-[-0.025em] text-ink">
          {t("lookbook.intro")}
        </p>
      </section>

      <section className="px-[clamp(20px,5vw,56px)] pt-[clamp(36px,6vw,64px)]">
        <div className="flex items-baseline justify-between border-t border-ink pt-4">
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
            const imageFirst = i % 2 === 0; // alternate the rhythm

            return (
              <Reveal key={look.n}>
                <article className="grid grid-cols-1 items-end gap-x-[clamp(24px,4vw,56px)] gap-y-7 md:grid-cols-12">
                  <div
                    className={`relative aspect-[4/5] overflow-hidden bg-placeholder md:col-span-7 ${
                      imageFirst ? "md:order-1" : "md:order-2"
                    }`}
                  >
                    <Image
                      src={look.img}
                      alt={`Look ${look.n}`}
                      fill
                      sizes="(max-width: 768px) 100vw, 58vw"
                      className="object-cover"
                    />
                    <span className="absolute left-5 top-5 font-mono text-[11px] uppercase tracking-[0.2em] text-white/85 mix-blend-difference">
                      Look {look.n}
                    </span>
                  </div>

                  <div
                    className={`md:col-span-5 ${
                      imageFirst ? "md:order-2" : "md:order-1"
                    }`}
                  >
                    <span className="block text-[clamp(40px,5vw,72px)] font-light leading-none tracking-[-0.03em] text-ink">
                      {look.n}
                    </span>
                    <p className="mt-4 max-w-[22ch] text-[clamp(18px,2vw,24px)] font-light leading-[1.25] tracking-[-0.015em] text-ink">
                      {look.caption[lang]}
                    </p>

                    <div className="mt-7">
                      {pieces.map((p) => (
                        <Link
                          key={p.slug}
                          href={`/product/${p.slug}`}
                          className="group flex items-baseline justify-between gap-4 border-t border-line py-3.5 last:border-b hover:opacity-60"
                        >
                          <span className="text-[15px] tracking-[-0.01em]">
                            {p.name}
                          </span>
                          <span className="shrink-0 font-mono text-[11px] uppercase tracking-[0.08em] text-muted">
                            {p.brand} · {price(p.eur)}
                          </span>
                        </Link>
                      ))}
                    </div>

                    <ArrowLink
                      href={`/product/${pieces[0]?.slug ?? ""}`}
                      className="mt-6 text-ink"
                    >
                      {t("lookbook.shopLook")}
                    </ArrowLink>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section className="mt-[clamp(56px,9vw,120px)] border-t border-line px-[clamp(20px,5vw,56px)] py-[clamp(48px,8vw,90px)]">
        <p className="max-w-[26ch] text-[clamp(22px,3vw,40px)] font-light leading-[1.15] tracking-[-0.02em] text-ink">
          {t("lookbook.outro")}
        </p>
        <div className="mt-9">
          <Cta
            href="/shop"
            variant="primary"
            arrow
            className="px-[34px] py-[18px] font-mono text-xs uppercase tracking-[0.16em]"
          >
            {t("lookbook.shop")}
          </Cta>
        </div>
      </section>
    </div>
  );
}
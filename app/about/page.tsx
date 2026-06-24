"use client";

import Image from "next/image";
import Cta from "@/components/Cta";
import Reveal from "@/components/Reveal";
import { useStore } from "@/app/store-provider";

const FACTS = ["about.fact1", "about.fact2", "about.fact3"] as const;

export default function AboutPage() {
  const { t } = useStore();

  return (
    <div>
      <section className="grid grid-cols-1 items-stretch border-b border-line md:grid-cols-2">
        <div className="flex flex-col justify-end px-[clamp(20px,5vw,56px)] pb-[clamp(32px,5vw,56px)] pt-[clamp(48px,8vw,96px)]">
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-2">
            {t("about.eyebrow")}
          </span>
          <h1 className="mt-5 text-[clamp(40px,5.6vw,92px)] font-light leading-[0.96] tracking-[-0.035em] text-ink">
            {t("about.title")}
          </h1>
        </div>
        <div className="relative min-h-[58vh] overflow-hidden bg-placeholder md:min-h-[80vh]">
          <Image
            src="/images/editorial/about.jpg"
            alt="SVITŁO, Kyiv"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
            className="object-cover object-top"
          />
        </div>
      </section>

      <section className="grid grid-cols-1 gap-x-[clamp(24px,5vw,72px)] gap-y-8 px-[clamp(20px,5vw,56px)] py-[clamp(48px,8vw,96px)] md:grid-cols-12">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-2 md:col-span-3">
          SS26 — {t("about.eyebrow")}
        </p>
        <div className="md:col-span-9 md:max-w-[40ch]">
          <p className="text-[clamp(22px,2.8vw,36px)] font-light leading-[1.2] tracking-[-0.02em] text-ink">
            {t("about.lead")}
          </p>
          <p className="mt-7 text-[15px] leading-[1.7] text-ink-soft">
            {t("about.body")}
          </p>
        </div>
      </section>

      <section className="px-[clamp(20px,5vw,56px)] pb-[clamp(48px,8vw,96px)]">
        <div className="grid grid-cols-1 border-t border-line sm:grid-cols-3">
          {FACTS.map((f, i) => (
            <Reveal key={f}>
              <div
                className={`py-7 ${
                  i > 0 ? "border-t border-line sm:border-l sm:border-t-0 sm:pl-7" : ""
                }`}
              >
                <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="mt-3 text-[clamp(18px,2vw,24px)] font-light tracking-[-0.015em] text-ink">
                  {t(f)}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="mt-[clamp(40px,6vw,72px)]">
          <Cta
            href="/shop"
            variant="primary"
            arrow
            className="px-[34px] py-[18px] font-mono text-xs uppercase tracking-[0.16em]"
          >
            {t("about.cta")}
          </Cta>
        </div>
      </section>
    </div>
  );
}
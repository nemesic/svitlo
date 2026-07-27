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
      <section className="mx-auto grid max-w-[1360px] grid-cols-1 items-start gap-x-[clamp(28px,5vw,80px)] gap-y-[clamp(32px,5vw,56px)] border-b border-line px-[clamp(20px,5vw,56px)] pb-[clamp(48px,8vw,96px)] pt-[clamp(40px,7vw,88px)] md:grid-cols-[1fr_0.85fr]">
        <div>
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-2">
            SS26 — {t("about.eyebrow")}
          </span>
          <h1 className="mt-6 max-w-[14ch] text-balance text-[clamp(38px,4.6vw,76px)] font-light leading-[0.96] tracking-[-0.035em] text-ink">
            {t("about.title")}
          </h1>
          <p className="mt-8 max-w-[38ch] text-[clamp(19px,1.7vw,26px)] font-light leading-[1.32] tracking-[-0.015em] text-ink">
            {t("about.lead")}
          </p>
          <p className="mt-6 max-w-[46ch] text-[15px] leading-[1.7] text-ink-soft">
            {t("about.body")}
          </p>
        </div>

        <div className="relative aspect-4/5 w-full overflow-hidden bg-placeholder">
          <Image
            src="/images/editorial/about.jpg"
            alt="SVITŁO, Kyiv"
            fill
            sizes="(max-width: 768px) 100vw, 40vw"
            quality={90}
            priority
            className="object-cover object-center"
          />
        </div>
      </section>
      <section className="bg-ink py-[clamp(56px,9vw,120px)]">
        <p className="mx-auto max-w-[1360px] text-balance px-[clamp(20px,5vw,56px)] text-[clamp(30px,5vw,76px)] font-light leading-[1.02] tracking-[-0.03em] text-bg">
          <span className="block max-w-[18ch]">{t("about.stance")}</span>
        </p>
      </section>

      <section className="mx-auto max-w-[1360px] px-[clamp(20px,5vw,56px)] py-[clamp(48px,8vw,96px)]">
     
        <div className="grid grid-cols-1 border-t border-line sm:grid-cols-3">
          {FACTS.map((f, i) => (
            <Reveal key={f}>
              <div
                className={`py-7 ${
                  i > 0
                    ? "border-t border-line sm:border-l sm:border-t-0 sm:pl-7"
                    : ""
                }`}
              >
                <p className="max-w-[14ch] text-balance text-[clamp(18px,2vw,24px)] font-light tracking-[-0.015em] text-ink">
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
            className="px-[34px] py-[18px] font-mono text-xs uppercase tracking-[0.16em]"
          >
            {t("about.cta")}
          </Cta>
        </div>
      </section>
    </div>
  );
}

"use client";

import Cta from "@/components/Cta";
import { useStore } from "@/app/store-provider";
import type { MessageKey } from "@/lib/i18n";

const CHANNELS: { label: string; value: string; href: string }[] = [
  { label: "Email", value: "hello@svitlo.store", href: "mailto:hello@svitlo.store" },
  { label: "Instagram", value: "@svitlo", href: "https://instagram.com/svitlo" },
  { label: "TikTok", value: "@svitlo", href: "https://tiktok.com/@svitlo" },
];

const INFO: { label: MessageKey; value: MessageKey }[] = [
  { label: "contact.locationLabel", value: "contact.location" },
  { label: "contact.hoursLabel", value: "contact.hours" },
];

export default function ContactPage() {
  const { t } = useStore();

  return (
    <section className="grid grid-cols-1 items-start md:grid-cols-2">
      <div className="border-b border-line px-[clamp(20px,5vw,56px)] pb-[clamp(40px,6vw,72px)] pt-[clamp(48px,8vw,96px)] md:sticky md:top-[90px] md:border-b-0">
        <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-2">
          {t("contact.eyebrow")}
        </span>
        <h1 className="mt-5 text-[clamp(44px,6vw,96px)] font-light leading-[0.92] tracking-[-0.035em] text-ink">
          {t("contact.title")}
        </h1>
        <p className="mt-7 max-w-[34ch] text-[15px] leading-[1.7] text-ink-soft">
          {t("contact.lead")}
        </p>
      </div>

      <div className="px-[clamp(20px,5vw,56px)] pb-[clamp(56px,9vw,120px)] pt-[clamp(8px,5vw,96px)] md:border-l md:border-line">
        {CHANNELS.map((c) => (
          <a
            key={c.label}
            href={c.href}
            target={c.href.startsWith("http") ? "_blank" : undefined}
            rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
            className="group flex items-baseline justify-between gap-6 border-t border-line py-5 hover:opacity-60"
          >
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
              {c.label}
            </span>
            <span className="text-[clamp(18px,2.4vw,30px)] font-light tracking-[-0.02em] text-ink">
              {c.value}
            </span>
          </a>
        ))}

        {INFO.map((row) => (
          <div
            key={row.label}
            className="flex items-baseline justify-between gap-6 border-t border-line py-5 last:border-b"
          >
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
              {t(row.label)}
            </span>
            <span className="font-mono text-[13px] tracking-[0.02em] text-ink [&_a]:text-ink [&_a]:no-underline">
              {t(row.value)}
            </span>
          </div>
        ))}

        <div className="mt-[clamp(40px,6vw,72px)] max-w-[38ch]">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
            {t("contact.help")}
          </p>
          <p className="mt-3 text-[15px] leading-[1.7] text-ink-soft">
            {t("contact.helpBody")}
          </p>
          <div className="mt-7">
            <Cta
              href="mailto:hello@svitlo.store"
              variant="primary"
              arrow
              className="px-[34px] py-[18px] font-mono text-xs uppercase tracking-[0.16em]"
            >
              {t("contact.emailCta")}
            </Cta>
          </div>
        </div>
      </div>
    </section>
  );
}
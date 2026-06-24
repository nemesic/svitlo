"use client";

import Link from "next/link";
import { useState } from "react";
import { useStore } from "@/app/store-provider";
import Cta from "@/components/Cta";

export default function Footer() {
  const { t } = useStore();
  const [subscribed, setSubscribed] = useState(false);

  return (
    <footer className="bg-bg px-[clamp(18px,5vw,40px)] pb-9 pt-[clamp(52px,8vw,80px)]">
      <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-12 border-b border-line pb-16">
        <div className="col-span-full mb-5 max-w-[460px]">
          <h3 className="m-0 text-[clamp(26px,3.2vw,42px)] font-light leading-[1.05] tracking-[-0.025em]">
            {t("footer.join")}
          </h3>
          <p className="mb-6 mt-4 text-[15px] leading-[1.55] text-ink-soft">
            {t("footer.joinBody")}
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSubscribed(true);
            }}
            className="flex max-w-[440px] flex-wrap gap-2.5"
          >
            <input
              type="email"
              required
              placeholder="your@email.com"
              className="min-w-[200px] flex-1 border-0 border-b border-[rgba(10,10,10,0.3)] bg-transparent px-0.5 py-3 text-base outline-none focus:border-ink"
            />
            <Cta
              type="submit"
              variant="primary"
              className="px-7 py-[13px] font-mono text-[11px] uppercase tracking-[0.14em]"
            >
              {subscribed ? "✓" : t("footer.subscribe")}
            </Cta>
          </form>
        </div>
        <FooterCol
          title={t("footer.shop")}
          links={[
            { label: t("arrivals.title"), href: "/shop" },
            { label: t("cat.outerwear"), href: "/shop" },
            { label: t("cat.tshirts"), href: "/shop" },
            { label: t("cat.trousers"), href: "/shop" },
          ]}
        />
        <FooterCol
          title={t("footer.company")}
          links={[
            { label: t("about.eyebrow"), href: "/about" },
            { label: t("contact.eyebrow"), href: "/contact" },
          ]}
        />
        <FooterCol
          title={t("footer.connect")}
          links={[
            { label: "Instagram", href: "#" },
            { label: "TikTok", href: "#" },
          ]}
        />
      </div>
      <div className="block whitespace-nowrap py-6 text-[clamp(64px,22vw,340px)] font-light leading-[0.82] tracking-[-0.04em]">
        SVITŁO
      </div>
      <div className="flex flex-wrap justify-between gap-5 font-mono text-[11px] uppercase tracking-[0.08em] text-muted">
        <span>{t("footer.rights")}</span>
        <span>{t("contact.location")}</span>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
        {title}
      </span>
      <div className="mt-[18px] flex flex-col gap-[11px] text-sm">
        {links.map((l, i) => (
          <Link key={`${l.label}-${i}`} href={l.href} className="text-ink hover:opacity-55">
            {l.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

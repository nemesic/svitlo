"use client";

import { useStore } from "@/app/store-provider";
import type { MessageKey } from "@/lib/i18n";
import Eyebrow from "./Eyebrow";

const CELLS: { t: MessageKey; b: MessageKey }[] = [
  { t: "service.shipping.t", b: "service.shipping.b" },
  { t: "service.returns.t", b: "service.returns.b" },
  { t: "service.atelier.t", b: "service.atelier.b" },
  { t: "service.care.t", b: "service.care.b" },
];

export default function ServiceStrip() {
  const { t } = useStore();
  return (
    <section className="mt-16 grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] border-y border-line">
      {CELLS.map((c, i) => (
        <div
          key={c.t}
          className={`px-[clamp(20px,3vw,36px)] py-[30px] ${i < 3 ? "border-r border-line" : ""}`}
        >
          <Eyebrow className="!text-[11px] !tracking-[0.16em]">{t(c.t)}</Eyebrow>
          <p className="mt-3 text-[15px] font-normal">{t(c.b)}</p>
        </div>
      ))}
    </section>
  );
}

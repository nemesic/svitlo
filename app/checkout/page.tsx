"use client";

import Link from "next/link";
import { useState } from "react";
import { useStore } from "@/app/store-provider";
import Cta from "@/components/Cta";

const inputCls =
  "w-full border-0 border-b border-[rgba(10,10,10,0.2)] bg-transparent px-0.5 py-[13px] text-base outline-none focus:border-ink";

export default function CheckoutPage() {
  const {
    cartLines,
    subtotal,
    shipping,
    total,
    shipFree,
    clearCart,
    price,
    t,
  } = useStore();
  const [placed, setPlaced] = useState(false);

  if (placed) {
    return (
      <section className="flex min-h-[74vh] flex-col items-center justify-center px-[clamp(18px,5vw,40px)] py-[clamp(48px,8vw,90px)] text-center">
        <span className="mb-7 flex h-[60px] w-[60px] items-center justify-center border border-ink text-2xl">
          ✓
        </span>
        <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
          Order #SV-20419
        </span>
        <h1 className="mt-[18px] text-[clamp(40px,7vw,84px)] font-light leading-[0.98] tracking-[-0.03em]">
          {t("checkout.thanks")}
        </h1>
        <p className="mb-9 mt-5 max-w-[440px] text-base leading-[1.6] text-ink-soft">
          {t("checkout.confirmBody")}
        </p>
        <Cta
          href="/"
          variant="primary"
          arrow
          className="px-[34px] py-[17px] font-mono text-xs uppercase tracking-[0.14em]"
        >
          {t("checkout.continue")}
        </Cta>
      </section>
    );
  }

  return (
    <div>
      <div className="px-[clamp(18px,5vw,40px)] pt-[26px] font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
        <Link href="/" className="hover:opacity-60">
          {t("nav.home")}
        </Link>
        <span className="px-2 opacity-40">/</span>
        <span className="text-ink">{t("checkout.title")}</span>
      </div>

      <section className="grid grid-cols-1 items-start gap-[clamp(32px,5vw,64px)] px-[clamp(18px,5vw,40px)] pb-10 pt-6 md:grid-cols-2">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            clearCart();
            setPlaced(true);
          }}
        >
          <h1 className="mb-[30px] text-[clamp(30px,4vw,52px)] font-light tracking-[-0.03em]">
            {t("checkout.title")}
          </h1>

          <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
            01 — {t("checkout.step1")}
          </span>
          <div className="my-3.5 mb-[34px]">
            <input type="email" required placeholder={t("checkout.ph.email")} className={inputCls} />
          </div>

          <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
            02 — {t("checkout.step2")}
          </span>
          <div className="mb-[34px] mt-3.5 grid grid-cols-2 gap-[18px]">
            <input type="text" required placeholder={t("checkout.ph.firstName")} className={inputCls} />
            <input type="text" required placeholder={t("checkout.ph.lastName")} className={inputCls} />
            <input
              type="text"
              required
              placeholder={t("checkout.ph.address")}
              className={`${inputCls} col-span-2`}
            />
            <input type="text" required placeholder={t("checkout.ph.city")} className={inputCls} />
            <input
              type="text"
              required
              placeholder={t("checkout.ph.postal")}
              className={inputCls}
            />
          </div>

          <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
            03 — {t("checkout.step3")}
          </span>
          <div className="mb-8 mt-3.5">
            <input
              type="text"
              required
              placeholder={t("checkout.ph.card")}
              className={`${inputCls} mb-[18px]`}
            />
            <div className="grid grid-cols-2 gap-[18px]">
              <input type="text" required placeholder="MM / YY" className={inputCls} />
              <input type="text" required placeholder="CVC" className={inputCls} />
            </div>
          </div>

          <Cta
            type="submit"
            variant="primary"
            shine={false}
            className="w-full !bg-black p-[18px] font-mono text-xs uppercase tracking-[0.14em] !text-white hover:!bg-black"
          >
            {t("checkout.place")} — {price(total)}
          </Cta>
          <p className="mt-3.5 text-center font-mono text-[9px] italic tracking-[0.04em] text-[#999]">
            {t("checkout.demo")}
          </p>
        </form>

        <div className="sticky top-[90px] border border-line p-[clamp(26px,3vw,36px)]">
          <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
            {t("checkout.summary")}
          </span>
          {cartLines.length === 0 && (
            <p className="my-5 text-[15px] text-ink-soft">{t("checkout.emptyBag")}</p>
          )}
          <div className="my-5 mb-2">
            {cartLines.map((line) => (
              <div
                key={line.idx}
                className="flex items-baseline justify-between gap-3.5 border-b border-line py-[11px]"
              >
                <span className="text-sm text-[#3d3a32]">
                  {line.qty} × {line.name}
                  {(line.colour || line.size) && (
                    <span className="ml-2 font-mono text-[11px] uppercase tracking-[0.06em] text-muted">
                      {[line.colour, line.size].filter(Boolean).join(" · ")}
                    </span>
                  )}
                </span>
                <span className="text-sm font-medium">{line.price}</span>
              </div>
            ))}
          </div>
          <div className="flex justify-between py-2.5 font-mono text-xs uppercase tracking-[0.08em] text-muted">
            <span>{t("cart.subtotal")}</span>
            <span>{price(subtotal)}</span>
          </div>
          <div className="flex justify-between border-b border-line py-2.5 pb-4 font-mono text-xs uppercase tracking-[0.08em] text-muted">
            <span>{t("checkout.shippingLabel")}</span>
            <span>{shipFree ? t("checkout.free") : price(shipping)}</span>
          </div>
          <div className="flex items-baseline justify-between pt-[18px]">
            <span className="text-[15px] font-medium">{t("checkout.totalLabel")}</span>
            <span className="text-[26px] tracking-[-0.01em]">{price(total)}</span>
          </div>
        </div>
      </section>
    </div>
  );
}
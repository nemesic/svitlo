"use client";

import Link from "next/link";
import { useState } from "react";
import { useStore } from "@/app/store-provider";

const inputCls =
  "w-full border-0 border-b border-[rgba(23,21,15,0.2)] bg-transparent px-0.5 py-[13px] text-base outline-none focus:border-ink";

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
        <Link
          href="/"
          className="bg-ink px-[34px] py-[17px] font-mono text-xs uppercase tracking-[0.14em] text-bg hover:bg-[#2e2a20]"
        >
          {t("checkout.continue")}
        </Link>
      </section>
    );
  }

  return (
    <div>
      <div className="px-[clamp(18px,5vw,40px)] pt-[26px] font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
        <Link href="/" className="hover:opacity-60">
          Home
        </Link>
        <span className="px-2 opacity-40">/</span>
        <span className="text-ink">Checkout</span>
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
            01 — Contact
          </span>
          <div className="my-3.5 mb-[34px]">
            <input type="email" required placeholder="Email" className={inputCls} />
          </div>

          <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
            02 — Shipping address
          </span>
          <div className="mb-[34px] mt-3.5 grid grid-cols-2 gap-[18px]">
            <input type="text" required placeholder="First name" className={inputCls} />
            <input type="text" required placeholder="Last name" className={inputCls} />
            <input
              type="text"
              required
              placeholder="Address"
              className={`${inputCls} col-span-2`}
            />
            <input type="text" required placeholder="City" className={inputCls} />
            <input
              type="text"
              required
              placeholder="Postal code"
              className={inputCls}
            />
          </div>

          <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
            03 — Payment
          </span>
          <div className="mb-8 mt-3.5">
            <input
              type="text"
              required
              placeholder="Card number"
              className={`${inputCls} mb-[18px]`}
            />
            <div className="grid grid-cols-2 gap-[18px]">
              <input type="text" required placeholder="MM / YY" className={inputCls} />
              <input type="text" required placeholder="CVC" className={inputCls} />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-ink p-[18px] font-mono text-xs uppercase tracking-[0.14em] text-bg hover:bg-[#2e2a20]"
          >
            {t("checkout.place")} — {price(total)}
          </button>
          <p className="mt-3.5 text-center font-mono text-[10px] tracking-[0.04em] text-muted">
            Demo checkout — no payment is processed.
          </p>
        </form>

        <div className="sticky top-[90px] border border-line p-[clamp(26px,3vw,36px)]">
          <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
            Order summary
          </span>
          {cartLines.length === 0 && (
            <p className="my-5 text-[15px] text-ink-soft">Your bag is empty.</p>
          )}
          <div className="my-5 mb-2">
            {cartLines.map((line) => (
              <div
                key={line.idx}
                className="flex items-baseline justify-between gap-3.5 border-b border-line py-[11px]"
              >
                <span className="text-sm text-[#3d3a32]">{line.label}</span>
                <span className="text-sm font-medium">{line.price}</span>
              </div>
            ))}
          </div>
          <div className="flex justify-between py-2.5 font-mono text-xs uppercase tracking-[0.08em] text-muted">
            <span>Subtotal</span>
            <span>{price(subtotal)}</span>
          </div>
          <div className="flex justify-between border-b border-line py-2.5 pb-4 font-mono text-xs uppercase tracking-[0.08em] text-muted">
            <span>Shipping</span>
            <span>{shipFree ? "Free" : price(shipping)}</span>
          </div>
          <div className="flex items-baseline justify-between pt-[18px]">
            <span className="text-[15px] font-medium">Total</span>
            <span className="text-[26px] tracking-[-0.01em]">{price(total)}</span>
          </div>
        </div>
      </section>
    </div>
  );
}

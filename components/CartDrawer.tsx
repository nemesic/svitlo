"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { useStore } from "@/app/store-provider";
import { formatPrice } from "@/lib/currency";

export default function CartDrawer() {
  const {
    drawerOpen,
    closeDrawer,
    cartLines,
    count,
    subtotal,
    currency,
    shipFree,
    shipProgressPct,
    shipRemainingEur,
    removeItem,
    price,
    t,
  } = useStore();

  return (
    <AnimatePresence>
      {drawerOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-[90] bg-[rgba(23,21,15,0.4)]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            onClick={closeDrawer}
          />
          <motion.aside
            className="fixed right-0 top-0 z-[100] flex h-full w-[min(440px,92vw)] flex-col bg-bg"
            initial={{ x: "105%" }}
            animate={{ x: 0 }}
            exit={{ x: "105%" }}
            transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center justify-between border-b border-line px-7 py-6">
              <span className="text-base font-medium uppercase tracking-[0.04em]">
                {t("cart.title")} ({count})
              </span>
              <button
                type="button"
                onClick={closeDrawer}
                className="text-[22px] leading-none hover:opacity-55"
              >
                ×
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-7 py-2">
              {cartLines.length === 0 ? (
                <div className="flex flex-col items-start gap-3.5 py-12">
                  <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
                    {t("cart.empty")}
                  </span>
                  <button
                    type="button"
                    onClick={closeDrawer}
                    className="bg-ink px-6 py-3.5 font-mono text-[11px] uppercase tracking-[0.14em] text-bg hover:bg-[#2e2a20]"
                  >
                    {t("cart.continue")}
                  </button>
                </div>
              ) : (
                cartLines.map((line) => (
                  <div
                    key={line.idx}
                    className="flex items-center gap-4 border-b border-line py-[18px]"
                  >
                    <div
                      className="h-[72px] w-[58px] shrink-0 bg-placeholder"
                      style={{
                        backgroundImage:
                          "repeating-linear-gradient(135deg,#ddd8cf 0,#ddd8cf 1px,#e7e2d9 1px,#e7e2d9 8px)",
                      }}
                    />
                    <div className="min-w-0 flex-1">
                      <span className="block text-sm font-medium">
                        {line.label}
                      </span>
                      <span className="mt-1 block font-mono text-xs text-muted">
                        {line.price}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeItem(line.idx)}
                      className="font-mono text-[10px] uppercase tracking-[0.1em] text-muted hover:text-ink"
                    >
                      {t("cart.remove")}
                    </button>
                  </div>
                ))
              )}
            </div>

            <div className="border-t border-line px-7 pb-7 pt-5">
              {count > 0 && !shipFree && (
                <div className="mb-[18px]">
                  <p className="mb-2.5 font-mono text-[11px] text-ink">
                    Add{" "}
                    <span className="font-medium">
                      {formatPrice(shipRemainingEur, currency)}
                    </span>{" "}
                    for free shipping
                  </p>
                  <div className="h-[3px] overflow-hidden bg-[rgba(23,21,15,0.1)]">
                    <div
                      className="h-full bg-ink transition-[width] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                      style={{ width: `${shipProgressPct}%` }}
                    />
                  </div>
                </div>
              )}
              {count > 0 && shipFree && (
                <div className="mb-[18px] flex items-center gap-2 font-mono text-[11px] text-[#1f7a4d]">
                  <span>✓</span>
                  <span>{t("cart.freeUnlocked")}</span>
                </div>
              )}

              <div className="mb-[18px] flex items-baseline justify-between">
                <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
                  {t("cart.subtotal")}
                </span>
                <span className="text-[22px] tracking-[-0.01em]">
                  {price(subtotal)}
                </span>
              </div>
              <Link
                href="/checkout"
                onClick={closeDrawer}
                className="block w-full bg-ink p-4 text-center font-mono text-xs uppercase tracking-[0.14em] text-bg hover:bg-[#2e2a20]"
              >
                {t("cart.checkout")} — {price(subtotal)}
              </Link>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

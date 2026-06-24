"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import Cta from "@/components/Cta";
import { useStore } from "@/app/store-provider";

export default function CartDrawer() {
  const {
    drawerOpen,
    closeDrawer,
    cartLines,
    count,
    subtotal,
    shipFree,
    shipProgressPct,
    shipRemainingEur,
    removeItem,
    setQty,
    price,
    t,
  } = useStore();

  return (
    <AnimatePresence>
      {drawerOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-[90] bg-[rgba(10,10,10,0.4)]"
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

            <div data-lenis-prevent className="flex-1 overflow-y-auto px-7 py-2">
              {cartLines.length === 0 ? (
                <div className="flex flex-col items-start gap-3.5 py-12">
                  <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
                    {t("cart.empty")}
                  </span>
                  <Cta
                    onClick={closeDrawer}
                    variant="primary"
                    arrow
                    className="px-6 py-3.5 font-mono text-[11px] uppercase tracking-[0.14em]"
                  >
                    {t("cart.continue")}
                  </Cta>
                </div>
              ) : (
                cartLines.map((line) => (
                  <div
                    key={line.idx}
                    className="flex items-start gap-4 border-b border-line py-[18px]"
                  >
                    <div className="relative h-[72px] w-[58px] shrink-0 overflow-hidden bg-placeholder">
                      {line.image && (
                        <Image
                          src={line.image}
                          alt={line.name}
                          fill
                          sizes="58px"
                          className="object-cover"
                        />
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <span className="block text-sm font-medium">
                          {line.name}
                        </span>
                        <button
                          type="button"
                          onClick={() => removeItem(line.idx)}
                          className="shrink-0 font-mono text-[10px] uppercase tracking-[0.1em] text-muted hover:text-ink"
                        >
                          {t("cart.remove")}
                        </button>
                      </div>
                      {(line.colour || line.size) && (
                        <span className="mt-1 block font-mono text-[11px] uppercase tracking-[0.08em] text-muted">
                          {[line.colour, line.size].filter(Boolean).join(" · ")}
                        </span>
                      )}
                      <div className="mt-2.5 flex items-center justify-between">
                        <div className="flex items-center border border-[rgba(10,10,10,0.2)]">
                          <button
                            type="button"
                            onClick={() => setQty(line.idx, line.qty - 1)}
                            aria-label={t("cart.decrease")}
                            className="flex h-7 w-7 items-center justify-center text-sm leading-none text-[#111] hover:bg-[rgba(10,10,10,0.06)]"
                          >
                            −
                          </button>
                          <span className="w-7 text-center font-mono text-xs tabular-nums">
                            {line.qty}
                          </span>
                          <button
                            type="button"
                            onClick={() => setQty(line.idx, line.qty + 1)}
                            aria-label={t("cart.increase")}
                            className="flex h-7 w-7 items-center justify-center text-sm leading-none text-[#111] hover:bg-[rgba(10,10,10,0.06)]"
                          >
                            +
                          </button>
                        </div>
                        <span className="font-mono text-xs text-muted">
                          {line.price}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="border-t border-line px-7 pb-7 pt-5">
              {count > 0 && !shipFree && (
                <div className="mb-[18px]">
                  <p className="mb-2.5 font-mono text-[11px] text-[#111]">
                    {price(subtotal)} / {price(subtotal + shipRemainingEur)} —{" "}
                    {t("cart.add")}{" "}
                    <span className="font-medium">{price(shipRemainingEur)}</span>{" "}
                    {t("cart.forFree")}
                  </p>
                  <div className="h-1 overflow-hidden bg-[rgba(10,10,10,0.1)]">
                    <div
                      className="h-full bg-[#111] transition-[width] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
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
              <Cta
                href="/checkout"
                onClick={closeDrawer}
                variant="primary"
                shine={false}
                className="w-full !bg-black p-4 font-mono text-xs uppercase tracking-[0.14em] !text-white hover:!bg-black"
              >
                {t("cart.checkout")} — {price(subtotal)}
              </Cta>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

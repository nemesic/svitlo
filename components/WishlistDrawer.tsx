"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import Cta from "@/components/Cta";
import { useStore } from "@/app/store-provider";

export default function WishlistDrawer() {
  const {
    wishOpen,
    closeWish,
    wishLines,
    wishCount,
    moveToBag,
    toggleWish,
    t,
  } = useStore();

  return (
    <AnimatePresence>
      {wishOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-[90] bg-[rgba(10,10,10,0.4)]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            onClick={closeWish}
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
                {t("wish.title")} ({wishCount})
              </span>
              <button
                type="button"
                onClick={closeWish}
                className="text-[22px] leading-none hover:opacity-55"
              >
                ×
              </button>
            </div>

            <div data-lenis-prevent className="flex-1 overflow-y-auto px-7 py-2">
              {wishLines.length === 0 ? (
                <div className="flex flex-col items-start gap-3.5 py-12">
                  <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
                    {t("wish.empty")}
                  </span>
                  <Cta
                    onClick={closeWish}
                    variant="primary"
                    arrow
                    className="px-6 py-3.5 font-mono text-[11px] uppercase tracking-[0.14em]"
                  >
                    {t("wish.continue")}
                  </Cta>
                </div>
              ) : (
                wishLines.map((line) => (
                  <div
                    key={line.slug}
                    className="flex items-start gap-4 border-b border-line py-[18px]"
                  >
                    <Link
                      href={`/product/${line.slug}`}
                      onClick={closeWish}
                      aria-label={line.name}
                      className="relative h-[72px] w-[58px] shrink-0 overflow-hidden bg-placeholder"
                    >
                      {line.image && (
                        <Image
                          src={line.image}
                          alt={line.name}
                          fill
                          sizes="58px"
                          className="object-cover"
                        />
                      )}
                    </Link>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <Link
                          href={`/product/${line.slug}`}
                          onClick={closeWish}
                          className="block text-sm font-medium hover:opacity-55"
                        >
                          {line.name}
                        </Link>
                        <button
                          type="button"
                          onClick={() => toggleWish(line.slug)}
                          className="shrink-0 font-mono text-[10px] uppercase tracking-[0.1em] text-muted hover:text-ink"
                        >
                          {t("wish.remove")}
                        </button>
                      </div>
                      {line.colour && (
                        <span className="mt-1 block font-mono text-[11px] uppercase tracking-[0.08em] text-muted">
                          {line.colour}
                        </span>
                      )}
                      <div className="mt-2.5 flex items-center justify-between gap-3">
                        <button
                          type="button"
                          onClick={() => moveToBag(line.slug)}
                          className="border border-ink px-3.5 py-2 font-mono text-[10px] uppercase tracking-[0.12em] transition-colors hover:bg-ink hover:text-bg"
                        >
                          {t("wish.addToBag")}
                        </button>
                        <span className="font-mono text-xs text-muted">
                          {line.price}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

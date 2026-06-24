"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { useStore } from "@/app/store-provider";
import Price from "./Price";

const roll = {
  initial: { y: "115%" },
  animate: { y: 0 },
  exit: { y: "-115%" },
  transition: { type: "spring", stiffness: 520, damping: 34, mass: 0.7 },
} as const;

export default function QuickAdd({
  eur,
  onAdd,
}: {
  eur: number;
  onAdd: () => void;
}) {
  const { t } = useStore();
  const [added, setAdded] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  const handle = () => {
    onAdd();
    setAdded(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setAdded(false), 1700);
  };

  return (
    <button
      type="button"
      onClick={handle}
      aria-label={added ? t("product.added") : t("product.add")}
      className="absolute inset-x-0 bottom-0 z-20 flex h-[42px] translate-y-full items-center justify-center overflow-hidden bg-ink font-mono text-[11px] uppercase tracking-[0.16em] text-bg opacity-0 transition-[transform,opacity] duration-[450ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0 group-hover:opacity-100 [@media(hover:none)]:translate-y-0 [@media(hover:none)]:opacity-100"
    >
      <AnimatePresence mode="wait" initial={false}>
        {added ? (
          <motion.span key="added" {...roll} className="relative flex items-center gap-1.5">
            <span aria-hidden>✓</span> {t("product.added")}
          </motion.span>
        ) : (
          <motion.span key="add" {...roll} className="relative">
            {t("product.addShort")} — <Price eur={eur} />
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}

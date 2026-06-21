"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

export default function Preloader() {
  const [counter, setCounter] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const t0 = Date.now();
    const dur = 1700;
    let raf = 0;
    const tick = () => {
      const p = Math.min(1, (Date.now() - t0) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setCounter(Math.round(eased * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
      else setTimeout(() => setDone(true), 380);
    };
    raf = requestAnimationFrame(tick);
    const fallback = setTimeout(() => setDone(true), 2400);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(fallback);
    };
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[200] flex flex-col justify-end bg-bg"
          initial={{ y: 0 }}
          exit={{ y: "-101%" }}
          transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="flex items-end justify-between gap-5 px-[clamp(20px,5vw,48px)] pb-[clamp(28px,5vw,52px)]">
            <span className="text-[clamp(52px,14vw,180px)] font-normal uppercase leading-[0.82] tracking-[-0.04em]">
              SVITŁO
            </span>
            <span className="font-mono text-[clamp(28px,7vw,80px)] font-medium leading-none tracking-[-0.02em] text-muted">
              {counter}
            </span>
          </div>
          <div className="h-px bg-line">
            <div
              className="h-full bg-ink transition-[width] duration-100"
              style={{ width: `${counter}%` }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

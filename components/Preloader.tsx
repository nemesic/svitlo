"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

export default function Preloader() {
  const [done, setDone] = useState(false);

  useEffect(() => {
    const id = setTimeout(() => setDone(true), 1500);
    return () => clearTimeout(id);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[200] grid place-items-center bg-bg"
          initial={{ y: 0 }}
          exit={{ y: "-101%" }}
          transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
        >
          <span className="px-[clamp(20px,5vw,48px)] text-center text-[clamp(52px,14vw,180px)] font-normal uppercase leading-[0.82] tracking-[-0.04em]">
            SVITŁO
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

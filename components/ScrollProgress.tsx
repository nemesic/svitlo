"use client";

import { useEffect, useRef } from "react";

export default function ScrollProgress() {
  const thumb = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const el = thumb.current;
      if (!el) return;
      const docH = document.documentElement.scrollHeight;
      const winH = window.innerHeight;
      const max = docH - winH;
      if (max <= 1) {
        el.style.opacity = "0";
        return;
      }
      el.style.opacity = "1";
      const ratio = winH / docH;
      const progress = Math.min(1, Math.max(0, window.scrollY / max));
      el.style.height = `${ratio * 100}%`;
      el.style.top = `${progress * (100 - ratio * 100)}%`;
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed right-[5px] top-[96px] bottom-4 z-[70] w-[3px]"
    >
      <div
        ref={thumb}
        style={{ height: "20%", top: "0%" }}
        className="absolute right-0 w-full rounded-full bg-[rgba(10,10,10,0.22)] transition-opacity duration-300"
      />
    </div>
  );
}

"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { useStore } from "@/app/store-provider";

export default function SmoothScroll() {
  const { navOpen, drawerOpen, wishOpen, prefsOpen } = useStore();
  const pathname = usePathname();

  const positions = useRef<Map<string, number>>(new Map());
  const poppedRef = useRef(false);
  const pendingTarget = useRef(0);

  useEffect(() => {
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";

    const STORE = "sv:scroll-positions";
    try {
      const raw = sessionStorage.getItem(STORE);
      if (raw) positions.current = new Map(JSON.parse(raw));
    } catch {}

    const key = () => location.pathname + location.search;
    const onScroll = () => positions.current.set(key(), window.scrollY);
    const onPop = () => {
      poppedRef.current = true;
      pendingTarget.current = positions.current.get(key()) ?? 0;
    };
    const persist = () => {
      try {
        sessionStorage.setItem(STORE, JSON.stringify([...positions.current]));
      } catch {}
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("popstate", onPop);
    window.addEventListener("pagehide", persist);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("popstate", onPop);
      window.removeEventListener("pagehide", persist);
      persist();
    };
  }, []);

  useEffect(() => {
    const back = poppedRef.current;
    poppedRef.current = false;
    const target = back ? pendingTarget.current : 0;

    let raf = 0;
    const deadline = performance.now() + 1500;
    const tick = () => {
      window.scrollTo(0, target);
      const reached = Math.abs(window.scrollY - target) <= 2;
      if (!reached && performance.now() < deadline) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [pathname]);

  useEffect(() => {
    const open = navOpen || drawerOpen || wishOpen || prefsOpen;
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [navOpen, drawerOpen, wishOpen, prefsOpen]);

  return null;
}

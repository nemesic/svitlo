"use client";

import { useEffect } from "react";

export default function ChromeHeight() {
  useEffect(() => {
    const header = document.querySelector("header");
    if (!header) return;
    const marquee = header.previousElementSibling;

    const measure = () => {
      const h =
        header.getBoundingClientRect().height +
        (marquee ? marquee.getBoundingClientRect().height : 0);
      document.documentElement.style.setProperty("--chrome-h", `${h}px`);
    };

    measure();

    const ro = new ResizeObserver(measure);
    ro.observe(header);
    if (marquee) ro.observe(marquee);
    window.addEventListener("resize", measure);

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  return null;
}

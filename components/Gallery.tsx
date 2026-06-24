"use client";

import {
  AnimatePresence,
  animate,
  motion,
  type MotionValue,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "motion/react";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import MonoImage from "./MonoImage";

const SPRING = { type: "spring", stiffness: 300, damping: 34, mass: 0.7 } as const;

const useIso = typeof window !== "undefined" ? useLayoutEffect : useEffect;

export default function Gallery({
  images,
  alt,
}: {
  images: string[];
  alt: string;
}) {
  return (
    <>
      <MobileGallery images={images} alt={alt} />
      <DesktopGallery images={images} alt={alt} />
    </>
  );
}

function MobileGallery({ images, alt }: { images: string[]; alt: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [w, setW] = useState(0);
  const [idx, setIdx] = useState(0);
  const [shownImages, setShownImages] = useState(images);
  if (images !== shownImages) {
    setShownImages(images);
    setIdx(0);
  }
  const pad = (n: number) => String(n).padStart(2, "0");
  const n = images.length;
  const reduce = useReducedMotion();
  const x = useMotionValue(0);

  useIso(() => {
    const measure = () => {
      const next = containerRef.current?.clientWidth ?? 0;
      setW(next);
      x.set(-idx * next);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const slideW = w || 0;

  const go = (i: number) => {
    setIdx(i);
    animate(x, -i * slideW, SPRING);
  };

  useEffect(() => {
    animate(x, 0, SPRING);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [images]);

  return (
    <div className="md:hidden">
      <div ref={containerRef} className="relative overflow-hidden bg-placeholder">
        <motion.div
          className="flex cursor-grab active:cursor-grabbing"
          style={{ x }}
          drag="x"
          dragConstraints={{ left: -(n - 1) * slideW, right: 0 }}
          dragElastic={0.12}
          whileDrag={{ scale: 0.985 }}
          transition={SPRING}
          onDragEnd={(_, info) => {
            const threshold = slideW * 0.18;
            let next = idx;
            if (info.offset.x < -threshold || info.velocity.x < -450)
              next = Math.min(idx + 1, n - 1);
            else if (info.offset.x > threshold || info.velocity.x > 450)
              next = Math.max(idx - 1, 0);
            go(next);
          }}
        >
          {images.map((src, i) => (
            <Slide
              key={src}
              src={src}
              i={i}
              alt={i === 0 ? alt : ""}
              priority={i === 0}
              x={x}
              slideW={slideW}
              parallax={!reduce}
            />
          ))}
        </motion.div>
        <span className="pointer-events-none absolute bottom-3 right-3 z-10 bg-bg/85 px-2 py-1 font-mono text-[10px] tracking-[0.16em] text-ink backdrop-blur-sm">
          {pad(idx + 1)} / {pad(n)}
        </span>
      </div>
      <div className="mt-3 flex justify-center gap-2">
        {images.map((src, i) => (
          <button
            key={src}
            type="button"
            aria-label={`Go to image ${i + 1}`}
            aria-current={i === idx}
            onClick={() => go(i)}
            className={`h-2 rounded-full transition-all duration-300 ease-out ${
              i === idx ? "w-5 bg-ink" : "w-2 bg-[rgba(10,10,10,0.22)]"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

function Slide({
  src,
  i,
  alt,
  priority,
  x,
  slideW,
  parallax,
}: {
  src: string;
  i: number;
  alt: string;
  priority: boolean;
  x: MotionValue<number>;
  slideW: number;
  parallax: boolean;
}) {
  const imgX = useTransform(x, (latest) => {
    if (!parallax || !slideW) return 0;
    const pos = latest + i * slideW;
    const clamped = Math.max(-slideW, Math.min(slideW, pos));
    return clamped * -0.045;
  });

  return (
    <div
      style={{ width: slideW || "100%" }}
      className="relative aspect-[4/5] shrink-0 overflow-hidden"
    >
      <motion.div style={{ x: imgX }} className="absolute inset-0 scale-[1.1]">
        <MonoImage
          src={src}
          alt={alt}
          zoom={false}
          sizes="(min-width: 768px) 1px, 100vw"
          priority={priority}
          quality={90}
          className="pointer-events-none select-none"
        />
      </motion.div>
    </div>
  );
}

function DesktopGallery({ images, alt }: { images: string[]; alt: string }) {
  const [active, setActive] = useState(0);
  const [shownImages, setShownImages] = useState(images);
  if (images !== shownImages) {
    setShownImages(images);
    setActive(0);
  }
  const idx = Math.min(active, images.length - 1);
  const pad = (n: number) => String(n).padStart(2, "0");

  const thumbRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [frame, setFrame] = useState({ x: 0, y: 0, w: 0, h: 0 });

  const measure = () => {
    const el = thumbRefs.current[idx];
    if (el) {
      setFrame({
        x: el.offsetLeft,
        y: el.offsetTop,
        w: el.offsetWidth,
        h: el.offsetHeight,
      });
    }
  };
  useIso(measure, [idx, images]);
  useEffect(() => {
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idx]);

  return (
    <div className="hidden md:flex md:flex-row md:gap-3.5">
      <div className="relative flex flex-col gap-2.5">
        <motion.span
          aria-hidden
          initial={false}
          animate={{ x: frame.x, y: frame.y, width: frame.w, height: frame.h }}
          transition={{ type: "spring", stiffness: 440, damping: 38, mass: 0.8 }}
          className="pointer-events-none absolute left-0 top-0 z-10 border-2 border-ink"
        />
        {images.map((src, i) => {
          const on = i === idx;
          return (
            <button
              key={src}
              ref={(el) => {
                thumbRefs.current[i] = el;
              }}
              type="button"
              onMouseEnter={() => setActive(i)}
              onClick={() => setActive(i)}
              aria-label={`View image ${i + 1}`}
              aria-current={on}
              className="group relative aspect-[3/4] w-[74px] shrink-0 overflow-hidden bg-placeholder"
            >
              <MonoImage src={src} alt="" sizes="74px" zoom={false} />
              <span
                className={`absolute inset-0 bg-bg/40 transition-opacity duration-300 group-hover:bg-bg/0 ${
                  on ? "opacity-0" : "opacity-100"
                }`}
              />
            </button>
          );
        })}
      </div>

      <div className="group relative aspect-[4/5] flex-1 overflow-hidden bg-placeholder">
        <AnimatePresence initial={false}>
          <motion.div
            key={images[idx]}
            initial={{ opacity: 0, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="absolute -inset-px"
          >
            <MonoImage
              src={images[idx]}
              alt={alt}
              sizes="50vw"
              priority
              quality={90}
              zoom={false}
              className="transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
            />
          </motion.div>
        </AnimatePresence>
        <span className="pointer-events-none absolute bottom-3 right-3 z-10 bg-bg/85 px-2 py-1 font-mono text-[10px] tracking-[0.16em] text-ink backdrop-blur-sm">
          {pad(idx + 1)} / {pad(images.length)}
        </span>
      </div>
    </div>
  );
}

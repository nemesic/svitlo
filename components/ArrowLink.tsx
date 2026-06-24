"use client";

import Link from "next/link";
import { motion } from "motion/react";
import type { ReactNode } from "react";

const MotionLink = motion.create(Link);

export default function ArrowLink({
  href,
  children,
  className,
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <MotionLink
      href={href}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 420, damping: 26, mass: 0.6 }}
      className={`group inline-flex w-fit items-center gap-2 font-mono text-xs uppercase tracking-[0.12em] ${
        className ?? ""
      }`}
    >
      <span className="relative pb-1">
        {children}
        <span aria-hidden className="absolute inset-x-0 bottom-0 h-px bg-line" />
        <span
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-ink transition-transform duration-500 ease-out group-hover:scale-x-100 motion-reduce:scale-x-100 motion-reduce:transition-none"
        />
      </span>
      <span
        aria-hidden
        className="transition-transform duration-300 ease-out group-hover:translate-x-1 motion-reduce:transition-none"
      >
        →
      </span>
    </MotionLink>
  );
}

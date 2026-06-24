"use client";

import Link from "next/link";
import { motion } from "motion/react";
import type { ReactNode } from "react";

const MotionLink = motion.create(Link);

const interaction = {
  whileHover: { y: -2 },
  whileTap: { scale: 0.95 },
  transition: { type: "spring", stiffness: 420, damping: 26, mass: 0.6 },
} as const;

type Variant = "bare" | "primary" | "ghost";

const BASE: Record<Variant, string> = {
  bare: "",
  primary:
    "group relative inline-flex items-center justify-center overflow-hidden bg-accent text-bg transition-colors hover:bg-accent-deep",
  ghost:
    "group inline-flex items-center justify-center border border-[rgba(10,10,10,0.25)] transition-colors hover:border-ink",
};

type CtaProps = {
  href?: string;
  type?: "button" | "submit";
  onClick?: () => void;
  className?: string;
  variant?: Variant;
  arrow?: boolean;
  shine?: boolean;
  children: ReactNode;
  "aria-label"?: string;
};

export default function Cta({
  href,
  type = "button",
  onClick,
  className,
  variant = "bare",
  arrow = false,
  shine = true,
  children,
  ...rest
}: CtaProps) {
  const cls = [BASE[variant], className].filter(Boolean).join(" ");

  const arrowEl = arrow ? (
    <span
      aria-hidden
      className={
        variant === "ghost"
          ? "text-muted transition-all duration-300 ease-out group-hover:translate-x-1 group-hover:text-ink motion-reduce:transition-none"
          : "transition-transform duration-300 ease-out group-hover:translate-x-1 motion-reduce:transition-none"
      }
    >
      →
    </span>
  ) : null;

  const body =
    variant === "primary" ? (
      <>
        {shine && (
          <span
            aria-hidden
            className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/35 to-transparent transition-[left] duration-700 ease-out group-hover:left-[120%] motion-reduce:hidden"
          />
        )}
        <span className="relative inline-flex items-center gap-2.5">
          {children}
          {arrowEl}
        </span>
      </>
    ) : arrow ? (
      <span className="inline-flex items-center gap-2.5">
        {children}
        {arrowEl}
      </span>
    ) : (
      children
    );

  if (href) {
    return (
      <MotionLink
        href={href}
        onClick={onClick}
        className={cls}
        {...interaction}
        {...rest}
      >
        {body}
      </MotionLink>
    );
  }
  return (
    <motion.button
      type={type}
      onClick={onClick}
      className={cls}
      {...interaction}
      {...rest}
    >
      {body}
    </motion.button>
  );
}

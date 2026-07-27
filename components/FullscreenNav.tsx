"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useStore } from "@/app/store-provider";
import { CHANNELS, PROFILE_URL } from "@/lib/contact";
import { type Currency, SYMBOLS } from "@/lib/currency";
import type { Lang, MessageKey } from "@/lib/i18n";
import { scrollToTop } from "@/lib/scroll";

const LINKS: { href: string; key: MessageKey }[] = [
  { href: "/", key: "nav.home" },
  { href: "/contact", key: "nav.contact" },
  { href: "/account", key: "nav.account" },
];

export default function FullscreenNav() {
  const { navOpen, closeNav, lang, currency, setLang, setCurrency, t } =
    useStore();
  const pathname = usePathname();
  const reduce = useReducedMotion();

  const navigate = () => {
    closeNav();
    setTimeout(scrollToTop, 80);
  };

  return (
    <AnimatePresence>
      {navOpen && (
        <motion.div
          data-lenis-prevent
          className="fixed inset-x-0 top-0 z-[150] flex h-dvh flex-col overflow-y-auto bg-bg antialiased [backface-visibility:hidden]"
          initial={{ y: "-101%" }}
          animate={{ y: 0 }}
          exit={{ y: "-101%" }}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="absolute left-[clamp(20px,5vw,40px)] top-[clamp(20px,4vw,32px)] z-10">
            <button
              type="button"
              onClick={closeNav}
              aria-label={t("nav.close")}
              className="-m-3 block p-3 transition-opacity hover:opacity-50"
            >
              <svg
                aria-hidden
                viewBox="0 0 24 24"
                className="h-[26px] w-[26px]"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M4 4 20 20 M20 4 4 20" />
              </svg>
            </button>
          </div>
          <span className="absolute right-[clamp(20px,5vw,40px)] top-[clamp(20px,4vw,32px)] z-10 text-[13px] font-semibold uppercase leading-none tracking-[0.24em] text-ink">
            SVITŁO
          </span>

          <nav className="flex flex-1 shrink-0 flex-col items-center justify-center gap-[clamp(10px,1.4vw,20px)] px-[clamp(20px,5vw,56px)] pb-[clamp(24px,4vh,120px)] pt-[clamp(84px,11vh,160px)]">
            {LINKS.map((l, i) => {
              const current = pathname === l.href;
              return (
                <motion.div
                  key={l.href}
                  initial={reduce ? false : { opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.18 + i * 0.07,
                    ease: [0.76, 0, 0.24, 1],
                  }}
                >
                  <Link
                    href={l.href}
                    onClick={navigate}
                    aria-current={current ? "page" : undefined}
                    className="group relative block text-center text-[clamp(30px,8vw,132px)] font-light uppercase leading-[1.0] tracking-[0.035em] text-ink"
                  >
                    {t(l.key)}
                    <span
                      aria-hidden
                      className={`absolute inset-x-0 -bottom-1 h-px origin-left bg-ink transition-transform duration-500 ease-out motion-reduce:transition-none ${
                        current
                          ? "scale-x-100"
                          : "scale-x-0 group-hover:scale-x-100 group-focus-visible:scale-x-100"
                      }`}
                    />
                  </Link>
                </motion.div>
              );
            })}
          </nav>

          <motion.div
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.18 + LINKS.length * 0.07 }}
            className="flex shrink-0 flex-col items-center gap-4 px-[clamp(20px,5vw,56px)] pb-[calc(env(safe-area-inset-bottom,0px)+clamp(28px,5vh,44px))] md:absolute md:inset-x-0 md:bottom-0 md:gap-5 md:pb-[clamp(20px,3vw,32px)]"
          >
            <div className="flex flex-wrap justify-center gap-8 md:hidden">
              <PrefGroup
                label={t("prefs.language")}
                layoutId="nav-lang"
                options={["UA", "EN"] as Lang[]}
                active={lang}
                onPick={(v) => setLang(v as Lang)}
              />
              <PrefGroup
                label={t("prefs.currency")}
                layoutId="nav-cur"
                options={["UAH", "EUR", "USD"] as Currency[]}
                active={currency}
                onPick={(v) => setCurrency(v as Currency)}
                render={(v) => `${SYMBOLS[v as Currency]} ${v}`}
              />
            </div>

            <div className="flex flex-wrap justify-center gap-x-8 gap-y-2">
              {CHANNELS.map((c) => (
                <a
                  key={c.label}
                  href={PROFILE_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted-2 transition-colors hover:text-ink"
                >
                  {c.label}
                </a>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

const PILL = { type: "spring", stiffness: 380, damping: 32, mass: 0.8 } as const;

function PrefGroup({
  label,
  layoutId,
  options,
  active,
  onPick,
  render,
}: {
  label: string;
  layoutId: string;
  options: string[];
  active: string;
  onPick: (v: string) => void;
  render?: (v: string) => string;
}) {
  return (
    <div>
      <span className="mb-2.5 block font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
        {label}
      </span>
      <div className="flex gap-2">
        {options.map((o) => {
          const on = active === o;
          return (
            <button
              key={o}
              type="button"
              onClick={() => onPick(o)}
              aria-pressed={on}
              className="relative border border-[rgba(10,10,10,0.22)] px-3.5 py-2 font-mono text-xs tracking-[0.06em]"
            >
              {on && (
                <motion.span
                  layoutId={layoutId}
                  transition={PILL}
                  className="absolute inset-0 bg-ink"
                />
              )}
              <span
                className={`relative transition-colors duration-200 ${
                  on ? "text-bg" : "text-ink"
                }`}
              >
                {render ? render(o) : o}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

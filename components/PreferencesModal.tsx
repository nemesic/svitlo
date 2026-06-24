"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import type { ReactNode } from "react";
import { useStore } from "@/app/store-provider";
import Cta from "@/components/Cta";
import { type Currency, SYMBOLS } from "@/lib/currency";
import type { Lang } from "@/lib/i18n";

export default function PreferencesModal() {
  const { prefsOpen, closePrefs, lang, currency, savePrefs, t } = useStore();

  return (
    <AnimatePresence>
      {prefsOpen && (
        <motion.div
          className="fixed inset-0 z-[110] flex items-center justify-center bg-[rgba(10,10,10,0.45)] p-6 backdrop-blur-[2px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={closePrefs}
        >
          <PrefsPanel
            lang={lang}
            currency={currency}
            onClose={closePrefs}
            onSave={savePrefs}
            t={t}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

const PILL = { type: "spring", stiffness: 380, damping: 32, mass: 0.8 } as const;

function Option({
  on,
  layoutId,
  onClick,
  children,
}: {
  on: boolean;
  layoutId: string;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={on}
      className="relative border border-[rgba(10,10,10,0.2)] px-2 py-3.5 text-[13px] font-medium"
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
        {children}
      </span>
    </button>
  );
}

function PrefsPanel({
  lang,
  currency,
  onClose,
  onSave,
  t,
}: {
  lang: Lang;
  currency: Currency;
  onClose: () => void;
  onSave: (l: Lang, c: Currency) => void;
  t: (key: "prefs.title" | "prefs.language" | "prefs.currency" | "prefs.save") => string;
}) {
  const [draftLang, setDraftLang] = useState<Lang>(lang);
  const [draftCur, setDraftCur] = useState<Currency>(currency);

  return (
    <motion.div
      className="w-[min(440px,100%)] border border-line bg-bg p-9 shadow-[0_30px_90px_-24px_rgba(10,10,10,0.4)]"
      initial={{ opacity: 0, y: 14, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 10, scale: 0.97 }}
      transition={{ type: "spring", stiffness: 320, damping: 30, mass: 0.9 }}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="mb-[30px] flex items-center justify-between">
        <span className="text-lg font-medium uppercase tracking-[0.04em]">
          {t("prefs.title")}
        </span>
        <button
          type="button"
          onClick={onClose}
          className="text-xl leading-none hover:opacity-55"
        >
          ×
        </button>
      </div>

      <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
        {t("prefs.language")}
      </span>
      <div className="mb-7 mt-3.5 grid grid-cols-2 gap-2.5">
        {(["UA", "EN"] as Lang[]).map((l) => (
          <Option
            key={l}
            on={draftLang === l}
            layoutId="prefs-lang"
            onClick={() => setDraftLang(l)}
          >
            {l === "UA" ? "Українська (UA)" : "English (EN)"}
          </Option>
        ))}
      </div>

      <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
        {t("prefs.currency")}
      </span>
      <div className="mb-[30px] mt-3.5 grid grid-cols-3 gap-2.5">
        {(["UAH", "EUR", "USD"] as Currency[]).map((c) => (
          <Option
            key={c}
            on={draftCur === c}
            layoutId="prefs-cur"
            onClick={() => setDraftCur(c)}
          >
            {SYMBOLS[c]} {c}
          </Option>
        ))}
      </div>

      <Cta
        onClick={() => onSave(draftLang, draftCur)}
        variant="primary"
        className="w-full p-4 font-mono text-xs uppercase tracking-[0.14em]"
      >
        {t("prefs.save")}
      </Cta>
    </motion.div>
  );
}

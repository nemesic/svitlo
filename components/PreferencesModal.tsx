"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { useStore } from "@/app/store-provider";
import { type Currency, SYMBOLS } from "@/lib/currency";
import type { Lang } from "@/lib/i18n";

export default function PreferencesModal() {
  const { prefsOpen, closePrefs, lang, currency, savePrefs, t } = useStore();

  return (
    <AnimatePresence>
      {prefsOpen && (
        <motion.div
          className="fixed inset-0 z-[110] flex items-center justify-center bg-[rgba(23,21,15,0.45)] p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={closePrefs}
        >
          {/* Mounted only while open, so drafts initialize fresh from current prefs. */}
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

  const cell = (on: boolean) =>
    `cursor-pointer border px-2 py-3.5 text-[13px] font-medium ${
      on ? "border-ink bg-ink text-bg" : "border-[rgba(23,21,15,0.2)] text-ink"
    }`;

  return (
    <motion.div
      className="w-[min(440px,100%)] border border-line bg-bg p-9"
      initial={{ scale: 0.94 }}
      animate={{ scale: 1 }}
      exit={{ scale: 0.94 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
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
          <button
            key={l}
            type="button"
            className={cell(draftLang === l)}
            onClick={() => setDraftLang(l)}
          >
            {l === "UA" ? "Українська (UA)" : "English (EN)"}
          </button>
        ))}
      </div>

      <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
        {t("prefs.currency")}
      </span>
      <div className="mb-[30px] mt-3.5 grid grid-cols-3 gap-2.5">
        {(["UAH", "EUR", "USD"] as Currency[]).map((c) => (
          <button
            key={c}
            type="button"
            className={cell(draftCur === c)}
            onClick={() => setDraftCur(c)}
          >
            {SYMBOLS[c]} {c}
          </button>
        ))}
      </div>

      <button
        type="button"
        onClick={() => onSave(draftLang, draftCur)}
        className="w-full bg-ink p-4 font-mono text-xs uppercase tracking-[0.14em] text-bg transition-colors hover:bg-[#2e2a20]"
      >
        {t("prefs.save")}
      </button>
    </motion.div>
  );
}

"use client";

import Image from "next/image";
import { useState } from "react";
import { useStore } from "@/app/store-provider";

const inputCls =
  "w-full border-0 border-b border-[rgba(23,21,15,0.2)] bg-transparent px-0.5 py-[11px] text-base outline-none focus:border-ink";

export default function AccountPage() {
  const { t } = useStore();
  const [loggedIn, setLoggedIn] = useState(false);
  const [mode, setMode] = useState<"login" | "register">("login");

  if (loggedIn) {
    return (
      <section className="px-[clamp(18px,5vw,40px)] pb-10 pt-[clamp(48px,7vw,80px)]">
        <div className="flex flex-wrap items-end justify-between gap-5 border-b border-line pb-[34px]">
          <div>
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
              Welcome back
            </span>
            <h1 className="mt-3 text-[clamp(32px,5vw,62px)] font-light leading-[0.98] tracking-[-0.03em]">
              Taras K.
            </h1>
          </div>
          <button
            type="button"
            onClick={() => setLoggedIn(false)}
            className="border border-[rgba(23,21,15,0.25)] px-[22px] py-[11px] font-mono text-[11px] uppercase tracking-[0.12em] hover:border-ink"
          >
            {t("account.signout")}
          </button>
        </div>

        <div className="my-[34px] grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-3">
          {[
            { v: "3", k: t("account.orders") },
            { v: "7", k: t("account.wishlist") },
            { v: "2", k: t("account.addresses") },
            { v: "Gold", k: t("account.tier") },
          ].map((c) => (
            <div key={c.k} className="border border-line p-[26px]">
              <span className="text-[40px] font-light tracking-[-0.03em]">
                {c.v}
              </span>
              <p className="mt-1.5 font-mono text-[11px] uppercase tracking-[0.1em] text-muted">
                {c.k}
              </p>
            </div>
          ))}
        </div>

        <h2 className="mb-[18px] mt-10 text-xl font-medium tracking-[-0.01em]">
          {t("account.recent")}
        </h2>
        <div className="flex items-center gap-[18px] border border-line p-[18px]">
          <div className="relative h-[68px] w-[56px] shrink-0 overflow-hidden bg-placeholder">
            <Image
              src="/images/products/garment-dyed-hoodie.jpg"
              alt="order"
              fill
              sizes="56px"
              className="object-cover grayscale"
            />
          </div>
          <div className="min-w-0 flex-1">
            <span className="block text-[15px] font-medium">Order #SV-20418</span>
            <span className="mt-1 block font-mono text-[11px] uppercase tracking-[0.08em] text-muted">
              2 items — Delivered
            </span>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="grid min-h-[78vh] grid-cols-1 md:grid-cols-2">
      <div className="flex flex-col justify-center px-[clamp(18px,5vw,72px)] py-[clamp(48px,8vw,90px)]">
        <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
          SVITŁO — Account
        </span>
        <div className="my-[28px] flex max-w-[380px] border-b border-line">
          {(["login", "register"] as const).map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => setMode(m)}
              className={`-mb-px flex-1 border-b py-3.5 text-sm font-semibold uppercase tracking-[0.03em] ${
                mode === m
                  ? "border-ink text-ink"
                  : "border-transparent text-[#a8a39a]"
              }`}
            >
              {m === "login" ? t("account.signin") : t("account.register")}
            </button>
          ))}
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setLoggedIn(true);
          }}
          className="max-w-[380px]"
        >
          {mode === "register" && (
            <div className="mb-[22px]">
              <label className="mb-2 block font-mono text-[11px] uppercase tracking-[0.12em] text-muted">
                Full name
              </label>
              <input type="text" placeholder="Taras Svitlo" className={inputCls} />
            </div>
          )}
          <div className="mb-[22px]">
            <label className="mb-2 block font-mono text-[11px] uppercase tracking-[0.12em] text-muted">
              Email
            </label>
            <input
              type="email"
              required
              placeholder="you@email.com"
              className={inputCls}
            />
          </div>
          <div className="mb-[30px]">
            <label className="mb-2 block font-mono text-[11px] uppercase tracking-[0.12em] text-muted">
              Password
            </label>
            <input
              type="password"
              required
              placeholder="••••••••"
              className={inputCls}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-ink p-[17px] font-mono text-xs uppercase tracking-[0.14em] text-bg hover:bg-[#2e2a20]"
          >
            {mode === "login" ? t("account.signin") : t("account.register")}
          </button>
          <p className="mt-4 font-mono text-[10px] tracking-[0.04em] text-muted">
            Demo only — no real account is created.
          </p>
        </form>
      </div>
      <div className="relative min-h-[340px] overflow-hidden bg-placeholder">
        <Image
          src="/images/editorial/account.jpg"
          alt="Account"
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover grayscale contrast-[1.04]"
        />
        <div className="absolute inset-x-[clamp(20px,4vw,40px)] bottom-[clamp(20px,4vw,40px)]">
          <p className="inline bg-bg px-2.5 py-1.5 text-[clamp(16px,2.2vw,22px)] leading-[1.7] tracking-[-0.01em] [box-decoration-break:clone]">
            {t("account.members")}
          </p>
        </div>
      </div>
    </section>
  );
}

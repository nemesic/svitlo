"use client";

import Image from "next/image";
import { useState } from "react";
import { useStore } from "@/app/store-provider";
import Cta from "@/components/Cta";
import ProductCard from "@/components/ProductCard";
import { getProduct } from "@/lib/products";

const inputCls =
  "w-full border-0 border-b border-[rgba(10,10,10,0.2)] bg-transparent px-0.5 py-[11px] text-base outline-none focus:border-ink";

export default function AccountPage() {
  const { t, wishlist, wishCount } = useStore();
  const [loggedIn, setLoggedIn] = useState(false);
  const [mode, setMode] = useState<"login" | "register">("login");
  const saved = wishlist
    .map((slug) => getProduct(slug))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  if (loggedIn) {
    return (
      <section className="px-[clamp(18px,5vw,40px)] pb-10 pt-[clamp(48px,7vw,80px)]">
        <div className="flex flex-wrap items-end justify-between gap-5 border-b border-line pb-[34px]">
          <div>
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
              {t("account.welcome")}
            </span>
            <h1 className="mt-3 text-[clamp(32px,5vw,62px)] font-light leading-[0.98] tracking-[-0.03em]">
              Taras K.
            </h1>
          </div>
          <Cta
            onClick={() => setLoggedIn(false)}
            variant="ghost"
            className="px-[22px] py-[11px] font-mono text-[11px] uppercase tracking-[0.12em]"
          >
            {t("account.signout")}
          </Cta>
        </div>

        <div className="my-[34px] grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-3">
          {[
            { v: "3", k: t("account.orders") },
            { v: String(wishCount), k: t("account.wishlist") },
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
          {t("account.wishlist")}
        </h2>
        {saved.length === 0 ? (
          <p className="border border-line p-[26px] font-mono text-[12px] tracking-[0.04em] text-muted">
            {t("account.wishlistEmpty")}
          </p>
        ) : (
          <div className="grid grid-cols-2 gap-x-3.5 gap-y-9 md:grid-cols-3 lg:grid-cols-4">
            {saved.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        )}

        <h2 className="mb-[18px] mt-12 text-xl font-medium tracking-[-0.01em]">
          {t("account.recent")}
        </h2>
        <div className="flex items-center gap-[18px] border border-line p-[18px]">
          <div className="relative h-[68px] w-[56px] shrink-0 overflow-hidden bg-placeholder">
            <Image
              src="/images/products/stwd-studio-hoodie/black-1.webp"
              alt="order"
              fill
              sizes="56px"
              className="object-cover"
            />
          </div>
          <div className="min-w-0 flex-1">
            <span className="block text-[15px] font-medium">Order #SV-20418</span>
            <span className="mt-1 block font-mono text-[11px] uppercase tracking-[0.08em] text-muted">
              {t("account.delivered")}
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
          SVITŁO — {t("nav.account")}
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
                {t("account.fullName")}
              </label>
              <input type="text" placeholder="Taras Svitlo" className={inputCls} />
            </div>
          )}
          <div className="mb-[22px]">
            <label className="mb-2 block font-mono text-[11px] uppercase tracking-[0.12em] text-muted">
              {t("account.emailLabel")}
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
              {t("account.password")}
            </label>
            <input
              type="password"
              required
              placeholder="••••••••"
              className={inputCls}
            />
          </div>
          <Cta
            type="submit"
            variant="primary"
            className="w-full p-[17px] font-mono text-xs uppercase tracking-[0.14em]"
          >
            {mode === "login" ? t("account.signin") : t("account.register")}
          </Cta>
          <p className="mt-4 font-mono text-[9px] italic tracking-[0.04em] text-[#999]">
            {t("account.demo")}
          </p>
        </form>
      </div>
      <div className="relative min-h-[340px] overflow-hidden bg-placeholder">
        <video
          src="/images/editorial/account.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute bottom-0 left-0 p-5">
          <p
            spellCheck={false}
            className="border-0 text-sm leading-[1.4] tracking-[0.05em] text-white no-underline [text-decoration:none]"
          >
            {t("account.members")}
          </p>
        </div>
      </div>
    </section>
  );
}
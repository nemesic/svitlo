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

  const submitLabel =
    mode === "login" ? t("account.signin") : t("account.register");
  return (
    <section className="flex min-h-[calc(100dvh-var(--chrome-h))] items-start justify-center px-[clamp(18px,5vw,40px)] pb-[clamp(48px,8vw,96px)] pt-[clamp(36px,9vh,104px)]">
      {/* Одна центрированная колонка. Ширина 400px — форма из трёх полей не
          должна растягиваться на пол-экрана: длинная строка ввода читается
          как «здесь много текста», а тут нужно 30 символов. */}
      <div className="w-full max-w-[400px]">
        <span className="block text-center font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
          SVITŁO — {t("nav.account")}
        </span>

        <div className="mt-[clamp(22px,3vw,30px)] border border-line">
          <div className="flex border-b border-line">
            {(["login", "register"] as const).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setMode(m)}
                aria-pressed={mode === m}
                className={`relative flex-1 py-4 font-mono text-[11px] uppercase tracking-[0.14em] transition-colors ${
                  mode === m ? "text-ink" : "text-muted hover:text-ink"
                }`}
              >
                {m === "login" ? t("account.signin") : t("account.register")}

                {mode === m && (
                  <span
                    aria-hidden
                    className="absolute inset-x-0 -bottom-px h-0.5 bg-ink"
                  />
                )}
              </button>
            ))}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              setLoggedIn(true);
            }}
            className="p-[clamp(20px,3.5vw,30px)]"
          >
            {mode === "register" && (
              <div className="mb-[22px]">
                <label
                  htmlFor="acc-name"
                  className="mb-2 block font-mono text-[11px] uppercase tracking-[0.12em] text-muted"
                >
                  {t("account.fullName")}
                </label>
                <input
                  id="acc-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  placeholder="Taras Svitlo"
                  className={inputCls}
                />
              </div>
            )}
            <div className="mb-[22px]">
              <label
                htmlFor="acc-email"
                className="mb-2 block font-mono text-[11px] uppercase tracking-[0.12em] text-muted"
              >
                {t("account.emailLabel")}
              </label>
              <input
                id="acc-email"
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="you@email.com"
                className={inputCls}
              />
            </div>
            <div className="mb-[28px]">
              <label
                htmlFor="acc-password"
                className="mb-2 block font-mono text-[11px] uppercase tracking-[0.12em] text-muted"
              >
                {t("account.password")}
              </label>
              <input
                id="acc-password"
                name="password"
                type="password"
                required
                autoComplete={
                  mode === "login" ? "current-password" : "new-password"
                }
                placeholder="••••••••"
                className={inputCls}
              />
            </div>
            <Cta
              type="submit"
              variant="primary"
              className="w-full p-[17px] font-mono text-xs uppercase tracking-[0.14em]"
            >
              {submitLabel}
            </Cta>
          </form>
        </div>


        <p className="mt-[18px] text-center font-mono text-[12px] leading-[1.6] tracking-[0.03em] text-muted-2">
          {t("account.demo")}
        </p>
      </div>
    </section>
  );
}
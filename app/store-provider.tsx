"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  addToItems,
  cartCount,
  cartSubtotal,
  type CartItem,
  removeAt,
  shipProgress,
  shipRemaining,
  shippingCost,
} from "@/lib/cart";
import { type Currency, formatPrice } from "@/lib/currency";
import { type Lang, type MessageKey, t as translate } from "@/lib/i18n";
import { getProduct } from "@/lib/products";

interface StoreValue {
  lang: Lang;
  currency: Currency;
  items: CartItem[];
  hydrated: boolean;
  navOpen: boolean;
  drawerOpen: boolean;
  prefsOpen: boolean;
  count: number;
  subtotal: number;
  shipping: number;
  total: number;
  shipFree: boolean;
  shipProgressPct: number;
  shipRemainingEur: number;
  cartLines: { idx: number; label: string; price: string }[];
  addItem: (name: string, eur: number) => void;
  addBySlug: (slug: string) => void;
  removeItem: (index: number) => void;
  clearCart: () => void;
  openNav: () => void;
  closeNav: () => void;
  openDrawer: () => void;
  closeDrawer: () => void;
  openPrefs: () => void;
  closePrefs: () => void;
  setLang: (l: Lang) => void;
  setCurrency: (c: Currency) => void;
  savePrefs: (l: Lang, c: Currency) => void;
  t: (key: MessageKey) => string;
  price: (eur: number) => string;
}

const StoreContext = createContext<StoreValue | null>(null);

const LS_KEY = "svitlo-store";

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [lang, setLang] = useState<Lang>("EN");
  const [currency, setCurrency] = useState<Currency>("EUR");
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [prefsOpen, setPrefsOpen] = useState(false);

  // Hydrate persisted state on the client only. Reading localStorage during
  // render would cause an SSR/client hydration mismatch, so this one-time
  // mount effect is the correct place to apply the saved values.
  useEffect(() => {
    /* eslint-disable react-hooks/set-state-in-effect -- intentional one-time client hydration from localStorage */
    try {
      const raw = localStorage.getItem(LS_KEY);
      if (raw) {
        const saved = JSON.parse(raw);
        if (saved.lang) setLang(saved.lang);
        if (saved.currency) setCurrency(saved.currency);
        if (Array.isArray(saved.items)) setItems(saved.items);
      }
    } catch {
      // ignore corrupt storage
    }
    setHydrated(true);
    /* eslint-enable react-hooks/set-state-in-effect */
  }, []);

  // Persist after hydration.
  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(LS_KEY, JSON.stringify({ lang, currency, items }));
    } catch {
      // ignore quota errors
    }
  }, [lang, currency, items, hydrated]);

  const addItem = useCallback((name: string, eur: number) => {
    setItems((prev) => addToItems(prev, name, eur));
    setDrawerOpen(true);
  }, []);

  const addBySlug = useCallback((slug: string) => {
    const p = getProduct(slug);
    if (!p) return;
    setItems((prev) => addToItems(prev, p.name, p.eur));
    setDrawerOpen(true);
  }, []);

  const removeItem = useCallback((index: number) => {
    setItems((prev) => removeAt(prev, index));
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const savePrefs = useCallback((l: Lang, c: Currency) => {
    setLang(l);
    setCurrency(c);
    setPrefsOpen(false);
  }, []);

  const price = useCallback(
    (eur: number) => formatPrice(eur, currency),
    [currency],
  );
  const t = useCallback((key: MessageKey) => translate(key, lang), [lang]);

  const subtotal = useMemo(() => cartSubtotal(items), [items]);
  const shipping = useMemo(() => shippingCost(subtotal), [subtotal]);

  const value: StoreValue = {
    lang,
    currency,
    items,
    hydrated,
    navOpen,
    drawerOpen,
    prefsOpen,
    count: cartCount(items),
    subtotal,
    shipping,
    total: subtotal + shipping,
    shipFree: subtotal === 0 || subtotal >= 200,
    shipProgressPct: shipProgress(subtotal),
    shipRemainingEur: shipRemaining(subtotal),
    cartLines: items.map((it, idx) => ({
      idx,
      label: `${it.qty} × ${it.name}`,
      price: formatPrice(it.eur * it.qty, currency),
    })),
    addItem,
    addBySlug,
    removeItem,
    clearCart,
    openNav: () => setNavOpen(true),
    closeNav: () => setNavOpen(false),
    openDrawer: () => setDrawerOpen(true),
    closeDrawer: () => setDrawerOpen(false),
    openPrefs: () => setPrefsOpen(true),
    closePrefs: () => setPrefsOpen(false),
    setLang,
    setCurrency,
    savePrefs,
    t,
    price,
  };

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
}

export function useStore(): StoreValue {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used within StoreProvider");
  return ctx;
}

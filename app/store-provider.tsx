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
  setQtyAt,
  shipProgress,
  shipRemaining,
  shippingCost,
} from "@/lib/cart";
import { type Currency, formatPrice } from "@/lib/currency";
import {
  colourLabel,
  type Lang,
  type MessageKey,
  productName,
  t as translate,
} from "@/lib/i18n";
import { getProduct, PRODUCTS } from "@/lib/products";
import {
  isWished as wishHas,
  toggleWish as toggleWishSlug,
  wishCount as countWished,
} from "@/lib/wishlist";

interface StoreValue {
  lang: Lang;
  currency: Currency;
  items: CartItem[];
  wishlist: string[];
  wishCount: number;
  hydrated: boolean;
  navOpen: boolean;
  drawerOpen: boolean;
  wishOpen: boolean;
  prefsOpen: boolean;
  count: number;
  subtotal: number;
  shipping: number;
  total: number;
  shipFree: boolean;
  shipProgressPct: number;
  shipRemainingEur: number;
  cartLines: {
    idx: number;
    name: string;
    qty: number;
    colour: string | null;
    size: string | null;
    price: string;
    image: string | null;
  }[];
  wishLines: {
    slug: string;
    name: string;
    colour: string | null;
    price: string;
    image: string | null;
  }[];
  addItem: (slug: string, eur: number, colour: string, size: string) => void;
  addBySlug: (slug: string) => void;
  toggleWish: (slug: string) => void;
  isWished: (slug: string) => boolean;
  moveToBag: (slug: string) => void;
  removeItem: (index: number) => void;
  setQty: (index: number, qty: number) => void;
  clearCart: () => void;
  openNav: () => void;
  closeNav: () => void;
  openDrawer: () => void;
  closeDrawer: () => void;
  openWish: () => void;
  closeWish: () => void;
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

function migrateItems(raw: unknown[]): CartItem[] {
  return raw.flatMap((entry) => {
    const it = entry as Partial<CartItem> & { name?: string };
    const slug = it.slug ?? PRODUCTS.find((p) => p.name === it.name)?.slug;
    const product = slug ? getProduct(slug) : undefined;
    if (!slug || !product || typeof it.eur !== "number") return [];
    return [
      {
        slug,
        eur: it.eur,
        qty: typeof it.qty === "number" && it.qty > 0 ? it.qty : 1,
        colour: it.colour ?? product.colours[0].name,
        size: it.size ?? "M",
      },
    ];
  });
}

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [lang, setLang] = useState<Lang>("EN");
  const [currency, setCurrency] = useState<Currency>("EUR");
  const [items, setItems] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [wishOpen, setWishOpen] = useState(false);
  const [prefsOpen, setPrefsOpen] = useState(false);

  useEffect(() => {
    /* eslint-disable react-hooks/set-state-in-effect -- intentional one-time client hydration from localStorage */
    try {
      const raw = localStorage.getItem(LS_KEY);
      if (raw) {
        const saved = JSON.parse(raw);
        if (saved.lang) setLang(saved.lang);
        if (saved.currency) setCurrency(saved.currency);
        if (Array.isArray(saved.items)) setItems(migrateItems(saved.items));
        if (Array.isArray(saved.wishlist)) {
          setWishlist(
            saved.wishlist.filter(
              (s: unknown): s is string =>
                typeof s === "string" && Boolean(getProduct(s)),
            ),
          );
        }
      }
    } catch {}
    setHydrated(true);
    /* eslint-enable react-hooks/set-state-in-effect */
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(
        LS_KEY,
        JSON.stringify({ lang, currency, items, wishlist }),
      );
    } catch {}
  }, [lang, currency, items, wishlist, hydrated]);

  const addItem = useCallback(
    (slug: string, eur: number, colour: string, size: string) => {
      setItems((prev) => addToItems(prev, slug, eur, colour, size));
      setDrawerOpen(true);
    },
    [],
  );

  const addBySlug = useCallback((slug: string) => {
    const p = getProduct(slug);
    if (!p) return;
    setItems((prev) => addToItems(prev, p.slug, p.eur, p.colours[0].name, "M"));
    setDrawerOpen(true);
  }, []);

  const removeItem = useCallback((index: number) => {
    setItems((prev) => removeAt(prev, index));
  }, []);

  const setQty = useCallback((index: number, qty: number) => {
    setItems((prev) => setQtyAt(prev, index, qty));
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const toggleWish = useCallback((slug: string) => {
    setWishlist((prev) => toggleWishSlug(prev, slug));
  }, []);

  const moveToBag = useCallback(
    (slug: string) => {
      addBySlug(slug);
      setWishlist((prev) => prev.filter((s) => s !== slug));
      setWishOpen(false);
    },
    [addBySlug],
  );

  const isWished = useCallback(
    (slug: string) => wishHas(wishlist, slug),
    [wishlist],
  );

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
    wishlist,
    wishCount: countWished(wishlist),
    hydrated,
    navOpen,
    drawerOpen,
    wishOpen,
    prefsOpen,
    count: cartCount(items),
    subtotal,
    shipping,
    total: subtotal + shipping,
    shipFree: subtotal === 0 || subtotal >= 200,
    shipProgressPct: shipProgress(subtotal),
    shipRemainingEur: shipRemaining(subtotal),
    cartLines: items.map((it, idx) => {
      const match = PRODUCTS.find((p) => p.slug === it.slug);
      const displayName = match ? productName(match.slug, lang, match.name) : "";
      const colourOpt =
        match?.colours.find((c) => c.name === it.colour) ?? match?.colours[0];
      return {
        idx,
        name: displayName,
        qty: it.qty,
        colour: colourOpt ? colourLabel(colourOpt.name, lang) : null,
        size: it.size ?? null,
        price: formatPrice(it.eur * it.qty, currency),
        image: colourOpt?.swatch ?? null,
      };
    }),
    wishLines: wishlist.flatMap((slug) => {
      const match = getProduct(slug);
      if (!match) return [];
      return [
        {
          slug,
          name: productName(match.slug, lang, match.name),
          colour: match.colours[0]
            ? colourLabel(match.colours[0].name, lang)
            : null,
          price: formatPrice(match.eur, currency),
          image: match.colours[0]?.swatch ?? null,
        },
      ];
    }),
    addItem,
    addBySlug,
    toggleWish,
    isWished,
    moveToBag,
    removeItem,
    setQty,
    clearCart,
    openNav: () => setNavOpen(true),
    closeNav: () => setNavOpen(false),
    openDrawer: () => setDrawerOpen(true),
    closeDrawer: () => setDrawerOpen(false),
    openWish: () => setWishOpen(true),
    closeWish: () => setWishOpen(false),
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

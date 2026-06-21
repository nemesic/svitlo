export interface CartItem {
  name: string;
  eur: number;
  qty: number;
}

export const FREE_SHIP_THRESHOLD = 200;
export const FLAT_SHIP = 15;

export function addToItems(
  items: CartItem[],
  name: string,
  eur: number,
): CartItem[] {
  const next = items.map((it) => ({ ...it }));
  const existing = next.find((it) => it.name === name);
  if (existing) {
    existing.qty += 1;
  } else {
    next.push({ name, eur, qty: 1 });
  }
  return next;
}

export function removeAt(items: CartItem[], index: number): CartItem[] {
  return items.filter((_, i) => i !== index);
}

export function cartCount(items: CartItem[]): number {
  return items.reduce((n, it) => n + it.qty, 0);
}

export function cartSubtotal(items: CartItem[]): number {
  return items.reduce((s, it) => s + it.eur * it.qty, 0);
}

export function shippingCost(subtotal: number): number {
  return subtotal >= FREE_SHIP_THRESHOLD || subtotal === 0 ? 0 : FLAT_SHIP;
}

export function shipProgress(subtotal: number): number {
  return Math.min(100, Math.round((subtotal / FREE_SHIP_THRESHOLD) * 100));
}

export function shipRemaining(subtotal: number): number {
  return Math.max(0, FREE_SHIP_THRESHOLD - subtotal);
}

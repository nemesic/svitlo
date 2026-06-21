import { describe, expect, it } from "vitest";
import {
  addToItems,
  cartCount,
  cartSubtotal,
  removeAt,
  shipProgress,
  shipRemaining,
  shippingCost,
} from "./cart";

describe("cart math", () => {
  it("adds a new item with qty 1", () => {
    const items = addToItems([], "Boxy Heavyweight Tee", 95);
    expect(items).toEqual([{ name: "Boxy Heavyweight Tee", eur: 95, qty: 1 }]);
  });

  it("increments qty when the same item is added again", () => {
    let items = addToItems([], "Hoodie", 185);
    items = addToItems(items, "Hoodie", 185);
    expect(items).toEqual([{ name: "Hoodie", eur: 185, qty: 2 }]);
  });

  it("does not mutate the input array", () => {
    const start: never[] = [];
    addToItems(start, "Tee", 95);
    expect(start).toHaveLength(0);
  });

  it("removes an item by index", () => {
    const items = [
      { name: "A", eur: 10, qty: 1 },
      { name: "B", eur: 20, qty: 1 },
    ];
    expect(removeAt(items, 0)).toEqual([{ name: "B", eur: 20, qty: 1 }]);
  });

  it("counts total quantity", () => {
    expect(cartCount([{ name: "A", eur: 10, qty: 3 }])).toBe(3);
  });

  it("sums subtotal by qty", () => {
    expect(cartSubtotal([{ name: "A", eur: 10, qty: 3 }])).toBe(30);
  });

  it("charges flat 15 below threshold with items", () => {
    expect(shippingCost(100)).toBe(15);
  });

  it("is free at or above threshold", () => {
    expect(shippingCost(200)).toBe(0);
  });

  it("is free for an empty cart", () => {
    expect(shippingCost(0)).toBe(0);
  });

  it("reports progress toward free shipping", () => {
    expect(shipProgress(100)).toBe(50);
    expect(shipProgress(250)).toBe(100);
  });

  it("reports the remaining amount to free shipping", () => {
    expect(shipRemaining(150)).toBe(50);
    expect(shipRemaining(250)).toBe(0);
  });
});

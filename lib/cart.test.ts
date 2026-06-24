import { describe, expect, it } from "vitest";
import {
  addToItems,
  cartCount,
  cartSubtotal,
  removeAt,
  setQtyAt,
  shipProgress,
  shipRemaining,
  shippingCost,
} from "./cart";

describe("cart math", () => {
  it("adds a new item with qty 1, carrying colour and size", () => {
    const items = addToItems([], "baggy-jeans", 49.99, "Blue", "M");
    expect(items).toEqual([
      { slug: "baggy-jeans", eur: 49.99, qty: 1, colour: "Blue", size: "M" },
    ]);
  });

  it("increments qty only when slug, colour and size all match", () => {
    let items = addToItems([], "hoodie", 185, "Black", "M");
    items = addToItems(items, "hoodie", 185, "Black", "M");
    expect(items).toEqual([
      { slug: "hoodie", eur: 185, qty: 2, colour: "Black", size: "M" },
    ]);
  });

  it("keeps a different colour or size as its own line", () => {
    let items = addToItems([], "jeans", 50, "Blue", "M");
    items = addToItems(items, "jeans", 50, "Black", "M");
    items = addToItems(items, "jeans", 50, "Blue", "L");
    expect(items).toHaveLength(3);
    expect(items.map((i) => i.qty)).toEqual([1, 1, 1]);
  });

  it("keeps products with different slugs apart even if names would clash", () => {
    let items = addToItems([], "faux-leather-jacket", 59.99, "Black", "M");
    items = addToItems(items, "croc-faux-leather-jacket", 49.99, "Brown", "M");
    expect(items).toHaveLength(2);
  });

  it("does not mutate the input array", () => {
    const start: never[] = [];
    addToItems(start, "tee", 95, "Black", "M");
    expect(start).toHaveLength(0);
  });

  it("removes an item by index", () => {
    const items = [
      { slug: "a", eur: 10, qty: 1, colour: "Black", size: "M" },
      { slug: "b", eur: 20, qty: 1, colour: "Black", size: "M" },
    ];
    expect(removeAt(items, 0)).toEqual([
      { slug: "b", eur: 20, qty: 1, colour: "Black", size: "M" },
    ]);
  });

  it("sets the quantity at an index", () => {
    const items = [
      { slug: "a", eur: 10, qty: 1, colour: "Black", size: "M" },
      { slug: "b", eur: 20, qty: 1, colour: "Black", size: "M" },
    ];
    expect(setQtyAt(items, 1, 3)).toEqual([
      { slug: "a", eur: 10, qty: 1, colour: "Black", size: "M" },
      { slug: "b", eur: 20, qty: 3, colour: "Black", size: "M" },
    ]);
  });

  it("removes the line when quantity drops below 1", () => {
    const items = [
      { slug: "a", eur: 10, qty: 1, colour: "Black", size: "M" },
      { slug: "b", eur: 20, qty: 1, colour: "Black", size: "M" },
    ];
    expect(setQtyAt(items, 0, 0)).toEqual([
      { slug: "b", eur: 20, qty: 1, colour: "Black", size: "M" },
    ]);
  });

  it("does not mutate when setting quantity", () => {
    const items = [{ slug: "a", eur: 10, qty: 1, colour: "Black", size: "M" }];
    setQtyAt(items, 0, 5);
    expect(items[0].qty).toBe(1);
  });

  it("counts total quantity", () => {
    expect(cartCount([{ slug: "a", eur: 10, qty: 3, colour: "Black", size: "M" }])).toBe(3);
  });

  it("sums subtotal by qty", () => {
    expect(
      cartSubtotal([{ slug: "a", eur: 10, qty: 3, colour: "Black", size: "M" }]),
    ).toBe(30);
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

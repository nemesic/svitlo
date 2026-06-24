import { describe, expect, it } from "vitest";
import { getProduct, PRODUCTS } from "./products";

describe("products", () => {
  it("has a populated catalogue", () => {
    expect(PRODUCTS.length).toBeGreaterThanOrEqual(1);
  });

  it("gives the product colours, each with an ordered gallery", () => {
    for (const p of PRODUCTS) {
      expect(p.colours.length).toBeGreaterThan(0);
      for (const c of p.colours) {
        expect(c.images.length).toBeGreaterThan(0);
      }
      expect(p.image).toBe(p.colours[0].images[0]);
    }
  });

  it("looks up a product by slug", () => {
    expect(getProduct("stwd-studio-hoodie")?.eur).toBe(36);
    expect(getProduct("nope")).toBeUndefined();
  });
});

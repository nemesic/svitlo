import { describe, expect, it } from "vitest";
import { getProduct, PRODUCTS, slugify } from "./products";

describe("products", () => {
  it("slugifies a product name", () => {
    expect(slugify("Boxy Heavyweight Tee")).toBe("boxy-heavyweight-tee");
    expect(slugify("Wool-Blend Overshirt")).toBe("wool-blend-overshirt");
  });

  it("has 12 products", () => {
    expect(PRODUCTS).toHaveLength(12);
  });

  it("gives every product a unique slug and an image path", () => {
    const slugs = new Set(PRODUCTS.map((p) => p.slug));
    expect(slugs.size).toBe(12);
    for (const p of PRODUCTS) {
      expect(p.image).toBe(`/images/products/${p.slug}.jpg`);
    }
  });

  it("looks up a product by slug", () => {
    expect(getProduct("garment-dyed-hoodie")?.eur).toBe(185);
    expect(getProduct("nope")).toBeUndefined();
  });
});

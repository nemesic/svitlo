import { describe, expect, it } from "vitest";
import { isWished, toggleWish, wishCount } from "./wishlist";

describe("wishlist", () => {
  it("adds a slug to the front when not present", () => {
    expect(toggleWish(["a"], "b")).toEqual(["b", "a"]);
  });

  it("removes a slug when already present", () => {
    expect(toggleWish(["b", "a"], "b")).toEqual(["a"]);
  });

  it("does not duplicate when toggling twice", () => {
    const once = toggleWish([], "a");
    const twice = toggleWish(once, "a");
    expect(twice).toEqual([]);
  });

  it("reports membership", () => {
    expect(isWished(["a", "b"], "b")).toBe(true);
    expect(isWished(["a", "b"], "c")).toBe(false);
  });

  it("counts saved items", () => {
    expect(wishCount(["a", "b", "c"])).toBe(3);
    expect(wishCount([])).toBe(0);
  });
});

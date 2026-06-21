import { describe, expect, it } from "vitest";
import { formatPrice } from "./currency";

describe("formatPrice", () => {
  it("formats EUR with the euro symbol and no conversion", () => {
    expect(formatPrice(185, "EUR")).toBe("€185");
  });

  it("converts and rounds UAH at rate 45", () => {
    expect(formatPrice(185, "UAH")).toBe("₴8,325");
  });

  it("converts and rounds USD at rate 1.1", () => {
    expect(formatPrice(95, "USD")).toBe("$105");
  });

  it("groups thousands with en-US separators", () => {
    expect(formatPrice(420, "UAH")).toBe("₴18,900");
  });

  it("handles zero", () => {
    expect(formatPrice(0, "EUR")).toBe("€0");
  });
});

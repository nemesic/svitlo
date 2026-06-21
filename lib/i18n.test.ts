import { describe, expect, it } from "vitest";
import { MESSAGES, t } from "./i18n";

describe("i18n", () => {
  it("returns English copy", () => {
    expect(t("hero.title", "EN")).toBe("Light, worn quietly.");
  });

  it("returns Ukrainian copy", () => {
    expect(t("hero.title", "UA")).toBe("Світло, яке носять тихо.");
  });

  it("every message has both EN and UA", () => {
    for (const [key, value] of Object.entries(MESSAGES)) {
      expect(value.EN, `${key}.EN`).toBeTruthy();
      expect(value.UA, `${key}.UA`).toBeTruthy();
    }
  });
});

import { describe, expect, it } from "vitest";
import { MESSAGES, t } from "./i18n";

describe("i18n", () => {
  it("returns English copy for the active language", () => {
    expect(t("hero.title", "EN")).toBe(MESSAGES["hero.title"].EN);
  });

  it("returns Ukrainian copy for the active language", () => {
    expect(t("hero.title", "UA")).toBe(MESSAGES["hero.title"].UA);
    expect(MESSAGES["hero.title"].UA).not.toBe(MESSAGES["hero.title"].EN);
  });

  it("every message has both EN and UA", () => {
    for (const [key, value] of Object.entries(MESSAGES)) {
      expect(value.EN, `${key}.EN`).toBeTruthy();
      expect(value.UA, `${key}.UA`).toBeTruthy();
    }
  });
});

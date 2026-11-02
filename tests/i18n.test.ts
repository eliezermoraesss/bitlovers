import { describe, expect, it } from "vitest";
import { isLocale, localeHtmlLang, locales, messages } from "../lib/i18n";

describe("internationalization", () => {
  it("supports Portuguese, English, and Spanish locales", () => {
    expect(locales).toEqual(["pt-br", "en", "es"]);
    expect(localeHtmlLang["pt-br"]).toBe("pt-BR");
    expect(localeHtmlLang.en).toBe("en");
    expect(localeHtmlLang.es).toBe("es");
  });

  it("validates locale route segments", () => {
    expect(isLocale("pt-br")).toBe(true);
    expect(isLocale("en")).toBe(true);
    expect(isLocale("es")).toBe(true);
    expect(isLocale("fr")).toBe(false);
  });

  it("keeps core landing-page messages available for every locale", () => {
    for (const locale of locales) {
      expect(messages[locale].headline1.length).toBeGreaterThan(0);
      expect(messages[locale].intro.length).toBeGreaterThan(0);
      expect(messages[locale].openLab.length).toBeGreaterThan(0);
    }
  });
});

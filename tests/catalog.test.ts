import { describe, expect, it } from "vitest";
import { learningCatalog } from "../content/catalog";

describe("educational content catalog", () => {
  it("uses unique slugs", () => {
    const slugs = learningCatalog.map((item) => item.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("uses only recognized publication states and categories", () => {
    for (const item of learningCatalog) {
      expect(["available", "planned"]).toContain(item.status);
      expect(["complexity", "data-structures", "algorithms"]).toContain(item.category);
      expect(item.title.trim().length).toBeGreaterThan(0);
      expect(item.summary.trim().length).toBeGreaterThan(0);
    }
  });

  it("does not mark roadmap entries as available by default", () => {
    const planned = learningCatalog.filter((item) => item.status === "planned");
    expect(planned.length).toBeGreaterThan(0);
    expect(planned.every((item) => item.status === "planned")).toBe(true);
  });
});

import { describe, expect, it } from "vitest";
import { complexityFunctions, estimateOperations } from "../lib/complexity";

describe("complexity function catalog", () => {
  it("exposes the eight expected growth families", () => {
    expect(complexityFunctions.map((item) => item.id)).toEqual([
      "constant", "logarithmic", "linear", "linearithmic",
      "quadratic", "cubic", "exponential", "factorial",
    ]);
  });

  it("calculates reference values for a small input", () => {
    expect(estimateOperations("constant", 8)).toBe(1);
    expect(estimateOperations("logarithmic", 8)).toBe(3);
    expect(estimateOperations("linear", 8)).toBe(8);
    expect(estimateOperations("quadratic", 8)).toBe(64);
    expect(estimateOperations("cubic", 3)).toBe(27);
    expect(estimateOperations("exponential", 5)).toBe(32);
    expect(estimateOperations("factorial", 5)).toBe(120);
  });

  it("rejects invalid input sizes", () => {
    expect(() => estimateOperations("linear", 0)).toThrow(RangeError);
    expect(() => estimateOperations("linear", Number.NaN)).toThrow(RangeError);
  });

  it("floors fractional input sizes to an integer", () => {
    expect(estimateOperations("linear", 4.9)).toBe(4);
  });
});

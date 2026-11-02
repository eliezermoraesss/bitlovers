import { describe, expect, it } from "vitest";
import { containsBST, countBST, inOrderBST, insertBST, removeBST, type BSTNode } from "../lib/bst";

describe("binary search tree operations", () => {
  it("inserts values and returns sorted in-order traversal", () => {
    let root: BSTNode | null = null;
    for (const value of [8, 3, 10, 1, 6, 14, 4, 7, 13]) root = insertBST(root, value);
    expect(inOrderBST(root)).toEqual([1, 3, 4, 6, 7, 8, 10, 13, 14]);
    expect(countBST(root)).toBe(9);
  });

  it("does not insert duplicate values", () => {
    const root = insertBST(insertBST(null, 5), 5);
    expect(inOrderBST(root)).toEqual([5]);
  });

  it("searches for existing and missing values", () => {
    const root = insertBST(insertBST(insertBST(null, 8), 3), 10);
    expect(containsBST(root, 3)).toBe(true);
    expect(containsBST(root, 7)).toBe(false);
  });

  it("removes leaf nodes, one-child nodes, and two-child nodes", () => {
    let root: BSTNode | null = null;
    for (const value of [8, 3, 10, 1, 6, 14, 4, 7, 13]) root = insertBST(root, value);
    root = removeBST(root, 1);
    root = removeBST(root, 14);
    root = removeBST(root, 3);
    expect(inOrderBST(root)).toEqual([4, 6, 7, 8, 10, 13]);
    expect(countBST(root)).toBe(6);
  });

  it("rejects non-integer and non-finite values", () => {
    expect(() => insertBST(null, 1.5)).toThrow();
    expect(() => insertBST(null, Number.NaN)).toThrow();
  });
});

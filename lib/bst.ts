export type BSTNode = {
  value: number;
  left: BSTNode | null;
  right: BSTNode | null;
};

export function insertBST(root: BSTNode | null, value: number): BSTNode {
  if (!Number.isFinite(value) || !Number.isInteger(value)) {
    throw new Error("BST values must be finite integers.");
  }
  if (root === null) return { value, left: null, right: null };
  if (value === root.value) return root;
  if (value < root.value) return { ...root, left: insertBST(root.left, value) };
  return { ...root, right: insertBST(root.right, value) };
}

export function containsBST(root: BSTNode | null, value: number): boolean {
  let current = root;
  while (current !== null) {
    if (current.value === value) return true;
    current = value < current.value ? current.left : current.right;
  }
  return false;
}

function minimumNode(root: BSTNode): BSTNode {
  let current = root;
  while (current.left !== null) current = current.left;
  return current;
}

export function removeBST(root: BSTNode | null, value: number): BSTNode | null {
  if (root === null) return null;
  if (value < root.value) return { ...root, left: removeBST(root.left, value) };
  if (value > root.value) return { ...root, right: removeBST(root.right, value) };
  if (root.left === null) return root.right;
  if (root.right === null) return root.left;
  const successor = minimumNode(root.right);
  return { ...root, value: successor.value, right: removeBST(root.right, successor.value) };
}

export function inOrderBST(root: BSTNode | null): number[] {
  if (root === null) return [];
  return [...inOrderBST(root.left), root.value, ...inOrderBST(root.right)];
}

export function countBST(root: BSTNode | null): number {
  if (root === null) return 0;
  return 1 + countBST(root.left) + countBST(root.right);
}

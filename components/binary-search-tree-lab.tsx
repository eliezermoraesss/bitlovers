"use client";

import { useState, type FormEvent } from "react";
import type { Locale } from "@/lib/i18n";
import { containsBST, countBST, inOrderBST, insertBST, removeBST, type BSTNode } from "@/lib/bst";

const copy = {
  "pt-br": {
    label: "Laboratório de árvore binária de busca", title: "Árvore binária de busca (BST)",
    intro: "Cada valor menor fica à esquerda e cada valor maior fica à direita. Valores repetidos não são adicionados.",
    placeholder: "Digite um número inteiro", insert: "Inserir", search: "Buscar", remove: "Remover", clear: "Limpar árvore",
    empty: "A árvore está vazia. Insira um número inteiro para começar.", count: "Nós", order: "Percurso em ordem",
    invalid: "Informe um número inteiro válido.", duplicate: "Esse valor já existe na árvore.",
    inserted: "Valor inserido", found: "Valor encontrado", missing: "Valor não encontrado",
    removed: "Valor removido", notRemoved: "Esse valor não está na árvore.", cleared: "Árvore limpa",
    left: "ESQUERDA", right: "DIREITA", root: "RAIZ",
    help: "O percurso em ordem visita os valores em ordem crescente. A forma da árvore depende da sequência de inserção.",
  },
  en: {
    label: "Binary search tree lab", title: "Binary search tree (BST)",
    intro: "Smaller values go left and larger values go right. Duplicate values are not inserted.",
    placeholder: "Enter an integer", insert: "Insert", search: "Search", remove: "Remove", clear: "Clear tree",
    empty: "The tree is empty. Insert an integer to get started.", count: "Nodes", order: "In-order traversal",
    invalid: "Enter a valid integer.", duplicate: "That value already exists in the tree.",
    inserted: "Value inserted", found: "Value found", missing: "Value not found",
    removed: "Value removed", notRemoved: "That value is not in the tree.", cleared: "Tree cleared",
    left: "LEFT", right: "RIGHT", root: "ROOT",
    help: "In-order traversal visits values in ascending order. The tree shape depends on insertion order.",
  },
  es: {
    label: "Laboratorio de árbol binario de búsqueda", title: "Árbol binario de búsqueda (BST)",
    intro: "Los valores menores van a la izquierda y los mayores a la derecha. No se insertan valores duplicados.",
    placeholder: "Escribe un número entero", insert: "Insertar", search: "Buscar", remove: "Eliminar", clear: "Limpiar árbol",
    empty: "El árbol está vacío. Inserta un entero para comenzar.", count: "Nodos", order: "Recorrido en orden",
    invalid: "Escribe un número entero válido.", duplicate: "Ese valor ya existe en el árbol.",
    inserted: "Valor insertado", found: "Valor encontrado", missing: "Valor no encontrado",
    removed: "Valor eliminado", notRemoved: "Ese valor no está en el árbol.", cleared: "Árbol limpiado",
    left: "IZQUIERDA", right: "DERECHA", root: "RAÍZ",
    help: "El recorrido en orden visita los valores de menor a mayor. La forma depende del orden de inserción.",
  },
} as const;

function TreeNodeView({ node, root = false }: { node: BSTNode; root?: boolean }) {
  return (
    <li className="bst-node">
      <div className={root ? "bst-value bst-root" : "bst-value"}>{node.value}</div>
      {(node.left || node.right) && (
        <ul className="bst-children">
          <li className="bst-branch">
            {node.left ? <TreeNodeView node={node.left} /> : <span className="bst-null">∅</span>}
          </li>
          <li className="bst-branch">
            {node.right ? <TreeNodeView node={node.right} /> : <span className="bst-null">∅</span>}
          </li>
        </ul>
      )}
    </li>
  );
}

export default function BinarySearchTreeLab({ locale = "pt-br" }: { locale?: Locale }) {
  const [root, setRoot] = useState<BSTNode | null>(() => {
    let tree: BSTNode | null = null;
    for (const value of [8, 3, 10, 1, 6, 14, 4, 7, 13]) tree = insertBST(tree, value);
    return tree;
  });
  const [value, setValue] = useState("");
  const [status, setStatus] = useState("");
  const m = copy[locale];

  function parseValue(): number | null {
    const parsed = Number(value.trim());
    if (value.trim() === "" || !Number.isFinite(parsed) || !Number.isInteger(parsed)) {
      setStatus(m.invalid);
      return null;
    }
    return parsed;
  }

  function insert(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const next = parseValue();
    if (next === null) return;
    if (containsBST(root, next)) { setStatus(m.duplicate); return; }
    setRoot((current) => insertBST(current, next));
    setStatus(`${m.inserted}: ${next}`);
    setValue("");
  }

  function search() {
    const target = parseValue();
    if (target === null) return;
    setStatus(containsBST(root, target) ? `${m.found}: ${target}` : `${m.missing}: ${target}`);
  }

  function remove() {
    const target = parseValue();
    if (target === null) return;
    if (!containsBST(root, target)) { setStatus(m.notRemoved); return; }
    setRoot((current) => removeBST(current, target));
    setStatus(`${m.removed}: ${target}`);
    setValue("");
  }

  const ordered = inOrderBST(root);

  return (
    <section className="structures-lab bst-lab" aria-label={m.label}>
      <h3 className="bst-title">{m.title}</h3>
      <p className="structure-description">{m.intro}</p>
      <form className="structure-controls" onSubmit={insert}>
        <label className="sr-only" htmlFor="bst-value">{m.placeholder}</label>
        <input id="bst-value" type="number" step="1" value={value}
          onChange={(event) => setValue(event.target.value)} placeholder={m.placeholder} />
        <button className="structure-action primary" type="submit">{m.insert}</button>
        <button className="structure-action" type="button" onClick={search}>{m.search}</button>
        <button className="structure-action" type="button" onClick={remove}>{m.remove}</button>
        <button className="structure-action subtle" type="button" onClick={() => { setRoot(null); setStatus(m.cleared); }}>{m.clear}</button>
      </form>
      <div className="bst-canvas" aria-live="polite">
        {root ? <ul className="bst-tree"><TreeNodeView node={root} root /></ul> : <p className="structure-empty">{m.empty}</p>}
      </div>
      <div className="structure-footer">
        <span><strong>{m.count}:</strong> {countBST(root)}</span>
        <span><strong>{m.order}:</strong> {ordered.length ? ordered.join(" → ") : "—"}</span>
        <span><strong>{m.root}:</strong> {root?.value ?? "—"}</span>
      </div>
      <p className="structure-note">{status || m.help}</p>
    </section>
  );
}

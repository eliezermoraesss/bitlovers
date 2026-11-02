"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { learningCatalog } from "@/content/catalog";
import { messages, type Locale } from "@/lib/i18n";

const translatedCatalog = {
  "pt-br": {
    complexidade: ["Complexidade computacional", "Entenda como o custo de um algoritmo cresce conforme a entrada aumenta."],
    arrays: ["Arrays e vetores", "Explore índices, acesso direto, inserção e limites da estrutura."],
    "pilhas-e-filas": ["Pilhas e filas", "Execute push, pop, enqueue e dequeue e compare LIFO com FIFO."],
    "arvores-binarias": ["Árvores binárias de busca", "Insira, busque e remova nós; explore a hierarquia e o percurso em ordem."],
    "busca-linear-e-binaria": ["Busca linear e binária", "Compare estratégias de busca e entenda o pré-requisito da busca binária."],
    "algoritmos-de-ordenacao": ["Algoritmos de ordenação", "Compare Bubble Sort, Selection Sort, Insertion Sort e Merge Sort passo a passo."],
  },
  en: {
    complexidade: ["Computational complexity", "Understand how an algorithm's cost grows as input size increases."],
    arrays: ["Arrays", "Explore indexes, direct access, insertion, and structural limits."],
    "pilhas-e-filas": ["Stacks and queues", "Run push, pop, enqueue, and dequeue; compare LIFO and FIFO."],
    "arvores-binarias": ["Binary search trees", "Insert, search, and remove nodes; explore hierarchy and in-order traversal."],
    "busca-linear-e-binaria": ["Linear and binary search", "Compare search strategies and understand binary search prerequisites."],
    "algoritmos-de-ordenacao": ["Sorting algorithms", "Compare Bubble Sort, Selection Sort, Insertion Sort, and Merge Sort step by step."],
  },
  es: {
    complexidade: ["Complejidad computacional", "Comprende cómo crece el costo de un algoritmo cuando aumenta la entrada."],
    arrays: ["Arrays y vectores", "Explora índices, acceso directo, inserción y límites de la estructura."],
    "pilhas-e-filas": ["Pilas y colas", "Ejecuta push, pop, enqueue y dequeue; compara LIFO y FIFO."],
    "arvores-binarias": ["Árboles binarios de búsqueda", "Inserta, busca y elimina nodos; explora la jerarquía y el recorrido en orden."],
    "busca-linear-e-binaria": ["Búsqueda lineal y binaria", "Compara estrategias de búsqueda y conoce el requisito de la búsqueda binaria."],
    "algoritmos-de-ordenacao": ["Algoritmos de ordenación", "Compara Bubble Sort, Selection Sort, Insertion Sort y Merge Sort paso a paso."],
  },
} as const;

export default function ContentSearch({ locale = "pt-br" }: { locale?: Locale }) {
  const [query, setQuery] = useState("");
  const m = messages[locale];
  const numberLocale = locale === "pt-br" ? "pt-BR" : locale === "es" ? "es-ES" : "en-US";
  const normalizedQuery = query.trim().toLocaleLowerCase(numberLocale);
  const results = useMemo(() => {
    if (!normalizedQuery) return [];
    return learningCatalog.filter((item) => {
      const translated = translatedCatalog[locale][item.slug as keyof (typeof translatedCatalog)[typeof locale]];
      const category = item.category === "complexity" ? m.categoryComplexity : item.category === "data-structures" ? m.categoryData : m.categoryAlgorithms;
      return [item.title, item.summary, ...item.tags, category, ...(translated ?? [])]
        .some((value) => value.toLocaleLowerCase(numberLocale).includes(normalizedQuery));
    }).slice(0, 6);
  }, [locale, m, normalizedQuery, numberLocale]);

  return (
    <div className="content-search" role="search">
      <label className="sr-only" htmlFor={`content-search-input-${locale}`}>{m.searchLabel}</label>
      <span className="search-symbol" aria-hidden="true">⌕</span>
      <input id={`content-search-input-${locale}`} type="search" value={query} onChange={(event) => setQuery(event.target.value)}
        placeholder={m.searchPlaceholder} autoComplete="off" aria-describedby={`search-hint-${locale}`} />
      <span className="search-shortcut" aria-hidden="true">{locale === "pt-br" ? "BUSCAR" : locale === "es" ? "BUSCAR" : "SEARCH"}</span>
      <span id={`search-hint-${locale}`} className="sr-only">{m.searchLabel}</span>
      {normalizedQuery && <div className="search-results" aria-live="polite">
        {results.length === 0 ? <p className="search-empty">{m.searchEmpty} “{query}”.</p> : results.map((item) => {
          const translated = translatedCatalog[locale][item.slug as keyof (typeof translatedCatalog)[typeof locale]];
          const category = item.category === "complexity" ? m.categoryComplexity : item.category === "data-structures" ? m.categoryData : m.categoryAlgorithms;
          return <div className="search-result" key={item.slug}>
            <div><span>{category}</span><strong>{translated?.[0] ?? item.title}</strong><p>{translated?.[1] ?? item.summary}</p></div>
            {item.status === "available" ? <Link href={["arrays", "pilhas-e-filas", "arvores-binarias"].includes(item.slug) ? (locale === "pt-br" ? "/estruturas" : `/${locale}/estruturas`) : item.slug === "busca-linear-e-binaria" ? (locale === "pt-br" ? "/algoritmos" : `/${locale}/algoritmos`) : item.slug === "algoritmos-de-ordenacao" ? (locale === "pt-br" ? "/ordenacao" : `/${locale}/ordenacao`) : (locale === "pt-br" ? "/laboratorio" : `/${locale}/laboratorio`)} aria-label={`${m.searchOpen} ${translated?.[0] ?? item.title}`}>{m.searchOpen} ↗</Link> : <span className="search-planned">{m.planned}</span>}
          </div>;
        })}
      </div>}
    </div>
  );
}

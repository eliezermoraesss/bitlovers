"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { learningCatalog, categoryLabels } from "@/content/catalog";

export default function ContentSearch() {
  const [query, setQuery] = useState("");
  const normalizedQuery = query.trim().toLocaleLowerCase("pt-BR");
  const results = useMemo(() => {
    if (!normalizedQuery) return [];
    return learningCatalog.filter((item) =>
      [item.title, item.summary, ...item.tags, categoryLabels[item.category]]
        .some((value) => value.toLocaleLowerCase("pt-BR").includes(normalizedQuery)),
    ).slice(0, 6);
  }, [normalizedQuery]);

  return (
    <div className="content-search" role="search">
      <label className="sr-only" htmlFor="content-search-input">Buscar conteúdos educacionais</label>
      <span className="search-symbol" aria-hidden="true">⌕</span>
      <input
        id="content-search-input"
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Buscar algoritmos, estruturas, conceitos..."
        autoComplete="off"
        aria-describedby="search-hint"
      />
      <span className="search-shortcut" aria-hidden="true">BUSCAR</span>
      <span id="search-hint" className="sr-only">Digite um título, categoria ou palavra-chave.</span>
      {normalizedQuery && (
        <div className="search-results" aria-live="polite">
          {results.length === 0 ? (
            <p className="search-empty">Nenhum conteúdo encontrado para “{query}”. Tente outro termo.</p>
          ) : results.map((item) => (
            <div className="search-result" key={item.slug}>
              <div><span>{categoryLabels[item.category]}</span><strong>{item.title}</strong><p>{item.summary}</p></div>
              {item.status === "available"
                ? <Link href="/laboratorio" aria-label={`Abrir ${item.title}`}>Abrir ↗</Link>
                : <span className="search-planned">Planejado</span>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

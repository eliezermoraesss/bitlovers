"use client";

import { useMemo, useState } from "react";
import type { Locale } from "@/lib/i18n";

type Step = { index: number; low?: number; high?: number; mid?: number; message: string; found?: boolean };

const labels = {
  "pt-br": { title: "Busca linear e busca binária", intro: "Altere o vetor e o alvo, execute o algoritmo e avance pela trilha de decisões.", linear: "Busca linear", binary: "Busca binária", target: "Valor procurado", values: "Vetor ordenado", run: "Executar busca", prev: "Anterior", next: "Próximo passo", reset: "Limpar passos", code: "Linguagem de referência", java: "Java", python: "Python", csharp: "C#", ready: "Configure o vetor e execute uma busca para ver cada comparação.", sorted: "A busca binária exige dados ordenados. O vetor é ordenado automaticamente para esta demonstração.", found: "Valor encontrado", missing: "Valor não encontrado", comparisons: "Comparações", step: "Passo", of: "de", linearInfo: "Verifica os elementos em sequência. No pior caso, pode examinar todos os n elementos: O(n).", binaryInfo: "Compara o elemento central e descarta metade do intervalo a cada etapa. No pior caso, realiza O(log n) comparações, mas exige dados ordenados.", complexity: "Complexidade de tempo", codeNote: "Exemplo didático; os trechos mostram a ideia central, não um programa completo." },
  en: { title: "Linear search and binary search", intro: "Change the array and target, run the algorithm, and step through its decisions.", linear: "Linear search", binary: "Binary search", target: "Target value", values: "Sorted array", run: "Run search", prev: "Previous", next: "Next step", reset: "Clear steps", code: "Reference language", java: "Java", python: "Python", csharp: "C#", ready: "Configure the array and run a search to inspect each comparison.", sorted: "Binary search requires sorted data. The array is sorted automatically for this demonstration.", found: "Value found", missing: "Value not found", comparisons: "Comparisons", step: "Step", of: "of", linearInfo: "Checks elements in sequence. In the worst case it may inspect all n elements: O(n).", binaryInfo: "Compares the middle element and discards half the interval at each step. Worst-case O(log n) comparisons, but requires sorted data.", complexity: "Time complexity", codeNote: "Educational example; snippets show the core idea, not a complete program." },
  es: { title: "Búsqueda lineal y búsqueda binaria", intro: "Cambia el vector y el objetivo, ejecuta el algoritmo y recorre sus decisiones paso a paso.", linear: "Búsqueda lineal", binary: "Búsqueda binaria", target: "Valor buscado", values: "Vector ordenado", run: "Ejecutar búsqueda", prev: "Anterior", next: "Siguiente paso", reset: "Limpiar pasos", code: "Lenguaje de referencia", java: "Java", python: "Python", csharp: "C#", ready: "Configura el vector y ejecuta una búsqueda para ver cada comparación.", sorted: "La búsqueda binaria requiere datos ordenados. El vector se ordena automáticamente para esta demostración.", found: "Valor encontrado", missing: "Valor no encontrado", comparisons: "Comparaciones", step: "Paso", of: "de", linearInfo: "Comprueba los elementos en secuencia. En el peor caso puede examinar los n elementos: O(n).", binaryInfo: "Compara el elemento central y descarta la mitad del intervalo en cada paso. En el peor caso O(log n), pero requiere datos ordenados.", complexity: "Complejidad temporal", codeNote: "Ejemplo educativo; los fragmentos muestran la idea central, no un programa completo." },
} as const;

export default function SearchAlgorithmsLab({ locale = "pt-br" }: { locale?: Locale }) {
  const t = labels[locale];
  const [algorithm, setAlgorithm] = useState<"linear" | "binary">("linear");
  const [input, setInput] = useState("3, 8, 12, 17, 23, 31, 42, 56");
  const [target, setTarget] = useState("23");
  const [language, setLanguage] = useState<"java" | "python" | "csharp">("java");
  const [steps, setSteps] = useState<Step[]>([]);
  const [position, setPosition] = useState(0);
  const [error, setError] = useState("");

  const parsed = useMemo(() => input.split(",").map((part) => part.trim()).filter(Boolean).map(Number), [input]);
  const values = useMemo(() => algorithm === "binary" ? [...parsed].sort((a, b) => a - b) : parsed, [algorithm, parsed]);
  const current = steps[position] ?? null;
  const run = () => {
    setError("");
    if (!parsed.length || parsed.some((n) => !Number.isFinite(n)) || parsed.length > 30) {
      setError(locale === "en" ? "Enter 1–30 valid numbers separated by commas." : locale === "es" ? "Introduce entre 1 y 30 números válidos separados por comas." : "Informe de 1 a 30 números válidos separados por vírgulas.");
      setSteps([]); return;
    }
    const wanted = Number(target);
    if (!target.trim() || !Number.isFinite(wanted)) {
      setError(locale === "en" ? "Enter a valid target number." : locale === "es" ? "Introduce un objetivo numérico válido." : "Informe um valor numérico válido para buscar.");
      setSteps([]); return;
    }
    const data = algorithm === "binary" ? [...parsed].sort((a, b) => a - b) : parsed;
    const trace: Step[] = [];
    if (algorithm === "linear") {
      for (let i = 0; i < data.length; i++) {
        const found = data[i] === wanted;
        trace.push({ index: trace.length + 1, low: 0, high: data.length - 1, mid: i, message: found ? `${data[i]} = ${wanted}: ${t.found}.` : `${data[i]} ≠ ${wanted}: ${locale === "en" ? "continue to the next element" : locale === "es" ? "continuar al siguiente elemento" : "avançar para o próximo elemento"}.`, found });
        if (found) break;
      }
    } else {
      let low = 0; let high = data.length - 1;
      while (low <= high) {
        const mid = Math.floor((low + high) / 2);
        const found = data[mid] === wanted;
        trace.push({ index: trace.length + 1, low, high, mid, message: found ? `${data[mid]} = ${wanted}: ${t.found}.` : data[mid] < wanted ? `${data[mid]} < ${wanted}: ${locale === "en" ? "discard the left half" : locale === "es" ? "descartar la mitad izquierda" : "descartar a metade esquerda"}.` : `${data[mid]} > ${wanted}: ${locale === "en" ? "discard the right half" : locale === "es" ? "descartar la mitad derecha" : "descartar a metade direita"}.`, found });
        if (found) break;
        if (data[mid] < wanted) low = mid + 1; else high = mid - 1;
      }
    }
    if (!trace.length || !trace[trace.length - 1].found) trace.push({ index: trace.length + 1, message: t.missing });
    setSteps(trace); setPosition(0);
  };
  const code = language === "python"
    ? (algorithm === "linear" ? "for i, value in enumerate(values):\n    if value == target:\n        return i\nreturn -1" : "low, high = 0, len(values) - 1\nwhile low <= high:\n    mid = (low + high) // 2\n    if values[mid] == target:\n        return mid\n    if values[mid] < target:\n        low = mid + 1\n    else:\n        high = mid - 1\nreturn -1")
    : language === "csharp"
      ? (algorithm === "linear" ? "for (int i = 0; i < values.Length; i++)\n    if (values[i] == target) return i;\nreturn -1;" : "int low = 0, high = values.Length - 1;\nwhile (low <= high) {\n  int mid = low + (high - low) / 2;\n  if (values[mid] == target) return mid;\n  if (values[mid] < target) low = mid + 1;\n  else high = mid - 1;\n}\nreturn -1;")
      : (algorithm === "linear" ? "for (int i = 0; i < values.length; i++) {\n    if (values[i] == target) return i;\n}\nreturn -1;" : "int low = 0, high = values.length - 1;\nwhile (low <= high) {\n    int mid = low + (high - low) / 2;\n    if (values[mid] == target) return mid;\n    if (values[mid] < target) low = mid + 1;\n    else high = mid - 1;\n}\nreturn -1;");
  return <section className="structures-lab search-algorithms-lab" aria-label={t.title}>
    <p className="structure-description">{t.intro}</p>
    <div className="structures-tabs" role="group" aria-label={t.title}>
      <button type="button" className={algorithm === "linear" ? "structure-tab active" : "structure-tab"} onClick={() => { setAlgorithm("linear"); setSteps([]); }}> {t.linear} </button>
      <button type="button" className={algorithm === "binary" ? "structure-tab active" : "structure-tab"} onClick={() => { setAlgorithm("binary"); setSteps([]); }}> {t.binary} </button>
    </div>
    <div className="search-lab-fields">
      <label>{t.values}<input value={input} onChange={(e) => setInput(e.target.value)} aria-label={t.values} /></label>
      <label>{t.target}<input type="number" value={target} onChange={(e) => setTarget(e.target.value)} aria-label={t.target} /></label>
    </div>
    {algorithm === "binary" && <p className="structure-note">{t.sorted}</p>}
    <div className="structure-controls"><button type="button" className="structure-action primary" onClick={run}>{t.run}</button><button type="button" className="structure-action" onClick={() => { setSteps([]); setPosition(0); setError(""); }}>{t.reset}</button></div>
    {error && <p className="search-lab-error" role="alert">{error}</p>}
    <div className="search-array" aria-label={t.values}>
      {values.map((value, index) => {
        const active = current?.mid === index;
        const outside = algorithm === "binary" && current && (index < (current.low ?? 0) || index > (current.high ?? values.length - 1));
        return <div className={`search-cell ${active ? "active" : ""} ${outside ? "discarded" : ""}`} key={`${index}-${value}`}><strong>{value}</strong><span>{index}</span></div>;
      })}
    </div>
    <div className="structure-footer"><span>{t.complexity}: <strong>{algorithm === "linear" ? "O(n)" : "O(log n)"}</strong></span><span>{t.comparisons}: <strong>{steps.filter((s) => s.mid !== undefined).length}</strong></span></div>
    <div className="search-trace" aria-live="polite">
      <p>{current ? `${t.step} ${position + 1} ${t.of} ${steps.length}: ${current.message}` : t.ready}</p>
      {steps.length > 0 && <div className="structure-controls"><button type="button" className="structure-action" disabled={position === 0} onClick={() => setPosition((p) => Math.max(0, p - 1))}>{t.prev}</button><button type="button" className="structure-action primary" disabled={position >= steps.length - 1} onClick={() => setPosition((p) => Math.min(steps.length - 1, p + 1))}>{t.next}</button></div>}
    </div>
    <div className="search-code-heading"><strong>{t.code}</strong><select value={language} onChange={(e) => setLanguage(e.target.value as typeof language)} aria-label={t.code}><option value="java">{t.java}</option><option value="python">{t.python}</option><option value="csharp">{t.csharp}</option></select></div>
    <pre className="search-code"><code>{code}</code></pre><p className="structure-note">{t.codeNote}</p>
    <p className="structure-description">{algorithm === "linear" ? t.linearInfo : t.binaryInfo}</p>
  </section>;
}

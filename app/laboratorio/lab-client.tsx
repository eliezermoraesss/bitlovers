"use client";

import { useMemo, useState } from "react";
import { complexityFunctions, type ComplexityId } from "@/lib/complexity";
import type { Locale } from "@/lib/i18n";

const DEFAULT_VISIBLE: ComplexityId[] = ["constant", "logarithmic", "linear", "linearithmic", "quadratic"];

const copy = {
  "pt-br": {
    input: "Tamanho da entrada", elements: "elementos", scale: "Escala do gráfico", logarithmic: "Logarítmica",
    linear: "Linear", curves: "Curvas visíveis", value: "VALOR DA FUNÇÃO", inputAxis: "ENTRADA n",
    chartTitle: "Comparação interativa de funções de complexidade",
    chartDesc: "Gráfico de funções de crescimento para entradas de 1 até", empty: "Selecione ao menos uma curva para visualizar o crescimento.",
    footnote: "Valores calculados a partir das funções ilustrativas para n =", notBenchmark: "Não são benchmarks nem representam diretamente segundos de execução. A escala logarítmica ajuda a comparar crescimentos com ordens de grandeza diferentes.",
    labels: {constant:"Constante",logarithmic:"Logarítmica",linear:"Linear",linearithmic:"Linearítmica",quadratic:"Quadrática",cubic:"Cúbica",exponential:"Exponencial",factorial:"Fatorial"},
    descriptions: {constant:"O custo não cresce com n.",logarithmic:"Cresce lentamente ao reduzir o problema por fatores.",linear:"O custo cresce proporcionalmente ao tamanho da entrada.",linearithmic:"Comum em algoritmos eficientes de ordenação por comparação.",quadratic:"O custo cresce com o quadrado da entrada.",cubic:"O custo cresce com o cubo da entrada.",exponential:"O crescimento pode tornar entradas modestas inviáveis.",factorial:"O número de combinações cresce extremamente rápido."},
  },
  en: {
    input: "Input size", elements: "elements", scale: "Chart scale", logarithmic: "Logarithmic",
    linear: "Linear", curves: "Visible curves", value: "FUNCTION VALUE", inputAxis: "INPUT n",
    chartTitle: "Interactive comparison of complexity functions",
    chartDesc: "Growth-function chart for input sizes from 1 to", empty: "Select at least one curve to visualize growth.",
    footnote: "Values calculated from illustrative functions for n =", notBenchmark: "These are not benchmarks and do not directly represent runtime in seconds. The logarithmic scale helps compare growth across different orders of magnitude.",
    labels: {constant:"Constant",logarithmic:"Logarithmic",linear:"Linear",linearithmic:"Linearithmic",quadratic:"Quadratic",cubic:"Cubic",exponential:"Exponential",factorial:"Factorial"},
    descriptions: {constant:"Cost does not grow with n.",logarithmic:"Grows slowly as the problem is reduced by factors.",linear:"Cost grows in proportion to input size.",linearithmic:"Common in efficient comparison-based sorting algorithms.",quadratic:"Cost grows with the square of the input.",cubic:"Cost grows with the cube of the input.",exponential:"Growth can make even modest inputs impractical.",factorial:"The number of combinations grows extremely quickly."},
  },
  es: {
    input: "Tamaño de entrada", elements: "elementos", scale: "Escala del gráfico", logarithmic: "Logarítmica",
    linear: "Lineal", curves: "Curvas visibles", value: "VALOR DE LA FUNCIÓN", inputAxis: "ENTRADA n",
    chartTitle: "Comparación interactiva de funciones de complejidad",
    chartDesc: "Gráfico de funciones de crecimiento para entradas de 1 hasta", empty: "Selecciona al menos una curva para visualizar el crecimiento.",
    footnote: "Valores calculados a partir de funciones ilustrativas para n =", notBenchmark: "No son benchmarks ni representan directamente segundos de ejecución. La escala logarítmica ayuda a comparar crecimientos de distintos órdenes de magnitud.",
    labels: {constant:"Constante",logarithmic:"Logarítmica",linear:"Lineal",linearithmic:"Linealítmica",quadratic:"Cuadrática",cubic:"Cúbica",exponential:"Exponencial",factorial:"Factorial"},
    descriptions: {constant:"El costo no crece con n.",logarithmic:"Crece lentamente al reducir el problema por factores.",linear:"El costo crece proporcionalmente al tamaño de entrada.",linearithmic:"Común en algoritmos eficientes de ordenación por comparación.",quadratic:"El costo crece con el cuadrado de la entrada.",cubic:"El costo crece con el cubo de la entrada.",exponential:"El crecimiento puede volver inviables entradas modestas.",factorial:"El número de combinaciones crece extremadamente rápido."},
  },
} as const;

export default function ComplexityLab({ locale = "pt-br" }: { locale?: Locale }) {
  const [n, setN] = useState(12);
  const [scale, setScale] = useState<"linear" | "log">("log");
  const [visible, setVisible] = useState<ComplexityId[]>(DEFAULT_VISIBLE);
  const m = copy[locale];
  const numberLocale = locale === "pt-br" ? "pt-BR" : locale === "es" ? "es-ES" : "en-US";

  const selected = useMemo(
    () => complexityFunctions.filter((fn) => visible.includes(fn.id)),
    [visible],
  );
  const values = useMemo(
    () => selected.map((fn) => ({ ...fn, value: fn.calculate(n) })),
    [selected, n],
  );
  const points = useMemo(() => {
    const raw = selected.flatMap((fn) => Array.from({ length: n }, (_, index) => fn.calculate(index + 1)));
    const transformed = raw.map((value) => scale === "log" ? Math.log10(Math.max(1, value)) : value);
    const maxValue = Math.max(1, ...transformed);
    const x = (index: number) => 48 + (index / Math.max(1, n - 1)) * 620;
    const y = (value: number) => 250 - (value / maxValue) * 210;
    return selected.map((fn) => ({
      id: fn.id,
      color: fn.color,
      path: Array.from({ length: n }, (_, index) => {
        const rawValue = fn.calculate(index + 1);
        const value = scale === "log" ? Math.log10(Math.max(1, rawValue)) : rawValue;
        return `${index === 0 ? "M" : "L"} ${x(index).toFixed(1)} ${y(value).toFixed(1)}`;
      }).join(" "),
    }));
  }, [n, scale, selected]);

  function toggle(id: ComplexityId) {
    setVisible((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  }

  return (
    <div className="interactive-lab">
      <div className="lab-controls">
        <div className="control-block">
          <label htmlFor="input-size">{m.input}<strong>n = {n}</strong></label>
          <input id="input-size" type="range" min="2" max="20" value={n} onChange={(event) => setN(Number(event.target.value))} />
          <div className="range-labels"><span>2 {m.elements}</span><span>20 {m.elements}</span></div>
        </div>
        <fieldset className="scale-control">
          <legend>{m.scale}</legend>
          <label><input type="radio" name="scale" value="log" checked={scale === "log"} onChange={() => setScale("log")} /> {m.logarithmic}</label>
          <label><input type="radio" name="scale" value="linear" checked={scale === "linear"} onChange={() => setScale("linear")} /> {m.linear}</label>
        </fieldset>
      </div>
      <fieldset className="curve-selector">
        <legend>{m.curves}</legend>
        {complexityFunctions.map((fn) => <label key={fn.id} className="curve-option">
          <input type="checkbox" checked={visible.includes(fn.id)} onChange={() => toggle(fn.id)} />
          <i style={{ backgroundColor: fn.color }} /><span>{fn.formula}</span>
        </label>)}
      </fieldset>
      <div className="lab-chart">
        <div className="lab-chart-title"><span>{m.value}</span><span>{scale === "log" ? `${m.logarithmic} (log₁₀)` : m.linear}</span></div>
        <svg viewBox="0 0 700 280" role="img" aria-labelledby="lab-chart-title lab-chart-desc">
          <title id="lab-chart-title">{m.chartTitle}</title>
          <desc id="lab-chart-desc">{m.chartDesc} {n}.</desc>
          {[40,92,145,198,250].map((y) => <line key={y} x1="48" y1={y} x2="668" y2={y} className="grid-line" />)}
          {[1,5,9,13,17,20].filter((tick) => tick <= n).map((tick) => {
            const x = 48 + ((tick - 1) / Math.max(1, n - 1)) * 620;
            return <g key={tick}><line x1={x} y1="40" x2={x} y2="250" className="grid-line vertical" /><text x={x} y="270" textAnchor="middle" className="axis-label">{tick}</text></g>;
          })}
          {points.map((point) => <path key={point.id} d={point.path} fill="none" stroke={point.color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />)}
          <text x="48" y="18" className="axis-label">{m.inputAxis}</text>
        </svg>
        {selected.length === 0 && <p className="lab-empty">{m.empty}</p>}
      </div>
      <div className="lab-results" aria-live="polite">
        {values.map((item) => <div className="lab-result" key={item.id}>
          <span><i style={{ backgroundColor: item.color }} />{m.labels[item.id]}</span>
          <code>{item.formula}</code>
          <strong>{item.value.toLocaleString(numberLocale, { maximumFractionDigits: 2 })}</strong>
          <span className="sr-only">{m.descriptions[item.id]}</span>
        </div>)}
      </div>
      <p className="lab-footnote">{m.footnote} {n}. {m.notBenchmark}</p>
    </div>
  );
}

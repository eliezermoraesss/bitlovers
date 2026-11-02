"use client";

import { useMemo, useState } from "react";
import { complexityFunctions, type ComplexityId } from "@/lib/complexity";

const DEFAULT_VISIBLE: ComplexityId[] = ["constant", "logarithmic", "linear", "linearithmic", "quadratic"];

export default function ComplexityLab() {
  const [n, setN] = useState(12);
  const [scale, setScale] = useState<"linear" | "log">("log");
  const [visible, setVisible] = useState<ComplexityId[]>(DEFAULT_VISIBLE);

  const selected = useMemo(
    () => complexityFunctions.filter((fn) => visible.includes(fn.id)),
    [visible],
  );

  const values = useMemo(
    () => selected.map((fn) => ({ ...fn, value: fn.calculate(n) })),
    [selected, n],
  );

  const points = useMemo(() => {
    const raw = selected.flatMap((fn) =>
      Array.from({ length: n }, (_, index) => fn.calculate(index + 1)),
    );
    const transformed = raw.map((value) => scale === "log" ? Math.log10(Math.max(1, value)) : value);
    const maxValue = Math.max(1, ...transformed);
    const minValue = 0;
    const x = (index: number) => 48 + (index / Math.max(1, n - 1)) * 620;
    const y = (value: number) => 250 - ((value - minValue) / maxValue) * 210;
    return selected.map((fn) => {
      const path = Array.from({ length: n }, (_, index) => {
        const rawValue = fn.calculate(index + 1);
        const value = scale === "log" ? Math.log10(Math.max(1, rawValue)) : rawValue;
        return `${index === 0 ? "M" : "L"} ${x(index).toFixed(1)} ${y(value).toFixed(1)}`;
      }).join(" ");
      return { id: fn.id, path, color: fn.color };
    });
  }, [n, scale, selected]);

  function toggle(id: ComplexityId) {
    setVisible((current) => current.includes(id)
      ? current.filter((item) => item !== id)
      : [...current, id]);
  }

  return (
    <div className="interactive-lab">
      <div className="lab-controls">
        <div className="control-block">
          <label htmlFor="input-size">Tamanho da entrada <strong>n = {n}</strong></label>
          <input id="input-size" type="range" min="2" max="20" value={n} onChange={(event) => setN(Number(event.target.value))} />
          <div className="range-labels"><span>2 elementos</span><span>20 elementos</span></div>
        </div>
        <fieldset className="scale-control">
          <legend>Escala do gráfico</legend>
          <label><input type="radio" name="scale" value="log" checked={scale === "log"} onChange={() => setScale("log")} /> Logarítmica</label>
          <label><input type="radio" name="scale" value="linear" checked={scale === "linear"} onChange={() => setScale("linear")} /> Linear</label>
        </fieldset>
      </div>

      <fieldset className="curve-selector">
        <legend>Curvas visíveis</legend>
        {complexityFunctions.map((fn) => (
          <label key={fn.id} className="curve-option">
            <input type="checkbox" checked={visible.includes(fn.id)} onChange={() => toggle(fn.id)} />
            <i style={{ backgroundColor: fn.color }} />
            <span>{fn.formula}</span>
          </label>
        ))}
      </fieldset>

      <div className="lab-chart">
        <div className="lab-chart-title"><span>VALOR DA FUNÇÃO</span><span>{scale === "log" ? "Escala logarítmica (log₁₀)" : "Escala linear"}</span></div>
        <svg viewBox="0 0 700 280" role="img" aria-labelledby="lab-chart-title lab-chart-desc">
          <title id="lab-chart-title">Comparação interativa de funções de complexidade</title>
          <desc id="lab-chart-desc">Gráfico de funções de crescimento para entradas de 1 até {n}. Marque ou desmarque curvas e altere a escala.</desc>
          {[40, 92, 145, 198, 250].map((y) => <line key={y} x1="48" y1={y} x2="668" y2={y} className="grid-line" />)}
          {[0, 4, 8, 12, 16, 20].filter((tick) => tick < n || tick === n).map((tick) => {
            const x = 48 + (tick / Math.max(1, n - 1)) * 620;
            return <g key={tick}><line x1={x} y1="40" x2={x} y2="250" className="grid-line vertical" /><text x={x} y="270" textAnchor="middle" className="axis-label">{tick + 1}</text></g>;
          })}
          {points.map((point) => <path key={point.id} d={point.path} fill="none" stroke={point.color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />)}
          <text x="48" y="18" className="axis-label">ENTRADA n</text>
        </svg>
        {selected.length === 0 && <p className="lab-empty">Selecione ao menos uma curva para visualizar o crescimento.</p>}
      </div>

      <div className="lab-results" aria-live="polite">
        {values.map((item) => (
          <div className="lab-result" key={item.id}>
            <span><i style={{ backgroundColor: item.color }} />{item.label}</span>
            <code>{item.formula}</code>
            <strong>{item.value.toLocaleString("pt-BR", { maximumFractionDigits: 2 })}</strong>
          </div>
        ))}
      </div>
      <p className="lab-footnote">Valores calculados a partir das funções ilustrativas para n = {n}. Não são benchmarks nem representam diretamente segundos de execução. A escala logarítmica ajuda a comparar crescimentos com ordens de grandeza diferentes.</p>
    </div>
  );
}

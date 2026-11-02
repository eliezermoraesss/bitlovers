import Link from "next/link";
import { complexityFunctions } from "@/lib/complexity";
import { learningCatalog, categoryLabels } from "@/content/catalog";

const paths = [
  { number: "01", title: "Entender", text: "Comece pelo problema e construa a intuição antes da fórmula." },
  { number: "02", title: "Visualizar", text: "Observe estruturas, operações e o crescimento dos algoritmos." },
  { number: "03", title: "Experimentar", text: "Mude os dados, teste hipóteses e compare os resultados." },
  { number: "04", title: "Implementar", text: "Estude o código e conecte a teoria à prática." },
  { number: "05", title: "Consolidar", text: "Revise, resolva exercícios e explique o que aprendeu." },
];

export default function HomePage() {
  return (
    <main>
      <header className="site-header">
        <Link className="brand" href="/" aria-label="BitLovers — início">
          <span className="brand-mark" aria-hidden="true">b.</span>
          <span>bit<span className="brand-light">lovers</span></span>
        </Link>
        <nav className="main-nav" aria-label="Navegação principal">
          <a href="#explorar">Explorar</a>
          <a href="#metodo">Método</a>
          <a href="#sobre">Sobre</a>
        </nav>
        <a className="header-cta" href="#explorar">Começar a aprender <span aria-hidden="true">↗</span></a>
      </header>

      <section className="hero shell">
        <div className="hero-copy">
          <div className="eyebrow"><span className="status-dot" /> APRENDIZADO EM CIÊNCIA DA COMPUTAÇÃO</div>
          <h1>Entenda a tecnologia.<br /><span>Visualize os conceitos.</span><br />Aprenda fazendo.</h1>
          <p className="hero-description">Fundamentos de computação explicados com clareza, experimentos interativos e código que você pode explorar.</p>
          <div className="hero-actions">
            <a className="button button-primary" href="#explorar">Explorar conteúdos <span aria-hidden="true">→</span></a>
            <a className="button button-secondary" href="#metodo">Conhecer o método</a>
          </div>
          <div className="hero-note"><span className="tiny-check">✓</span> Conteúdo aberto. Aprenda no seu ritmo.</div>
        </div>

        <div className="hero-visual" aria-label="Ilustração conceitual de análise de algoritmos">
          <div className="visual-topline"><span>LAB / 001</span><span>GROWTH FUNCTIONS</span><span className="live-indicator">● LIVE MODEL</span></div>
          <div className="chart-label">Crescimento do custo <span>· estimativa ilustrativa</span></div>
          <div className="chart-frame">
            <div className="chart-y-label">OPERAÇÕES RELATIVAS</div>
            <svg viewBox="0 0 500 280" role="img" aria-labelledby="chart-title chart-desc">
              <title id="chart-title">Curvas de crescimento assintótico</title>
              <desc id="chart-desc">Ilustração das diferenças entre crescimento constante, linear, linearítmico e quadrático. Não representa benchmark real.</desc>
              {[30, 75, 120, 165, 210, 255].map((y) => <line key={y} x1="38" y1={y} x2="482" y2={y} className="grid-line" />)}
              {[80, 160, 240, 320, 400, 480].map((x) => <line key={x} x1={x} y1="20" x2={x} y2="255" className="grid-line vertical" />)}
              <path d="M38 245 C150 242 290 238 482 230" className="curve curve-constant" />
              <path d="M38 250 L482 165" className="curve curve-linear" />
              <path d="M38 252 C160 246 310 215 482 105" className="curve curve-nlogn" />
              <path d="M38 252 Q270 250 482 28" className="curve curve-quadratic" />
              <text x="442" y="222" className="chart-annotation">O(1)</text>
              <text x="441" y="155" className="chart-annotation">O(n)</text>
              <text x="422" y="95" className="chart-annotation">O(n log n)</text>
              <text x="432" y="25" className="chart-annotation">O(n²)</text>
              <text x="38" y="273" className="axis-label">PEQUENA ENTRADA</text>
              <text x="482" y="273" textAnchor="end" className="axis-label">n →</text>
            </svg>
          </div>
          <div className="visual-footer"><span><i className="legend-dot mint" /> Constante</span><span><i className="legend-dot blue" /> Linear</span><span><i className="legend-dot orange" /> Linearítmica</span><span><i className="legend-dot purple" /> Quadrática</span></div>
          <div className="visual-caption"><span>FIG 01</span> A forma de crescimento importa mais conforme a entrada aumenta.</div>
        </div>
      </section>

      <section className="principles shell" aria-label="Princípios da BitLovers">
        <div><span className="principle-index">01 /</span><strong>Fundamentos sólidos</strong><span>Teoria sem atalhos enganosos.</span></div>
        <div><span className="principle-index">02 /</span><strong>Aprender fazendo</strong><span>Interação com propósito.</span></div>
        <div><span className="principle-index">03 /</span><strong>Código compreensível</strong><span>Exemplos para estudar e testar.</span></div>
      </section>

      <section id="explorar" className="section shell">
        <div className="section-heading">
          <div><div className="eyebrow">SEU PRÓXIMO CONCEITO</div><h2>Conhecimento que ganha forma.</h2></div>
          <p>Explore os fundamentos da computação em módulos organizados para construir entendimento, passo a passo.</p>
        </div>
        <div className="content-grid">
          {learningCatalog.map((item, index) => (
            <article className={item.status === "available" ? "content-card featured-card" : "content-card"} key={item.slug}>
              <div className="card-top"><span className="card-number">0{index + 1}</span><span className={item.status === "available" ? "availability available" : "availability"}>{item.status === "available" ? "EXPLORÁVEL" : "NO ROADMAP"}</span></div>
              <div className="card-category">{categoryLabels[item.category]}</div>
              <h3>{item.title}</h3>
              <p>{item.summary}</p>
              <div className="card-bottom"><span>{item.level}</span>{item.status === "available" ? <a href="#laboratorio">Explorar módulo <span aria-hidden="true">↗</span></a> : <span className="planned-label">Planejado</span>}</div>
            </article>
          ))}
        </div>
      </section>

      <section id="laboratorio" className="lab-section">
        <div className="shell lab-layout">
          <div className="lab-copy">
            <div className="eyebrow">LABORATÓRIO 001</div>
            <h2>Complexidade não é só uma fórmula.</h2>
            <p>É entender como o custo muda quando o tamanho da entrada cresce. O primeiro laboratório visualiza oito classes clássicas de crescimento.</p>
            <ul className="lab-points">
              <li><span>✓</span> Compare famílias de funções</li>
              <li><span>✓</span> Entenda a diferença entre crescimento e tempo real</li>
              <li><span>✓</span> Explore exemplos e hipóteses</li>
            </ul>
            <p className="lab-status">Explore funções com controles reais, altere o tamanho da entrada e compare escalas de visualização.</p><Link className="lab-link" href="/laboratorio">Abrir laboratório interativo <span aria-hidden="true">→</span></Link>
          </div>
          <div className="complexity-list">
            {complexityFunctions.map((fn, i) => (
              <div className="complexity-row" key={fn.id}>
                <span className="complexity-rank">{String(i + 1).padStart(2, "0")}</span>
                <span className="complexity-name"><i style={{ backgroundColor: fn.color }} />{fn.label}</span>
                <code>{fn.formula}</code>
                <span className="complexity-description">{fn.description}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="metodo" className="section shell method-section">
        <div className="section-heading">
          <div><div className="eyebrow">BITLOVERS LEARNING LOOP</div><h2>Aprenda em ciclos, não por decoreba.</h2></div>
          <p>Uma abordagem prática que conecta intuição, visualização, experimentação e implementação.</p>
        </div>
        <div className="method-grid">
          {paths.map((path) => <article key={path.number} className="method-card"><span>{path.number}</span><h3>{path.title}</h3><p>{path.text}</p></article>)}
        </div>
      </section>

      <section id="sobre" className="closing-section shell">
        <div><div className="eyebrow">CONHECIMENTO ABERTO</div><h2>Feito para quem quer entender o porquê.</h2><p>BitLovers é um projeto educacional em evolução, construído com foco em precisão técnica, acessibilidade e curiosidade.</p></div>
        <a className="button button-primary" href="https://github.com/eliezermoraesss/bitlovers" target="_blank" rel="noreferrer">Acompanhar no GitHub <span aria-hidden="true">↗</span></a>
      </section>

      <footer className="site-footer shell"><Link className="brand footer-brand" href="/"><span className="brand-mark">b.</span><span>bit<span className="brand-light">lovers</span></span></Link><span>Aprender é investigar.</span><span>Projeto aberto · Em construção</span></footer>
    </main>
  );
}

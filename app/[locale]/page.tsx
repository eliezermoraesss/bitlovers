import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ThemeToggle from "@/components/theme-toggle";
import LanguageSwitcher from "@/components/language-switcher";
import ContentSearch from "@/components/content-search";
import { complexityFunctions } from "@/lib/complexity";
import { isLocale, localeHtmlLang, locales, messages, type Locale } from "@/lib/i18n";

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const titles = {
    "pt-br": "Aprenda ciência da computação com clareza",
    en: "Learn computer science with clarity",
    es: "Aprende ciencias de la computación con claridad",
  };
  return {
    title: titles[locale],
    description: messages[locale].intro,
    alternates: { languages: { "pt-BR": "/pt-br", en: "/en", es: "/es" } },
    openGraph: { title: "BitLovers", description: messages[locale].intro, locale: locale === "pt-br" ? "pt_BR" : locale },
  };
}

const catalogTranslations = {
  "pt-br": {
    complexTitle: "Complexidade computacional", complexSummary: "Entenda como o custo de um algoritmo cresce conforme a entrada aumenta.",
    arraysTitle: "Arrays e vetores", arraysSummary: "Explore índices, acesso direto, inserção e limites da estrutura.",
    stacksTitle: "Pilhas e filas", stacksSummary: "Compare LIFO e FIFO com operações e exemplos cotidianos.",
    searchTitle: "Busca linear e binária", searchSummary: "Compare estratégias de busca e entenda o pré-requisito da busca binária.",
  },
  en: {
    complexTitle: "Computational complexity", complexSummary: "Understand how an algorithm's cost grows as input size increases.",
    arraysTitle: "Arrays", arraysSummary: "Explore indexes, direct access, insertion, and structural limits.",
    stacksTitle: "Stacks and queues", stacksSummary: "Compare LIFO and FIFO through operations and everyday examples.",
    searchTitle: "Linear and binary search", searchSummary: "Compare search strategies and understand binary search prerequisites.",
  },
  es: {
    complexTitle: "Complejidad computacional", complexSummary: "Comprende cómo crece el costo de un algoritmo cuando aumenta la entrada.",
    arraysTitle: "Arrays y vectores", arraysSummary: "Explora índices, acceso directo, inserción y límites de la estructura.",
    stacksTitle: "Pilas y colas", stacksSummary: "Compara LIFO y FIFO mediante operaciones y ejemplos cotidianos.",
    searchTitle: "Búsqueda lineal y binaria", searchSummary: "Compara estrategias de búsqueda y conoce el requisito de la búsqueda binaria.",
  },
} as const;

export default async function LocalizedHomePage({ params }: Props) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale: Locale = rawLocale;
  const m = messages[locale];
  const catalog = catalogTranslations[locale];
  const cards = [
    { slug: "complexidade", title: catalog.complexTitle, summary: catalog.complexSummary, category: m.categoryComplexity, available: true },
    { slug: "arrays", title: catalog.arraysTitle, summary: catalog.arraysSummary, category: m.categoryData, available: false },
    { slug: "pilhas-e-filas", title: catalog.stacksTitle, summary: catalog.stacksSummary, category: m.categoryData, available: false },
    { slug: "busca-linear-e-binaria", title: catalog.searchTitle, summary: catalog.searchSummary, category: m.categoryAlgorithms, available: false },
  ];
  const steps = [
    { n: "01", title: m.step1, text: m.step1Text },
    { n: "02", title: m.step2, text: m.step2Text },
    { n: "03", title: m.step3, text: m.step3Text },
    { n: "04", title: m.step4, text: m.step4Text },
    { n: "05", title: m.step5, text: m.step5Text },
  ];
  return (
    <main lang={localeHtmlLang[locale]}>
      <header className="site-header">
        <Link className="brand" href={`/${locale}`} aria-label="BitLovers — home">
          <span className="brand-mark" aria-hidden="true">b.</span><span>bit<span className="brand-light">lovers</span></span>
        </Link>
        <nav className="main-nav" aria-label={m.navExplore}>
          <a href="#explorar">{m.navExplore}</a><a href="#metodo">{m.navMethod}</a><a href="#sobre">{m.navAbout}</a>
        </nav>
        <div className="header-actions"><LanguageSwitcher locale={locale} /><ThemeToggle /><a className="header-cta" href="#explorar">{m.start} <span aria-hidden="true">↗</span></a></div>
      </header>

      <section className="hero shell">
        <div className="hero-copy">
          <div className="eyebrow"><span className="status-dot" /> {m.eyebrow}</div>
          <h1>{m.headline1}<br /><span>{m.headline2}</span><br />{m.headline3}</h1>
          <p className="hero-description">{m.intro}</p>
          <div className="hero-actions"><a className="button button-primary" href="#explorar">{m.exploreContent} <span aria-hidden="true">→</span></a><a className="button button-secondary" href="#metodo">{m.learnMethod}</a></div>
          <ContentSearch locale={locale} />
          <div className="hero-note"><span className="tiny-check">✓</span> {m.openContent}</div>
        </div>
        <div className="hero-visual" aria-label={m.curveTitle}>
          <div className="visual-topline"><span>LAB / 001</span><span>GROWTH FUNCTIONS</span><span className="live-indicator">● LIVE MODEL</span></div>
          <div className="chart-label">{m.growth} <span>{m.illustrative}</span></div>
          <div className="chart-frame"><div className="chart-y-label">{m.relativeOps}</div>
            <svg viewBox="0 0 500 280" role="img" aria-labelledby="chart-title chart-desc">
              <title id="chart-title">{m.curveTitle}</title><desc id="chart-desc">{m.curveDesc}</desc>
              {[30,75,120,165,210,255].map((y)=><line key={y} x1="38" y1={y} x2="482" y2={y} className="grid-line"/>)}
              {[80,160,240,320,400,480].map((x)=><line key={x} x1={x} y1="20" x2={x} y2="255" className="grid-line vertical"/>)}
              <path d="M38 245 C150 242 290 238 482 230" className="curve curve-constant"/><path d="M38 250 L482 165" className="curve curve-linear"/><path d="M38 252 C160 246 310 215 482 105" className="curve curve-nlogn"/><path d="M38 252 Q270 250 482 28" className="curve curve-quadratic"/>
              <text x="442" y="222" className="chart-annotation">O(1)</text><text x="441" y="155" className="chart-annotation">O(n)</text><text x="422" y="95" className="chart-annotation">O(n log n)</text><text x="432" y="25" className="chart-annotation">O(n²)</text>
              <text x="38" y="273" className="axis-label">{m.smallInput}</text><text x="482" y="273" textAnchor="end" className="axis-label">n →</text>
            </svg>
          </div>
          <div className="visual-footer"><span><i className="legend-dot mint"/>{m.constant}</span><span><i className="legend-dot blue"/>{m.linear}</span><span><i className="legend-dot orange"/>{m.linearithmic}</span><span><i className="legend-dot purple"/>{m.quadratic}</span></div>
          <div className="visual-caption"><span>FIG 01</span> {m.figureCaption}</div>
        </div>
      </section>

      <section className="principles shell" aria-label={m.principlesLabel}>
        <div><span className="principle-index">01 /</span><strong>{m.principle1}</strong><span>{m.principle1Text}</span></div>
        <div><span className="principle-index">02 /</span><strong>{m.principle2}</strong><span>{m.principle2Text}</span></div>
        <div><span className="principle-index">03 /</span><strong>{m.principle3}</strong><span>{m.principle3Text}</span></div>
      </section>

      <section id="explorar" className="section shell">
        <div className="section-heading"><div><div className="eyebrow">{m.nextConcept}</div><h2>{m.knowledge}</h2></div><p>{m.exploreDescription}</p></div>
        <div className="content-grid">
          {cards.map((item,index)=><article className={item.available?"content-card featured-card":"content-card"} key={item.slug}>
            <div className="card-top"><span className="card-number">0{index+1}</span><span className={item.available?"availability available":"availability"}>{item.available?m.available:m.roadmap}</span></div>
            <div className="card-category">{item.category}</div><h3>{item.title}</h3><p>{item.summary}</p>
            <div className="card-bottom"><span>{m.levelBeginner}</span>{item.available?<Link href={item.slug === "arrays" ? `/${locale}/estruturas` : `/${locale}/laboratorio`}>{m.exploreModule} <span aria-hidden="true">↗</span></Link>:<span className="planned-label">{m.planned}</span>}</div>
          </article>)}
        </div>
      </section>

      <section id="laboratorio" className="lab-section"><div className="shell lab-layout">
        <div className="lab-copy"><div className="eyebrow">{m.labEyebrow}</div><h2>{m.labTitle}</h2><p>{m.labIntro}</p>
          <ul className="lab-points"><li><span>✓</span>{m.point1}</li><li><span>✓</span>{m.point2}</li><li><span>✓</span>{m.point3}</li></ul>
          <p className="lab-status">{m.labStatus}</p><Link className="lab-link" href={`/${locale}/laboratorio`}>{m.openLab} <span aria-hidden="true">→</span></Link>
        </div>
        <div className="complexity-list">{complexityFunctions.map((fn,i)=><div className="complexity-row" key={fn.id}><span className="complexity-rank">{String(i+1).padStart(2,"0")}</span><span className="complexity-name"><i style={{backgroundColor:fn.color}}/>{fn.label}</span><code>{fn.formula}</code><span className="complexity-description">{fn.description}</span></div>)}</div>
      </div></section>

      <section id="metodo" className="section shell method-section"><div className="section-heading"><div><div className="eyebrow">{m.methodEyebrow}</div><h2>{m.methodTitle}</h2></div><p>{m.methodIntro}</p></div>
        <div className="method-grid">{steps.map((step)=><article key={step.n} className="method-card"><span>{step.n}</span><h3>{step.title}</h3><p>{step.text}</p></article>)}</div>
      </section>

      <section id="sobre" className="closing-section shell"><div><div className="eyebrow">{m.openKnowledge}</div><h2>{m.aboutTitle}</h2><p>{m.aboutText}</p></div><a className="button button-primary" href="https://github.com/eliezermoraesss/bitlovers" target="_blank" rel="noreferrer">{m.github} <span aria-hidden="true">↗</span></a></section>
      <footer className="site-footer shell"><Link className="brand footer-brand" href={`/${locale}`}><span className="brand-mark">b.</span><span>bit<span className="brand-light">lovers</span></span></Link><span>{m.footer}</span><span>{m.footerStatus}</span></footer>
    </main>
  );
}

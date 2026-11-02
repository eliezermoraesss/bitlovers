import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ComplexityLab from "@/app/laboratorio/lab-client";
import LanguageSwitcher from "@/components/language-switcher";
import ThemeToggle from "@/components/theme-toggle";
import { isLocale, locales, messages } from "@/lib/i18n";

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const title = {
    "pt-br": "Laboratório de complexidade",
    en: "Complexity laboratory",
    es: "Laboratorio de complejidad",
  }[locale];
  return { title, description: messages[locale].labIntro };
}

const copy = {
  "pt-br": {
    back: "← Voltar para o início", eyebrow: "LABORATÓRIO INTERATIVO / 001",
    title1: "Explore o crescimento.", title2: "Faça perguntas aos dados.",
    intro: "Altere o tamanho da entrada, escolha as funções e compare estimativas matemáticas. Observe como a escala do gráfico muda o que você consegue enxergar.",
    interpretation: "COMO INTERPRETAR", explanationTitle: "O que este laboratório mostra?",
    p1: "descreve como o custo de um algoritmo cresce em função do tamanho da entrada, abstraindo detalhes como hardware e constantes específicas.",
    linear: "A escala linear", p2: "representa diferenças numéricas diretamente. Quando uma função fatorial ou exponencial cresce muito, as demais podem parecer quase planas.",
    log: "A escala logarítmica", p3: "transforma multiplicações em somas e facilita observar ordens de grandeza diferentes. Ela altera a representação visual, não a função original.",
    important: "Importante:", p4: "O(1), O(log n) e outras notações descrevem classes de crescimento, não uma previsão universal de segundos ou de operações exatas. Os valores exibidos são funções de referência didáticas.",
  },
  en: {
    back: "← Back to home", eyebrow: "INTERACTIVE LAB / 001",
    title1: "Explore growth.", title2: "Ask questions of the data.",
    intro: "Change input size, choose functions, and compare mathematical estimates. See how the chart scale changes what you can observe.",
    interpretation: "HOW TO READ IT", explanationTitle: "What does this lab show?",
    p1: "describes how an algorithm's cost grows with input size, abstracting away details such as hardware and specific constants.",
    linear: "A linear scale", p2: "represents numeric differences directly. When factorial or exponential functions grow quickly, other curves may look almost flat.",
    log: "A logarithmic scale", p3: "turns multiplication into addition and makes different orders of magnitude easier to compare. It changes the visual representation, not the original function.",
    important: "Important:", p4: "O(1), O(log n), and other notations describe growth classes, not a universal prediction of seconds or exact operation counts. Displayed values are educational reference functions.",
  },
  es: {
    back: "← Volver al inicio", eyebrow: "LABORATORIO INTERACTIVO / 001",
    title1: "Explora el crecimiento.", title2: "Haz preguntas a los datos.",
    intro: "Cambia el tamaño de entrada, elige funciones y compara estimaciones matemáticas. Observa cómo la escala del gráfico cambia lo que puedes ver.",
    interpretation: "CÓMO INTERPRETARLO", explanationTitle: "¿Qué muestra este laboratorio?",
    p1: "describe cómo crece el costo de un algoritmo según el tamaño de la entrada, sin depender de detalles como el hardware y constantes específicas.",
    linear: "La escala lineal", p2: "representa las diferencias numéricas directamente. Cuando las funciones factoriales o exponenciales crecen rápidamente, las demás pueden parecer casi planas.",
    log: "La escala logarítmica", p3: "convierte multiplicaciones en sumas y facilita comparar distintos órdenes de magnitud. Cambia la representación visual, no la función original.",
    important: "Importante:", p4: "O(1), O(log n) y otras notaciones describen clases de crecimiento, no una predicción universal de segundos ni un conteo exacto de operaciones. Los valores son funciones de referencia educativas.",
  },
} as const;

export default async function LocalizedComplexityPage({ params }: Props) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale = rawLocale;
  const m = copy[locale];
  return (
    <main className="lab-page shell" lang={locale === "pt-br" ? "pt-BR" : locale}>
      <div className="localized-lab-header">
        <Link className="back-link" href={`/${locale}`}>{m.back}</Link>
        <div className="header-actions"><LanguageSwitcher locale={locale} /><ThemeToggle /></div>
      </div>
      <div className="eyebrow">{m.eyebrow}</div>
      <h1 className="lab-page-title">{m.title1}<br /><span>{m.title2}</span></h1>
      <p className="lab-page-intro">{m.intro}</p>
      <ComplexityLab />
      <section className="lab-explainer">
        <div><span className="eyebrow">{m.interpretation}</span><h2>{m.explanationTitle}</h2></div>
        <div>
          <p><strong>{locale === "en" ? "Asymptotic complexity" : locale === "es" ? "La complejidad asintótica" : "Complexidade assintótica"}</strong> {m.p1}</p>
          <p><strong>{m.linear}</strong> {m.p2}</p>
          <p><strong>{m.log}</strong> {m.p3}</p>
          <p><strong>{m.important}</strong> {m.p4}</p>
        </div>
      </section>
    </main>
  );
}

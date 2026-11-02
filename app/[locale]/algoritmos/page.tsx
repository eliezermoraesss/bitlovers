import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import SearchAlgorithmsLab from "@/components/search-algorithms-lab";
import LanguageSwitcher from "@/components/language-switcher";
import ThemeToggle from "@/components/theme-toggle";
import { isLocale, locales, type Locale } from "@/lib/i18n";

type Props = { params: Promise<{ locale: string }> };
export function generateStaticParams() { return locales.map((locale) => ({ locale })); }
const copy = {
  "pt-br": { back:"← Voltar para o início", eyebrow:"LABORATÓRIO INTERATIVO / 003", title:"Algoritmos", accent:"passo a passo.", intro:"Entenda a busca linear e a busca binária por meio de comparações visuais, análise de complexidade e código em diferentes linguagens." },
  en: { back:"← Back to home", eyebrow:"INTERACTIVE LAB / 003", title:"Algorithms", accent:"step by step.", intro:"Understand linear and binary search through visual comparisons, complexity analysis, and code in different languages." },
  es: { back:"← Volver al inicio", eyebrow:"LABORATORIO INTERACTIVO / 003", title:"Algoritmos", accent:"paso a paso.", intro:"Comprende la búsqueda lineal y binaria mediante comparaciones visuales, análisis de complejidad y código en distintos lenguajes." },
} as const;
export async function generateMetadata({params}: Props): Promise<Metadata> { const {locale} = await params; if (!isLocale(locale)) return {}; return { title: { "pt-br":"Laboratorio de algoritmos", en:"Algorithms lab", es:"Laboratorio de algoritmos" }[locale], description: copy[locale].intro }; }
export default async function LocalizedAlgorithmsPage({params}: Props) {
  const {locale: rawLocale} = await params; if (!isLocale(rawLocale)) notFound(); const locale: Locale = rawLocale; const t = copy[locale];
  return <main className="lab-page shell" lang={locale === "pt-br" ? "pt-BR" : locale}>
    <div className="localized-lab-header"><Link className="back-link" href={`/${locale}`}>{t.back}</Link><div className="header-actions"><LanguageSwitcher locale={locale}/><ThemeToggle/></div></div>
    <div className="eyebrow">{t.eyebrow}</div><h1 className="lab-page-title">{t.title} <span>{t.accent}</span></h1><p className="lab-page-intro">{t.intro}</p>
    <SearchAlgorithmsLab locale={locale}/>
  </main>;
}
import type { Metadata } from "next";
import Link from "next/link";
import SearchAlgorithmsLab from "@/components/search-algorithms-lab";
import LanguageSwitcher from "@/components/language-switcher";
import ThemeToggle from "@/components/theme-toggle";

export const metadata: Metadata = { title: "Laboratório de algoritmos", description: "Visualize busca linear e binária, avance pelas comparações e estude exemplos em Java, Python e C#." };

export default function AlgorithmsPage() {
  return <main className="lab-page shell">
    <div className="localized-lab-header"><Link className="back-link" href="/">← Voltar para o início</Link><div className="header-actions"><LanguageSwitcher locale="pt-br"/><ThemeToggle/></div></div>
    <div className="eyebrow">LABORATÓRIO INTERATIVO / 003</div>
    <h1 className="lab-page-title">Algoritmos <span>passo a passo.</span></h1>
    <p className="lab-page-intro">Entenda a busca linear e a busca binária por meio de comparações visuais, análise de complexidade e código em diferentes linguagens.</p>
    <SearchAlgorithmsLab locale="pt-br"/>
  </main>;
}
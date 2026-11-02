import type { Metadata } from "next";
import Link from "next/link";
import DataStructuresLab from "@/components/data-structures-lab";
import BinarySearchTreeLab from "@/components/binary-search-tree-lab";
import LanguageSwitcher from "@/components/language-switcher";
import ThemeToggle from "@/components/theme-toggle";

export const metadata: Metadata = {
  title: "Laboratório de estruturas de dados",
  description: "Experimente operações reais em arrays, pilhas e filas.",
};

export default function DataStructuresPage() {
  return <main className="lab-page shell">
    <div className="localized-lab-header">
      <Link className="back-link" href="/">← Voltar para o início</Link>
      <div className="header-actions"><LanguageSwitcher locale="pt-br" /><ThemeToggle /></div>
    </div>
    <div className="eyebrow">LABORATÓRIO INTERATIVO / 002</div>
    <h1 className="lab-page-title">Estruturas de dados <span>em ação.</span></h1>
    <p className="lab-page-intro">Altere os valores e execute operações para entender como arrays, pilhas e filas organizam e entregam dados.</p>
    <div className="eyebrow">ARRAYS · PILHAS · FILAS</div>
    <h2>Experimente as operações</h2>
    <DataStructuresLab locale="pt-br" />
    <div className="eyebrow">ÁRVORES · BUSCA</div>
    <h2>Explore uma estrutura hierárquica</h2>
    <BinarySearchTreeLab locale="pt-br" />
    <p className="lab-footnote">Esta visualização mantém os dados apenas durante a sessão da página. Ela é uma demonstração educacional, não um armazenamento persistente.</p>
  </main>;
}

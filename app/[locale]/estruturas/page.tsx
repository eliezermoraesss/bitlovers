import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import DataStructuresLab from "@/components/data-structures-lab";
import BinarySearchTreeLab from "@/components/binary-search-tree-lab";
import LanguageSwitcher from "@/components/language-switcher";
import ThemeToggle from "@/components/theme-toggle";
import { isLocale, locales } from "@/lib/i18n";

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return {
    title: { "pt-br": "Laboratório de estruturas de dados", en: "Data structures lab", es: "Laboratorio de estructuras de datos" }[locale],
    description: { "pt-br": "Experimente operações reais em arrays, pilhas e filas.", en: "Experiment with real operations on arrays, stacks, and queues.", es: "Experimenta operaciones reales con arrays, pilas y colas." }[locale],
  };
}

const copy = {
  "pt-br": { back:"← Voltar para o início", eyebrow:"LABORATÓRIO INTERATIVO / 002", title:"Estruturas de dados em ação.", intro:"Altere os valores e execute operações para entender como arrays, pilhas e filas organizam e entregam dados.", available:"ARRAYS · PILHAS · FILAS", heading:"Experimente as operações", treeEyebrow:"ÁRVORES · BUSCA", treeHeading:"Explore uma estrutura hierárquica", note:"Esta visualização mantém os dados apenas durante a sessão da página. Ela é uma demonstração educacional, não um armazenamento persistente." },
  en: { back:"← Back to home", eyebrow:"INTERACTIVE LAB / 002", title:"Data structures in action.", intro:"Change values and run operations to understand how arrays, stacks, and queues organize and return data.", available:"ARRAYS · STACKS · QUEUES", heading:"Try the operations", treeEyebrow:"TREES · SEARCH", treeHeading:"Explore a hierarchical structure", note:"This visualization keeps data only while the page is open. It is an educational demonstration, not persistent storage." },
  es: { back:"← Volver al inicio", eyebrow:"LABORATORIO INTERACTIVO / 002", title:"Estructuras de datos en acción.", intro:"Cambia los valores y ejecuta operaciones para entender cómo los arrays, las pilas y las colas organizan y entregan datos.", available:"ARRAYS · PILAS · COLAS", heading:"Prueba las operaciones", treeEyebrow:"ÁRBOLES · BÚSQUEDA", treeHeading:"Explora una estructura jerárquica", note:"Esta visualización conserva los datos solo mientras la página está abierta. Es una demostración educativa, no un almacenamiento persistente." },
} as const;

export default async function DataStructuresPage({ params }: Props) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale = rawLocale;
  const m = copy[locale];
  return <main className="lab-page shell" lang={locale === "pt-br" ? "pt-BR" : locale}>
    <div className="localized-lab-header"><Link className="back-link" href={`/${locale}`}>{m.back}</Link><div className="header-actions"><LanguageSwitcher locale={locale}/><ThemeToggle/></div></div>
    <div className="eyebrow">{m.eyebrow}</div><h1 className="lab-page-title">{m.title}</h1>
    <p className="lab-page-intro">{m.intro}</p><div className="eyebrow">{m.available}</div><h2>{m.heading}</h2>
    <DataStructuresLab locale={locale}/>
    <div className="eyebrow">{m.treeEyebrow}</div><h2>{m.treeHeading}</h2>
    <BinarySearchTreeLab locale={locale}/>
    <p className="lab-footnote">{m.note}</p>
  </main>;
}

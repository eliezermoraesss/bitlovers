import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import "./i18n.css";
import "./structures.css";
import { ThemeProvider } from "@/components/theme-provider";

export const metadata: Metadata = {
  title: {
    default: "BitLovers — Entenda. Visualize. Experimente.",
    template: "%s | BitLovers",
  },
  description:
    "Aprenda algoritmos, complexidade computacional e estruturas de dados com explicações claras e laboratórios interativos.",
  applicationName: "BitLovers",
  openGraph: {
    title: "BitLovers",
    description: "Entenda a tecnologia. Visualize os conceitos. Aprenda fazendo.",
    type: "website",
    locale: "pt_BR",
  },
};

export const viewport: Viewport = {
  themeColor: "#10131b",
  colorScheme: "dark light",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body><ThemeProvider>{children}</ThemeProvider></body>
    </html>
  );
}

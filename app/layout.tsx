import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "BitLovers — Entenda. Visualize. Experimente.",
    template: "%s | BitLovers",
  },
  description:
    "Aprenda algoritmos, complexidade computacional e estruturas de dados com explicações claras e laboratórios interativos.",
  applicationName: "BitLovers",
  metadataBase: new URL("https://bitlovers.vercel.app"),
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
      <body>{children}</body>
    </html>
  );
}

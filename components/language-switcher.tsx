"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { localeNames, locales, type Locale } from "@/lib/i18n";

export default function LanguageSwitcher({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const suffix = pathname.replace(/^\/(pt-br|en|es)(?=\/|$)/, "") || "";
  return (
    <nav className="language-switcher" aria-label="Language selector">
      {locales.map((option) => (
        <Link
          key={option}
          href={`/${option}${suffix}`}
          lang={option === "pt-br" ? "pt-BR" : option}
          aria-current={option === locale ? "page" : undefined}
          className={option === locale ? "language-option active" : "language-option"}
        >
          {option === "pt-br" ? "PT" : option.toUpperCase()}
          <span className="sr-only"> — {localeNames[option]}</span>
        </Link>
      ))}
    </nav>
  );
}

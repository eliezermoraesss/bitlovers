"use client";

import { useThemePreference, type ThemePreference } from "./theme-provider";

const options: { value: ThemePreference; label: string; symbol: string }[] = [
  { value: "light", label: "Claro", symbol: "☼" },
  { value: "dark", label: "Escuro", symbol: "◐" },
  { value: "system", label: "Sistema", symbol: "◑" },
];

export default function ThemeToggle() {
  const { theme, setTheme } = useThemePreference();
  const current = options.find((option) => option.value === theme) ?? options[2];

  function cycleTheme() {
    const index = options.findIndex((option) => option.value === theme);
    setTheme(options[(index + 1) % options.length].value);
  }

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={cycleTheme}
      aria-label={`Tema atual: ${current.label}. Alterar tema.`}
      title={`Tema: ${current.label} (clique para alterar)`}
    >
      <span aria-hidden="true">{current.symbol}</span>
      <span className="theme-toggle-label">{current.label}</span>
    </button>
  );
}

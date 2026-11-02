import type { Metadata } from "next";
import Link from "next/link";
import ComplexityLab from "./lab-client";

export const metadata: Metadata = {
  title: "Laboratório de complexidade",
  description: "Compare funções de crescimento assintótico e experimente diferentes tamanhos de entrada e escalas.",
};

export default function ComplexityPage() {
  return (
    <main className="lab-page shell">
      <Link className="back-link" href="/">← Voltar para o início</Link>
      <div className="eyebrow">LABORATÓRIO INTERATIVO / 001</div>
      <h1 className="lab-page-title">Explore o crescimento.<br /><span>Faça perguntas aos dados.</span></h1>
      <p className="lab-page-intro">Altere o tamanho da entrada, escolha as funções e compare estimativas matemáticas. Observe como a escala do gráfico muda o que você consegue enxergar.</p>
      <ComplexityLab />
      <section className="lab-explainer">
        <div><span className="eyebrow">COMO INTERPRETAR</span><h2>O que este laboratório mostra?</h2></div>
        <div>
          <p><strong>Complexidade assintótica</strong> descreve como o custo de um algoritmo cresce em função do tamanho da entrada, abstraindo detalhes como hardware e constantes específicas.</p>
          <p><strong>A escala linear</strong> representa diferenças numéricas diretamente. Quando uma função fatorial ou exponencial cresce muito, as demais podem parecer quase planas.</p>
          <p><strong>A escala logarítmica</strong> transforma multiplicações em somas e facilita observar ordens de grandeza diferentes. Ela altera a representação visual, não a função original.</p>
          <p><strong>Importante:</strong> O(1), O(log n) e outras notações descrevem classes de crescimento, não uma previsão universal de segundos ou de operações exatas. Os valores exibidos são funções de referência didáticas.</p>
        </div>
      </section>
    </main>
  );
}

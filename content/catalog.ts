export type LearningContent = {
  slug: string;
  title: string;
  category: "complexity" | "data-structures" | "algorithms";
  summary: string;
  level: "Iniciante" | "Intermediário";
  status: "available" | "planned";
  tags: string[];
};

export const learningCatalog: LearningContent[] = [
  {
    slug: "complexidade",
    title: "Complexidade computacional",
    category: "complexity",
    summary: "Entenda como o custo de um algoritmo cresce conforme a entrada aumenta.",
    level: "Iniciante",
    status: "available",
    tags: ["Big O", "análise assintótica", "eficiência"],
  },
  {
    slug: "arrays",
    title: "Arrays e vetores",
    category: "data-structures",
    summary: "Explore índices, acesso direto, inserção e limites da estrutura.",
    level: "Iniciante",
    status: "available",
    tags: ["array", "vetor", "memória"],
  },
  {
    slug: "pilhas-e-filas",
    title: "Pilhas e filas",
    category: "data-structures",
    summary: "Compare LIFO e FIFO com operações e exemplos cotidianos.",
    level: "Iniciante",
    status: "planned",
    tags: ["stack", "queue", "LIFO", "FIFO"],
  },
  {
    slug: "busca-linear-e-binaria",
    title: "Busca linear e binária",
    category: "algorithms",
    summary: "Compare estratégias de busca e entenda o pré-requisito da busca binária.",
    level: "Iniciante",
    status: "planned",
    tags: ["busca", "algoritmos", "ordenação"],
  },
];

export const categoryLabels = {
  complexity: "Complexidade",
  "data-structures": "Estruturas de dados",
  algorithms: "Algoritmos",
} as const;

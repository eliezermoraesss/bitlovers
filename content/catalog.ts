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
    summary: "Execute push, pop, enqueue e dequeue e compare LIFO com FIFO.",
    level: "Iniciante",
    status: "available",
    tags: ["stack", "queue", "LIFO", "FIFO"],
  },
  {
    slug: "arvores-binarias",
    title: "Árvores binárias de busca",
    category: "data-structures",
    summary: "Insira, busque e remova nós; explore a hierarquia e o percurso em ordem.",
    level: "Intermediário",
    status: "available",
    tags: ["árvore", "BST", "nós", "percurso em ordem"],
  },
  {
    slug: "busca-linear-e-binaria",
    title: "Busca linear e binária",
    category: "algorithms",
    summary: "Compare estratégias de busca e entenda o pré-requisito da busca binária.",
    level: "Iniciante",
    status: "available",
    tags: ["busca", "algoritmos", "ordenação", "busca linear", "busca binária"],
  },
];

export const categoryLabels = {
  complexity: "Complexidade",
  "data-structures": "Estruturas de dados",
  algorithms: "Algoritmos",
} as const;

export type ComplexityId =
  | "constant"
  | "logarithmic"
  | "linear"
  | "linearithmic"
  | "quadratic"
  | "cubic"
  | "exponential"
  | "factorial";

export type ComplexityFunction = {
  id: ComplexityId;
  label: string;
  formula: string;
  description: string;
  color: string;
  calculate: (n: number) => number;
};

const factorial = (n: number): number => {
  let result = 1;
  for (let i = 2; i <= Math.floor(n); i += 1) result *= i;
  return result;
};

export const complexityFunctions: ComplexityFunction[] = [
  { id: "constant", label: "Constante", formula: "O(1)", description: "O custo não cresce com n.", color: "#58d6a5", calculate: () => 1 },
  { id: "logarithmic", label: "Logarítmica", formula: "O(log n)", description: "Cresce lentamente ao reduzir o problema por fatores.", color: "#73b7ff", calculate: (n) => Math.log2(Math.max(1, n)) },
  { id: "linear", label: "Linear", formula: "O(n)", description: "O custo cresce proporcionalmente ao tamanho da entrada.", color: "#f5c66b", calculate: (n) => n },
  { id: "linearithmic", label: "Linearítmica", formula: "O(n log n)", description: "Comum em algoritmos eficientes de ordenação por comparação.", color: "#ff9e70", calculate: (n) => n * Math.log2(Math.max(1, n)) },
  { id: "quadratic", label: "Quadrática", formula: "O(n²)", description: "O custo cresce com o quadrado da entrada.", color: "#d9a2ff", calculate: (n) => n ** 2 },
  { id: "cubic", label: "Cúbica", formula: "O(n³)", description: "O custo cresce com o cubo da entrada.", color: "#ff8fa3", calculate: (n) => n ** 3 },
  { id: "exponential", label: "Exponencial", formula: "O(2ⁿ)", description: "O crescimento pode tornar entradas modestas inviáveis.", color: "#8fe1e8", calculate: (n) => 2 ** n },
  { id: "factorial", label: "Fatorial", formula: "O(n!)", description: "O número de combinações cresce extremamente rápido.", color: "#f48bda", calculate: factorial },
];

export function estimateOperations(id: ComplexityId, n: number): number {
  const fn = complexityFunctions.find((item) => item.id === id);
  if (!fn) throw new Error(`Complexidade desconhecida: ${id}`);
  if (!Number.isFinite(n) || n < 1) throw new RangeError("n deve ser um número finito maior ou igual a 1.");
  return fn.calculate(Math.floor(n));
}

# BitLovers

> Entenda a tecnologia. Visualize os conceitos. Aprenda fazendo.

BitLovers é uma plataforma educacional aberta para explorar algoritmos, complexidade computacional e estruturas de dados por meio de explicações claras, experimentos e visualizações interativas.

## Objetivo da primeira versão

Entregar uma fundação sólida, acessível e extensível para:
- explorar conceitos de ciência da computação;
- comparar funções de crescimento assintótico;
- experimentar operações de estruturas de dados;
- estudar implementações de algoritmos;
- acompanhar favoritos e progresso localmente.

O projeto será desenvolvido em etapas. Recursos planejados não serão descritos como concluídos antes de serem implementados e validados.

## Stack planejada

- Next.js App Router e React
- TypeScript
- Tailwind CSS
- Vitest e Testing Library
- Playwright para testes ponta a ponta
- Vercel para deploy

As versões finais das dependências devem ser confirmadas e fixadas no momento da instalação.

## Executar localmente

Requisitos: Node.js 20.9 ou superior e npm.

```bash
npm install
npm run dev
```

Abra http://localhost:3000.

## Qualidade

```bash
npm run lint
npm run test
npm run build
```

Os comandos estarão disponíveis conforme as respectivas ferramentas forem configuradas nas etapas iniciais.

## Princípios de engenharia

- Conteúdo educacional separado da interface.
- Instrumentação que representa operações reais dos algoritmos.
- Componentes acessíveis e responsivos.
- Estimativas matemáticas claramente diferenciadas de benchmarks reais.
- Sem autenticação ou backend obrigatório para consultar conteúdo público.
- Sem execução de código arbitrário do usuário no servidor.

## Roadmap

1. Fundação da aplicação, layout, tema e internacionalização.
2. Complexidade computacional e laboratório de Big O.
3. Estruturas de dados com visualizações interativas.
4. Algoritmos de busca, ordenação e recursividade.
5. Trilhas, exercícios, favoritos, progresso e glossário.
6. Expansão para novos temas conforme a necessidade.

## Contribuição

Issues e pull requests são bem-vindos. Ao contribuir, priorize precisão técnica, testes para regras de domínio e documentação de decisões relevantes.

## Licença

A licença será definida explicitamente antes de aceitar contribuições externas.

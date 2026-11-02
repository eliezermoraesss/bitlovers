# BitLovers

> Entenda a tecnologia. Visualize os conceitos. Aprenda fazendo.

BitLovers é uma plataforma educacional aberta para explorar algoritmos, complexidade computacional e estruturas de dados por meio de explicações claras, experimentos e visualizações interativas.

## O que existe nesta fundação

- Página inicial responsiva com identidade visual própria.
- Preferência de tema claro, escuro ou sistema, preservada no navegador.
- Rotas localizadas para português brasileiro (`/pt-br`), inglês (`/en`) e espanhol (`/es`), incluindo o laboratório de complexidade.
- Dicionários de interface tipados e seletor de idioma acessível.
- Busca de conteúdos com rótulos e descrições localizados nas três línguas.
- Busca de conteúdos por título, resumo, categoria e palavras-chave, distinguindo conteúdos disponíveis dos planejados.
- Laboratório operacional para arrays, pilhas e filas com inserção, remoção, limpeza e estado visível.
- Árvore binária de busca interativa com inserção, pesquisa, remoção, percurso em ordem e visualização hierárquica.
- Laboratório de busca linear e binária com trilha de comparações navegável, alvo configurável e vetor editável.\n- Laboratório interativo de Bubble Sort, Selection Sort, Insertion Sort e Merge Sort com histórico de estados, comparações, escritas, complexidade e estabilidade.
- Exemplos centrais de busca em Java, Python e C#, com análise de complexidade e requisito de ordenação da busca binária.
- Testes unitários para inserção, busca, remoção, valores duplicados e percurso em ordem da BST.
- Catálogo tipado de conteúdos e indicação explícita do que está disponível ou planejado.
- Laboratório interativo para comparar oito funções clássicas de crescimento.
- Rota de algoritmos localizada em `/algoritmos`, `/en/algoritmos` e `/es/algoritmos`.
- Controle de tamanho da entrada, seleção individual de curvas e alternância entre escala linear e logarítmica.
- Valores de referência calculados matematicamente, identificados como estimativas didáticas — não benchmarks.
- Metadados básicos para SEO e compartilhamento.
- Estilos responsivos e respeito à preferência por movimento reduzido.
- Base para adicionar testes, internacionalização e persistência local nas próximas etapas.

## Stack

- Next.js App Router
- React
- TypeScript em modo estrito
- CSS próprio com variáveis de design

A configuração de dependências está em `package.json`. As versões devem ser instaladas e validadas localmente antes de considerar o build confirmado.

## Executar localmente

Requisitos: Node.js 20.9 ou superior e npm.

```bash
npm install
npm run dev
```

Abra http://localhost:3000. O laboratório de complexidade fica em `/laboratorio`, as estruturas em `/estruturas` e os algoritmos de busca em `/algoritmos` e os de ordenação em `/ordenacao`.

## Verificações disponíveis

```bash
npm run lint
npm run typecheck
npm run test
npm run build
```

Execute os comandos após instalar as dependências. Os testes unitários iniciais cobrem o catálogo de funções de crescimento, valores de referência e validação do tamanho da entrada. A validação contínua é executada pelo GitHub Actions a cada commit; consulte a aba Actions para o estado do commit mais recente.

## Arquitetura inicial

- `app/`: rotas, layout e estilos globais.
- `app/laboratorio/`: interface do laboratório de complexidade em português.
- `app/[locale]/`: páginas localizadas em pt-BR, inglês e espanhol.
- `lib/i18n.ts`: dicionários e tipos para os idiomas suportados.
- `app/i18n.css`: estilos do seletor de idioma.
- `content/catalog.ts`: metadados do catálogo educacional.
- `lib/complexity.ts`: tipos e funções matemáticas de referência.

O conteúdo e os cálculos ficam separados da camada de apresentação para facilitar testes e expansão. O gráfico de crescimento na página inicial é uma ilustração conceitual; o laboratório separado possui controles interativos reais.

## Princípios de engenharia

- Precisão técnica antes de simplificações enganosas.
- Conteúdo educacional separado da interface.
- Estimativas matemáticas claramente diferenciadas de medições reais.
- Acessibilidade e responsividade desde o início.
- Sem autenticação ou backend obrigatório para consultar conteúdo público.
- Sem execução de código arbitrário do usuário no servidor.
- Funcionalidades planejadas não são apresentadas como concluídas.

## Roadmap

1. **Fundação:** layout, navegação, tema e internacionalização.
2. **Complexidade:** ampliar explicações, testes e exemplos instrumentados.
3. **Estruturas de dados:** arrays, pilhas, filas e árvore binária de busca já possuem visualizações operacionais. Próximos módulos: mapas hash e outras árvores.
4. **Algoritmos:** busca linear e binária já possuem laboratório passo a passo e exemplos em Java, Python e C#. Próximos módulos: ordenação, recursividade e código copiável.
5. **Aprendizagem:** ampliar a cobertura de tradução do catálogo e das páginas de conteúdo, além de trilhas, exercícios, favoritos, progresso local e glossário.
6. **Expansão:** novos temas conforme a demanda.

## Deploy

A aplicação está sendo preparada para deploy na Vercel. Antes da publicação, instale as dependências e confirme lint, typecheck e build. Ainda não há URL de produção validada.

## Contribuição

Issues e pull requests são bem-vindos. Priorize precisão técnica, testes para regras de domínio e documentação de decisões relevantes.

## Licença

A licença será definida explicitamente antes de aceitar contribuições externas.

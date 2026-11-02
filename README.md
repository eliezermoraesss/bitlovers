# BitLovers

> Entenda a tecnologia. Visualize os conceitos. Aprenda fazendo.

BitLovers é uma plataforma educacional aberta para explorar algoritmos, complexidade computacional e estruturas de dados por meio de explicações claras, experimentos e visualizações interativas.

## O que existe nesta fundação

- Página inicial responsiva com identidade visual própria.
- Preferência de tema claro, escuro ou sistema, preservada no navegador.
- Busca de conteúdos por título, resumo, categoria e palavras-chave, distinguindo conteúdos disponíveis dos planejados.
- Catálogo tipado de conteúdos e indicação explícita do que está disponível ou planejado.
- Primeira rota de laboratório interativo para comparar oito funções clássicas de crescimento.
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

Abra http://localhost:3000. O laboratório inicial fica em `/laboratorio`.

## Verificações disponíveis

```bash
npm run lint
npm run typecheck
npm run test
npm run build
```

Execute os comandos após instalar as dependências. Os testes unitários iniciais cobrem o catálogo de funções de crescimento, valores de referência e validação do tamanho da entrada. A execução de todos os comandos ainda precisa ser validada em CI ou ambiente local antes de declarar a etapa aprovada.

## Arquitetura inicial

- `app/`: rotas, layout e estilos globais.
- `app/laboratorio/`: interface do laboratório de complexidade.
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
3. **Estruturas de dados:** visualizações operacionais de arrays, pilhas, filas, mapas hash e árvores.
4. **Algoritmos:** busca, ordenação, recursividade e código copiável.
5. **Aprendizagem:** internacionalização completa (pt-BR, en e es), trilhas, exercícios, favoritos, progresso local e glossário.
6. **Expansão:** novos temas conforme a demanda.

## Deploy

A aplicação está sendo preparada para deploy na Vercel. Antes da publicação, instale as dependências e confirme lint, typecheck e build. Ainda não há URL de produção validada.

## Contribuição

Issues e pull requests são bem-vindos. Priorize precisão técnica, testes para regras de domínio e documentação de decisões relevantes.

## Licença

A licença será definida explicitamente antes de aceitar contribuições externas.

# Design System

Este é o ponto de partida do design system do site. Ele documenta o que já existe, decide nomes comuns e orienta quando criar tokens, componentes e padrões.

## Objetivo

Criar uma base visual consistente para evoluir o site sem depender de estilos soltos em cada página.

O sistema deve ajudar em três coisas:

- manter a identidade visual do site público;
- manter o admin previsível e eficiente;
- reduzir repetição de classes e decisões visuais pequenas.

## Escopo

O projeto tem dois ambientes visuais:

- **Public**: site pessoal, blog, trajetória e cases. Mais editorial, escuro, com uso de gold, stone e zinc.
- **Admin**: CMS interno. Mais operacional, baseado em shadcn/ui, tokens semânticos e componentes de formulário.

Esses dois ambientes podem compartilhar fundamentos, mas não precisam ter a mesma expressão visual.

## Camadas

1. **Tokens**
   Cores, tipografia, espaçamentos, radius, bordas, sombras e movimento.

2. **Componentes**
   Peças reutilizáveis com variantes e estados claros.

3. **Padrões**
   Combinações recorrentes, como header público, seções editoriais, cards, grids de métricas e formulários do admin.

## Arquivos

- [architecture.md](./architecture.md): arquitetura de pastas e regras de implementação.
- [public.md](./public.md): fundação do design system público.
- [admin.md](./admin.md): fundação do design system do CMS.
- [roadmap.md](./roadmap.md): ordem sugerida para transformar o visual atual em sistema.

## Componentes

- [Badge](./components/badge.md)
- [Button](./components/button.md)

## Regra prática

Antes de criar um novo estilo:

1. Veja se já existe token ou componente parecido.
2. Se for repetido em duas ou mais telas, considere extrair.
3. Se for uma exceção expressiva de uma página, mantenha local.
4. Se afetar navegação, formulário, acessibilidade ou estado interativo, documente.

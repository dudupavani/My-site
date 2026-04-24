# Design System Roadmap

Este roadmap começa pequeno para transformar o visual atual em sistema sem travar a evolução do site.

## Fase 1 - Inventário e nomes

Status: iniciado.

Objetivo:

- documentar public e admin;
- nomear tokens e padrões recorrentes;
- decidir o que fica local e o que vira compartilhado.

Entregas:

- `docs/design-system/README.md`
- `docs/design-system/architecture.md`
- `docs/design-system/public.md`
- `docs/design-system/admin.md`
- `docs/design-system/roadmap.md`

## Fase 2 - Base compartilhada

Objetivo:

Preparar `src/shared/ui` para receber componentes usados em qualquer parte da aplicação.

Ordem sugerida:

1. Criar `src/shared/ui/lib/cn.ts`.
2. Criar `src/shared/ui/index.ts`.
3. Mover ou recriar primitives universais: `Button`, `Badge`, `Card`.
4. Atualizar `components.json` para apontar shadcn para `src/shared/ui`.

## Fase 3 - Primeiros componentes públicos

Objetivo:

Criar componentes pequenos em `src/shared/ui` para reduzir repetição nas páginas públicas sem prender os componentes ao public.

Ordem sugerida:

1. `Eyebrow`
2. `Section`
3. `Heading`
4. `Badge` com variante `gold`
5. `MetricGrid`

Critério de sucesso:

- cada componente substitui pelo menos dois usos reais;
- a API é simples;
- a página continua fácil de estilizar localmente.

## Fase 4 - Tokens semânticos públicos

Objetivo:

Reduzir valores hardcoded em páginas públicas.

Prioridades:

1. Trocar `#998663` por token gold.
2. Trocar `#68553C` por token gold/bronze.
3. Criar padrão para flares radiais.
4. Padronizar bordas gold translúcidas.

## Fase 5 - Documentação de componentes admin

Objetivo:

Registrar variantes, estados e uso correto dos componentes admin existentes.

Prioridade:

1. `Button`
2. `Input`
3. `Card`
4. `Badge`
5. `Table`

## Fase 6 - Aplicação gradual

Objetivo:

Refatorar por página, sem grande reescrita.

Ordem sugerida:

1. `src/modules/trajetoria/TrajetoriaPage.tsx`
2. `src/modules/cases/CasesPage.tsx`
3. `src/modules/home/sections`
4. blog público
5. admin

## Regra de evolução

Toda nova peça do design system deve ter:

- nome claro;
- exemplo real de uso;
- variantes documentadas quando existirem;
- acessibilidade considerada quando for interativa.

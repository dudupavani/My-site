# Design System Architecture

O design system deve morar em `src/shared/ui` porque os componentes precisam poder ser usados por qualquer módulo da aplicação: public, blog, trajetória, cases e admin.

## Princípio central

Componentes compartilhados não pertencem a uma feature.

Eles não devem importar de `src/modules/*` e não devem assumir que estão dentro do public ou do admin. Quando precisarem de aparência diferente, devem depender de tokens, variantes ou composição.

## Estrutura proposta

```txt
src/shared/ui/
  lib/
    cn.ts

  tokens/
    README.md

  primitives/
    Button.tsx
    IconButton.tsx
    Badge.tsx
    Input.tsx
    Textarea.tsx
    Label.tsx
    Checkbox.tsx
    Switch.tsx

  typography/
    Eyebrow.tsx
    Heading.tsx
    Text.tsx

  layout/
    Container.tsx
    Section.tsx
    Stack.tsx
    Cluster.tsx

  feedback/
    Alert.tsx
    Dialog.tsx
    AlertDialog.tsx

  data-display/
    MetricGrid.tsx
    BrandGrid.tsx
    Table.tsx

  navigation/
    PublicHeader.tsx

  icons/
    SocialIcons.tsx

  index.ts
```

## O que fica universal

Universal é tudo que pode ser usado em qualquer rota sem carregar regra de negócio:

- botões;
- badges/chips;
- inputs;
- labels;
- seções;
- containers;
- headings;
- textos;
- grids de métrica;
- dialogs;
- alertas;
- tabelas;
- ícones.

## O que não fica universal

Não entram no design system:

- chamadas de API;
- regras de autenticação;
- dados de blog;
- arrays de conteúdo de páginas;
- lógica de CMS;
- componentes que só fazem sentido em uma feature específica.

Exemplo:

- `PostEditorScreen` continua em `src/modules/blog-admin`.
- `Button` vive em `src/shared/ui/primitives` e deve ser importado pelo barrel `@/src/shared/ui`.
- Superfícies simples devem usar `div`, `section` ou `header` com classes, não um componente `Card`.

## Camadas de especificidade

### 1. Primitives

Componentes básicos, com pouca opinião de contexto.

Exemplos:

- `Button`
- `Badge`
- `Input`
- `Dialog`

Esses componentes devem usar tokens semânticos como `primary`, `secondary`, `muted`, `border`, `ring`, `destructive` e variantes.

### 2. Layout

Componentes para ritmo e estrutura.

Exemplos:

- `Container`
- `Section`
- `Stack`
- `Cluster`

Eles reduzem repetição de `max-w-*`, `px-*`, `py-*`, `gap-*` e alinhamentos.

### 3. Typography

Componentes para padrões textuais recorrentes.

Exemplos:

- `Eyebrow`
- `Heading`
- `Text`

Eles devem aceitar variantes como `page`, `section`, `card`, `hero`, `muted`, `gold`.

### 4. Data Display

Componentes de apresentação de dados.

Exemplos:

- `MetricGrid`
- `BrandGrid`
- `Table`

### 5. Navigation

Componentes de navegação compartilhados.

Exemplos:

- `PublicHeader`

Se no futuro existir navegação admin reutilizável, ela também entra aqui.

## Tokens e temas

Os tokens globais continuam em `app/globals.css`, porque Tailwind 4 já está configurado ali.

Temas de contexto continuam existindo como classes definidas em `app/globals.css`:

- `.public-theme`
- `.admin-theme`

Mas componentes compartilhados devem preferir tokens globais ou semânticos. O tema da rota decide o valor final.

## Imports

Preferir imports pelo barrel:

```tsx
import { Button, Section, Eyebrow } from "@/src/shared/ui";
```

Imports internos podem usar caminho direto dentro do design system:

```tsx
import { cn } from "@/src/shared/ui/lib/cn";
```

## Migração do admin

A biblioteca oficial do admin e do public fica em:

```txt
src/shared/ui
```

O Tailwind, os tokens e os temas de contexto ficam em:

```txt
app/globals.css
```

O admin nao deve ter CSS de tema proprio fora do global. A regra estrutural agora e:

1. Manter `app/globals.css` como unica fonte de Tailwind, tokens e temas.
2. Manter imports do admin pelo barrel `@/src/shared/ui`.
3. Criar lacunas como `Alert` e `Checkbox` em `src/shared/ui` somente quando houver uso real.
4. Nao recriar CSS de rota para temas; usar classes `.public-theme` e `.admin-theme` no global.
5. Nao adicionar shadcn/Radix sem excecao documentada.

## Migração do public

As páginas públicas devem migrar aos poucos:

1. Extrair `Eyebrow`.
2. Extrair `Section` e `Container`.
3. Extrair `Badge`/`GoldChip` como variantes de `Badge`.
4. Extrair `Heading` e `Text`.
5. Extrair `MetricGrid` e `BrandGrid`.

## Regra para criar componente

Criar componente compartilhado quando:

- aparece em duas ou mais áreas;
- tem uma decisão visual importante;
- possui variantes ou estados;
- reduz classes longas sem esconder o conteúdo.

Não criar quando:

- é uma composição única de uma página;
- ainda está em exploração visual;
- depende de dados ou regras de uma feature.

## Dependências

O design system não deve depender de shadcn ou Radix.

Preferir:

- HTML nativo;
- ARIA simples quando necessário;
- `class-variance-authority` para variantes;
- `clsx` e `tailwind-merge` via `cn`.

Se um comportamento for complexo demais para manter com segurança, ele deve ser tratado como exceção explícita e documentada antes de adicionar qualquer dependência.

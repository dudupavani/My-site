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
- `Button` deve sair de `src/modules/blog-admin/ui/components` e ir para `src/shared/ui/primitives`.
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

Temas de contexto podem continuar existindo:

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

Hoje os componentes legados do admin estão em:

```txt
src/modules/blog-admin/ui/components
```

Esse local limita reuso fora do admin e mantém a aplicação presa ao modelo shadcn/Radix. A migração ideal é:

1. Criar `src/shared/ui/lib/cn.ts`.
2. Criar componentes próprios em `src/shared/ui`, sem importar de `radix-ui`.
3. Atualizar imports do admin para `@/src/shared/ui`.
4. Manter `admin-theme.css` apenas como tema, não como dono dos componentes.
5. Remover componentes legados quando não houver mais uso.

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

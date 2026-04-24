# Admin Design System

O sistema admin cobre o CMS em `app/(admin)/admin` e os módulos de `src/modules/blog-admin`.

Aqui a prioridade é clareza operacional: formulários previsíveis, estados de carregamento, mensagens de erro, tabelas legíveis e ações bem hierarquizadas.

## Fontes de verdade atuais

- Tailwind, tokens e tema admin: `app/globals.css`
- Componentes oficiais: `src/shared/ui`
- Utils de classe: `src/shared/ui/lib/cn.ts`

## Base atual

O admin usa a biblioteca oficial em `src/shared/ui`. Os componentes legados em `src/modules/blog-admin/ui/components` ja foram removidos:

- tokens CSS semanticos;
- componentes compartilhados;
- variantes com `class-variance-authority`;
- suporte a tema escuro em `.admin-theme.dark`.

## Tokens

Tokens principais:

| Token | Uso |
| --- | --- |
| `--background` | Fundo do admin |
| `--foreground` | Texto principal |
| `--card` | Superfícies |
| `--primary` | Ação primária |
| `--secondary` | Ações secundárias e superfícies neutras |
| `--muted` | Áreas de menor destaque |
| `--destructive` | Erros e ações destrutivas |
| `--border` | Bordas de componentes |
| `--input` | Campos de formulário |
| `--ring` | Foco |
| `--radius` | Raio base |

Tokens específicos atuais:

| Token | Uso |
| --- | --- |
| `--font-sans` | Tipografia do admin |
| `--font-serif` | Tipografia serifada eventual |
| `--primary-light`, `--primary-dark`, `--primary-ring` | Variações de destaque |
| `--success` | Estados positivos |
| `--editor-min-height` | Altura mínima do editor |

## Componentes existentes

| Componente | Status |
| --- | --- |
| `Button` | Oficial em `src/shared/ui` |
| `Input`, `Textarea`, `Label` | Oficiais em `src/shared/ui` |
| `Switch`, `Toggle` | Oficiais em `src/shared/ui` |
| `Dialog`, `AlertDialog` | Oficiais em `src/shared/ui` |
| `Table` | Oficial em `src/shared/ui` |
| `Badge` | Oficial em `src/shared/ui` |
| `Checkbox`, `Alert` | Ainda nao migrados; criar em `src/shared/ui` somente quando houver uso real |

## Próximas melhorias

1. Documentar variantes reais de `Button`, `Badge`, `Input` e `Table`.
2. Padronizar estados vazios, loading e erro nas telas admin.
3. Criar padrões de formulário: campo com label, ajuda, erro e ação.
4. Verificar visualmente os fluxos admin depois de mudanças de tema ou componentes.

## Diretriz

No admin, preferir componentes próprios de `src/shared/ui`. Evitar estilos muito expressivos ou específicos por tela quando o problema for operacional.

## Direção de migração

O objetivo é manter o design system sem dependência conceitual de shadcn/Radix.

- `Button`, `Badge`, `Input`, `Textarea`, `Table`, `Label`, `Switch`, `Toggle`, `Dialog` e `AlertDialog` ja estao em `src/shared/ui`.
- `Checkbox` pode usar `input type="checkbox"` quando for necessario.
- `Alert` deve ser criado em `src/shared/ui/feedback` quando houver uso real.
- O admin deve depender apenas de `app/globals.css` para Tailwind/tokens e de `src/shared/ui` para componentes.

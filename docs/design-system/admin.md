# Admin Design System

O sistema admin cobre o CMS em `app/(admin)/admin` e os módulos de `src/modules/blog-admin`.

Aqui a prioridade é clareza operacional: formulários previsíveis, estados de carregamento, mensagens de erro, tabelas legíveis e ações bem hierarquizadas.

## Fontes de verdade atuais

- Tema admin: `src/modules/blog-admin/ui/admin-theme.css`
- Componentes legados do admin: `src/modules/blog-admin/ui/components`
- Utils de classe: `src/modules/blog-admin/ui/lib/utils.ts`
- Config shadcn: `components.json`

## Base atual

O admin já tem um começo mais estruturado que o public, mas ainda usa componentes legados baseados no estilo shadcn/Radix:

- tokens CSS semânticos;
- componentes locais;
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
| `Button` | Tem variantes e tamanhos |
| `Input`, `Textarea`, `Label` | Base de formulário |
| `Switch`, `Toggle`, `Checkbox` | Controles |
| `Dialog`, `AlertDialog`, `Alert` | Feedback e confirmação |
| `Table` | Listagem |
| `Badge` | Rótulos |

## Próximas melhorias

1. Documentar variantes reais de `Button`, `Badge`, `Input` e `Table`.
2. Padronizar estados vazios, loading e erro nas telas admin.
3. Criar padrões de formulário: campo com label, ajuda, erro e ação.
4. Garantir que rotas admin usem sempre componentes locais do admin.

## Diretriz

No admin, preferir componentes próprios de `src/shared/ui`. Evitar estilos muito expressivos ou específicos por tela quando o problema for operacional.

## Direção de migração

O objetivo é remover a dependência conceitual de shadcn/Radix no design system.

- `Button`, `Badge`, `Input`, `Textarea`, `Table` e `Alert` devem ser componentes próprios simples.
- `Label` pode ser um `label` nativo.
- `Checkbox` pode usar `input type="checkbox"`.
- `Switch` pode ser um `button` com `role="switch"` e `aria-checked`.
- `Toggle` pode ser um `button` com `aria-pressed`.
- `Dialog` e `AlertDialog` devem ser avaliados com cuidado: usar `<dialog>` nativo se atender bem aos fluxos do admin.

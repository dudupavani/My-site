# Admin Design System

O sistema admin cobre o CMS em `app/(admin)/admin` e os módulos de `src/modules/blog-admin`.

Aqui a prioridade é clareza operacional: formulários previsíveis, estados de carregamento, mensagens de erro, tabelas legíveis e ações bem hierarquizadas.

## Fontes de verdade atuais

- Tema admin: `src/modules/blog-admin/ui/admin-theme.css`
- Componentes shadcn: `src/modules/blog-admin/ui/components`
- Utils de classe: `src/modules/blog-admin/ui/lib/utils.ts`
- Config shadcn: `components.json`

## Base atual

O admin já tem um começo mais estruturado que o public:

- tokens CSS semânticos;
- componentes shadcn locais;
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
| `Card` | Base de superfície |
| `Input`, `Textarea`, `Label` | Base de formulário |
| `Switch`, `Toggle`, `Checkbox` | Controles |
| `Dialog`, `AlertDialog`, `Alert` | Feedback e confirmação |
| `Table` | Listagem |
| `Badge` | Rótulos |

## Próximas melhorias

1. Documentar variantes reais de `Button`, `Badge`, `Card`, `Input` e `Table`.
2. Padronizar estados vazios, loading e erro nas telas admin.
3. Criar padrões de formulário: campo com label, ajuda, erro e ação.
4. Garantir que rotas admin usem sempre componentes locais do admin.

## Diretriz

No admin, preferir componentes shadcn locais. Evitar estilos muito expressivos ou específicos por tela quando o problema for operacional.

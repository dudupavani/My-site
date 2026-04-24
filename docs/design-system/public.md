# Public Design System

O sistema público cobre home, trajetória, cases, blog e páginas institucionais. Ele deve preservar uma estética editorial, premium e pessoal: fundos escuros, contraste alto, tipografia leve e detalhes em gold.

## Fontes de verdade atuais

- Tailwind, tokens e tema público editorial: `app/globals.css`
- Header público: `src/shared/ui/PublicHeader.tsx`
- Ícones sociais: `src/shared/ui/icons/SocialIcons.tsx`
- Páginas com padrões visuais fortes:
  - `src/modules/home/sections`
  - `src/modules/cases/CasesPage.tsx`
  - `src/modules/trajetoria/TrajetoriaPage.tsx`

## Identidade visual

### Cores

Tokens globais já disponíveis:

| Token | Uso |
| --- | --- |
| `gold-50` a `gold-950` | Acentos premium, detalhes de timeline, chips, bordas especiais |
| `zinc-*` | Fundo escuro, texto neutro, divisórias |
| `stone-*` | Apoio editorial e elementos do header/home |
| `primary`, `secondary`, `muted`, `accent` | Tokens semânticos globais definidos em `app/globals.css` |

Valores recorrentes que devem virar token ou classe utilitária:

| Valor atual | Onde aparece | Recomendação |
| --- | --- | --- |
| `#998663` | home, cases, trajetória | Usar `gold-500` ou criar alias semântico `brand-gold` |
| `#68553C` | hero/home | Usar `gold-700` ou alias `brand-bronze` |
| `rgba(153,134,99,...)` | flares, bordas, sombras | Criar padrões `GoldFlare`, `gold-border`, `gold-shadow` |
| `#030305` | seções escuras | Padronizar como fundo profundo público |

### Tipografia

Padrões recorrentes:

| Padrão | Uso |
| --- | --- |
| Títulos grandes, peso leve, tracking levemente negativo | Heroes, CTAs, títulos de timeline |
| Eyebrows uppercase com tracking alto | Rótulos, períodos, marcadores de seção |
| Corpo leve com `leading` amplo | Textos editoriais e narrativos |

Decisão inicial:

- Usar tamanhos Tailwind quando possível.
- Criar componentes para padrões repetidos, em vez de repetir `text-[...]`, `tracking-[...]` e `leading-[...]` em toda tela.

### Layout

Padrões públicos a preservar:

- Seções com `max-w-7xl`, `px-6 sm:px-8 lg:px-16`.
- Fundos escuros full-width.
- Cards discretos, geralmente com borda baixa e fundo translúcido.
- Espaçamento vertical amplo em páginas narrativas.

## Componentes candidatos

Prioridade alta:

| Componente | Por que criar |
| --- | --- |
| `PublicSection` | Centraliza largura, padding e ritmo vertical |
| `Eyebrow` | O padrão uppercase com tracking alto se repete muito |
| `GoldChip` | Chips aparecem em cases e trajetória |
| `EditorialTitle` | Títulos leves com escala responsiva |
| `MetricGrid` | Métricas aparecem em cases e trajetória |

Prioridade média:

| Componente | Por que criar |
| --- | --- |
| `GoldFlare` | Gradientes radiais gold aparecem em mais de uma página |
| `BrandGrid` | Lista de marcas pode ser reaproveitada em cases/trajetória |
| `TimelineItem` | Só vale extrair se a timeline crescer ou aparecer em outra página |

## Diretriz de extração

Extraia para `src/shared/ui` quando:

- aparecer em pelo menos duas áreas públicas;
- carregar uma decisão visual do sistema;
- tiver estados ou variantes;
- reduzir classes longas sem esconder conteúdo importante.

Mantenha local quando:

- for uma composição única de uma página;
- depender muito do texto daquela seção;
- for uma experimentação visual ainda instável.

## Primeiro padrão recomendado

Começar por `Eyebrow`, `GoldChip` e `PublicSection`.

Esses três componentes reduzem repetição sem engessar a direção criativa das páginas.

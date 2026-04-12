# Eduardo Pavani — Site + Blog

Site pessoal com blog e painel CMS. Next.js 16 App Router + Supabase + TypeScript.

## Stack

- **Framework**: Next.js 16 (App Router, Server Components por padrão)
- **Linguagem**: TypeScript 5 strict
- **Banco**: Supabase (PostgreSQL) — sem ORM, queries via `@supabase/supabase-js`
- **Estilo**: Tailwind CSS 4 + shadcn/ui (admin)
- **Ícones**: `lucide-react` (nunca `data-lucide` + script CDN)
- **Editor rich text**: CKEditor 5 Classic (blog admin)
- **Package manager**: pnpm

## Estrutura

```
app/                    # Roteamento e composição apenas — sem lógica
  (public)/             # Rotas públicas (home, blog)
  (admin)/admin/        # Painel CMS
  api/admin/            # API REST do admin
  robots.txt            # Servido em /robots.txt
  sitemap.ts            # Sitemap dinâmico gerado do Supabase (revalidate 3600)

src/
  modules/
    home/               # Seções da landing page (JSX puro, sem dangerouslySetInnerHTML)
      icons.tsx         # WhatsAppIcon, LinkedInIcon, InstagramIcon
      sections/         # HeroSection, ProductThinkingSection, etc.
    blog/               # Leitura pública
      domain/post.ts    # Tipos: BlogPostSummary, BlogPostDetail
      server/queries.ts # listPublishedPosts(), getPublishedPostBySlug()
      ui/               # BlogListPage (com paginação), BlogPostPage
    blog-admin/         # CMS (CRUD completo)
      server/           # posts.ts, categories.ts, helpers.ts, errors.ts
      ui/               # PostEditorScreen, CoverImageCropper, RichTextEditor, etc.
  shared/
    api/blogAdmin.ts    # Cliente HTTP browser → /api/admin/*
    server/
      supabase.ts       # getSupabaseAdminClient(), getBlogCoverBucketName(), getSignedUrlTtlSeconds()
      adminAuth.ts      # enforceAdminAccess(request) — chame em toda API route admin
      blogAdmin.ts      # Helpers server-side
    types/blogAdmin.ts  # Tipos compartilhados (BlogPost, PostPayload, etc.)
    utils/              # slug.ts, format.ts

supabase/migrations/    # SQL de migrações
docs/ui-reference/      # index.html — referência visual da home (não é parte do runtime)
instrumentation.ts      # Valida env vars no startup do servidor
```

## Regras arquiteturais

**`app/` é só roteamento.** Lógica, queries e componentes vivem em `src/modules/` ou `src/shared/`.

**Toda API route admin exige autenticação.** Sempre chame `enforceAdminAccess(request)` como primeira linha do handler. Sem exceção.

**Nunca crie um novo Supabase client.** Use sempre `getSupabaseAdminClient()` de `src/shared/server/supabase.ts`.

**Não use `dangerouslySetInnerHTML` nas seções da home.** Todas já estão em JSX. `BlogPostPage` é a única exceção legítima (renderiza HTML do CKEditor).

**Não use `data-lucide` + script CDN.** Importe de `lucide-react` diretamente.

## Padrões importantes

### Signed URLs e cache
O TTL das signed URLs do Supabase é **2× o `revalidate`** das páginas do blog.
- Páginas do blog: `revalidate = 3600`
- TTL padrão: `SUPABASE_SIGNED_URL_TTL_SECONDS=7200`
- Se mudar o revalidate, mude o TTL proporcionalmente.

### Paginação do blog
`listPublishedPosts({ page, limit })` retorna `{ posts, total, totalPages, currentPage }`.
Padrão: 10 posts por página. A rota `/blog` lê `?page=` de `searchParams`.

### Admin auth modes
Configurado via `BLOG_ADMIN_AUTH_MODE`:
- `off` — sem auth (dev local apenas, **nunca em produção**)
- `supabase_jwt` — sessão Supabase via Magic Link

### Erros da API admin
Use `BlogAdminApiError` de `src/modules/blog-admin/server/errors.ts`. Respostas seguem `{ detail: string, errors?: { [field]: string } }`.

## Banco de dados

**`posts`**: `id`, `title`, `slug` (único), `content` (HTML), `source_markdown`, `status` (`draft`|`published`), `cover_image_path`, `seo_title`, `seo_description`, `created_at`, `updated_at` (trigger automático), `published_at`

**`categories`**: `id`, `name` (único case-insensitive), `created_at`

**`post_categories`**: join table `(post_id, category_id)` com cascade delete

## Comandos

```bash
pnpm dev        # Inicia com Turbopack
pnpm build      # Build de produção
pnpm typecheck  # Checa tipos sem emitir
```

## Env vars obrigatórias

```
SUPABASE_URL
SUPABASE_SERVICE_ROLE_KEY
SUPABASE_STORAGE_BUCKET_BLOG_COVERS   # padrão: blog-post-covers
SUPABASE_SIGNED_URL_TTL_SECONDS       # padrão: 7200
BLOG_ADMIN_AUTH_MODE                  # off | supabase_jwt
NEXT_PUBLIC_CKEDITOR_LICENSE_KEY      # GPL para open source
```

`instrumentation.ts` valida `SUPABASE_URL` e `SUPABASE_SERVICE_ROLE_KEY` no startup. Em produção lança erro; em dev avisa.

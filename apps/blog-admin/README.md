# Blog Admin (Next.js)

Aplicacao Next.js para administracao de posts e categorias.

## Estrutura
- `app/admin/*`: paginas de admin (App Router)
- `app/api/admin/*`: endpoints HTTP do admin
- `src/modules/blog-admin/ui/*`: telas e componentes do dominio
- `src/modules/blog-admin/server/*`: casos de uso e regras de dominio
- `src/shared/server/*`: fachada de servicos, infra e auth guard
- `src/shared/api/*`: cliente HTTP do admin
- `supabase/migrations/*`: schema SQL do modulo

## Como rodar
1. Copie `.env.example` para `.env.local`.
2. Instale dependencias: `npm install`.
3. Rode em dev: `npm run dev`.
4. Validacao: `npm run typecheck` e `npm run build`.

## Dependencias relevantes
- `next`
- `react` e `react-dom`
- `@supabase/supabase-js`
- `@ckeditor/ckeditor5-build-classic`
- `@ckeditor/ckeditor5-react`
- `image-size`

## Observacoes de integracao
- O alias `@/*` esta configurado no `tsconfig.json`.
- As rotas de API admin usam `app/api/admin/*` (Next App Router).
- As variaveis de ambiente necessarias estao em `.env.example`.

## Arquitetura de servidor (blog admin)
- `src/modules/blog-admin/server/*` concentra a logica de dominio/aplicacao:
  - `posts.ts`: casos de uso de post/publicacao/capa
  - `categories.ts`: casos de uso de categoria
  - `helpers.ts` e `errors.ts`: invariantes e erros de dominio
- `src/shared/server/blogAdmin.ts` permanece como fachada estavel para compatibilidade.

## Auth da API admin (rollout)
- Guard implementado em `src/shared/server/adminAuth.ts`.
- Modos:
  - `BLOG_ADMIN_AUTH_MODE=off` (padrao, sem impacto comportamental imediato)
  - `BLOG_ADMIN_AUTH_MODE=supabase_jwt` + `BLOG_ADMIN_ALLOWED_EMAILS`
  - `BLOG_ADMIN_AUTH_MODE=static_token` + `BLOG_ADMIN_STATIC_TOKENS`

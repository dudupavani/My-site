# Repository Guidelines

## Project Structure & Module Organization
This repository is a Next.js 16 App Router app with a public site, blog, and admin CMS.

- `app/`: routing and route composition only. Keep business logic out of this layer.
- `app/(public)`: public pages such as home and blog.
- `app/(admin)/admin`: CMS screens and auth callback routes.
- `app/api/admin`: admin API endpoints.
- `src/modules`: feature code by domain (`blog`, `blog-admin`, `home`).
- `src/shared`: shared server helpers, API clients, types, and utilities.
- `supabase/migrations`: SQL migrations.
- `docs/ui-reference`: static visual reference, not runtime code.

## Build, Test, and Development Commands
Use `pnpm` for package management.

- `rtk pnpm dev`: start local dev server on `0.0.0.0:3003`.
- `rtk pnpm build`: production build.
- `rtk pnpm start`: run the production server on port `3003`.
- `rtk pnpm typecheck`: run strict TypeScript checks with no emit.

The repo-level CLI note in `RTK.md` requires shell commands to be prefixed with `rtk`.

## Coding Style & Naming Conventions
Use TypeScript with strict mode enabled. Follow existing 2-space indentation and keep imports path-aliased via `@/*` when crossing feature boundaries.

- Put route files in `app/`; put logic, queries, and UI in `src/modules` or `src/shared`.
- Use PascalCase for React components (`PostEditorScreen.tsx`).
- Use camelCase for functions and variables.
- Keep server helpers in `src/shared/server`.
- Use `lucide-react` icons directly; do not add CDN icon scripts.

## Testing Guidelines
There is no committed Jest, Vitest, or Playwright suite yet. For now, treat `rtk pnpm typecheck` as the minimum gate and manually verify affected flows in both public and admin routes. When adding tests later, place them near the feature or under a dedicated `tests/` folder and name them `*.test.ts` or `*.test.tsx`.

## Commit & Pull Request Guidelines
Recent Git history is inconsistent, so prefer clear imperative commit messages going forward, ideally Conventional Commit style such as `feat(blog-admin): add category deletion guard`.

PRs should include:

- a short problem/solution summary
- linked issue or plan when applicable
- screenshots or recordings for UI changes
- notes for env vars, migrations, or auth changes

## Architecture & Configuration Notes
Admin API handlers must call `enforceAdminAccess(request)` first. Do not instantiate new Supabase clients; use `getSupabaseAdminClient()` from `src/shared/server/supabase.ts`. Keep `SUPABASE_SIGNED_URL_TTL_SECONDS` aligned at roughly 2x the blog page `revalidate` window.

## Contexto

Esta etapa cobre a área administrativa real em `/admin/posts`. Ela garante que a rota só seja renderizada após validação server-side da sessão e que acessos sem autenticação retornem para `/admin`.

## Objetivo da etapa

Proteger `/admin/posts` e qualquer conteúdo administrativo relacionado, usando validação de sessão no servidor como source of truth antes de renderizar conteúdo protegido.

## Relação com o todo

Mesmo com login funcionando, a feature ainda estaria insegura sem proteção efetiva da rota final. Esta etapa materializa a área admin protegida definida pela spec.

## Escopo

- Bloquear acesso não autenticado a `/admin/posts`.
- Redirecionar tentativas não autenticadas para `/admin`.
- Permitir acesso quando a sessão for válida.
- Validar autenticação no servidor antes da renderização.
- Preservar políticas RLS existentes sem afrouxamento caso a página use dados protegidos do Supabase.

## Não pode quebrar

- Rule 2: `/admin/posts` must not be publicly accessible.
- Rule 8: Protected admin content must depend on verified session state, not only client-side UI state.
- Rule 11: Public blog pages must remain unaffected.
- `/admin/posts` must not be accessible without authentication
- Existing RLS policies must not be relaxed
- Route protection must not depend exclusively on client-side state
- WHEN an unauthenticated user navigates directly to `/admin/posts` THE SYSTEM SHALL prevent access to protected content
- WHEN an unauthenticated user tries to access `/admin/posts` THE SYSTEM SHALL return the user to `/admin`
- WHEN an authenticated user navigates to `/admin/posts` THE SYSTEM SHALL allow access
- WHEN the server evaluates access to `/admin/posts` THE SYSTEM SHALL validate authentication before rendering protected content
- WHEN a protected admin route is requested THE SYSTEM SHALL validate the authenticated session on the server
- WHEN no valid session exists THE SYSTEM SHALL not render protected admin content
- IF client-side auth state is stale WHEN the server evaluates the request THE SYSTEM SHALL rely on server-side auth state as the source of truth
- Session expires while using `/admin/posts` -> Block protected access and return user to `/admin`
- Public blog visitor browses non-admin pages -> Public pages continue working unchanged
- If admin content data is stored in Supabase tables protected by RLS, policies must continue to require authenticated access and must not be relaxed for anonymous users.

### Referências externas desta etapa

- Supabase authenticated session state
- Existing Supabase RLS policies, when `/admin/posts` depends on Supabase-protected data

## Resultado esperado

`/admin/posts` passa a ser a única área administrativa autenticada, inacessível publicamente e sempre controlada por validação server-side da sessão.

## Critérios de aceite

- Navegar diretamente para `/admin/posts` sem sessão redireciona para `/admin`.
- Navegar para `/admin/posts` com sessão válida permite acesso.
- O servidor valida a sessão antes de renderizar qualquer conteúdo protegido.
- Sessões expiradas deixam de autorizar a rota e devolvem o usuário para `/admin`.
- Nenhuma rota pública do blog sofre regressão.

## Dependências

- `03-auth-callback-and-failure-recovery.md`

## Rastreabilidade

- `User Stories > Story 4: Protect admin posts route`
- `User Stories > Story 6: Preserve security through server-side validation`
- `Business Rules > Rule 2, Rule 8, Rule 11`
- `Technical Design > Architecture Overview` passos 11 e 12
- `API / Server Actions > Render /admin/posts, Unauthenticated admin access handler`
- `Component Map > ProtectedAdminGuard, AdminPostsPage`
- `RLS Policies`
- `Constraints`
- `Validation Checklist` itens sobre `/admin/posts` redirect, server-side protection e public pages

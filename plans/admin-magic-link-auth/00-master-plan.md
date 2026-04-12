# Master Plan — Admin Magic Link Authentication

## Resumo da feature

Adicionar um fluxo simples e seguro de autenticação para a área administrativa do blog usando Supabase Magic Link. A rota `/admin` passa a ser a tela de entrada de login, e `/admin/posts` passa a ser a área administrativa protegida acessível apenas após autenticação bem-sucedida do único usuário admin pré-criado no Supabase.

## Objetivo geral

Entregar autenticação passwordless por Magic Link para o admin, com proteção server-side das rotas administrativas, redirecionamentos corretos, logout explícito e tratamento seguro para links inválidos, expirados ou já utilizados.

## Resultado final esperado

- `/admin` exibe a tela de login quando não há sessão válida.
- `/admin` redireciona automaticamente para `/admin/posts` quando há sessão válida.
- Apenas o email do usuário admin manualmente pré-criado pode solicitar e concluir o login.
- O fluxo usa exclusivamente Supabase Magic Link, sem criar usuários desconhecidos.
- `/admin/posts` só renderiza com sessão validada no servidor.
- Logout encerra a sessão e devolve o usuário para `/admin`.
- Links inválidos, expirados ou já usados falham com segurança e exigem nova tentativa.
- As páginas públicas do blog continuam funcionando sem regressão.

## Etapas sequenciais

1. `01-admin-entry-login-screen.md` — transformar `/admin` em ponto de entrada de login com gate inicial de sessão.
2. `02-magic-link-request.md` — permitir solicitação de Magic Link apenas para o email admin permitido.
3. `03-auth-callback-and-failure-recovery.md` — completar callback, criar sessão válida e tratar falhas seguras.
4. `04-protected-admin-posts-access.md` — proteger `/admin/posts` com validação server-side antes da renderização.
5. `05-admin-logout.md` — disponibilizar logout explícito e bloquear novo acesso após término da sessão.
6. `06-security-hardening-and-regression-validation.md` — consolidar regras de segurança, edge cases e validação final sem afetar rotas públicas.

## Dependência entre etapas

- Etapa 1 é a base de entrada da feature.
- Etapa 2 depende da Etapa 1 para usar a tela de login e seus estados.
- Etapa 3 depende da Etapa 2 porque fecha o ciclo do Magic Link solicitado.
- Etapa 4 depende da Etapa 3 para que a sessão validada possa liberar `/admin/posts`.
- Etapa 5 depende da Etapa 4 porque o logout existe dentro da área protegida.
- Etapa 6 depende das Etapas 1 a 5 para validar o comportamento completo e assegurar que nenhuma regra global foi violada.

## Requisitos críticos completos

### Regras obrigatórias da spec original

- Rule 1: `/admin` is the login entry page, not the final admin destination.
- Rule 2: `/admin/posts` must not be publicly accessible.
- Rule 3: Only the single manually pre-created Supabase user may authenticate in V1.
- Rule 4: The authentication flow must use Supabase Magic Link only.
- Rule 5: Authentication must not auto-create unknown users.
- Rule 6: Successful login must end at `/admin/posts`.
- Rule 7: Authenticated users visiting `/admin` must be redirected automatically to `/admin/posts`.
- Rule 8: Protected admin content must depend on verified session state, not only client-side UI state.
- Rule 9: Invalid, expired, or already-used Magic Links must fail safely and require a new login attempt.
- Rule 10: `/admin/posts` must provide an explicit logout action.
- Rule 11: Public blog pages must remain unaffected.

### Restrições non-negotiable

- `/admin` must become the login entry page
- `/admin/posts` must not be accessible without authentication
- Existing public blog routes must remain unaffected
- Supabase Auth must not auto-create new users for unknown emails
- Existing RLS policies must not be relaxed
- No password flow should be introduced in V1
- No breaking changes to existing public blog navigation
- Route protection must not depend exclusively on client-side state
- The current post-login destination must remain `/admin/posts`
- Logout must be explicit and available from `/admin/posts`
- Invalid or expired login links must fail safely without leaking technical details

### Instruções obrigatórias de execução e comportamento

- WHEN a user navigates to `/admin` THE SYSTEM SHALL display the admin login screen with an email input
- WHEN an unauthenticated user opens `/admin` THE SYSTEM SHALL not show protected admin content
- WHEN an authenticated user opens `/admin` THE SYSTEM SHALL redirect the user to `/admin/posts`
- WHEN the login screen is displayed THE SYSTEM SHALL show an email input and a submit action to request a Magic Link
- WHEN the allowed email is submitted THE SYSTEM SHALL request a Magic Link from Supabase
- WHEN requesting the Magic Link THE SYSTEM SHALL prevent automatic sign-up for unknown users
- WHEN the Magic Link request succeeds THE SYSTEM SHALL show a confirmation message without exposing sensitive account details
- WHEN an email outside the allowed pre-created account is submitted THE SYSTEM SHALL not grant access
- IF the request fails WHEN the user submits the form THE SYSTEM SHALL show a recoverable error message
- WHEN the user clicks a valid Magic Link THE SYSTEM SHALL establish an authenticated session
- WHEN authentication completes successfully THE SYSTEM SHALL redirect the user to `/admin/posts`
- IF the Magic Link is invalid, expired, or already used WHEN the user returns to the app THE SYSTEM SHALL not create a session
- IF the Magic Link is invalid, expired, or already used WHEN the auth flow fails THE SYSTEM SHALL return the user to `/admin`
- IF the Magic Link is invalid, expired, or already used WHEN the login screen is shown again THE SYSTEM SHALL display a safe message instructing the user to request a new Magic Link
- WHEN an unauthenticated user navigates directly to `/admin/posts` THE SYSTEM SHALL prevent access to protected content
- WHEN an unauthenticated user tries to access `/admin/posts` THE SYSTEM SHALL return the user to `/admin`
- WHEN an authenticated user navigates to `/admin/posts` THE SYSTEM SHALL allow access
- WHEN the server evaluates access to `/admin/posts` THE SYSTEM SHALL validate authentication before rendering protected content
- WHEN an authenticated user is on `/admin/posts` THE SYSTEM SHALL display a logout action
- WHEN the user clicks logout THE SYSTEM SHALL terminate the authenticated session
- WHEN logout completes THE SYSTEM SHALL redirect the user to `/admin`
- WHEN the session is terminated THE SYSTEM SHALL block further access to protected admin pages until a new login occurs
- WHEN a protected admin route is requested THE SYSTEM SHALL validate the authenticated session on the server
- WHEN no valid session exists THE SYSTEM SHALL not render protected admin content
- IF client-side auth state is stale WHEN the server evaluates the request THE SYSTEM SHALL rely on server-side auth state as the source of truth

### Regras de permissão e acesso

- Only the single manually pre-created Supabase user may authenticate in V1.
- `/admin/posts` must not be publicly accessible.
- Protected admin content must depend on verified session state, not only client-side UI state.
- Route protection must not depend exclusively on client-side state.
- Existing RLS policies must not be relaxed.
- If admin content data is stored in Supabase tables protected by RLS, policies must continue to require authenticated access and must not be relaxed for anonymous users.

### Regras de UI e feedback

- `/admin` shows the login screen with email input for unauthenticated access.
- `/admin` must not expose protected admin content.
- Login success feedback must not expose sensitive account details.
- Unknown email submissions must show safe generic feedback.
- Rate-limit and request failures must show retry-friendly safe feedback.
- Invalid, expired, or already-used links must fail safely without leaking technical details.
- `/admin/posts` must display an explicit logout action.

## Referências externas completas

- Supabase Auth with Magic Link
- Supabase email auth flow
- Supabase authenticated session state
- Supabase manually pre-created admin user
- Existing Supabase RLS policies, when `/admin/posts` depends on Supabase-protected data

## Mapeamento de requisitos e referências por etapa

- Etapa 1 depende de Rules 1, 7, 8, 11; constraints sobre `/admin` como entry page, não expor conteúdo protegido, não depender só do client, e manter rotas públicas intactas. Referências: Supabase authenticated session state.
- Etapa 2 depende de Rules 3, 4, 5, 11; constraints de não criar usuários desconhecidos, não introduzir senha e preservar rotas públicas. Referências: Supabase Auth with Magic Link, Supabase email auth flow, Supabase manually pre-created admin user.
- Etapa 3 depende de Rules 4, 6, 9; constraints de destino final `/admin/posts` e falha segura sem vazamento técnico. Referências: Supabase Auth with Magic Link, Supabase email auth flow, Supabase authenticated session state.
- Etapa 4 depende de Rules 2, 8, 11; constraints de proteção server-side e RLS sem relaxamento. Referências: Supabase authenticated session state, existing Supabase RLS policies.
- Etapa 5 depende de Rule 10 e das constraints de logout explícito e bloqueio posterior de acesso. Referências: Supabase authenticated session state.
- Etapa 6 depende de todas as Rules 1 a 11 e de todas as constraints globais para validação de regressão e edge cases. Referências: todas as referências externas listadas acima.

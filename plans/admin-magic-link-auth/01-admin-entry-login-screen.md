## Contexto

Esta etapa cobre a transformação de `/admin` no ponto oficial de entrada do fluxo administrativo. Ela estabelece o comportamento inicial da página de login e o redirecionamento imediato quando já existe sessão válida.

## Objetivo da etapa

Entregar a tela de login em `/admin` para usuários sem sessão válida e garantir que usuários já autenticados sejam redirecionados automaticamente para `/admin/posts`.

## Relação com o todo

Sem esta etapa, o fluxo não possui ponto de entrada consistente nem gate inicial para separar acesso autenticado e não autenticado. Ela prepara a base para a solicitação do Magic Link e impede exposição prematura de conteúdo protegido.

## Escopo

- Tornar `/admin` a login entry page.
- Exibir a admin login screen com email input.
- Garantir que `/admin` não mostre protected admin content para usuários não autenticados.
- Verificar sessão existente ao abrir `/admin`.
- Redirecionar usuários autenticados para `/admin/posts`.

## Não pode quebrar

- Rule 1: `/admin` is the login entry page, not the final admin destination.
- Rule 7: Authenticated users visiting `/admin` must be redirected automatically to `/admin/posts`.
- Rule 8: Protected admin content must depend on verified session state, not only client-side UI state.
- Rule 11: Public blog pages must remain unaffected.
- `/admin` must become the login entry page
- Existing public blog routes must remain unaffected
- No breaking changes to existing public blog navigation
- Route protection must not depend exclusively on client-side state
- WHEN a user navigates to `/admin` THE SYSTEM SHALL display the admin login screen with an email input
- WHEN an unauthenticated user opens `/admin` THE SYSTEM SHALL not show protected admin content
- WHEN an authenticated user opens `/admin` THE SYSTEM SHALL redirect the user to `/admin/posts`
- WHEN a protected admin route is requested THE SYSTEM SHALL validate the authenticated session on the server
- IF client-side auth state is stale WHEN the server evaluates the request THE SYSTEM SHALL rely on server-side auth state as the source of truth

### Referências externas desta etapa

- Supabase authenticated session state

## Resultado esperado

O acesso a `/admin` passa a se comportar como gate de entrada do admin: sem sessão, mostra login; com sessão válida, redireciona para `/admin/posts`; em nenhum caso expõe conteúdo protegido na própria rota de entrada.

## Critérios de aceite

- Abrir `/admin` sem sessão mostra a tela de login com campo de email.
- Abrir `/admin` sem sessão não renderiza conteúdo protegido do admin.
- Abrir `/admin` com sessão válida redireciona diretamente para `/admin/posts`.
- A decisão de redirecionar ou renderizar a tela de login usa estado de sessão validado no servidor.
- As páginas públicas do blog seguem inalteradas.

## Dependências

- Nenhuma etapa anterior.

## Rastreabilidade

- `User Stories > Story 1: Open admin login page`
- `Business Rules > Rule 1, Rule 7, Rule 8, Rule 11`
- `Technical Design > Architecture Overview` passos 1 a 4
- `API / Server Actions > Render /admin`
- `Constraints`
- `Validation Checklist` itens sobre `/admin` renderizar login e redirecionar quando há sessão

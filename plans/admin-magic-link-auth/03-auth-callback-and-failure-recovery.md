## Contexto

Esta etapa cobre o retorno do usuário ao aplicativo após clicar no Magic Link recebido por email. Ela trata tanto a conclusão bem-sucedida da autenticação quanto a recuperação segura de links inválidos, expirados ou já utilizados.

## Objetivo da etapa

Completar o auth callback do Supabase, estabelecer sessão válida quando o link for legítimo, redirecionar para `/admin/posts` e falhar com segurança quando o link não puder mais ser usado.

## Relação com o todo

Esta etapa fecha o ciclo iniciado pela solicitação do Magic Link. Sem ela, o email é enviado, mas o usuário não consegue converter o link em sessão autenticada nem recuperar-se corretamente de falhas do link.

## Escopo

- Implementar o callback handler de autenticação.
- Estabelecer sessão autenticada para Magic Links válidos.
- Redirecionar login bem-sucedido para `/admin/posts`.
- Detectar links inválidos, expirados ou já usados.
- Não criar sessão em falhas do link.
- Retornar o usuário para `/admin` com mensagem segura para solicitar um novo Magic Link.

## Não pode quebrar

- Rule 4: The authentication flow must use Supabase Magic Link only.
- Rule 6: Successful login must end at `/admin/posts`.
- Rule 9: Invalid, expired, or already-used Magic Links must fail safely and require a new login attempt.
- The current post-login destination must remain `/admin/posts`
- Invalid or expired login links must fail safely without leaking technical details
- WHEN the user clicks a valid Magic Link THE SYSTEM SHALL establish an authenticated session
- WHEN authentication completes successfully THE SYSTEM SHALL redirect the user to `/admin/posts`
- IF the Magic Link is invalid, expired, or already used WHEN the user returns to the app THE SYSTEM SHALL not create a session
- IF the Magic Link is invalid, expired, or already used WHEN the auth flow fails THE SYSTEM SHALL return the user to `/admin`
- IF the Magic Link is invalid, expired, or already used WHEN the login screen is shown again THE SYSTEM SHALL display a safe message instructing the user to request a new Magic Link
- Magic Link is invalid -> Do not create session; return to `/admin` and show retry message
- Magic Link is expired -> Do not create session; return to `/admin` and show retry message
- Magic Link was already used -> Do not create session; return to `/admin` and show retry message
- User already authenticated and clicks a new Magic Link -> Preserve or refresh session and end at `/admin/posts`

### Referências externas desta etapa

- Supabase Auth with Magic Link
- Supabase email auth flow
- Supabase authenticated session state

## Resultado esperado

O retorno do Magic Link sempre termina em um de dois estados seguros: sessão válida com redirecionamento para `/admin/posts`, ou falha sem sessão com retorno para `/admin` e instrução genérica para tentar novamente.

## Critérios de aceite

- Um Magic Link válido cria sessão autenticada.
- Autenticação bem-sucedida sempre termina em `/admin/posts`.
- Links inválidos, expirados ou já usados nunca criam sessão.
- Falhas do link retornam o usuário para `/admin`.
- A tela de login exibe mensagem segura orientando nova solicitação quando o link falha.

## Dependências

- `01-admin-entry-login-screen.md`
- `02-magic-link-request.md`

## Rastreabilidade

- `User Stories > Story 3: Complete login from Magic Link`
- `Business Rules > Rule 4, Rule 6, Rule 9`
- `Technical Design > Architecture Overview` passos 7 a 10
- `API / Server Actions > Callback, Auth failure handler`
- `Component Map > AuthCallbackHandler, AuthFailureState`
- `Edge Cases & Error Handling` linhas sobre invalid, expired, already used e authenticated user clicking new Magic Link
- `Validation Checklist` itens sobre successful Magic Link flow e safe failure

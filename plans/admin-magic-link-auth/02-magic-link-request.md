## Contexto

Esta etapa cobre a solicitação do Magic Link a partir da tela de login em `/admin`. Ela restringe o envio ao único usuário admin pré-criado e impede criação automática de contas desconhecidas.

## Objetivo da etapa

Permitir que o email admin autorizado solicite um Magic Link via Supabase, com feedback seguro de sucesso ou erro, sem conceder acesso a emails não autorizados.

## Relação com o todo

Esta etapa inicia o ciclo de autenticação propriamente dito. Sem ela, a tela de login existe, mas o usuário não consegue disparar o mecanismo de acesso passwordless.

## Escopo

- Exibir email input e ação de submit para solicitar o Magic Link.
- Validar email vazio ou malformado com erro inline.
- Solicitar Magic Link ao Supabase apenas para o email permitido.
- Garantir que automatic sign-up for unknown users fique desabilitado.
- Exibir confirmação segura no sucesso.
- Exibir feedback genérico e recuperável em falhas, emails não autorizados e rate limiting.

## Não pode quebrar

- Rule 3: Only the single manually pre-created Supabase user may authenticate in V1.
- Rule 4: The authentication flow must use Supabase Magic Link only.
- Rule 5: Authentication must not auto-create unknown users.
- Rule 11: Public blog pages must remain unaffected.
- Supabase Auth must not auto-create new users for unknown emails
- No password flow should be introduced in V1
- Existing public blog routes must remain unaffected
- WHEN the login screen is displayed THE SYSTEM SHALL show an email input and a submit action to request a Magic Link
- WHEN the allowed email is submitted THE SYSTEM SHALL request a Magic Link from Supabase
- WHEN requesting the Magic Link THE SYSTEM SHALL prevent automatic sign-up for unknown users
- WHEN the Magic Link request succeeds THE SYSTEM SHALL show a confirmation message without exposing sensitive account details
- WHEN an email outside the allowed pre-created account is submitted THE SYSTEM SHALL not grant access
- IF the request fails WHEN the user submits the form THE SYSTEM SHALL show a recoverable error message
- User submits empty email field -> Show inline validation error
- User submits malformed email -> Show inline validation error
- User submits email not matching allowed pre-created account -> Do not authenticate; show safe generic feedback
- Supabase Magic Link request fails -> Show retry-friendly error message
- User requests Magic Link too frequently -> Show safe rate-limit feedback and instruct retry later

### Referências externas desta etapa

- Supabase Auth with Magic Link
- Supabase email auth flow
- Supabase manually pre-created admin user

## Resultado esperado

O formulário de `/admin` consegue disparar o envio do Magic Link apenas para o admin permitido, nunca cria usuários desconhecidos e sempre retorna feedback seguro e recuperável.

## Critérios de aceite

- O formulário valida email vazio e formato inválido antes de solicitar autenticação.
- O email permitido dispara o pedido de Magic Link via Supabase.
- Emails fora da conta pré-criada não recebem acesso e geram feedback seguro.
- O fluxo desabilita auto-criação de usuário desconhecido.
- Sucesso, falha e rate limiting mostram mensagens seguras sem expor detalhes sensíveis.

## Dependências

- `01-admin-entry-login-screen.md`

## Rastreabilidade

- `User Stories > Story 2: Request Magic Link`
- `Business Rules > Rule 3, Rule 4, Rule 5, Rule 11`
- `Technical Design > Architecture Overview` passos 5 a 7
- `API / Server Actions > Magic Link request action`
- `Edge Cases & Error Handling` linhas sobre email vazio, malformed, email não permitido, request fail e rate limit
- `Constraints`
- `Validation Checklist` item sobre unknown or non-pre-created users are not auto-created

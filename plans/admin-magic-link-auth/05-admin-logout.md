## Contexto

Esta etapa cobre o encerramento explícito da sessão dentro da área administrativa protegida. O logout deve existir em `/admin/posts` e devolver o usuário ao ponto de entrada `/admin`.

## Objetivo da etapa

Disponibilizar logout explícito na área admin, encerrar a sessão autenticada e impedir acesso continuado às páginas protegidas até novo login.

## Relação com o todo

Sem esta etapa, o fluxo de autenticação fica incompleto operacionalmente. O usuário precisa conseguir encerrar a sessão de forma explícita e previsível.

## Escopo

- Exibir ação de logout em `/admin/posts`.
- Encerrar a sessão autenticada ao clicar no logout.
- Redirecionar o usuário para `/admin`.
- Garantir que a área protegida volte a exigir novo login após o logout.

## Não pode quebrar

- Rule 10: `/admin/posts` must provide an explicit logout action.
- Logout must be explicit and available from `/admin/posts`
- WHEN an authenticated user is on `/admin/posts` THE SYSTEM SHALL display a logout action
- WHEN the user clicks logout THE SYSTEM SHALL terminate the authenticated session
- WHEN logout completes THE SYSTEM SHALL redirect the user to `/admin`
- WHEN the session is terminated THE SYSTEM SHALL block further access to protected admin pages until a new login occurs
- User clicks logout in `/admin/posts` -> End session and redirect to `/admin`
- Session expires while using `/admin/posts` -> Block protected access and return user to `/admin`

### Referências externas desta etapa

- Supabase authenticated session state

## Resultado esperado

O admin autenticado consegue sair explicitamente da área protegida, a sessão é encerrada e qualquer tentativa subsequente de acesso admin volta a exigir autenticação.

## Critérios de aceite

- O botão ou ação de logout aparece em `/admin/posts`.
- Acionar logout encerra a sessão.
- Logout redireciona imediatamente para `/admin`.
- Após logout, `/admin/posts` não fica mais acessível sem novo login.

## Dependências

- `04-protected-admin-posts-access.md`

## Rastreabilidade

- `User Stories > Story 5: Log out explicitly from the admin area`
- `Business Rules > Rule 10`
- `API / Server Actions > Logout action`
- `Component Map > LogoutButton`
- `Edge Cases & Error Handling` linha sobre logout
- `Constraints`
- `Validation Checklist` itens sobre logout visível e redirecionamento

Open Questions kept in this spec:

- None at this stage. The logout behavior and invalid/expired Magic Link handling were defined.

# Admin Magic Link Authentication

## Overview

This feature adds a simple and secure authentication flow for the blog admin area using Supabase Magic Link. The `/admin` route must become the dedicated login entry page, where the single pre-created admin user can enter their email address and request a Magic Link. After clicking the link and completing authentication, the user must be redirected to `/admin/posts`, which becomes the actual protected admin area. The goal is to keep the admin flow minimal while ensuring admin content is never publicly exposed.

---

## Goals

- [ ] Turn `/admin` into the admin login screen
- [ ] Allow passwordless login using Supabase Magic Link
- [ ] Restrict authentication to the single manually pre-created Supabase user
- [ ] Redirect successful authentication to `/admin/posts`
- [ ] Protect `/admin/posts` and other admin content from unauthenticated access
- [ ] Automatically redirect authenticated users from `/admin` to `/admin/posts`
- [ ] Provide an explicit logout action inside `/admin/posts`
- [ ] Handle invalid, expired, or already-used Magic Links safely

## Out of Scope (V1)

- Public user registration
- Multi-user admin management
- Role-based permissions beyond the single admin user
- Password-based login
- Social login providers
- Invitation flow
- Changes to public blog routes outside admin authentication
- Full admin authorization model beyond session-based protection

---

## User Stories

### Story 1: Open admin login page

**As** the blog owner, **I want** `/admin` to show the login screen, **so that** I can request a Magic Link before accessing admin content.

#### Acceptance Criteria (EARS notation)

- WHEN a user navigates to `/admin` THE SYSTEM SHALL display the admin login screen with an email input
- WHEN an unauthenticated user opens `/admin` THE SYSTEM SHALL not show protected admin content
- WHEN an authenticated user opens `/admin` THE SYSTEM SHALL redirect the user to `/admin/posts`

### Story 2: Request Magic Link

**As** the blog owner, **I want** to enter my email address on `/admin`, **so that** I can receive a Magic Link and sign in without a password.

#### Acceptance Criteria (EARS notation)

- WHEN the login screen is displayed THE SYSTEM SHALL show an email input and a submit action to request a Magic Link
- WHEN the allowed email is submitted THE SYSTEM SHALL request a Magic Link from Supabase
- WHEN requesting the Magic Link THE SYSTEM SHALL prevent automatic sign-up for unknown users
- WHEN the Magic Link request succeeds THE SYSTEM SHALL show a confirmation message without exposing sensitive account details
- WHEN an email outside the allowed pre-created account is submitted THE SYSTEM SHALL not grant access
- IF the request fails WHEN the user submits the form THE SYSTEM SHALL show a recoverable error message

### Story 3: Complete login from Magic Link

**As** the blog owner, **I want** to click the email link and complete authentication, **so that** I can access the admin posts area.

#### Acceptance Criteria (EARS notation)

- WHEN the user clicks a valid Magic Link THE SYSTEM SHALL establish an authenticated session
- WHEN authentication completes successfully THE SYSTEM SHALL redirect the user to `/admin/posts`
- IF the Magic Link is invalid, expired, or already used WHEN the user returns to the app THE SYSTEM SHALL not create a session
- IF the Magic Link is invalid, expired, or already used WHEN the auth flow fails THE SYSTEM SHALL return the user to `/admin`
- IF the Magic Link is invalid, expired, or already used WHEN the login screen is shown again THE SYSTEM SHALL display a safe message instructing the user to request a new Magic Link

### Story 4: Protect admin posts route

**As** the blog owner, **I want** `/admin/posts` to require authentication, **so that** admin content is not publicly accessible.

#### Acceptance Criteria (EARS notation)

- WHEN an unauthenticated user navigates directly to `/admin/posts` THE SYSTEM SHALL prevent access to protected content
- WHEN an unauthenticated user tries to access `/admin/posts` THE SYSTEM SHALL return the user to `/admin`
- WHEN an authenticated user navigates to `/admin/posts` THE SYSTEM SHALL allow access
- WHEN the server evaluates access to `/admin/posts` THE SYSTEM SHALL validate authentication before rendering protected content

### Story 5: Log out explicitly from the admin area

**As** the blog owner, **I want** a logout button inside `/admin/posts`, **so that** I can end the admin session explicitly.

#### Acceptance Criteria (EARS notation)

- WHEN an authenticated user is on `/admin/posts` THE SYSTEM SHALL display a logout action
- WHEN the user clicks logout THE SYSTEM SHALL terminate the authenticated session
- WHEN logout completes THE SYSTEM SHALL redirect the user to `/admin`
- WHEN the session is terminated THE SYSTEM SHALL block further access to protected admin pages until a new login occurs

### Story 6: Preserve security through server-side validation

**As** the blog owner, **I want** access checks to be enforced securely, **so that** admin pages cannot be exposed through client-side bypass.

#### Acceptance Criteria (EARS notation)

- WHEN a protected admin route is requested THE SYSTEM SHALL validate the authenticated session on the server
- WHEN no valid session exists THE SYSTEM SHALL not render protected admin content
- IF client-side auth state is stale WHEN the server evaluates the request THE SYSTEM SHALL rely on server-side auth state as the source of truth

---

## Business Rules

> Hard constraints that must never be violated.

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

---

## Technical Design

### Architecture Overview

The application uses Supabase Auth with Magic Link for passwordless authentication. The `/admin` route becomes the dedicated admin login page and contains the email submission form. This route must not expose protected admin content.

When the allowed email is submitted, the frontend requests a Magic Link from Supabase for the pre-created user only, with unknown-user auto-creation disabled. After the user clicks the Magic Link, the application completes the auth flow, establishes a valid session, and redirects the user to `/admin/posts`.

The `/admin/posts` route is the actual protected admin destination. It must validate authentication on the server before rendering content. If a valid session is not present, the user must be redirected back to `/admin`.

The auth flow must also handle invalid, expired, or already-used links safely. In these cases, no session should be established. The user should be returned to the `/admin` login screen and shown a generic instruction to request a new Magic Link, without exposing low-level provider or token details.

Recommended sequence flow:

1. User opens `/admin`
2. Server checks whether a valid session already exists
3. If authenticated, redirect immediately to `/admin/posts`
4. If unauthenticated, render the email login form on `/admin`
5. User submits the allowed email
6. App requests Supabase Magic Link without allowing automatic user creation
7. User clicks the Magic Link from email
8. App completes the Supabase auth callback/session flow
9. If auth succeeds, redirect to `/admin/posts`
10. If auth fails because the link is invalid, expired, or already used, return to `/admin` and show a safe retry message
11. Server validates the session for `/admin/posts` and renders protected content only if authenticated
12. User may explicitly log out from `/admin/posts`, ending the session and returning to `/admin`

### Stack

- Frontend: Next.js + React
- Backend/DB: Supabase / PostgreSQL
- Auth: Supabase Auth with Magic Link
- External integrations: Supabase email auth flow

### Data Model

#### New Tables

No new tables required.

#### Modified Tables

No application table changes required for V1.

#### RLS Policies

- No new application data access rules were explicitly requested in this feature.
- Existing RLS policies must remain unchanged unless `/admin/posts` depends on Supabase-protected data that already requires authenticated access.
- If admin content data is stored in Supabase tables protected by RLS, policies must continue to require authenticated access and must not be relaxed for anonymous users.

### API / Server Actions

| Method   | Route / Action                       | Description                                                                                      | Auth required            |
| -------- | ------------------------------------ | ------------------------------------------------------------------------------------------------ | ------------------------ |
| Render   | `/admin`                             | Admin login page with email input; redirects authenticated users to `/admin/posts`               | No                       |
| Action   | Magic Link request action            | Sends Magic Link to the pre-created admin email via Supabase with unknown-user creation disabled | No                       |
| Callback | Auth callback handler                | Completes Supabase auth flow and establishes session when the link is valid                      | No                       |
| Redirect | Auth failure handler                 | Returns invalid or expired Magic Link attempts to `/admin` with safe retry messaging             | No                       |
| Render   | `/admin/posts`                       | Protected admin posts area                                                                       | Yes                      |
| Action   | Logout action                        | Terminates the authenticated session and redirects to `/admin`                                   | Yes                      |
| Redirect | Unauthenticated admin access handler | Redirects unauthenticated requests for protected admin content back to `/admin`                  | No valid session present |

### Component Map

> Key UI components and their responsibilities.

- `AdminLoginPage` — renders the `/admin` login screen
- `MagicLinkRequestForm` — handles email input, validation, submit, loading, and result states
- `AdminAuthRedirect` — redirects authenticated users from `/admin` to `/admin/posts`
- `AuthCallbackHandler` — completes the Supabase auth flow and final redirect
- `AuthFailureState` — displays a safe invalid/expired-link message and prompts the user to request a new Magic Link
- `ProtectedAdminGuard` — ensures `/admin/posts` only renders for authenticated sessions
- `AdminPostsPage` — renders protected admin posts content after successful auth
- `LogoutButton` — logs the user out from `/admin/posts`

---

## Edge Cases & Error Handling

| Scenario                                                    | Expected behavior                                                |
| ----------------------------------------------------------- | ---------------------------------------------------------------- |
| Unauthenticated user opens `/admin`                         | Show login screen with email input                               |
| Authenticated user opens `/admin`                           | Redirect to `/admin/posts`                                       |
| Unauthenticated user opens `/admin/posts` directly          | Redirect to `/admin`                                             |
| User submits empty email field                              | Show inline validation error                                     |
| User submits malformed email                                | Show inline validation error                                     |
| User submits email not matching allowed pre-created account | Do not authenticate; show safe generic feedback                  |
| Supabase Magic Link request fails                           | Show retry-friendly error message                                |
| User requests Magic Link too frequently                     | Show safe rate-limit feedback and instruct retry later           |
| Magic Link is invalid                                       | Do not create session; return to `/admin` and show retry message |
| Magic Link is expired                                       | Do not create session; return to `/admin` and show retry message |
| Magic Link was already used                                 | Do not create session; return to `/admin` and show retry message |
| User already authenticated and clicks a new Magic Link      | Preserve or refresh session and end at `/admin/posts`            |
| Session expires while using `/admin/posts`                  | Block protected access and return user to `/admin`               |
| User clicks logout in `/admin/posts`                        | End session and redirect to `/admin`                             |
| Public blog visitor browses non-admin pages                 | Public pages continue working unchanged                          |

---

## Data Migration

No migration required.

- [ ] Seed data required: No application seed data required
- [ ] Supabase admin user must already exist manually before this feature is used

---

## Constraints

> What must NOT break during or after implementation.

- [ ] `/admin` must become the login entry page
- [ ] `/admin/posts` must not be accessible without authentication
- [ ] Existing public blog routes must remain unaffected
- [ ] Supabase Auth must not auto-create new users for unknown emails
- [ ] Existing RLS policies must not be relaxed
- [ ] No password flow should be introduced in V1
- [ ] No breaking changes to existing public blog navigation
- [ ] Route protection must not depend exclusively on client-side state
- [ ] The current post-login destination must remain `/admin/posts`
- [ ] Logout must be explicit and available from `/admin/posts`
- [ ] Invalid or expired login links must fail safely without leaking technical details

---

## Validation Checklist

> For the coding agent to verify after implementation.

- [ ] All acceptance criteria pass
- [ ] `/admin` renders the login screen when no session exists
- [ ] `/admin` redirects to `/admin/posts` when session exists
- [ ] `/admin/posts` redirects back to `/admin` when session is absent
- [ ] Successful Magic Link flow ends at `/admin/posts`
- [ ] Unknown or non-pre-created users are not auto-created
- [ ] Invalid, expired, or already-used links fail safely and return to `/admin`
- [ ] Logout button is visible in `/admin/posts`
- [ ] Logout terminates the session and redirects to `/admin`
- [ ] No TypeScript errors
- [ ] No broken Supabase auth integration
- [ ] Server-side protection is enforced for `/admin/posts`
- [ ] Public blog pages still work normally
- [ ] No console errors in production build

---

## Open Questions

> Doubts that appeared during spec writing and need confirmation before or during implementation.

- [ ] None

---

## Spec Metadata

- **Version**: 1.0
- **Status**: Ready for implementation
- **Stack**: Next.js + React + Supabase
- **Author**: via voice input
- **Created**: 2026-04-12

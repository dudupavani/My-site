-- Store the single site's Google Search Console refresh token encrypted by the app.
create table if not exists public.google_search_console_credentials (
  id smallint primary key default 1 check (id = 1),
  encrypted_refresh_token text not null,
  connected_at timestamptz not null default now()
);

alter table public.google_search_console_credentials enable row level security;

-- The server uses the service-role client. No browser-facing role may access OAuth secrets.
revoke all on table public.google_search_console_credentials from public, anon, authenticated;
grant select, insert, update, delete on table public.google_search_console_credentials to service_role;

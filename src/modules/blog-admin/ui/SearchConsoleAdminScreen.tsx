import Link from "next/link";

import type {
  GoogleSearchConsoleDashboard,
  GoogleSearchConsoleProperty,
} from "@/src/shared/server/googleSearchConsole";
import { Button } from "@/src/shared/ui";

type SearchConsoleAdminScreenProps = {
  status?: string;
  connected: boolean;
  properties?: GoogleSearchConsoleProperty[];
  dashboard?: GoogleSearchConsoleDashboard | null;
  error?: string;
};

const statusMessages: Record<string, string> = {
  connected: "Google Search Console conectado com segurança.",
  cancelled: "A autorização foi cancelada.",
  invalid_oauth_response: "Não foi possível validar a resposta do Google. Tente conectar novamente.",
  missing_refresh_token: "O Google não retornou uma autorização permanente. Tente conectar novamente.",
  connection_failed: "Não foi possível concluir a conexão. Confira a configuração e tente novamente.",
  unauthorized: "Sua sessão do admin expirou. Entre novamente antes de conectar.",
  disconnected: "A conexão foi removida e o acesso do Google foi revogado.",
  disconnected_google_warning: "O token local foi removido, mas não foi possível confirmar a revogação no Google. Confira as permissões da Conta Google.",
  disconnect_failed: "Não foi possível remover a conexão. Tente novamente.",
};

const numberFormat = new Intl.NumberFormat("pt-BR");
const percentFormat = new Intl.NumberFormat("pt-BR", { style: "percent", maximumFractionDigits: 1 });
const positionFormat = new Intl.NumberFormat("pt-BR", { maximumFractionDigits: 1 });

function formatDate(value: string): string {
  return new Intl.DateTimeFormat("pt-BR", { timeZone: "UTC", day: "2-digit", month: "short" })
    .format(new Date(`${value}T00:00:00Z`));
}

function safeSitemapUrl(value: string): string | undefined {
  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:" ? url.toString() : undefined;
  } catch {
    return undefined;
  }
}

function MetricCard({ label, value, hint }: { label: string; value: string; hint: string }) {
  return (
    <article className="rounded-lg border border-border bg-card p-5">
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="mt-3 text-3xl font-semibold tracking-tight text-foreground">{value}</p>
      <p className="mt-2 text-xs text-muted-foreground">{hint}</p>
    </article>
  );
}

function ResultTable({
  title,
  label,
  rows,
}: {
  title: string;
  label: string;
  rows: NonNullable<GoogleSearchConsoleDashboard>["queries"];
}) {
  return (
    <section className="min-w-0 rounded-lg border border-border bg-card">
      <header className="border-b border-border px-5 py-4">
        <h3 className="font-semibold text-foreground">{title}</h3>
      </header>
      {rows.length ? (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="text-xs text-muted-foreground">
              <tr>
                <th className="px-5 py-3 font-medium">{label}</th>
                <th className="px-3 py-3 text-right font-medium">Cliques</th>
                <th className="px-3 py-3 text-right font-medium">Impressões</th>
                <th className="px-5 py-3 text-right font-medium">CTR</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => (
                <tr key={`${row.keys?.[0] ?? "row"}-${index}`} className="border-t border-border/70">
                  <td className="max-w-72 truncate px-5 py-3 text-foreground" title={row.keys?.[0]}>
                    {row.keys?.[0] ?? "—"}
                  </td>
                  <td className="px-3 py-3 text-right tabular-nums">{numberFormat.format(row.clicks)}</td>
                  <td className="px-3 py-3 text-right tabular-nums">{numberFormat.format(row.impressions)}</td>
                  <td className="px-5 py-3 text-right tabular-nums">{percentFormat.format(row.ctr)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="px-5 py-8 text-sm text-muted-foreground">Sem dados neste período.</p>
      )}
    </section>
  );
}

function SitemapsTable({ dashboard }: { dashboard: GoogleSearchConsoleDashboard }) {
  return (
    <section className="rounded-lg border border-border bg-card">
      <header className="border-b border-border px-5 py-4">
        <h3 className="font-semibold text-foreground">Sitemaps enviados</h3>
      </header>
      {dashboard.sitemaps.length ? (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="text-xs text-muted-foreground">
              <tr>
                <th className="px-5 py-3 font-medium">Arquivo</th>
                <th className="px-3 py-3 font-medium">Enviado em</th>
                <th className="px-3 py-3 text-right font-medium">Erros</th>
                <th className="px-5 py-3 text-right font-medium">Avisos</th>
              </tr>
            </thead>
            <tbody>
              {dashboard.sitemaps.map((sitemap) => {
                const sitemapHref = safeSitemapUrl(sitemap.path);
                return (
                  <tr key={sitemap.path} className="border-t border-border/70">
                    <td className="max-w-72 truncate px-5 py-3 text-foreground" title={sitemap.path}>
                      {sitemapHref ? (
                        <a href={sitemapHref} target="_blank" rel="noopener noreferrer" className="hover:underline">
                          {sitemap.path}
                        </a>
                      ) : sitemap.path}
                      {sitemap.isPending ? <span className="ml-2 text-xs text-muted-foreground">Processando</span> : null}
                    </td>
                    <td className="px-3 py-3 text-muted-foreground">
                      {sitemap.lastSubmitted ? formatDate(sitemap.lastSubmitted.slice(0, 10)) : "—"}
                    </td>
                    <td className="px-3 py-3 text-right tabular-nums">{numberFormat.format(sitemap.errors ?? 0)}</td>
                    <td className="px-5 py-3 text-right tabular-nums">{numberFormat.format(sitemap.warnings ?? 0)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="px-5 py-8 text-sm text-muted-foreground">Nenhum sitemap consta como enviado nesta propriedade.</p>
      )}
    </section>
  );
}

export function SearchConsoleAdminScreen({
  status,
  connected,
  properties = [],
  dashboard,
  error,
}: SearchConsoleAdminScreenProps) {
  const message = status && Object.hasOwn(statusMessages, status) ? statusMessages[status] : undefined;

  return (
    <div className="space-y-6">
      <section className="rounded-lg border border-border bg-card p-5 lg:p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="max-w-2xl space-y-2">
            <p className="text-sm font-medium uppercase tracking-wide text-muted-foreground">SEO</p>
            <h2 className="text-2xl font-semibold">Google Search Console</h2>
            <p className="text-sm leading-6 text-muted-foreground">
              Desempenho orgânico dos últimos 28 dias disponíveis e situação dos sitemaps da propriedade.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {connected ? (
              <form action="/api/admin/search-console/disconnect" method="post">
                <Button type="submit" variant="secondary">Desconectar</Button>
              </form>
            ) : null}
            <Button asChild>
              <Link href="/api/admin/search-console/connect">
                {connected ? "Reconectar Google" : "Conectar Google"}
              </Link>
            </Button>
          </div>
        </div>

        {message ? (
          <p role="status" className="mt-5 rounded-lg border border-border bg-muted p-3 text-sm">
            {message}
          </p>
        ) : null}
        {error ? (
          <p role="alert" className="mt-5 rounded-lg border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive">
            {error}
          </p>
        ) : null}

        {!connected ? (
          <p className="mt-5 rounded-lg border border-border bg-muted p-4 text-sm text-muted-foreground">
            Conecte a conta Google que tem acesso à propriedade do site para carregar os relatórios.
          </p>
        ) : properties.length ? (
          <form action="/admin/search-console" method="get" className="mt-5 flex flex-wrap items-end gap-3">
            <label className="grid min-w-64 gap-2 text-sm font-medium">
              Propriedade
              <select
                name="property"
                defaultValue={dashboard?.siteUrl ?? properties[0].siteUrl}
                className="h-10 rounded-md border border-input bg-background px-3 text-foreground"
              >
                {properties.map((property) => (
                  <option key={property.siteUrl} value={property.siteUrl}>
                    {property.siteUrl}
                  </option>
                ))}
              </select>
            </label>
            <Button type="submit" variant="secondary">Ver propriedade</Button>
          </form>
        ) : connected ? (
          <p className="mt-5 rounded-lg border border-border bg-muted p-4 text-sm text-muted-foreground">
            Esta conta Google não tem propriedades disponíveis no Search Console.
          </p>
        ) : null}
      </section>

      {dashboard ? (
        <>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <MetricCard label="Cliques" value={numberFormat.format(dashboard.totals.clicks)} hint="Acessos vindos da Pesquisa Google" />
            <MetricCard label="Impressões" value={numberFormat.format(dashboard.totals.impressions)} hint="Exibições nos resultados de busca" />
            <MetricCard label="CTR média" value={percentFormat.format(dashboard.totals.ctr)} hint="Cliques ÷ impressões" />
            <MetricCard label="Posição média" value={positionFormat.format(dashboard.totals.position)} hint="Menor posição é melhor" />
          </div>

          <section className="rounded-lg border border-border bg-card">
            <header className="flex flex-wrap items-center justify-between gap-2 border-b border-border px-5 py-4">
              <h3 className="font-semibold text-foreground">Cliques por dia</h3>
              <p className="text-xs text-muted-foreground">
                {formatDate(dashboard.startDate)} – {formatDate(dashboard.endDate)} · dados finais
              </p>
            </header>
            {dashboard.daily.length ? (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="text-xs text-muted-foreground">
                    <tr>
                      <th className="px-5 py-3 font-medium">Data</th>
                      <th className="px-3 py-3 text-right font-medium">Cliques</th>
                      <th className="px-3 py-3 text-right font-medium">Impressões</th>
                      <th className="px-5 py-3 text-right font-medium">Posição média</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dashboard.daily.map((row, index) => (
                      <tr key={`${row.keys?.[0] ?? "day"}-${index}`} className="border-t border-border/70">
                        <td className="px-5 py-3 text-foreground">{row.keys?.[0] ? formatDate(row.keys[0]) : "—"}</td>
                        <td className="px-3 py-3 text-right tabular-nums">{numberFormat.format(row.clicks)}</td>
                        <td className="px-3 py-3 text-right tabular-nums">{numberFormat.format(row.impressions)}</td>
                        <td className="px-5 py-3 text-right tabular-nums">{positionFormat.format(row.position)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="px-5 py-8 text-sm text-muted-foreground">Sem dados neste período.</p>
            )}
          </section>

          <div className="grid gap-6 xl:grid-cols-2">
            <ResultTable title="Principais consultas" label="Consulta" rows={dashboard.queries} />
            <ResultTable title="Principais páginas" label="Página" rows={dashboard.pages} />
          </div>

          <SitemapsTable dashboard={dashboard} />
        </>
      ) : null}

      <p className="text-xs leading-5 text-muted-foreground">
        O token de atualização é criptografado antes de ser armazenado no servidor. Os relatórios são carregados diretamente do Google Search Console.
      </p>
    </div>
  );
}

import { SearchConsoleAdminScreen } from "@/src/modules/blog-admin/ui/SearchConsoleAdminScreen";
import { AdminShell } from "@/src/modules/blog-admin/ui/AdminShell";
import { requireAdminPageAccess } from "@/src/shared/server/adminAuth";
import {
  getGoogleSearchConsoleDashboard,
  isGoogleSearchConsoleConnected,
} from "@/src/shared/server/googleSearchConsole";

type SearchParams = { status?: string | string[]; property?: string | string[] };

function getDashboardError(error: unknown): string {
  const message = error instanceof Error ? error.message : "";
  if (/401|invalid_grant|expired|revoked/i.test(message)) {
    return "A autorização do Google expirou ou foi revogada. Reconecte a conta para continuar.";
  }
  if (/403|permission|forbidden|access denied|insufficient|scope/i.test(message)) {
    return "O Google recusou o acesso. Confira se esta conta tem permissão sobre a propriedade do Search Console.";
  }
  if (/429|rate limit|quota/i.test(message)) {
    return "O limite temporário da API do Google foi atingido. Tente novamente mais tarde.";
  }
  return "Não foi possível carregar os dados. Confira a configuração da integração e tente novamente.";
}

export default async function AdminSearchConsolePage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  await requireAdminPageAccess();
  const params = await searchParams;
  const status = typeof params.status === "string" ? params.status : undefined;
  const property = typeof params.property === "string" ? params.property : undefined;

  let connected = false;
  let properties: Awaited<ReturnType<typeof getGoogleSearchConsoleDashboard>>["properties"] = [];
  let dashboard: Awaited<ReturnType<typeof getGoogleSearchConsoleDashboard>>["dashboard"] = null;
  let error: string | undefined;

  try {
    connected = await isGoogleSearchConsoleConnected();
  } catch {
    error = "Não foi possível ler a conexão. Confira se a migration do Search Console foi aplicada no Supabase.";
  }

  if (connected) {
    try {
      const result = await getGoogleSearchConsoleDashboard(property);
      properties = result.properties;
      dashboard = result.dashboard;
    } catch (dashboardError) {
      error = getDashboardError(dashboardError);
    }
  }

  return (
    <AdminShell>
      <SearchConsoleAdminScreen
        status={status}
        connected={connected}
        properties={properties}
        dashboard={dashboard}
        error={error}
      />
    </AdminShell>
  );
}

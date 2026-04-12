import { HomePage } from "@/src/modules/home/HomePage";
import { PublicHeader } from "@/src/shared/ui/PublicHeader";
import { redirect } from "next/navigation";

type SearchParams = Record<string, string | string[] | undefined>;

function getSingleParam(
  value: string | string[] | undefined,
): string | undefined {
  if (typeof value === "string") return value;
  if (Array.isArray(value)) return value[0];
  return undefined;
}

export default async function StartPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const code = getSingleParam(params.code);
  const tokenHash = getSingleParam(params.token_hash);

  if (code || tokenHash) {
    const callbackParams = new URLSearchParams();
    for (const [key, value] of Object.entries(params)) {
      if (typeof value === "string") {
        callbackParams.append(key, value);
        continue;
      }
      if (Array.isArray(value)) {
        for (const item of value) {
          callbackParams.append(key, item);
        }
      }
    }

    const query = callbackParams.toString();
    redirect(`/admin/auth/callback${query ? `?${query}` : ""}`);
  }

  return (
    <>
      <PublicHeader variant="home" />
      <HomePage />
    </>
  );
}

import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// 2× the page revalidate interval (3600s) so cached pages never serve expired image URLs.
const DEFAULT_SIGNED_URL_TTL_SECONDS = 7200;
const DEFAULT_COVER_BUCKET = "blog-post-covers";

let supabaseAdminClient: SupabaseClient | null = null;

function readRequiredEnv(name: string): string {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new Error(`Environment variable ${name} is required.`);
  }
  return value;
}

export function getSupabaseAdminClient(): SupabaseClient {
  if (supabaseAdminClient) {
    return supabaseAdminClient;
  }

  const url = readRequiredEnv("SUPABASE_URL");
  const serviceRoleKey = readRequiredEnv("SUPABASE_SERVICE_ROLE_KEY");

  supabaseAdminClient = createClient(url, serviceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
  });

  return supabaseAdminClient;
}

export function getBlogCoverBucketName(): string {
  return process.env.SUPABASE_STORAGE_BUCKET_BLOG_COVERS?.trim() || DEFAULT_COVER_BUCKET;
}

export function getSignedUrlTtlSeconds(): number {
  const rawValue = process.env.SUPABASE_SIGNED_URL_TTL_SECONDS?.trim();
  if (!rawValue) {
    return DEFAULT_SIGNED_URL_TTL_SECONDS;
  }
  const parsed = Number.parseInt(rawValue, 10);
  if (!Number.isFinite(parsed) || parsed <= 0) {
    return DEFAULT_SIGNED_URL_TTL_SECONDS;
  }
  return parsed;
}


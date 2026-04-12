export async function register() {
  // Runs once when the Next.js server starts (nodejs runtime only).
  if (process.env.NEXT_RUNTIME !== "nodejs") return;

  // --- Required env vars ---
  const required = [
    "SUPABASE_URL",
    "SUPABASE_SERVICE_ROLE_KEY",
    "NEXT_PUBLIC_SUPABASE_ANON_KEY",
  ];
  const missing = required.filter((key) => !process.env[key]?.trim());

  if (missing.length > 0) {
    if (process.env.NODE_ENV === "production") {
      throw new Error(
        `[startup] Missing required environment variables: ${missing.join(", ")}. ` +
          "The server cannot start without them.",
      );
    } else {
      console.warn(
        `[startup] Missing environment variables: ${missing.join(", ")}. ` +
        "Server will fail on first Supabase request.",
      );
    }
  }
}

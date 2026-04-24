"use client";

import type { FormEvent } from "react";
import { useState } from "react";

import { Button, Input, Label } from "@/src/shared/ui";

type AdminLoginPageProps = {
  errorCode?: string;
};

type MagicLinkApiPayload = {
  ok?: boolean;
  message?: string;
  detail?: string;
  errors?: Record<string, string>;
};

const ERROR_MESSAGES: Record<string, string> = {
  magic_link_invalid:
    "Magic Link invalido, expirado ou ja utilizado. Solicite um novo link para entrar.",
  session_expired: "Sua sessao expirou. Solicite um novo Magic Link para continuar.",
};

function resolveErrorMessage(errorCode: string | undefined): string | null {
  if (!errorCode) return null;
  return ERROR_MESSAGES[errorCode] ?? "Nao foi possivel concluir o login.";
}

function normalizeEmail(value: string): string {
  return value.trim().toLowerCase();
}

export function AdminLoginPage({ errorCode }: AdminLoginPageProps) {
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(resolveErrorMessage(errorCode));
  const [success, setSuccess] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting) return;

    setSubmitting(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch("/api/admin/auth/magic-link", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ email: normalizeEmail(email) }),
      });

      const payload = (await response.json()) as MagicLinkApiPayload;

      if (!response.ok) {
        const fieldError = payload.errors?.email;
        const detail = payload.detail ?? "Nao foi possivel enviar o Magic Link.";
        throw new Error(fieldError ?? detail);
      }

      setSuccess(
        payload.message ??
          "Se o email estiver autorizado, voce recebera um Magic Link em instantes.",
      );
    } catch (requestError) {
      const message =
        requestError instanceof Error
          ? requestError.message
          : "Nao foi possivel enviar o Magic Link.";
      setError(message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-md items-center justify-center px-4 py-8">
      <div className="w-full rounded-lg border border-border bg-card">
        <header className="flex flex-col gap-1.5 space-y-1 p-4 lg:p-5">
          <h2 className="text-xl font-semibold tracking-[-0.01em] text-foreground">
            Entrar no admin
          </h2>
          <p className="text-sm text-muted-foreground">
            Use seu email admin para receber um Magic Link de acesso.
          </p>
        </header>
        <section className="p-4 pt-0 lg:p-5 lg:pt-0">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="admin-email">Email admin</Label>
              <Input
                id="admin-email"
                type="email"
                size="lg"
                autoComplete="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="voce@dominio.com"
                required
                disabled={submitting}
              />
            </div>

            {error ? (
              <p className="rounded-lg border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive">
                {error}
              </p>
            ) : null}

            {success ? (
              <p className="rounded-lg border border-primary/40 bg-primary/10 px-3 py-2 text-sm text-primary">
                {success}
              </p>
            ) : null}

            <Button type="submit" size="lg" className="w-full" disabled={submitting}>
              {submitting ? "Enviando..." : "Enviar Magic Link"}
            </Button>
          </form>
        </section>
      </div>
    </main>
  );
}

import type { Metadata } from "next";

import { TermsOfUsePage } from "@/src/modules/legal/ui/TermsOfUsePage";

export const metadata: Metadata = {
  title: "Termos de Uso | Eduardo Pavani",
  description: "Termos de uso do painel administrativo e da integração Google Search Console do site Eduardo Pavani.",
  alternates: { canonical: "/termos" },
};

export default function TermsOfUseRoute() {
  return <TermsOfUsePage />;
}

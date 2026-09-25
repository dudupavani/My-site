import type { Metadata } from "next";

import { PrivacyPolicyPage } from "@/src/modules/legal/ui/PrivacyPolicyPage";

export const metadata: Metadata = {
  title: "Política de Privacidade | Eduardo Pavani",
  description: "Como o site Eduardo Pavani trata dados pessoais e dados do Google Search Console.",
  alternates: { canonical: "/privacidade" },
};

export default function PrivacyPolicyRoute() {
  return <PrivacyPolicyPage />;
}

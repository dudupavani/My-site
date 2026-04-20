import type { Metadata } from "next";
import { HistoricoPage } from "@/src/modules/historico/HistoricoPage";

export const metadata: Metadata = {
  title: "Histórico Profissional | Eduardo Pavani",
  description:
    "Trajetória e histórico profissional de Eduardo Pavani — Product Lead com mais de 20 anos de experiência em produtos digitais.",
  alternates: {
    canonical: "/historico",
  },
  openGraph: {
    type: "website",
    url: "https://eduardopavani.com/historico",
    title: "Histórico Profissional | Eduardo Pavani",
    description:
      "Trajetória e histórico profissional de Eduardo Pavani — Product Lead com mais de 20 anos de experiência em produtos digitais.",
    siteName: "Eduardo Pavani",
    locale: "pt_BR",
    images: ["https://eduardopavani.com/images/img-profile-2.webp"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Histórico Profissional | Eduardo Pavani",
    description:
      "Trajetória e histórico profissional de Eduardo Pavani — Product Lead com mais de 20 anos de experiência em produtos digitais.",
    creator: "@eduardopavanipro",
    images: ["https://eduardopavani.com/images/img-profile-2.webp"],
  },
};

export default function Page() {
  return <HistoricoPage />;
}

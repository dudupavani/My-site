import type { Metadata } from "next";
import { CasesPage } from "@/src/modules/cases/CasesPage";

export const metadata: Metadata = {
  title: "Cases | Eduardo Pavani",
  description:
    "Projetos e resultados reais de Eduardo Pavani — Product Lead com mais de 20 anos de experiência em produtos digitais.",
  alternates: {
    canonical: "/cases",
  },
  openGraph: {
    type: "website",
    url: "https://eduardopavani.com/cases",
    title: "Cases | Eduardo Pavani",
    description:
      "Projetos e resultados reais de Eduardo Pavani — Product Lead com mais de 20 anos de experiência em produtos digitais.",
    siteName: "Eduardo Pavani",
    locale: "pt_BR",
    images: ["https://eduardopavani.com/images/img-profile-2.webp"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cases | Eduardo Pavani",
    description:
      "Projetos e resultados reais de Eduardo Pavani — Product Lead com mais de 20 anos de experiência em produtos digitais.",
    creator: "@eduardopavanipro",
    images: ["https://eduardopavani.com/images/img-profile-2.webp"],
  },
};

export default function Page() {
  return <CasesPage />;
}

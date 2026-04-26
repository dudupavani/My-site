import type { Metadata } from "next";
import { FormationPage } from "@/src/modules/formation/FormationPage";

export const metadata: Metadata = {
  title: "Formação | Eduardo Pavani",
  description:
    "Formação acadêmica e conhecimentos técnicos de Eduardo Pavani — Product Lead com background em design, produto e tecnologia.",
  alternates: {
    canonical: "/formacao",
  },
  openGraph: {
    type: "website",
    url: "https://eduardopavani.com/formacao",
    title: "Formação | Eduardo Pavani",
    description:
      "Formação acadêmica e conhecimentos técnicos de Eduardo Pavani — Product Lead com background em design, produto e tecnologia.",
    siteName: "Eduardo Pavani",
    locale: "pt_BR",
    images: ["https://eduardopavani.com/images/img-profile-2.webp"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Formação | Eduardo Pavani",
    description:
      "Formação acadêmica e conhecimentos técnicos de Eduardo Pavani — Product Lead com background em design, produto e tecnologia.",
    creator: "@eduardopavanipro",
    images: ["https://eduardopavani.com/images/img-profile-2.webp"],
  },
};

export default function Page() {
  return <FormationPage />;
}

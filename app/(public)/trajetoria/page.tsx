import type { Metadata } from "next";
import { TrajetoriaPage } from "@/src/modules/trajetoria/TrajetoriaPage";

export const metadata: Metadata = {
  title: "Trajetória | Eduardo Pavani",
  description:
    "Trajetória profissional de Eduardo Pavani — Product Lead com mais de 20 anos de experiência em produtos digitais.",
  alternates: {
    canonical: "/trajetoria",
  },
  openGraph: {
    type: "website",
    url: "https://eduardopavani.com/trajetoria",
    title: "Trajetória | Eduardo Pavani",
    description:
      "Trajetória profissional de Eduardo Pavani — Product Lead com mais de 20 anos de experiência em produtos digitais.",
    siteName: "Eduardo Pavani",
    locale: "pt_BR",
    images: ["https://eduardopavani.com/images/img-profile-2.webp"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Trajetória | Eduardo Pavani",
    description:
      "Trajetória profissional de Eduardo Pavani — Product Lead com mais de 20 anos de experiência em produtos digitais.",
    creator: "@eduardopavanipro",
    images: ["https://eduardopavani.com/images/img-profile-2.webp"],
  },
};

export default function Page() {
  return <TrajetoriaPage />;
}

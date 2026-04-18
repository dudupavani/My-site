import "./public-theme.css";
import type { ReactNode } from "react";

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Eduardo Pavani",
  jobTitle: "Product Lead",
  url: "https://eduardopavani.com",
  sameAs: [
    "https://www.linkedin.com/in/eduardopavani/",
    "https://wa.me/5548991587232",
    "https://www.instagram.com/eduardopavanipro",
  ],
  description:
    "Product Lead focado em estratégia, clareza e execução na construção de produtos digitais.",
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Eduardo Pavani",
  url: "https://eduardopavani.com",
  description:
    "Estratégia, clareza e execução na construção de produtos digitais.",
};

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <div className="public-theme">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      {children}
    </div>
  );
}

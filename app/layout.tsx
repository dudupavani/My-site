import type { Metadata } from "next";
import Script from "next/script";

import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://eduardopavani.com.br"),
  title: "Eduardo Pavani - Product Manager Estratégico",
  description:
    "Eduardo Pavani - Product Manager Estratégico focado em estratégia, clareza e execução na construção de produtos digitais. Especialista em UX e gestão de produtos.",
  keywords: [
    "Product Manager",
    "Gestão de Produtos",
    "Eduardo Pavani",
    "UX Design",
    "Estratégia de Produto",
    "Produtos Digitais",
  ],
  authors: [{ name: "Eduardo Pavani" }],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "https://eduardopavani.com.br/",
    title: "Eduardo Pavani - Product Manager Estratégico",
    description:
      "Estratégia, clareza e execução na construção de produtos digitais. Conheça minha trajetória e visão sobre produto.",
    images: ["https://eduardopavani.com.br/images/img-profile-2.webp"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Eduardo Pavani - Product Manager Estratégico",
    description:
      "Estratégia, clareza e execução na construção de produtos digitais. Conheça minha trajetória e visão sobre produto.",
    images: ["https://eduardopavani.com.br/images/img-profile-2.webp"],
  },
  icons: {
    icon: "/images/favicon.svg",
  },
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Eduardo Pavani",
  jobTitle: "Product Manager Estratégico",
  url: "https://eduardopavani.com.br",
  sameAs: [
    "https://www.linkedin.com/in/eduardopavani/",
    "https://wa.me/5548991587232",
    "https://www.instagram.com/eduardopavanipro",
  ],
  description: "Estratégia, clareza e execução na construção de produtos digitais.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Google+Sans+Flex:opsz,wght@6..144,100..1000&display=swap"
          rel="stylesheet"
        />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }} />
      </head>
      <body className="bg-white">
        {/* GTM noscript — deve ser o primeiro elemento do body */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-W2H798B"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
            title="Google Tag Manager"
          />
        </noscript>

        {/* GTM script */}
        <Script id="gtm-script" strategy="afterInteractive">
          {`(function (w, d, s, l, i) {
      w[l] = w[l] || []; w[l].push({
        'gtm.start':
          new Date().getTime(), event: 'gtm.js'
      }); var f = d.getElementsByTagName(s)[0],
        j = d.createElement(s), dl = l != 'dataLayer' ? '&l=' + l : ''; j.async = true; j.src =
          'https://www.googletagmanager.com/gtm.js?id=' + i + dl; f.parentNode.insertBefore(j, f);
    })(window, document, 'script', 'dataLayer', 'GTM-W2H798B');`}
        </Script>

        {/* Lucide icons — usado pelas seções da home via data-lucide */}
        <Script src="https://unpkg.com/lucide@latest" strategy="afterInteractive" />

        {children}
      </body>
    </html>
  );
}

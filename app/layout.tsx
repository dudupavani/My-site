import type { Metadata } from "next";
import { Google_Sans_Flex } from "next/font/google";
import Script from "next/script";

import "./globals.css";
import "react-easy-crop/react-easy-crop.css";

const googleSansFlex = Google_Sans_Flex({
  subsets: ["latin"],
  variable: "--font-google-sans-flex",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://eduardopavani.com.br"),
  title: "Eduardo Pavani - Product Lead",
  description:
    "Eduardo Pavani - Product Lead focado em estratégia, clareza e execução na construção de produtos digitais.",
  keywords: [
    "Product Manager",
    "Product Lead",
    "Gestão de Produtos",
    "Eduardo Pavani",
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
    title: "Eduardo Pavani - Product Lead",
    description:
      "Eduardo Pavani - Product Lead focado em estratégia, clareza e execução na construção de produtos digitais.",
    images: ["https://eduardopavani.com.br/images/img-profile-2.webp"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Eduardo Pavani - Product Lead",
    description:
      "Eduardo Pavani - Product Lead focado em estratégia, clareza e execução na construção de produtos digitais.",
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
  jobTitle: "Product Lead",
  url: "https://eduardopavani.com.br",
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
  url: "https://eduardopavani.com.br",
  description:
    "Estratégia, clareza e execução na construção de produtos digitais.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={googleSansFlex.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
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

        {children}
      </body>
    </html>
  );
}

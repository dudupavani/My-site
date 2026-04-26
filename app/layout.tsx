import type { Metadata } from "next";
import { Google_Sans_Flex, Space_Mono } from "next/font/google";
import Script from "next/script";

import "./globals.css";
import "react-easy-crop/react-easy-crop.css";

const googleSansFlex = Google_Sans_Flex({
  subsets: ["latin"],
  variable: "--font-google-sans-flex",
  display: "swap",
  adjustFontFallback: false,
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono-family",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://eduardopavani.com"),
  icons: {
    icon: "/images/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${googleSansFlex.variable} ${spaceMono.variable}`}>
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

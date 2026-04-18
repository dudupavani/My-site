import path from "node:path";
import { fileURLToPath } from "node:url";

import type { NextConfig } from "next";

const currentDir = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  turbopack: {
    root: currentDir,
  },
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.eduardopavani.com" }],
        destination: "https://eduardopavani.com/:path*",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "eduardopavani.com.br" }],
        destination: "https://eduardopavani.com/:path*",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.eduardopavani.com.br" }],
        destination: "https://eduardopavani.com/:path*",
        permanent: true,
      },
      {
        source: "/wp-sitemap-posts-page-1.xml",
        destination: "/sitemap.xml",
        permanent: true,
      },
      {
        source: "/wp-sitemap.xml",
        destination: "/sitemap.xml",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

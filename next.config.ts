import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [
      { source: "/thanks", destination: "/#contact", permanent: true },
      { source: "/thanks.html", destination: "/#contact", permanent: true },
      { source: "/index.html", destination: "/", permanent: true },
      { source: "/blog/index.html", destination: "/blog", permanent: true },
      {
        source: "/project/:slug.html",
        destination: "/project/:slug",
        permanent: true,
      },
      {
        source: "/blog/:slug.html",
        destination: "/blog/:slug",
        permanent: true,
      },
    ];
  },
  async headers() {
    const headers = [{ key: "X-Content-Type-Options", value: "nosniff" }];
    if (
      process.env.VERCEL_ENV === "preview" ||
      process.env.PORTFOLIO_PREVIEW === "1"
    )
      headers.push({ key: "X-Robots-Tag", value: "noindex, nofollow" });
    return [{ source: "/:path*", headers }];
  },
};

export default nextConfig;

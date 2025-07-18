import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  compress: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "f003.backblazeb2.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "cdn.raize.io",
        port: "",
      },
    ],
  },

  // This is required to support PostHog trailing slash API requests
  skipTrailingSlashRedirect: true,

  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default withNextIntl(nextConfig);

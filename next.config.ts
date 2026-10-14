import type { NextConfig } from "next";

const nextConfig: NextConfig = {};

nextConfig.headers = async () => [{
  source: "/:path*",
  headers: [
    { key: "X-Content-Type-Options", value: "nosniff" },
    { key: "X-Frame-Options", value: "DENY" },
    { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
    { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
    { key: "X-Permitted-Cross-Domain-Policies", value: "none" },
  ],
}];

export default nextConfig;

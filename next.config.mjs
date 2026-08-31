import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    PAYPAL_CLIENT_ID: process.env.PAYPAL_CLIENT_ID,
  },
  turbopack: {
    root: __dirname,
  },
  async headers() {
    return [
      {
        source: "/Footer.js",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;


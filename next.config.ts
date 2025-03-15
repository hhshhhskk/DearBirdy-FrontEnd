import type { NextConfig } from "next";
import pwa from "next-pwa";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/api/auth/kakao",
        destination: "https://dev.dearbirdy.xyz/api/v1/auth/kakao",
      },
    ];
  },
  pwa: {
    dest: "public", // PWA 파일을 public 폴더에 배치
    register: true,
    skipWaiting: true,
  },
};

export default nextConfig;

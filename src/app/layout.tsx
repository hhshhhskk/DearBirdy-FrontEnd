import type { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local";
import Providers from "./providers";
import Head from "next/head";

const pretendard = localFont({
  src: "../app/fonts/PretendardVariable.woff2",
  display: "swap",
  weight: "45 920",
  variable: "--font-pretendard",
});

export const metadata: Metadata = {
  title: "DearBirdy",
  description: "편지로 연결되는 따뜻한 마음, 인생 선후배들의 만남",
  manifest: "/manifest.json",
  icons: [{ rel: "icon", url: "/logo_192.png", sizes: "192x192" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <Head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" sizes="192x192" href="/logo_192.png" />
        <link rel="apple-touch-icon" sizes="512x512" href="/logo_512.png" />
      </Head>
      <body
        className={`${pretendard.variable} font-pretendard w-full flex justify-center`}
      >
        {/* ✅ React Query Provider 적용 */}
        <main className="min-w-[375px] w-[375px] h-full bg-[#f9f8f3]">
          <Providers>{children}</Providers>
        </main>
      </body>
    </html>
  );
}

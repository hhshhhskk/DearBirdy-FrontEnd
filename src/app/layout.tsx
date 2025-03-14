import type { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local";
import Providers from "./providers";

const pretendard = localFont({
  src: "../app/fonts/PretendardVariable.woff2",
  display: "swap",
  weight: "45 920",
  variable: "--font-pretendard",
});

export const metadata: Metadata = {
  title: "DearBirdy",
  description: "편지로 연결되는 따뜻한 마음, 인생 선후배들의 만남",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
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

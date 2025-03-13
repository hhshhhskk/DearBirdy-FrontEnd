"use client";

import Limit from "@/components/home/Limit";
import Report from "@/components/home/Report";
import Footer from "@/components/ui/Footer";

export default function SharedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const report = false;
  const limit = false;

  return (
    <>
      {report && <Report />}
      {limit && <Limit />}
      <div className={`box-border font-pretendard min-h-screen min-w-[375px]`}>
        <div className="justify-center flex-1 w-full">{children}</div>
        <Footer />
      </div>
    </>
  );
}

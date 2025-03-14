"use client";
import Toggle from "@/components/letter/Toggle";
import { useLetterInfoStore } from "@/store/letterInfoStore";
import { birdNameMap } from "@/constants/birdNameMap"; // ✅ birdName 변환 맵 추가
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

// ✅ Lottie를 SSR에서 제외하여 클라이언트에서만 로드
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

const LetterReplyCompletePage: React.FC = () => {
  const router = useRouter();
  const [animationData, setAnimationData] = useState(null);
  const { nickname, birdName } = useLetterInfoStore();

  useEffect(() => {
    const loadAnimation = async () => {
      try {
        // ✅ 한글 birdName을 영문으로 변환
        const birdKey = birdNameMap[birdName] || "default";
        const animationModule = await import(
          `@/animations/${birdKey}_deliver.json`
        );
        setAnimationData(animationModule.default);
      } catch (error) {
        console.error("❌ Lottie 파일 로딩 실패:", error);
        setAnimationData(null); // 에러 발생 시 안전한 상태 유지
      }
    };

    loadAnimation();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="w-full min-h-screen bg-[#f9f8f3] flex flex-col px-4">
      <main className="flex flex-col justify-center items-center mt-[167px]">
        <div>
          <p className="text-[#292D32] text-center text-[20px] font-bold leading-[28px] tracking-[-0.08px]">
            버디가 {nickname}에게
            <br />
            마음을 정성껏 전달할 거에요
          </p>
        </div>
        {/* 애니메이션 */}
        <div className="flex justify-center items-center w-full h-[310px] mt-[48px]">
          {animationData ? (
            <Lottie
              animationData={animationData}
              style={{ width: 216, height: 167 }}
            />
          ) : (
            <p className="text-center text-[#6B7178]">
              애니메이션을 불러오는 중...
            </p>
          )}
        </div>
        <div className="absolute bottom-[44px]">
          <div className="rounded-[12px] border border-[#E5E5EA] bg-[#F0F1EC] flex w-[343px] p-[10px_16px] justify-between items-center mt-[80px]">
            <div className="flex flex-col items-start justify-start">
              <p className="text-[#6B7178] text-center text-[14px] font-normal leading-[22px] tracking-[-0.056px]">
                답장을 확인하면 고마움 표시가 도착해요.
              </p>
              <p className="text-[#6B7178] text-center text-[14px] font-normal leading-[22px] tracking-[-0.056px]">
                고마움 표시가 오면 알림을 받을까요?
              </p>
            </div>
            <Toggle />
          </div>
          <div
            className="w-[343px] p-[13px_16px] flex justify-center items-center gap-[8px] rounded-[8px] bg-[#292D32] mt-[17px] cursor-pointer"
            onClick={() => router.push("/home")}
          >
            <span className="text-[#E5E5EA] text-center text-[16px] font-medium leading-[24px] tracking-[-0.064px]">
              홈으로
            </span>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LetterReplyCompletePage;

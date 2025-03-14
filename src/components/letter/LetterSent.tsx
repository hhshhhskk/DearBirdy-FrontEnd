"use client";

import { birdNameMap } from "@/constants/birdNameMap"; // ✅ birdName 변환 맵 추가
import { useLetterStore } from "@/store/useLetterStore";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Toggle from "./Toggle";

// ✅ Lottie를 SSR에서 제외하여 클라이언트에서만 로드
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

export default function LetterSent() {
  const { myBirdName, setMyBirdName, selectedBird, resetLetter } =
    useLetterStore();
  const router = useRouter();
  const [animationData, setAnimationData] = useState(null);

  /** ✅ 페이지 진입 시 세션스토리지에서 사용자 새 이름을 가져옴 */
  useEffect(() => {
    const storedData = sessionStorage.getItem("userInfo");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      if (parsedData.birdName) {
        setMyBirdName(parsedData.birdName);
      }
    }
  }, [setMyBirdName]);

  /** ✅ 애니메이션 로드 */
  useEffect(() => {
    if (!myBirdName) return; // ✅ myBirdName이 없으면 실행하지 않음

    const birdKey = birdNameMap[myBirdName] || "parrot";
    import(`@/animations/${birdKey}_deliver.json`)
      .then((data) => setAnimationData(data.default))
      .catch((err) => console.error("❌ 애니메이션 로드 실패:", err));
  }, [myBirdName]); // ✅ myBirdName이 설정된 후 실행

  return (
    <div className="relative flex flex-col items-center h-screen text-black">
      {/* 상단 여백 */}
      <div className="mt-[167px] text-center">
        <p className="text-[#292D32] text-[20px] font-bold leading-[28px] tracking-[-0.08px]">
          나의 {myBirdName}가 {selectedBird}에게 <br />
          마음을 정성껏 전달할 거예요
        </p>
      </div>

      {/* 애니메이션 */}
      <div className="mt-[117px]">
        {animationData && (
          <Lottie
            animationData={animationData}
            style={{ width: 216, height: 167 }}
          />
        )}
      </div>

      {/* 안내 박스 */}
      <div className="absolute bottom-[44px]">
        <div className="mt-[171px] w-[343px] h-[64px] border border-[#E5E5EA] bg-[#F0F1EC] rounded-[12px] p-[10px] flex justify-between items-center">
          <div>
            <p className="text-[#6B7178] text-[14px] font-medium">
              빠르면 하루, 최대 7일이 걸릴 수 있어요.
            </p>
            <p className="text-[#6B7178] text-[14px] font-medium">
              답장이 오면 알림을 받을까요?
            </p>
          </div>
          <Toggle />
        </div>

        {/* 홈으로 버튼 */}
        <button
          className="w-[343px] h-[50px] bg-[#292D32] text-white text-[16px] font-semibold rounded-[12px] flex items-center justify-center mt-6 select-none cursor-pointer"
          onClick={() => {
            resetLetter();
            router.push("/home");
          }}
        >
          홈으로
        </button>
      </div>
    </div>
  );
}

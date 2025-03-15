"use client";

import dynamic from "next/dynamic";
import { useState, useEffect, useRef } from "react";
import { useSignupStore } from "@/store/useSignupStore";
import { useBirdyTestStore } from "@/store/useBirdyTestStore"; // ✅ Zustand 사용
import { Answer, processTestResults } from "@/util/birdyTestUtils";
import InfoBox from "@/components/common/InfoBox";
import BirdyResultCard from "./BirdyResultCard";
import loadingResult from "@/animations/loading_result.json";
import { LottieRefCurrentProps } from "lottie-react";

// ✅ Lottie를 동적으로 로드 (SSR 방지)
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

const BirdyTestLoading = () => {
  const { updateFormData, formData } = useSignupStore();
  const { answers } = useBirdyTestStore(); // ✅ Zustand에서 answers 가져오기
  const nickname = formData.nickname || "";
  const [isAnimationClicked, setIsAnimationClicked] = useState(false);
  const [showResultCard, setShowResultCard] = useState(false);
  const [birdType, setBirdType] = useState("");

  // ✅ useRef는 Lottie를 제어하기 위한 것이므로 그대로 유지
  const lottieRef = useRef<LottieRefCurrentProps | null>(null);

  useEffect(() => {
    if (!answers || answers.length === 0) return; // ✅ answers가 undefined 또는 빈 배열일 경우 실행 방지

    try {
      // ✅ answers를 Answer[] 타입으로 변환 (값이 올바른지 검증)
      const safeAnswers: Answer[] = answers.map((answer) => {
        if (![0, 1, 2].includes(answer))
          throw new Error("Invalid answer value");
        return answer as Answer;
      });

      // ✅ 결과 계산 및 저장
      const response = processTestResults(safeAnswers);
      // console.log("response", response);
      updateFormData({ birdName: response.result.name });
      setBirdType(response.result.name);
    } catch (error) {
      console.error("❌ BirdyTestLoading: answers 처리 중 오류 발생", error);
    }
  }, [answers, updateFormData]);

  // ✅ 애니메이션 완료 핸들러
  const handleAnimationComplete = () => {
    setShowResultCard(true);
  };

  // ✅ 알 애니메이션 클릭 핸들러
  const handleAnimationClick = () => {
    if (!isAnimationClicked) {
      setIsAnimationClicked(true);

      if (lottieRef.current) {
        lottieRef.current.play();
      }
    }
  };

  return (
    <div className="inset-0 z-50 flex flex-col items-center">
      {/* ✅ InfoBox와 안내 텍스트 - 클릭 전에만 표시 */}
      {!isAnimationClicked && (
        <>
          <div className="mt-2">
            <InfoBox
              imageSrc="/images/signup/bluebird-3.svg"
              altText="버디테스트 아이콘"
              text={`${nickname}님과 찰떡 궁합인 버디가 태어날 준비를 하고 있어요. 우리 버디를 응원해주세요!`}
            />
          </div>

          <p className="text-xl font-bold text-center text-[#292D32] mt-[48px]">
            알을 눌러서 버디를 깨워주세요!
          </p>
        </>
      )}

      {/* ✅ 애니메이션 컨테이너 */}
      <div
        className={` w-[242px] cursor-pointer mt-[50px]
          ${!isAnimationClicked ? "mt-[-.625rem]" : ""} 
          ${
            isAnimationClicked
              ? "fixed top-[calc(50%-44px)] left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-0"
              : ""
          }
        `}
        onClick={!isAnimationClicked ? handleAnimationClick : undefined}
      >
        <Lottie
          lottieRef={lottieRef}
          animationData={loadingResult}
          loop={false}
          autoplay={false}
          onComplete={handleAnimationComplete}
          rendererSettings={{
            preserveAspectRatio: "xMidYMid slice",
          }}
          style={{
            height: isAnimationClicked ? "852px" : "241px",
            width: "242px",
            marginTop: isAnimationClicked ? "-44px" : "0px",
          }}
        />
      </div>

      {/* ✅ 결과 카드 - 애니메이션 위에 표시 */}
      {showResultCard && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center">
          <BirdyResultCard birdType={birdType} />
        </div>
      )}
    </div>
  );
};

export default BirdyTestLoading;

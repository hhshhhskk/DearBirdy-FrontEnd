"use client";

import Image from "next/image";
import InfoBox from "../../common/InfoBox";
import NextButton from "../../common/NextButton";
import { useSignupStore } from "@/store/useSignupStore";
import { useEffect } from "react";
import SignupNav from "../SignupNav";

interface BirdyTestIntroProps {
  onStart: () => void;
}

const BirdyTestIntro: React.FC<BirdyTestIntroProps> = ({ onStart }) => {
  const { setHideNav } = useSignupStore(); // ✅ Zustand에서 `hideNav` 상태 변경 함수 가져오기
  // Zustand 스토어에서 사용자 닉네임 가져오기
  const { formData } = useSignupStore();
  const nickname = formData.nickname || ""; // 닉네임이 없을 경우 빈 문자열로 처리

  useEffect(() => {
    // ✅ `BirdyResultCard` 실행 시 `SignupNav` 숨김
    setHideNav((prev: boolean) => {
      if (!prev) return true; // ✅ 상태가 false일 때만 업데이트 (무한 루프 방지)
      return prev;
    });

    return () => {
      setHideNav(false); // ✅ 언마운트될 때 `SignupNav` 다시 표시
    };
  }, [setHideNav]);

  return (
    <div className="relative h-screen">
      <SignupNav />
      <div className="mt-2">
        {/* InfoBox 컴포넌트 적용 */}
        <InfoBox
          imageSrc="/images/signup/bluebird-2.svg"
          altText="버디테스트 아이콘"
          text={`당신에 대해 더 많은 것들이 궁금해요! ${nickname}님만의 소중한 버디를 함께 알아보는 거 어때요?`}
        />

        {/* 메인 이미지 영역 */}
        <div className="mt-[125px] flex justify-center">
          <Image
            src="/images/birdy-test/intro.png"
            alt="버디테스트 인트로"
            width={274}
            height={256}
          />
        </div>

        {/* 다음 버튼 */}
        <div className="absolute flex justify-center bottom-[44px]  min-w-[343px]">
          <NextButton text="좋아요!" onClick={onStart} />
        </div>
      </div>
    </div>
  );
};

export default BirdyTestIntro;

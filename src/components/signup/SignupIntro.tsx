"use client";

import { useSignupStore } from "@/store/useSignupStore";
import Background from "../common/Background";
import NextButton from "../common/NextButton";

const SignupIntro = () => {
  const { nextStep } = useSignupStore(); // ✅ Zustand 상태 사용
  return (
    <div className="w-full h-full">
      <div>
        {/* 인트로 텍스트 */}
        <div className="text-center ">
          <p className="whitespace-pre-wrap text-2xl font-bold leading-[30px] tracking-tighter mt-4">
            {`안녕? 반가워요\n나는 편지를 전하는 파랑새에요`}
          </p>
          <p className="text-lg font-normal leading-[26px] tracking-[-0.072px] mt-3">
            진솔하게 털어 놓은 고민이 잘 전달될 수 있도록 몇 가지 질문에 답변
            부탁드려요
          </p>
        </div>
        <div className="relative mx-auto mt-16 h-66 w-72">
          <Background
            src="/images/common/background_bluebird.png"
            alt="background_main"
            className="absolute w-full h-full"
          />
        </div>

        {/* ✅ NextButton 적용 */}
        <div className="absolute bottom-[44px] flex justify-center">
          <NextButton text="좋아요" onClick={nextStep} />
        </div>
      </div>
    </div>
  );
};

export default SignupIntro;

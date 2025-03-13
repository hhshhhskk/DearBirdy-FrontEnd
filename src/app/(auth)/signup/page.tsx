"use client";

import { useEffect } from "react";
import BirdyTest from "@/components/signup/birdytest/BirdyTest";
import CategoryStep from "@/components/signup/CategoryStep";
import CompleteStep from "@/components/signup/CompleteStep";
import NicknameStep from "@/components/signup/NicknameStep";
import RoleStep from "@/components/signup/RoleStep";
import SignupIntro from "@/components/signup/SignupIntro";
import SignupNav from "@/components/signup/SignupNav";
import { useSignupStore } from "@/store/useSignupStore";
import { useBirdyTestStore } from "@/store/useBirdyTestStore";

import { useRouter } from "next/navigation"; // ✅ useRouter import

const SignUp = () => {
  const router = useRouter(); // ✅ useRouter 사용
  const { step, setStep, hideNav } = useSignupStore();
  const { setTestStep } = useBirdyTestStore();

  useEffect(() => {
    const savedSignupState = sessionStorage.getItem("signup-storage");
    if (savedSignupState) {
      try {
        setStep(JSON.parse(savedSignupState).state.step);
      } catch (error) {
        console.error("❌ SignUp: sessionStorage 데이터 복원 오류", error);
      }
    }

    const savedBirdyTestState = sessionStorage.getItem("birdytest-storage");
    if (savedBirdyTestState) {
      try {
        setTestStep(JSON.parse(savedBirdyTestState).state.testStep);
      } catch (error) {
        console.error("❌ SignUp: BirdyTest sessionStorage 복원 오류", error);
      }
    }
  }, [setStep, setTestStep, router]); // ✅ router 추가

  return (
    <div className="w-full h-screen px-4">
      {!hideNav && step !== 4 && <SignupNav />}
      {step === 0 && <SignupIntro />}
      {step === 1 && <NicknameStep />}
      {step === 2 && <RoleStep />}
      {step === 3 && <CategoryStep />}
      {step === 4 && <CompleteStep />}
      {step === 5 && <BirdyTest />}
    </div>
  );
};

export default SignUp;

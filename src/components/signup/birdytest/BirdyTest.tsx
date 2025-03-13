"use client";

import { useEffect } from "react";
import BirdyTestIntro from "./BirdyTestIntro";
import BirdyTestStep from "./BirdyTestStep";
import BirdyTestLoading from "./BirdyTestLoading";
import { useBirdyTestStore } from "@/store/useBirdyTestStore";
import { Answer } from "@/constants/birdyTestQuestions";

const BirdyTest = () => {
  const { testStep, setTestStep, setAnswer, calculateResults } =
    useBirdyTestStore();

  // ✅ 새로고침 시 `sessionStorage`에서 `testStep` 값을 불러오기
  useEffect(() => {
    const savedTestStep = sessionStorage.getItem("birdytest-storage");
    if (savedTestStep) {
      try {
        setTestStep(JSON.parse(savedTestStep).state.testStep);
      } catch (error) {
        console.error("❌ BirdyTest: sessionStorage 데이터 복원 오류", error);
      }
    }
  }, [setTestStep]);

  const handleAnswer = (answer: Answer) => {
    setAnswer(testStep - 1, answer); // ✅ 응답 저장
    if (testStep === 12) {
      calculateResults(); // ✅ 마지막 질문에 도달하면 결과 계산
      setTestStep(13);
    } else {
      setTestStep(testStep + 1);
    }
  };

  return (
    <div className="flex justify-center w-full">
      {testStep === 0 && <BirdyTestIntro onStart={() => setTestStep(1)} />}
      {testStep > 0 && testStep <= 12 && (
        <BirdyTestStep step={testStep} onAnswer={handleAnswer} />
      )}
      {testStep === 13 && <BirdyTestLoading />}
    </div>
  );
};

export default BirdyTest;

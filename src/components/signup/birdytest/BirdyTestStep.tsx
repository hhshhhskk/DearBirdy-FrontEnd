"use client";

import { Answer, questions } from "@/constants/birdyTestQuestions";
import { useEffect, useState } from "react";

interface BirdyTestStepProps {
  step: number;
  onAnswer: (answer: Answer) => void;
}

const BirdyTestStep = ({ step, onAnswer }: BirdyTestStepProps) => {
  const question = questions[step - 1];
  const [selected, setSelected] = useState<number | null>(null);

  // ✅ 단계 변경 시 선택 상태 초기화
  useEffect(() => {
    setSelected(null);
  }, [step]);

  const handleSelect = (answer: number) => {
    setSelected(answer);

    // ✅ 선택 후 다음 질문으로 이동
    setTimeout(() => {
      onAnswer(answer as Answer);
    }, 300);
  };

  return (
    <div className="w-full">
      {/* 프로그레스 단계 숫자 표시 */}
      <div className="flex justify-center mt-2.5">
        <span className="text-[14px] text-[#6B7178]"> {step}/12</span>
      </div>

      {/* 프로그레스 바 */}
      <div className="w-full bg-[#E5E5EA] h-2 mt-1.5 rounded-full overflow-hidden">
        <div
          className="h-full bg-[#84A667] transition-all duration-300"
          style={{ width: `${(step / 12) * 100}%` }}
        />
      </div>

      {/* 질문 단계 표시 */}
      <div className="flex justify-center mt-[30px]">
        <span className="text-xs text-[#6B7178]">질문 {step}</span>
      </div>

      {/* 질문 */}
      <p className="text-[#292D32] text-xl font-bold leading-[28px] tracking-[-0.08px] whitespace-pre-wrap text-center mt-1 mb-16">
        {question.text}
      </p>

      {/* 답변 선택 */}
      <div className="flex flex-col gap-2 mt-12">
        {question.options.map((option) => (
          <button
            key={option.value}
            className={`flex select-none items-center w-full h-[80px] px-4 py-5 rounded-[20px] border cursor-pointer transition-all ${
              selected === option.value
                ? "bg-[#84A667] text-white border-[#84A667]"
                : "border-[#F4F5EF] bg-white hover:border-[#84A667]"
            }`}
            onClick={() => handleSelect(option.value)}
          >
            <span className="mr-2 text-xl">{option.emoji}</span>
            <span className="text-base font-medium">{option.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default BirdyTestStep;

"use client";

import { useSignupStore } from "@/store/useSignupStore";
import { useState } from "react";
import InfoBox from "../common/InfoBox";
import NextButton from "../common/NextButton";
import TermsStep from "./TermsStep"; // ✅ 약관 동의 모달 추가
import RoleCard from "./RoleCard";

const RoleStep = () => {
  const { updateFormData, nextStep } = useSignupStore();
  const [selectedRole, setSelectedRole] = useState<"MENTEE" | "MENTOR" | null>(
    null
  );
  const [isTermsOpen, setIsTermsOpen] = useState(false); // ✅ 약관 동의 모달 상태

  /** ✅ 역할 선택 핸들러 */
  const handleSelectRole = (role: "MENTEE" | "MENTOR") => {
    setSelectedRole(role);
  };

  /** ✅ "다음" 버튼 클릭 시 */
  const handleNextStep = () => {
    if (selectedRole) {
      updateFormData({ userRole: selectedRole }); // ✅ Zustand에 역할 저장
      setIsTermsOpen(true); // ✅ 약관 동의 모달 열기
    }
  };

  /** ✅ 약관 동의 모달 닫기 핸들러 */
  const handleTermsClose = () => {
    setIsTermsOpen(false);
    if (selectedRole === "MENTEE") {
      nextStep();
    }
    nextStep(); // ✅ 다음 단계(CategoryStep)로 이동
  };

  return (
    <div className="mt-2">
      {/* ✅ InfoBox 컴포넌트 적용 */}
      <InfoBox
        imageSrc="/images/signup/bluebird-2.svg"
        altText="역할 선택 아이콘"
        text="고민 상담이 필요한 후배와 들어줄 선배 중 어느 쪽에 해당하는지 궁금해요."
      />

      <div>
        {/* ✅ 역할 선택 영역 */}
        <div className="flex justify-center gap-[7px] mt-14">
          <RoleCard
            role="MENTEE"
            selectedRole={selectedRole}
            onSelect={handleSelectRole}
            imageSrc="/images/role/mentee.svg"
            description1="조언을 듣고 싶은"
            description2="2040"
            title="인생후배"
          />

          <RoleCard
            role="MENTOR"
            selectedRole={selectedRole}
            onSelect={handleSelectRole}
            imageSrc="/images/role/mentor.svg"
            description1="조언을 해주고픈"
            description2="5060"
            title="인생선배"
          />
        </div>

        {/* ✅ 다음 버튼 */}
        <div
          className={`absolute bottom-10 flex justify-center ${
            isTermsOpen ? "opacity-0 pointer-events-none" : ""
          }`}
        >
          <NextButton
            text="다음"
            onClick={handleNextStep}
            disabled={!selectedRole}
          />
        </div>
      </div>

      {/* ✅ 약관 동의 모달 */}
      {isTermsOpen && <TermsStep isModal={true} onClose={handleTermsClose} />}
    </div>
  );
};

export default RoleStep;

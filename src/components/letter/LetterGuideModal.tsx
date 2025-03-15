"use client";

import Image from "next/image";
import { GuideType, LETTER_GUIDES } from "@/constants/letterGuide";

interface LetterGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: GuideType;
}

export default function LetterGuideModal({
  isOpen,
  onClose,
  type,
}: LetterGuideModalProps) {
  if (!isOpen) return null;

  const guide = LETTER_GUIDES[type];

  return (
    <div className="">
      {/* ✅ 배경 오버레이 (rgba(51, 51, 51, 0.80)) 적용 */}
      <div
        className="fixed inset-0 z-40"
        style={{ backgroundColor: "rgba(51, 51, 51, 0.80)" }}
      ></div>

      {/* ✅ 모달 컨테이너 (최소 높이 472px로 설정) */}

      <div
        className={`fixed flex-grow bottom-0 left-1/2 transform -translate-x-1/2 w-[376px] min-h-[472px] bg-white shadow-lg rounded-t-[30px] z-50 transition-transform duration-500 flex flex-col px-4 py-6 ${
          isOpen ? "animate-slide-up" : "translate-y-full opacity-0"
        }`}
      >
        <div className="flex flex-col items-center justify-center">
          <div className="flex justify-end w-full" onClick={onClose}>
            <Image
              src="/images/icons/close_icon.svg"
              alt="닫기 아이콘"
              width={24}
              height={24}
              className="cursor-pointer"
            />
          </div>
          <div className="flex flex-col items-center justify-center gap-2 mt-4">
            {/* 가이드 이미지 */}
            <Image
              src="/images/common/guide.png"
              alt="가이드"
              className="mx-auto"
              width={60}
              height={60}
            />

            {/* 가이드 문구 */}
            <p className="text-[16px] text-[#292D32] font-semibold">
              {guide.title}
            </p>
            {/* 가이드 서브 문구 */}
            <p className="text-[#292D32] text-center font-pretendard text-[16px] font-normal leading-6 tracking-[-0.064px]">
              {guide.subtitle}
            </p>
          </div>

          {/* 가이드 팁 */}
          <div className="mt-4 p-[14px] rounded-[14px] border border-[#F0F1EC] bg-[#F9F8F3]">
            <p className="text-[#6B7178] font-pretendard text-[14px] font-bold leading-5 tracking-[-0.056px]">
              {guide.guideTitle}
            </p>
            <p className="text-[#292D32] font-pretendard text-[16px] font-normal leading-6 tracking-[-0.064px] mt-2">
              {guide.tips.map((tip, index) => (
                <span key={index}>
                  - {tip}
                  <br />
                </span>
              ))}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

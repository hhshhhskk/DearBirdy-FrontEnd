"use client";

import Image from "next/image";
import { GuideType, LETTER_GUIDES } from "@/constants/letterGuide";

interface LetterGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: GuideType;
}

export default function LetterGuideModalSenior({
  isOpen,
  onClose,
  type,
}: LetterGuideModalProps) {
  if (!isOpen) return null;

  const guide = LETTER_GUIDES[type];

  return (
    <div className="-">
      {/* ✅ 배경 오버레이 (rgba(51, 51, 51, 0.80)) 적용 */}
      <div
        className="fixed inset-0 z-40"
        style={{ backgroundColor: "rgba(51, 51, 51, 0.80)" }}
        onClick={onClose} // ✅ 오버레이 클릭 시 모달 닫기
      ></div>

      {/* ✅ 모달 컨테이너 (최소 높이 472px로 설정) */}

      <div
        className={`fixed flex-grow bottom-0 min-h-[472px] w-full bg-white shadow-lg rounded-t-[30px] z-50 transition-transform duration-500 flex flex-col px-4 py-6 ${
          isOpen ? "animate-slide-up" : "translate-y-full opacity-0"
        }`}
      >
        <div className="flex flex-col items-center justify-center gap-4">
          <div className="flex justify-end w-full">
            <button
              className="cursor-pointer w-[24px] h-[24px]"
              onClick={onClose}
            >
              ✖
            </button>
          </div>
          <div className="flex flex-col items-center justify-center gap-2">
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
            <p className="text-[#6B7178] text-sm font-normal leading-5 tracking-[-0.056px]">
              {guide.subtitle}
            </p>
          </div>

          {/* 가이드 팁 */}
          <div className="mt-4 bg-gray-100 rounded-[14px] p-4">
            <p className="text-[#6B7178] font-medium">{guide.guideTitle}</p>
            <p className="text-[#292D32] text-sm mt-2 leading-relaxed">
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

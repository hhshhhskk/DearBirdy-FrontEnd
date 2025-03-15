"use client";

import LetterProgress from "@/components/letter/LetterProgress";
import ReplyGuide from "@/components/letter/ReplyGuide";
import ReplyPreview from "@/components/letter/ReplyPreview";
import { postReply } from "@/services/letterReply";
import { useLetterInfoStore } from "@/store/letterInfoStore";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";

interface FormValues {
  title: string;
  letter: string;
}

const ReplyPage: React.FC = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  // ✅ 스크롤을 따라가기 위한 ref 추가
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);

  const [charCount, setCharCount] = useState<string>("");

  const [previewModal, setPreviewModal] = useState(false);

  const [guideModal, setGuideModal] = useState(false);
  const { categoryName, letterStatusSeq } = useLetterInfoStore();

  const handleChange = (value: string) => {
    if (value.length <= 300) {
      setCharCount(value);
      textAreaRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  };

  const onSubmit = async (data: FormValues) => {
    const replyForm = {
      ...data,
      categoryName,
      letterStatusSeq,
    };

    console.log("최종 전송 데이터:", replyForm);

    await postReply(replyForm);
    router.push("/reply/complete");
  };

  return (
    <div className="relative w-full min-h-screen bg-[#f9f8f3] flex flex-col px-4">
      {previewModal && <ReplyPreview setPreviewModal={setPreviewModal} />}
      {guideModal && <ReplyGuide setGuideModal={setGuideModal} />}
      <header className="fixed top-0 min-w-[343px] h-[56px] flex justify-between items-center ">
        <Image
          src="/images/icons/arrow_left_icon.svg"
          alt="왼쪽 방향 아이콘"
          width={24}
          height={24}
          className=""
          onClick={() => router.back()}
        />
        <div
          className={`flex h-10 px-4 py-2 items-center gap-1 rounded-[10px] ${
            charCount.length >= 30
              ? "bg-[#84A667] cursor-pointer"
              : "bg-[#D1D1D6]"
          }`}
          onClick={() => {
            if (charCount.length >= 30) {
              handleSubmit(onSubmit)();
            }
          }}
        >
          <span
            className={`text-center text-sm font-medium leading-[20px] tracking-[-0.056px] ${
              charCount.length >= 30 ? "text-[#F0F1EC]" : "text-[#8E8E93]"
            } `}
          >
            다음
          </span>
        </div>
      </header>
      <main className="flex flex-col items-center justify-center mt-[64px]">
        <div className="flex items-center justify-start w-full mt-2.5">
          <p className="text-[#292D32] text-xl font-bold leading-7 tracking-[-0.08px]">
            {categoryName}에 대한 고민을 보내온 마음에
            <br />
            답장을 써주세요
          </p>
        </div>
        <div
          className="flex items-center justify-start w-full mt-[7px]"
          onClick={() => setGuideModal(true)}
        >
          <p className="cursor-pointer text-[#84A667] text-center text-sm font-medium leading-5 tracking-[-0.056px] underline">
            답장 이렇게 쓰세요
          </p>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col mt-[13px]"
        >
          {/* 제목 입력 필드 */}
          <div className="flex w-[375px] p-4 flex-col items-start border-b border-[#E5E5EA]">
            <input
              {...register("title", {
                required: "편지 제목을 입력 해 주세요",
              })}
              placeholder="이 편지의 제목을 알려주세요"
              className="text-[#292D32] placeholder-[#C7C7CC] text-[16px] font-medium leading-6 tracking-[-0.064px] 
              focus:outline-none"
            />
            {errors.title && (
              <p className="text-sm text-red-500">{errors.title.message}</p>
            )}
          </div>

          {/* 내용 필드 */}
          <div className="flex w-[375px] min-h-[392px] p-4 flex-col">
            <textarea
              maxLength={300}
              {...register("letter", {
                required: "편지 내용을 입력해주세요",
              })}
              ref={(e) => {
                textAreaRef.current = e;
                register("letter").ref(e);
              }}
              placeholder="편지 내용을 입력해주세요"
              className="text-[#292D32] placeholder-[#C7C7CC] text-[16px] font-medium leading-6 tracking-[-0.064px] min-h-[280px] focus:outline-none resize-none"
              onChange={(e) => handleChange(e.target.value)}
            />
            {errors.letter && (
              <p className="text-sm text-red-500">{errors.letter.message}</p>
            )}
          </div>
          {/* 편지 다시보기 버튼*/}
          <div
            className="flex justify-end w-full cursor-pointer"
            onClick={() => setPreviewModal(true)}
          >
            <div
              className="flex w-[128px] h-[37px] justify-center items-center gap-[4px]
rounded-[10px] border border-[#84A667] bg-white shadow-[1px_1px_8px_0px_#D2D4CB] mr-4"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="25"
                viewBox="0 0 24 25"
                fill="none"
              >
                <path
                  d="M16.5 19.5H7.5C4.8 19.5 3 18.2647 3 15.3824V9.61765C3 6.73529 4.8 5.5 7.5 5.5H16.5C19.2 5.5 21 6.73529 21 9.61765V15.3824C21 18.2647 19.2 19.5 16.5 19.5Z"
                  stroke="#84A667"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M18 9.5L14.244 11.9077C13.008 12.6974 10.98 12.6974 9.74399 11.9077L6 9.5"
                  stroke="#84A667"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="text-[#84A667] text-center text-[14px] font-medium leading-[20px] tracking-[-0.056px]">
                편지 다시 보기
              </span>
            </div>
          </div>
          {/* 프로그레스바 컴포넌트 적용 */}
          <div className="px-4">
            <LetterProgress letterLength={charCount.trim().length} />
          </div>
        </form>
      </main>
    </div>
  );
};

export default ReplyPage;

"use client";
import { IData } from "@/app/letter-detail/[id]/page";
import { birdNameMap } from "@/constants/birdNameMap";
import { getLetterDetail } from "@/services/letterDetail";
import { useLetterInfoStore } from "@/store/letterInfoStore";
import Image from "next/image";
import React, { useEffect, useState } from "react";

interface IProps {
  setPreviewModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const ReplyPreview: React.FC<IProps> = ({ setPreviewModal }) => {
  const [letter, setLetter] = useState<IData | undefined>(undefined);
  const { letterStatusSeq } = useLetterInfoStore();
  useEffect(() => {
    const fetchLetterDetail = async () => {
      try {
        if (letterStatusSeq) {
          const id = `${letterStatusSeq}`;
          const data = await getLetterDetail(id);
          setLetter(data);
        } else {
          console.error("ID가 없습니다.");
        }
      } catch (error) {
        console.error("편지 상세 정보 가져오기 실패:", error);
      }
    };
    fetchLetterDetail();
  }, [letterStatusSeq]);

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);

    const month = date.getMonth() + 1; // 월은 0부터 시작하므로 1을 더해줍니다.
    const day = date.getDate();
    const hours = date.getHours();

    // 시간에 따라 아침, 점심, 저녁 구분
    let timeOfDay = "";
    if (hours >= 6 && hours < 12) {
      timeOfDay = "아침";
    } else if (hours >= 12 && hours < 14) {
      timeOfDay = "점심";
    } else if (hours >= 14 && hours < 19) {
      timeOfDay = "저녁";
    } else {
      timeOfDay = "밤";
    }

    const hour = hours % 12 || 12; // 12시간제 포맷으로 변환

    return `${month}월 ${day}일, ${timeOfDay} ${hour}시의 마음`;
  };

  let replyDate = "";

  if (letter?.replyLetter !== null) {
    replyDate = formatDate(letter?.replyLetter?.creatAt ?? "");
  }

  return (
    <div className="absolute inset-0 z-10 flex items-center justify-center w-full h-screen">
      {/* 오버레이 */}
      <div className="absolute inset-0  z-20 bg-[rgba(51,51,51,0.80)]">
        <div
          className="cursor-pointer flex justify-end w-full  mt-[59px] pr-[16px] "
          onClick={() => setPreviewModal(false)}
        >
          <Image
            src="/images/icons/close_white_icon.svg"
            alt="닫기 아이콘"
            width={24}
            height={24}
          />
        </div>
      </div>

      {/* 모달 */}
      <div className="flex z-30 w-[343px] h-[550px] p-[24px_16px] flex-col items-start gap-[10px] rounded-[30px] border border-[#F4F5EF] bg-white">
        <div className="flex items-end justify-start gap-2">
          <Image
            src={`/images/birds/${
              letter && birdNameMap[letter.replyLetter.replyUserBird]
            }_50.svg`}
            alt="프로필 새 50"
            width={50}
            height={50}
          />
          <p className="text-[#000] text-[23px] font-bold leading-[27.6px] iceJaram-Rg">
            Dear. {letter?.replyLetter.replyUser}
          </p>
          <span className="p-[1px_6px] rounded-[6px] bg-[#E5E5EA] text-[#6B7178] text-center text-[14px] font-medium leading-[20px] tracking-[-0.056px]">
            {letter?.replyLetter.categoryName}
          </span>
        </div>
        <div className="w-full h-[380px] text-[#292D32] text-[16px] font-normal leading-[24px] tracking-[-0.064px]">
          {letter?.replyLetter.letter}
        </div>
        <p className="text-[#8E8E93] text-right text-[12px] font-normal leading-[16px] tracking-[-0.048px]">
          {replyDate}
        </p>
        <span className="text-[#292D32] text-right font-[Sandoll BaikzongyulPil] text-[18px] font-bold leading-[21.6px] iceJaram-Rg">
          from. {letter?.replyLetter.sendUser}
        </span>
      </div>
    </div>
  );
};

export default ReplyPreview;

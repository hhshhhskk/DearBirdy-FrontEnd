import Image from "next/image";
import React from "react";

interface IProps {
  setGuideModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const ReplyGuide: React.FC<IProps> = ({ setGuideModal }) => {
  return (
    <>
      <div className="absolute inset-0 z-10 bg-[rgba(51,51,51,0.80)]"></div>
      <div className="fixed left-1/2 transform -translate-x-1/2 bottom-0 z-20 flex w-[376px] p-[24px_16px_44px_16px] flex-col items-center  rounded-t-[30px] rounded-b-none bg-[#FFF]">
        <div
          className="flex justify-end w-full"
          onClick={() => setGuideModal(false)}
        >
          <Image
            src="/images/icons/close_icon.svg"
            alt="닫기 아이콘"
            width={24}
            height={24}
            className="cursor-pointer"
          />
        </div>
        <div>
          <Image
            src="/images/birds/guide_bird.svg"
            alt="가이드 새 이미지"
            width={60}
            height={60}
          />
        </div>
        <span className="text-[#292D32] text-center text-[16px] font-bold leading-[24px] tracking-[-0.064px] mt-2">
          답장 가이드
        </span>
        <p className="text-[#292D32] text-center text-[16px] font-normal leading-[24px] tracking-[-0.064px] mt-2">
          지쳐있는 인생후배에게 어떻게 힘을 줄 수 있을까요?
        </p>
        <div className="flex p-[14px] flex-col items-start gap-[8px] rounded-[14px] border border-[#F0F1EC] bg-[#F9F8F3]">
          <p className="text-[#6B7178] text-[14px] font-bold leading-[20px] tracking-[-0.056px]">
            여러분의 따뜻한 답장이 큰 힘이 됩니다.
          </p>
          <p className="text-[#292D32] text-[16px] font-normal leading-[24px] tracking-[-0.064px]">
            -상대 방의 상황과 감정에 공감해주세요.
            <br />
            -용기를 낼 수 있는 말들을 해주세요.
            <br />
            -인생후배들이 존재 자체로 소중하다는 걸 알 수 있도록 힘을 주세요.
            <br />
            -인생후배들이 아직 하지 못한 선배 버디님의 경험을 나눠주세요.
            <br />
            -진심 어린 응원과 지혜를 나눠주세요. 짧은 답장도 충분히 가치가
            있어요.
          </p>
        </div>
      </div>
    </>
  );
};

export default ReplyGuide;

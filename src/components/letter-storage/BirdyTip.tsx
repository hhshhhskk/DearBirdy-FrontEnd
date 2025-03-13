"use client";
import { birdNameMap } from "@/constants/birdNameMap";
import { birdyTip } from "@/services/letterStorage";
import Image from "next/image";
import React, { useEffect, useState } from "react";

interface IData {
  birdName: string;
  tip: string;
}

const BirdyTip: React.FC = () => {
  const [tip, setTip] = useState<IData>();
  const birdKey =
    tip?.birdName && birdNameMap[tip?.birdName]
      ? birdNameMap[tip?.birdName]
      : "default";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await birdyTip();
        setTip(data.data);
      } catch (error) {
        console.error("버디팁 불러오기 실패:", error);
      } finally {
      }
    };

    fetchData();
  }, []);

  if (!tip) return;

  return (
    <div className="flex flex-col p-[20px_24px] justify-center items-start rounded-[16px] bg-[#FFF] mt-4 px-6 py-5">
      <div className="flex items-center w-full gap-4">
        <Image
          src={`/images/birds/${birdKey}_tip.svg`}
          alt="버디팁 새 프로필"
          width={61}
          height={60}
          className="w-[68px] h-[68px]"
        />
        <div>
          <span className="text-[#6B7178] text-[12px] leading-[16px] tracking-[-0.048px]">
            버디팁
          </span>
          <p className="text-[#292D32] text-[14px] leading-[20px] tracking-[-0.056px] font-bold font-pretendard">
            {tip?.tip}
          </p>
        </div>
      </div>
    </div>
  );
};

export default BirdyTip;

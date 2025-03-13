"use client";

import Image from "next/image";
import { birdNameMap } from "@/constants/birdNameMap"; // ✅ 외부에서 불러오기
import { IUserData } from "@/app/(footershare)/home/page";

interface IProps {
  userData?: IUserData;
}
const ProfileSection: React.FC<IProps> = ({ userData }) => {
  const roleText = userData?.roleName === "MENTEE" ? "인생후배" : "인생선배";

  // ✅ 한글 → 영문 변환 후 이미지 경로 설정
  const getImageSrc = (birdName: string) => {
    const englishName = birdNameMap[birdName] || "default";

    return `/images/letter-slide/${englishName}_profile.png`;
  };

  if (!userData) return <span>로딩중...</span>;

  return (
    <div className="mx-auto">
      {/* 상단 프로필 이미지 */}
      <div className="mt-[123px]">
        <Image
          src={getImageSrc(userData.birdName)}
          alt="프로필 이미지"
          width={184}
          height={184}
          className="rounded-full"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              "/images/letter-slide/default_profile.png";
          }} // ✅ 이미지 로드 실패 시 기본 이미지 적용
        />
      </div>

      <div className="w-[184px] h-[62px]">
        {/* ✅ 닉네임 적용 */}
        <p className="text-[#F9F8F3] text-center text-[20px] font-medium leading-[28px] tracking-[-0.08px] mt-2.5">
          {userData?.nickname}
        </p>

        {/* 새 이름 & 역할 */}
        <div className="flex items-center justify-center gap-[6px] mt-2">
          <p className="text-[#F9F8F3] text-[16px] font-medium">
            {userData?.birdName}
          </p>
          <div className="bg-[#E6FFE9] text-[#26632C] text-[14px] font-medium leading-[20px] tracking-[-0.056px] px-3 py-1 rounded-[6px]">
            {roleText}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSection;

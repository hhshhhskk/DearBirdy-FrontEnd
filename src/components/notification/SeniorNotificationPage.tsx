import { INotification } from "@/app/notification-box/page";
import { birdNameMap } from "@/constants/birdNameMap";
import { useLetterInfoStore } from "@/store/letterInfoStore";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

interface IProps {
  notifications: INotification[];
}

const SeniorNotificationPage: React.FC<IProps> = ({ notifications }) => {
  const router = useRouter();
  const { setBirdName, setLetterStatusSeq, setNickname } = useLetterInfoStore();
  console.log(notifications);

  return (
    <div className="flex flex-col items-center justify-center w-full mt-2">
      <div className="flex w-full h-[40px] px-4 py-2 bg-[#F4F5EF]">
        <span className="text-[#6B7178] text-[16px] font-medium leading-[24px] tracking-[-0.064px]">
          읽지 않음
        </span>
      </div>
      {/* 읽지 않은 알림 */}
      {notifications.map(
        (notification, index) =>
          !notification.read && (
            <div
              key={index}
              className="relative flex w-full px-4 py-2.5 border-b border-[#F0F1EC] bg-[#F3F0EA]"
            >
              <Image
                src="/images/icons/reddot_icon.svg"
                alt="빨간점 아이콘"
                width={24}
                height={24}
                className="absolute top-[10px] right-[16px]"
              />
              <div className="flex items-start min-w-[40px] ">
                <Image
                  src={`/images/birds/${
                    birdNameMap[notification.birdName] ?? "default"
                  }_40.svg`}
                  alt="알림함 보낸 새 프로필 40"
                  width={40}
                  height={40}
                />
              </div>
              <div
                className="ml-4"
                onClick={() => {
                  const birdKey =
                    notification.birdName && birdNameMap[notification.birdName]
                      ? birdNameMap[notification.birdName]
                      : "default";

                  if (
                    // 읽으면 true , 읽지않았으면 false
                    // 읽지 않았고 편지가 포함되면 letterOpen
                    !notification.read &&
                    notification.message.includes("편지")
                  ) {
                    setNickname(notification.nickname);
                    setBirdName(birdKey);
                    setLetterStatusSeq(notification.letterStatusSeq);
                    router.push(`/letter-open`);
                  } else {
                    router.push(
                      `/letter-detail/${notification.letterStatusSeq}`
                    );
                  }
                }}
              >
                <div className="flex items-center justify-between h-6">
                  <p className="text-[#6B7178] text-[12px] font-normal leading-[16px] tracking-[-0.048px]">
                    {notification.message.includes("편지")
                      ? "편지가 도착했어요"
                      : "고마움 표시를 받았어요"}
                  </p>
                </div>
                <p className="text-[#292D32] text-[14px] font-normal leading-[22px] tracking-[-0.056px]">
                  <span className="font-bold leading-[20px] ">
                    {notification.nickname}
                  </span>
                  {notification.message}
                </p>
                <span className="text-[#6B7178] text-[12px] font-normal leading-[16px] tracking-[-0.048px]">
                  {new Date(notification.createAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          )
      )}
      <div className="flex w-full h-10 px-4 py-2.5 bg-[#F4F5EF]">
        <span className="text-[#6B7178] text-[16px] font-medium leading-[24px] tracking-[-0.064px]">
          이전 알림
        </span>
      </div>
      {/* 이전 알림 */}
      {notifications.map(
        (notification, index) =>
          notification.read && (
            <div
              key={index}
              className="flex w-full px-4 py-2.5 border-b border-[#F0F1EC]"
            >
              <div className="flex items-start min-w-[40px] ">
                <Image
                  src={`/images/birds/${
                    birdNameMap[notification.birdName] ?? "default"
                  }_40.svg`}
                  alt="알림함 보낸 새 프로필 40"
                  width={40}
                  height={40}
                />
              </div>
              <div
                className="ml-4"
                onClick={() => {
                  // 이전알림은 이미 전부 읽은 상태
                  router.push(`/letter-detail/${notification.letterStatusSeq}`);
                }}
              >
                <div className="flex items-center justify-between h-6">
                  <p className="text-[#6B7178] text-[12px] font-normal leading-[16px] tracking-[-0.048px]">
                    편지가 도착했어요
                  </p>
                </div>
                <p className="text-[#292D32] text-[14px] font-normal leading-[22px] tracking-[-0.056px]">
                  <span className="font-bold leading-[20px] ">
                    {notification.nickname}
                  </span>
                  {notification.message}
                </p>
                <span className="text-[#6B7178] text-[12px] font-normal leading-[16px] tracking-[-0.048px]">
                  {new Date(notification.createAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          )
      )}
    </div>
  );
};

export default SeniorNotificationPage;

"use client";

import YouthNotificationPage from "@/components/notification/YouthNotificationPage";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { IUserData } from "../(footershare)/home/page";
import { getNotificationList } from "@/services/homeGetApi";
import SeniorNotificationPage from "@/components/notification/SeniorNotificationPage";

export interface INotification {
  birdName: string;
  createAt: string;
  letterStatusSeq: number;
  message: string;
  nickname: string;
  read: boolean;
}

const NotificationBox: React.FC = () => {
  const router = useRouter();
  const [userData, setUserData] = useState<IUserData>();
  const [notifications, setNotifications] = useState<
    INotification[] | undefined
  >([]);

  useEffect(() => {
    const storedData = sessionStorage.getItem("userInfo");

    if (storedData) {
      const parsedData = JSON.parse(storedData);
      // console.log(parsedData);
      setUserData(parsedData);
    }

    const fetchNotifications = async () => {
      try {
        const data = await getNotificationList();
        setNotifications(data);
        // eslint-disable-next-line
      } catch (err) {
        // console.log(err);
      }
    };

    fetchNotifications();
  }, []);

  if (!userData) {
    return <p>로딩 중...</p>;
  }

  return (
    <div className="h-screen w-full bg-[#f9f8f3] flex flex-col">
      <header className="relative cursor-pointer select-none w-full h-[56px] flex justify-center items-center">
        <Image
          src="/images/icons/arrow_left_icon.svg"
          alt="왼쪽 방향 아이콘"
          width={24}
          height={24}
          className="absolute left-4"
          onClick={() => router.push("/home")}
        />
        <span className="text-[#292D32] text-[16px] font-bold leading-[24px] tracking-[-0.064px]">
          알림함
        </span>
      </header>
      <main className="flex flex-col items-center justify-center w-full ">
        {/* 알림있음 */}
        {notifications && notifications.length > 0 ? (
          userData.roleName === "MENTEE" ? (
            <YouthNotificationPage notifications={notifications} />
          ) : (
            <SeniorNotificationPage notifications={notifications} />
          )
        ) : (
          // 알림없음
          <div className="flex flex-col items-center justify-center w-screen mt-2">
            <Image
              src="/images/icons/notification_bell_icon.svg"
              alt="알림함 종 아이콘"
              width={70}
              height={70}
              className="mt-[54px]"
            />
            <span className="text-[#292D32] text-[14px] font-normal leading-[22px] tracking-[-0.056px] mt-4">
              새로운 알림이 없어요
            </span>
          </div>
        )}
      </main>
    </div>
  );
};

export default NotificationBox;

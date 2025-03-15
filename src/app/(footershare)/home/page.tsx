"use client";

import HomeMainSenior from "@/components/home/HomeMainSenior";
import HomeMainYouth from "@/components/home/HomeMainYouth";
import Header from "@/components/ui/Header";
import { getUserInfo } from "@/services/homeGetApi";

import React, { useEffect, useState } from "react";

export interface IUserCategory {
  career: boolean;
  mental: boolean;
  relationship: boolean;
  love: boolean;
  life: boolean;
  finance: boolean;
  housing: boolean;
  other: boolean;
}

export interface IUserData {
  birdName: string;
  nickname: string;
  roleName: "MENTOR" | "MENTEE"; // 역할이 정해져 있다면 리터럴 타입으로 제한 가능
  userCategory: IUserCategory;
  quota: number;
  sendLetter: number;
  replyLetter: number;
  read: boolean;
}

const Home: React.FC = () => {
  const [userData, setUserData] = useState<IUserData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getUserInfo();
        sessionStorage.setItem("userInfo", JSON.stringify(response.data));
        setUserData(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  console.log(userData);

  if (!userData) {
    return;
  }

  return (
    <div className="">
      <Header userData={userData} />

      {userData.roleName === "MENTOR" ? (
        <HomeMainSenior userData={userData} />
      ) : (
        <HomeMainYouth userData={userData} />
      )}
    </div>
  );
};

export default Home;

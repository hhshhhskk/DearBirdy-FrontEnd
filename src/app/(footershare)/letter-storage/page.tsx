"use client";

import React, { useEffect, useState } from "react";
import SeniorLetterStorage from "@/components/letter-storage/SeniorLetterStorage";
import YouthLetterStorage from "@/components/letter-storage/YouthLetterStorage";
import { IUserData } from "../home/page";

export interface IDataListItem {
  letterStatusSeq: number;
  birdName: string;
  nickname: string;
  title: string;
  read: boolean;
  saved: boolean;
  thanksToMentor: boolean;
}

export interface IData {
  pageNumber: number;
  totalPage: number;
  totalData: number;
  dataList: IDataListItem[];
}

//무한스크롤

export interface Letter {
  letterStatusSeq: number;
  birdName: string;
  nickname: string;
  title: string;
  read: boolean;
  saved: boolean;
  thanksToMentor: boolean;
}

export interface LetterPage {
  code: number;
  data: {
    dataList: Letter[];
  };
  message: string;
  status: string;
  pageNumber: number;
  totalData: number;
  totalPage: number;
}

export interface InfiniteLetterQuery {
  pageParams: number[];
  pages: LetterPage[];
}

const LetterStorage: React.FC = () => {
  const [userData, setUserData] = useState<IUserData>();

  useEffect(() => {
    const storedData = sessionStorage.getItem("userInfo");

    if (storedData) {
      const parsedData = JSON.parse(storedData);
      // console.log(parsedData);

      setUserData(parsedData);
    }
  }, []);

  if (!userData) {
    return <p>로딩 중...</p>;
  }
  // console.log(userData);

  return (
    <div className="px-4">
      {userData.roleName === "MENTEE" ? (
        <YouthLetterStorage />
      ) : userData.roleName === "MENTOR" ? (
        <SeniorLetterStorage />
      ) : null}
    </div>
  );
};

export default LetterStorage;

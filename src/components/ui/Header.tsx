import Image from "next/image";
import React from "react";
import BellIcon from "../Icons/Header_bell_icon";
import { IUserData } from "@/app/(footershare)/home/page";

interface IProps {
  userData: IUserData;
}

const Header: React.FC<IProps> = ({ userData }) => {
  return (
    <header className="fixed top-0 z-100 bg-[#f9f8f7] flex select-none items-center justify-center min-w-[375px] h-[56px] px-4 mb-2">
      <div className="container flex items-center justify-between">
        <Image
          src="/images/logo/logo_black_M.svg"
          alt="홈 로고"
          width={98}
          height={24}
        />
        <BellIcon check={userData.read} />
      </div>
    </header>
  );
};

export default Header;

import Image from "next/image";
import React from "react";
import BellIcon from "../Icons/Header_bell_icon";
import { IUserData } from "@/app/(footershare)/home/page";

interface IProps {
  userData: IUserData;
}

const Header: React.FC<IProps> = ({ userData }) => {
  return (
    <header className="flex cursor-pointer select-none items-center justify-center w-full h-[56px] px-4">
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

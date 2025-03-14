import Image from "next/image";
import React from "react";

interface SvgIconProps {
  selectedIcon?: number;
}

const HomeIcon: React.FC<SvgIconProps> = ({ selectedIcon }) => {
  return (
    <>
      {/* 선택 됨 */}
      {selectedIcon === 1 ? (
        <Image
          src="/images/icons/footer/home_pressed_icon.svg"
          alt="footer home pressed"
          width={24}
          height={24}
        />
      ) : (
        // 선택 안됨
        <Image
          src="/images/icons/footer/home_off_icon.svg"
          alt="footer home off"
          width={24}
          height={24}
        />
      )}
    </>
  );
};

export default HomeIcon;

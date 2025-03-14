import Image from "next/image";
import React from "react";

interface SvgIconProps {
  selectedIcon?: number;
}

const MyBirdyIcon: React.FC<SvgIconProps> = ({ selectedIcon }) => {
  return (
    <>
      {/* 선택됨 */}
      {selectedIcon === 3 ? (
        <Image
          src="/images/icons/footer/btmy_pressed_icon.svg"
          alt="footer btmy pressed"
          width={24}
          height={24}
        />
      ) : (
        //선택 안됨
        <Image
          src="/images/icons/footer/btmy_off_icon.svg"
          alt="footer btmy off"
          width={24}
          height={24}
        />
      )}
    </>
  );
};

export default MyBirdyIcon;

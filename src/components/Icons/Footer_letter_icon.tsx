import Image from "next/image";
import React from "react";

interface SvgIconProps {
  read?: boolean;
  selectedIcon?: number;
}

const LetterIcon: React.FC<SvgIconProps> = ({ selectedIcon, read }) => {
  return (
    <>
      {/* 알림 있고 선택됨 */}
      {read ? (
        selectedIcon === 2 ? (
          <Image
            src="/images/icons/footer/box_noti_pressed_icon.svg"
            alt="footer box_noti_pressed"
            width={24}
            height={24}
          />
        ) : (
          // 알림 있고 선택안됨
          <Image
            src="/images/icons/footer/box_noti_off_icon.svg"
            alt="footer box_noti_off"
            width={24}
            height={24}
          />
        )
      ) : selectedIcon === 2 ? (
        // 알림 없고 선택 됨
        <Image
          src="/images/icons/footer/box_pressed_icon.svg"
          alt="footer box_pressed"
          width={24}
          height={24}
        />
      ) : (
        <Image
          src="/images/icons/footer/box_off_icon.svg"
          alt="footer box_off"
          width={24}
          height={24}
        />
      )}
    </>
  );
};

export default LetterIcon;

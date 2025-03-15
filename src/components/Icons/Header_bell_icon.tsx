"use client";

import { useRouter } from "next/navigation";
import React from "react";

interface SvgIconProps {
  check?: boolean;
}

const BellIcon: React.FC<SvgIconProps> = ({ check }) => {
  const router = useRouter();

  return (
    <div
      onClick={() => {
        router.push("/notification-box");
      }}
    >
      {check ? (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="cursor-pointer"
        >
          <path
            d="M15.3752 18.647C15.3752 19.5362 15.0196 20.3891 14.3867 21.0179C13.7538 21.6467 12.8953 21.9999 12.0002 21.9999C11.1052 21.9999 10.2467 21.6467 9.6138 21.0179C8.98087 20.3891 8.6253 19.5362 8.6253 18.647M12.8114 2L11.1621 1.99665C7.4002 1.98771 4.13438 5.02435 4.10851 8.70252L4.1085 13.9417C4.1085 14.8246 3.99601 15.6863 3.51114 16.4206L3.18827 16.9102C2.69665 17.6523 3.22539 18.647 4.1085 18.647H19.892C20.7751 18.647 21.3027 17.6523 20.8122 16.9102L20.4893 16.4206C20.0056 15.6863 19.892 14.8235 19.892 13.9406L19.892 8.70364C19.847 5.02435 16.5733 2.00894 12.8114 2Z"
            stroke="#292D32"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="18" cy="4" r="3" fill="#FF2A2C" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="22"
          viewBox="0 0 20 22"
          fill="none"
          className="cursor-pointer"
        >
          <path
            d="M13.3752 17.647C13.3752 18.5362 13.0196 19.3891 12.3867 20.0179C11.7538 20.6467 10.8953 20.9999 10.0002 20.9999C9.10515 20.9999 8.24672 20.6467 7.6138 20.0179C6.98087 19.3891 6.6253 18.5362 6.6253 17.647M10.8114 1L9.16213 0.996647C5.4002 0.987706 2.13438 4.02435 2.10851 7.70252L2.1085 12.9417C2.1085 13.8246 1.99601 14.6863 1.51114 15.4206L1.18827 15.9102C0.696654 16.6523 1.22539 17.647 2.1085 17.647H17.892C18.7751 17.647 19.3027 16.6523 18.8122 15.9102L18.4893 15.4206C18.0056 14.6863 17.892 13.8235 17.892 12.9406L17.892 7.70364C17.847 4.02435 14.5733 1.00894 10.8114 1Z"
            stroke="#292D32"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </div>
  );
};

export default BellIcon;

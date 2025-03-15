"use client";

import React from "react";

interface NextButtonProps {
  text: string;
  onClick?: () => void;
  disabled?: boolean;
}

const NextButton: React.FC<NextButtonProps> = ({
  text,
  onClick,
  disabled = false,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`cursor-pointer rounded-xl text-base leading-6 tracking-tight font-medium w-[342px] h-[50px] ${
        disabled
          ? "bg-[#EBEBEE] text-[#C7C7CC] cursor-not-allowed"
          : "bg-[#292d32] text-white"
      }`}
    >
      {text}
    </button>
  );
};

export default NextButton;

import React from "react";

interface SvgIconProps {
  fill?: string;
  read?: boolean;
  selectedIcon?: number;
}

const LetterIcon: React.FC<SvgIconProps> = ({ selectedIcon, read, fill }) => {
  return (
    <>
      {read && selectedIcon !== 2 ? (
        <svg
          width="25"
          height="24"
          viewBox="0 0 25 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2.14661 13H5.93661C6.69661 13 7.38661 13.43 7.72661 14.11L8.61661 15.9C9.16661 17 10.1666 17 10.4066 17H13.9366C14.6966 17 15.3866 16.57 15.7266 15.89L16.6166 14.1C16.9566 13.42 17.6466 12.99 18.4066 12.99H22.1466"
            stroke="#AEAEB2"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M19.1666 8C20.8235 8 22.1666 6.65685 22.1666 5C22.1666 3.34315 20.8235 2 19.1666 2C17.5098 2 16.1666 3.34315 16.1666 5C16.1666 6.65685 17.5098 8 19.1666 8Z"
            fill="#FF2A2C"
            stroke="#FF2A2C"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M14.1666 2H9.16663C4.16663 2 2.16663 4 2.16663 9V15C2.16663 20 4.16663 22 9.16663 22H15.1666C20.1666 22 22.1666 20 22.1666 15V10"
            stroke="#AEAEB2"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="25"
          height="24"
          viewBox="0 0 25 24"
          fill="none"
        >
          <path
            d="M9.5 22H15.5C20.5 22 22.5 20 22.5 15V9C22.5 4 20.5 2 15.5 2H9.5C4.5 2 2.5 4 2.5 9V15C2.5 20 4.5 22 9.5 22Z"
            fill={fill}
          />
          <path
            d="M2.5 13.0002H6.26C7.02 13.0002 7.71 13.4302 8.05 14.1102L8.94 15.9002C9.5 17.0002 10.5 17.0002 10.74 17.0002H14.27C15.03 17.0002 15.72 16.5702 16.06 15.8902L16.95 14.1002C17.29 13.4202 17.98 12.9902 18.74 12.9902H22.48"
            stroke="#FFF"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </>
  );
};

export default LetterIcon;

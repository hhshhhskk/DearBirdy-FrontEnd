import { LetterSave } from "@/services/letterStorage";
import { useBookMarkStore } from "@/store/bookMarkStore";
import React from "react";

interface SvgIconProps {
  fill?: string;
  stroke?: string;
  letterStatusSeq: number;
  setBookMark?: React.Dispatch<React.SetStateAction<number>>;
  handleShowToast?: () => void;
  bookMarkToast?: boolean;
}
//#C7C7CC
const BookMarkIcon: React.FC<SvgIconProps> = ({
  bookMarkToast,
  handleShowToast,
  letterStatusSeq,
  fill,
  stroke,
}) => {
  const { setBookMark } = useBookMarkStore();
  const BookMarkClicked = async () => {
    await LetterSave(letterStatusSeq);
    setBookMark(letterStatusSeq);
    if (!bookMarkToast && handleShowToast) {
      handleShowToast();
    }
  };
  return (
    <svg
      className="cursor-pointer"
      onClick={BookMarkClicked}
      xmlns="http://www.w3.org/2000/svg"
      width="25"
      height="24"
      viewBox="0 0 25 24"
      fill={fill}
    >
      <path
        d="M5.5 4C5.5 3.44771 5.94772 3 6.5 3H18.5C19.0523 3 19.5 3.44772 19.5 4V20.1129C19.5 20.9153 18.6025 21.391 17.9385 20.9404L13.0615 17.631C12.7225 17.401 12.2775 17.401 11.9385 17.631L7.0615 20.9404C6.39752 21.391 5.5 20.9153 5.5 20.1129V4Z"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default BookMarkIcon;

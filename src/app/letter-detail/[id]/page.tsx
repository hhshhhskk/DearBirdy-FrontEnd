"use client";

import { IUserData } from "@/app/(footershare)/home/page";
import BookMarkIcon from "@/components/Icons/Bookmark_icon";
import ThrowAfterModal from "@/components/letter-storage/ThrowAfterModal";
import ThrowModal from "@/components/letter-storage/ThrowModal";
import { birdNameMap } from "@/constants/birdNameMap";
import { getLetterDetail, getThanks } from "@/services/letterDetail";
import { useBookMarkStore } from "@/store/bookMarkStore";
import { useLetterInfoStore } from "@/store/letterInfoStore";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export interface ILetter {
  letterSeq: number;
  replyUserBird: string;
  replyUser: string;
  letterTitle: string;
  categoryName: string;
  letter: string;
  creatAt: string;
  sendUserBird: string;
  sendUser: string;
}

export interface IData {
  replyLetter: ILetter;
  sendLetter: ILetter;
  saved: boolean;
  letterStatusSeq: number;
  thanksToMentor: string;
}

const LetterDetailId: React.FC = () => {
  const router = useRouter();
  const params = useParams();
  const { id } = params;
  const [userData, setUserData] = useState<IUserData>();

  const [letter, setLetter] = useState<IData | undefined>(undefined);
  const [showModal, setModal] = useState<boolean>(false);
  const [showThrowModal, setShowThrowModal] = useState(false);
  const [showThrowAfterModal, setShowThrowAfterModal] = useState(false);

  const { bookMark } = useBookMarkStore();
  const { setBirdName, setNickname, setCategoryName, setLetterStatusSeq } =
    useLetterInfoStore();

  // 새 이름을 한글 → 영어로 변환
  const [sendUserBirdKey, setSendUserBirdKey] = useState<string>("default");
  const [replyUserBirdKey, setReplyUserBirdKey] = useState<string>("default");
  const [replySendUserBirdKey, setReplySendUserBirdKey] =
    useState<string>("default");
  const [sendReplyUserBirdKey, setSendReplyUserBirdKey] =
    useState<string>("default");

  useEffect(() => {
    const storedData = sessionStorage.getItem("userInfo");

    if (storedData) {
      const parsedData = JSON.parse(storedData);
      console.log(parsedData);

      setUserData(parsedData);
    }

    const fetchLetterDetail = async () => {
      try {
        if (id) {
          const data = await getLetterDetail(id);
          setLetter(data);
          if (letter?.sendLetter?.sendUserBird) {
            setSendUserBirdKey(
              birdNameMap[letter.sendLetter.sendUserBird] || "default"
            );
          }
          if (letter?.replyLetter?.replyUserBird) {
            setReplyUserBirdKey(
              birdNameMap[letter.replyLetter.replyUserBird] || "default"
            );
          }
          if (letter?.replyLetter?.sendUserBird) {
            setReplySendUserBirdKey(
              birdNameMap[letter.replyLetter.sendUserBird] || "default"
            );
          }
          if (letter?.sendLetter?.replyUserBird) {
            setSendReplyUserBirdKey(
              birdNameMap[letter.sendLetter.replyUserBird] || "default"
            );
          }
        } else {
          console.error("ID가 없습니다.");
        }
      } catch (error) {
        console.error("편지 상세 정보 가져오기 실패:", error);
      }
    };
    fetchLetterDetail();
  }, [id, bookMark]);

  // 새 이름을 한글 → 영어로 변환

  useEffect(() => {
    if (letter?.sendLetter?.sendUserBird) {
      setSendUserBirdKey(
        birdNameMap[letter.sendLetter.sendUserBird] || "default"
      );
    }
    if (letter?.replyLetter?.replyUserBird) {
      setReplyUserBirdKey(
        birdNameMap[letter.replyLetter.replyUserBird] || "default"
      );
    }
    if (letter?.replyLetter?.sendUserBird) {
      setReplySendUserBirdKey(
        birdNameMap[letter.replyLetter.sendUserBird] || "default"
      );
    }
    // letter가 변경될 때만 실행
  }, [letter]);

  // 날짜 형식
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);

    const month = date.getMonth() + 1; // 월은 0부터 시작하므로 1을 더해줍니다.
    const day = date.getDate();
    const hours = date.getHours();

    // 시간에 따라 아침, 점심, 저녁 구분
    let timeOfDay = "";
    if (hours >= 6 && hours < 12) {
      timeOfDay = "아침";
    } else if (hours >= 12 && hours < 14) {
      timeOfDay = "점심";
    } else if (hours >= 14 && hours < 19) {
      timeOfDay = "저녁";
    } else {
      timeOfDay = "밤";
    }

    const hour = hours % 12 || 12; // 12시간제 포맷으로 변환

    return `${month}월 ${day}일, ${timeOfDay} ${hour}시의 마음`;
  };

  let replyDate = "";
  let sendDate = "";

  if (letter?.replyLetter !== null) {
    sendDate = formatDate(letter?.sendLetter?.creatAt ?? "");
    replyDate = formatDate(letter?.replyLetter?.creatAt ?? "");
  }

  const throwClicked = () => {
    setShowThrowModal(true);
  };

  if (!letter) return <div>Loading</div>;

  // 청년 버전
  return userData?.roleName === "MENTEE" ? (
    <div className="relative">
      {showModal && (
        /* 오버레이 */
        <>
          <div className="absolute inset-0 z-10 bg-[rgba(51,51,51,0.80)]"></div>
          <div className="fixed bottom-0 left-0 z-20 flex w-[375px] p-[24px_16px_44px_16px] flex-col items-center  rounded-t-[30px] rounded-b-none bg-[#F9F8F3]">
            <div
              className="flex justify-end w-full"
              onClick={() => setModal(false)}
            >
              <Image
                src="/images/icons/close_icon.svg"
                alt="닫기 아이콘"
                width={24}
                height={24}
              />
            </div>
            <div className="text-[#292D32] text-center font-semibold text-[18px] leading-[26px] tracking-[-0.072px] mt-4">
              답장이 도움이 되셨나요?
            </div>
            <div className="text-[#292D32] text-center font-normal text-[14px] leading-[22px] tracking-[-0.056px] mt-2 mb-6">
              파랑새가 보낸 답장에 고마움을 보내주세요!
            </div>
            <div
              className="flex w-full h-[80px] p-[20px_16px] justify-start items-center rounded-[20px] border border-[#D6E173] bg-[#FFF] "
              onClick={() => {
                getThanks(letter.replyLetter.letterSeq, "MOVED");
                setModal(false);
                router.back();
              }}
            >
              <Image
                src="/images/birds/MOVED_40.svg"
                alt="고마움 40"
                width={40}
                height={40}
                className="mr-2"
              />
              <p className="text-[#292D32] font-Pretendard text-[18px] font-medium leading-[26px] tracking-[-0.072px]">
                정성어린 답장에 감동 받았어요!
              </p>
            </div>
            <div
              className="flex w-full h-[80px] p-[20px_16px] justify-start items-center rounded-[20px] border border-[#D6E173] bg-[#FFF] mt-2"
              onClick={() => {
                getThanks(letter.replyLetter.letterSeq, "HELPFUL");
                setModal(false);
                router.back();
              }}
            >
              <Image
                src="/images/birds/HELPFUL_40.svg"
                alt="고마움 40"
                width={40}
                height={40}
                className="mr-2"
              />
              <p className="text-[#292D32] font-Pretendard text-[18px] font-medium leading-[26px] tracking-[-0.072px]">
                편지 내용이 도움이 되었어요!
              </p>
            </div>
            <div
              className="flex w-full h-[80px] p-[20px_16px] justify-start items-center rounded-[20px] border border-[#D6E173] bg-[#FFF] mt-2"
              onClick={() => {
                getThanks(letter.replyLetter.letterSeq, "NOT_ALONE");
                setModal(false);
                router.back();
              }}
            >
              <Image
                src="/images/birds/NOT_ALONE_40.svg"
                alt="고마움 40"
                width={40}
                height={40}
                className="mr-2"
              />
              <p className="text-[#292D32] font-Pretendard text-[18px] font-medium leading-[26px] tracking-[-0.072px]">
                혼자가 아닌 것 같아 기뻐요!
              </p>
            </div>
          </div>
        </>
      )}

      <div className="min-h-screen bg-[#f9f8f3] flex flex-col px-4 gap-2">
        <header className="relative w-full h-[56px] flex items-center">
          <Image
            src="/images/icons/arrow_left_icon.svg"
            alt="왼쪽 방향 아이콘"
            width={24}
            height={24}
            onClick={() => router.back()}
            className="cursor-pointer"
          />
          <Image
            src={`/images/birds/${sendUserBirdKey}_24.svg`}
            alt="프로필 새 24"
            width={24}
            height={24}
            className="ml-2"
          />
          <span className="flex-auto text-[#292D32] font-bold text-base leading-6 tracking-tight ml-1">
            {letter.replyLetter
              ? `${letter?.sendLetter.sendUser}`
              : "답장을 기다리는중"}
          </span>
          <Image
            src="/images/icons/more_icon.svg"
            alt="더보기 아이콘"
            width={24}
            height={24}
            className="mr-2"
          />
          <BookMarkIcon
            letterStatusSeq={letter.letterStatusSeq}
            fill={letter.saved ? "#84A667" : "none"}
            stroke={letter.saved ? "#84A667" : "#C7C7CC"}
          />
        </header>
        {letter.replyLetter ? (
          // 받은 편지
          <main className="flex flex-col items-center justify-center">
            <div className="w-[343px] p-[16px] pt-[16px] pb-[20px] flex flex-col items-center gap-[24px] border border-[#F0F1EC] bg-[#FFF] rounded-[20px]">
              <div className="flex flex-col w-full gap-4">
                <div className="flex justify-start gap-2">
                  <Image
                    src="/images/icons/direct_inbox_icon.svg"
                    alt="받은편지 아이콘"
                    width={16}
                    height={16}
                  />
                  <span className="text-[#4CA7D0] font-pretendard text-[12px] font-normal leading-[16px] tracking-[-0.048px]">
                    받은 편지
                  </span>
                </div>
                <div className="flex items-end justify-start gap-2">
                  <Image
                    src={`/images/birds/${replyUserBirdKey}_50.svg`}
                    alt="프로필 새 50"
                    width={50}
                    height={50}
                  />
                  <p className="text-[#292D32] text-[23px] leading-[27.6px] font-bold iceJaram-Rg">
                    Dear. {letter.replyLetter.replyUser}
                  </p>
                  <span className="p-[1px_6px] rounded-[6px] bg-[#E5E5EA] text-[#6B7178] text-center text-[14px] font-medium leading-[20px] tracking-[-0.056px]">
                    {letter.replyLetter.categoryName}
                  </span>
                </div>
              </div>
              <p className="w-full h-[240px] text-[#292D32] text-[16px] font-normal leading-[24px] tracking-[-0.064px]   ">
                {letter.replyLetter.letter}
              </p>
              <div className="flex flex-col items-start w-full gap-2 ">
                <p className="text-right text-[#8E8E93] text-xs font-normal leading-4 tracking-[-0.048px]">
                  {replyDate}
                </p>
                <div className="flex items-center justify-center gap-2">
                  <Image
                    src={`/images/birds/${sendUserBirdKey}_24.svg`}
                    alt="프로필 새 24"
                    width={24}
                    height={24}
                  />
                  <span className="text-right text-[#292D32] font-sandoll-baikzongyulpil text-[18px] leading-[21.6px] font-bold iceJaram-Rg">
                    from. {letter.replyLetter.sendUser}
                  </span>
                </div>
                {/* 고마움 표시 및 고마움 전달 */}
                {letter.thanksToMentor ? (
                  <div className="flex w-[311px] h-[50px] p-[13px_16px] justify-start items-center rounded-[12px] bg-[#F0F1EC]">
                    <Image
                      src={`/images/birds/${
                        letter.thanksToMentor ===
                        "정성어린 답장에 감동 받았어요!"
                          ? "MOVED"
                          : letter.thanksToMentor ===
                            "편지 내용이 도움이 되었어요!"
                          ? "HELPFUL"
                          : "NOT_ALONE"
                      }_24.svg`}
                      alt="고마움 새 24"
                      width={24}
                      height={24}
                      className="mr-1"
                    />
                    <p className="text-[#292D32] text-center text-[16px] font-medium leading-[24px] tracking-[-0.064px]">
                      {letter.thanksToMentor}
                    </p>
                  </div>
                ) : (
                  <div
                    className="flex w-[311px] h-[50px] px-[16px] py-[13px] justify-between items-center rounded-[12px] bg-[#84A667]"
                    onClick={() => setModal(true)}
                  >
                    <div className="flex">
                      <Image
                        src="/images/icons/heart_icon.svg"
                        alt="하트 아이콘"
                        width={24}
                        height={24}
                        className="mr-1"
                      />
                      <span className="text-[#F0F1EC] text-center text-[16px] font-medium leading-[24px] tracking-[-0.064px]">
                        고마움 표시하기
                      </span>
                    </div>
                    <Image
                      src="/images/icons/arrow_down_icon.svg"
                      alt="아래방향 아이콘"
                      width={24}
                      height={24}
                      className="mr-1"
                    />
                  </div>
                )}
              </div>
            </div>
          </main>
        ) : (
          // 답장 기다리고 있을때 배너
          <div className="w-full p-[14px] flex flex-col items-center gap-[8px] border border-[#4CA7D0] bg-[#F0FDFF] rounded-[14px]">
            <p className="text-[#6B7178] text-center text-[14px] font-bold leading-[20px] tracking-[-0.056px]">
              따뜻한 말이 담긴 답장을 작성하고 있어요
            </p>
            <p className="text-[#292D32] text-center text-[16px] font-normal leading-[24px] track ing-[-0.064px]">
              빠르면 1일, 최대 7일이 걸릴 수 있어요
            </p>
          </div>
        )}
        {/* 보낸 편지 */}
        <main className="">
          <div className="flex flex-col items-center justify-center">
            <div className="pt-[16px] px-4 pb-[20px] flex break-all flex-col items-center gap-[24px] border border-[#F0F1EC] bg-[#FFF] rounded-[20px]">
              <div className="flex flex-col w-full gap-4">
                <div className="flex justify-start gap-2">
                  <Image
                    src="/images/icons/direct_send_icon.svg"
                    alt="보낸편지 아이콘"
                    width={16}
                    height={16}
                  />
                  <span className="text-[#8E8E93] font-pretendard text-[12px] font-normal leading-[16px] tracking-[-0.048px]">
                    보낸 편지
                  </span>
                </div>
                <div className="flex items-end justify-start gap-2">
                  <Image
                    src={`/images/birds/${sendReplyUserBirdKey}_50.svg`}
                    alt="프로필 새 50"
                    width={50}
                    height={50}
                  />
                  <p className="text-[#292D32] text-[23px] leading-[27.6px] font-bold iceJaram-Rg">
                    Dear. {letter.sendLetter.replyUser}
                  </p>
                  <span className="p-[1px_6px] rounded-[6px] bg-[#E5E5EA] text-[#6B7178] text-center text-[14px] font-medium leading-[20px] tracking-[-0.056px]">
                    {letter.sendLetter.categoryName}
                  </span>
                </div>
              </div>
              <p className="w-full h-[240px] text-[#292D32] text-[16px] font-normal leading-[24px] tracking-[-0.064px]   ">
                {letter.sendLetter.letter}
              </p>
              <div className="flex flex-col items-start w-full gap-2 ">
                <p className="text-right text-[#8E8E93] text-xs font-normal leading-4 tracking-[-0.048px]">
                  {sendDate}
                </p>
                <div className="flex items-center justify-center gap-2">
                  <Image
                    src={`/images/birds/${sendUserBirdKey}_24.svg`}
                    alt="프로필 새 24"
                    width={24}
                    height={24}
                  />
                  <span className="text-right text-[#292D32] font-sandoll-baikzongyulpil text-[18px] leading-[21.6px] font-bold iceJaram-Rg">
                    from. {letter.sendLetter.sendUser}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </main>

        <div className="h-2"></div>
      </div>
    </div>
  ) : (
    // 장년 버전
    <div className="relative min-h-screen bg-[#f9f8f3] flex flex-col px-4 gap-2">
      {showThrowModal && (
        <ThrowModal
          letterStatusSeq={letter.letterStatusSeq}
          setShowThrowModal={setShowThrowModal}
          setShowThrowAfterModal={setShowThrowAfterModal}
        />
      )}
      {showThrowAfterModal && (
        <ThrowAfterModal setShowThrowAfterModal={setShowThrowAfterModal} />
      )}
      <header className="relative w-full h-[56px] mt-[59px] flex items-center">
        <Image
          src="/images/icons/arrow_left_icon.svg"
          alt="왼쪽 방향 아이콘"
          width={24}
          height={24}
          onClick={() => router.back()}
        />
        <Image
          src={`/images/birds/${replySendUserBirdKey}_24.svg`}
          alt="프로필 새 24"
          width={24}
          height={24}
          className="ml-2"
        />
        <span className="flex-auto text-[#292D32] font-bold text-base leading-6 tracking-tight ml-1">
          {letter?.replyLetter.sendUser}
        </span>
        <Image
          src="/images/icons/more_icon.svg"
          alt="더보기 아이콘"
          width={24}
          height={24}
          className="mr-2"
        />
        <BookMarkIcon
          letterStatusSeq={letter.letterStatusSeq}
          fill={letter.saved ? "#84A667" : "none"}
          stroke={letter.saved ? "#84A667" : "#C7C7CC"}
        />
      </header>

      {letter.sendLetter ? (
        // 보낸 편지
        <main className="flex flex-col items-center justify-center">
          <div className="w-[343px] p-[16px] pt-[16px] pb-[20px] flex flex-col items-center gap-[24px] border border-[#F0F1EC] bg-[#FFF] rounded-[20px]">
            <div className="flex flex-col w-full gap-4">
              <div className="flex justify-start gap-2">
                <Image
                  src="/images/icons/direct_send_icon.svg"
                  alt="보낸편지 아이콘"
                  width={16}
                  height={16}
                />
                <span className="text-[#8E8E93] font-pretendard text-[12px] font-normal leading-[16px] tracking-[-0.048px]">
                  보낸 편지
                </span>
              </div>
              <div className="flex items-end justify-start gap-2">
                <Image
                  src={`/images/birds/${sendReplyUserBirdKey}_50.svg`}
                  alt="프로필 새 50"
                  width={50}
                  height={50}
                />
                <p className="text-[#292D32] text-[23px] leading-[27.6px] font-bold iceJaram-Rg">
                  Dear. {letter.sendLetter.replyUser}
                </p>
                <span className="p-[1px_6px] rounded-[6px] bg-[#E5E5EA] text-[#6B7178] text-center text-[14px] font-medium leading-[20px] tracking-[-0.056px]">
                  {letter.sendLetter.categoryName}
                </span>
              </div>
            </div>
            <p className="w-full h-[240px] text-[#292D32] text-[16px] font-normal leading-[24px] tracking-[-0.064px]   ">
              {letter.sendLetter.letter}
            </p>
            <div className="flex flex-col items-start w-full gap-2 ">
              <p className="text-right text-[#8E8E93] text-xs font-normal leading-4 tracking-[-0.048px]">
                {sendDate}
              </p>
              <div className="flex items-center justify-center gap-2">
                <span className="text-right text-[#292D32] font-sandoll-baikzongyulpil text-[18px] leading-[21.6px] font-bold iceJaram-Rg">
                  from. {letter.sendLetter.sendUser}
                </span>
              </div>
              {letter.thanksToMentor && (
                <div className="flex w-[311px] h-[50px] p-[13px_16px] justify-start items-center rounded-[12px] bg-[#F0F1EC]">
                  <Image
                    src={`/images/birds/${
                      letter.thanksToMentor === "정성어린 답장에 감동 받았어요!"
                        ? "MOVED"
                        : letter.thanksToMentor ===
                          "편지 내용이 도움이 되었어요!"
                        ? "HELPFUL"
                        : "NOT_ALONE"
                    }_24.svg`}
                    alt="고마움 새 24"
                    width={24}
                    height={24}
                    className="mr-1"
                  />
                  <p className="text-[#292D32] text-center text-[16px] font-medium leading-[24px] tracking-[-0.064px]">
                    {letter.thanksToMentor}
                  </p>
                </div>
              )}
            </div>
          </div>
        </main>
      ) : (
        // 답장 기다리고 있을때 배너
        <div className="w-[342px] p-[14px] flex flex-col items-center gap-[8px] border border-[#4CA7D0] bg-[#F0FDFF] rounded-[14px]">
          {/* <p className="text-[#6B7178] text-center text-[14px] font-bold leading-[20px] tracking-[-0.056px]">
            답장 시간이 D일 hh시간 남았어요
          </p>
          <p className="text-[#292D32] text-center text-[16px] font-normal leading-[24px] track ing-[-0.064px]">
            후배버디가 답장을 기다리고 있어요.
          </p> */}
          <p className="text-[#292D32] text-center text-[16px] font-normal leading-[24px] track ing-[-0.064px]">
            후배버디가 답장을 기다리고 있어요.
          </p>
        </div>
      )}

      {/* 받은 편지 */}

      <main className="flex flex-col items-center justify-center">
        <div className="w-[343px] p-[16px] pt-[16px] pb-[20px] flex flex-col items-center gap-[24px] border border-[#F0F1EC] bg-[#FFF] rounded-[20px]">
          <div className="flex flex-col w-full gap-4">
            <div className="flex justify-start gap-2">
              <Image
                src="/images/icons/direct_inbox_icon.svg"
                alt="받은편지 아이콘"
                width={16}
                height={16}
              />
              <span className="text-[#4CA7D0] font-pretendard text-[12px] font-normal leading-[16px] tracking-[-0.048px]">
                받은 편지
              </span>
            </div>
            <div className="flex items-end justify-start gap-2">
              <Image
                src={`/images/birds/${replyUserBirdKey}_50.svg`}
                alt="프로필 새 50"
                width={50}
                height={50}
              />
              <p className="text-[#292D32] text-[23px]  leading-[27.6px] font-bold iceJaram-Rg">
                Dear. {letter.replyLetter.replyUser}
              </p>
              <span className="p-[1px_6px] rounded-[6px] bg-[#E5E5EA] text-[#6B7178] text-center text-[14px] font-medium leading-[20px] tracking-[-0.056px]">
                {letter.replyLetter.categoryName}
              </span>
            </div>
          </div>
          <p className="w-full h-[240px] text-[#292D32] text-[16px] font-normal leading-[24px] tracking-[-0.064px]   ">
            {letter.replyLetter.letter}
          </p>
          <div className="flex flex-col items-start w-full gap-2 ">
            <p className="text-right text-[#8E8E93] text-xs font-normal leading-4 tracking-[-0.048px]">
              {replyDate}
            </p>
            <div className="flex items-center justify-center gap-2">
              <span className="text-right text-[#292D32] font-sandoll-baikzongyulpil text-[18px] font-bold iceJaram-Rg leading-[21.6px]">
                from. {letter.replyLetter.sendUser}
              </span>
            </div>
          </div>
        </div>
      </main>
      {!letter.sendLetter ? (
        <>
          <div className="flex items-center justify-center mt-16">
            <p
              className="text-[#84A667] text-[14px] font-medium leading-[20px] tracking-[-0.056px]"
              onClick={throwClicked}
            >
              답하기 어렵다면, 다른 새에게 맡기기
            </p>
          </div>
          <div
            className="flex w-full h-[50px] justify-center items-center  gap-1 align-stretch rounded-lg bg-[#292D32]"
            onClick={() => {
              router.push("/reply");
              setLetterStatusSeq(letter.letterStatusSeq);
              setCategoryName(letter.replyLetter.categoryName);
              // 나의 장년의 새가 날아가야해서
              setBirdName(letter.replyLetter.replyUserBird);
              setNickname(letter.replyLetter.sendUser);
            }}
          >
            <Image
              src="/images/icons/letter_icon.svg"
              alt="편지쓰기 아이콘"
              width={24}
              height={24}
              className=""
            />
            <span className="text-center text-white font-pretendard text-base leading-6 tracking-[-0.064px]">
              답장 쓰기
            </span>
          </div>
        </>
      ) : (
        <div className="h-4"></div>
      )}
    </div>
  );
};

export default LetterDetailId;

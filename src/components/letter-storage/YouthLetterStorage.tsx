"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  useInfiniteQuery,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import {
  getLetterAll,
  getLetterSaved,
  getLetterWait,
} from "@/services/letterStorage";
import { useBookMarkStore } from "@/store/bookMarkStore";
import BookMarkIcon from "../Icons/Bookmark_icon";
import { Letter } from "@/app/(footershare)/letter-storage/page";
import { useInView } from "react-intersection-observer";
import { birdNameMap } from "@/constants/birdNameMap";
import HomeLetterIcon from "../Icons/Home_letter_icon";
import BirdyTip from "./BirdyTip";

const queryClient = new QueryClient();

const YouthLetterStorage: React.FC = () => {
  const category = ["전체", "답장 기다리는 편지", "저장한 편지"];
  const [cateNum, setCateNum] = useState<number>(1);
  const { bookMark } = useBookMarkStore();
  const router = useRouter();
  const [showToast, setShowToast] = useState(false);

  const fetchLetters = async ({ pageParam }: { pageParam: number }) => {
    if (cateNum === 1) return await getLetterAll(pageParam);
    if (cateNum === 2) return await getLetterWait(pageParam);
    return await getLetterSaved(pageParam);
  };

  const { data, fetchNextPage, isFetchingNextPage, hasNextPage, isLoading } =
    useInfiniteQuery({
      queryKey: ["letters", cateNum, bookMark],
      queryFn: fetchLetters,
      initialPageParam: 1,
      getNextPageParam: (lastPage) => {
        if (lastPage.pageNumber < lastPage.totalPage) {
          return lastPage.pageNumber + 1;
        }
        return undefined;
      },
    });

  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false; // 첫 렌더링 후 false로 변경
    }
  }, [data, cateNum]);

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
    console.log("화면 보여짐");
  }, [fetchNextPage, inView, hasNextPage, isFetchingNextPage]);

  const handleShowToast = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  if (isLoading) return <div className="mt-10 text-center">로딩 중...</div>;

  return (
    <QueryClientProvider client={queryClient}>
      <div className="relative mb-[60px] flex flex-col gap-2">
        <header className="cursor-pointer min-w-[343px] fixed top-0 flex gap-1 h-[56px] py-[11px] items-end bg-[#F9F8F3]">
          {category.map((title, idx) => (
            <span
              key={idx}
              onClick={() => {
                // 첫 전체조회시 데이터가 없으면 카테고리 잠김

                if (cateNum === 1) {
                  if (data?.pages[0].totalPage !== 0) {
                    setCateNum(idx + 1);
                  }
                } else {
                  setCateNum(idx + 1);
                }
              }}
              className={`px-3.5 py-1.5 rounded-[20px] min-w-[53px] text-center ${
                cateNum === idx + 1
                  ? "bg-[#292D32] text-[#E5E5EA]"
                  : "bg-[#F9F8F3] border border-[#E5E5EA] text-[#C7C7CC]"
              }`}
            >
              {title}
            </span>
          ))}
        </header>
        {/* 전체 데이터가 없을때 */}
        {data?.pages[0].totalPage === 0 && cateNum === 1 ? (
          <>
            <main className="flex flex-grow w-full mt-[64px]">
              <div className="w-full pt-8 px-4 pb-6 flex flex-col items-center  rounded-[30px] border border-[#F4F5EF] bg-[#FFF]">
                <p className="text-[#292D32] text-center font-medium text-[16px] leading-[24px] tracking-[-0.064px] mt-[32px]">
                  편지를 써보세요!
                </p>
                <p className="text-[#292D32] text-center font-bold text-[18px] leading-[26px] tracking-[-0.072px] mt-2">
                  나의 현재 고민을 편지에 쓰고 <br />
                  버디에게 보내볼까요?
                </p>
                <Image
                  src="/images/birds/letter_storage_bird.svg"
                  alt="편지보관함 새 이미지"
                  width={300}
                  height={260}
                  className="mt-8 mb-6"
                />

                <div
                  className="flex w-full cursor-pointer select-none h-[50px] justify-center items-center gap-1 mt-4 align-stretch rounded-lg bg-[#292D32]"
                  onClick={() => router.push("/send")}
                >
                  <HomeLetterIcon fill="#FFF" />
                  <span className="text-center text-white font-pretendard text-base leading-6 tracking-[-0.064px]">
                    편지쓰기
                  </span>
                </div>
              </div>
            </main>
            <BirdyTip />
          </>
        ) : (
          <main className="overflow-y-auto mt-[64px] mb-2 flex justify-center">
            <div className="grid w-full grid-cols-2 gap-2 cursor-pointer">
              {data?.pages.map((page) =>
                page.dataList.map((letter: Letter) => {
                  const birdKey =
                    letter.birdName && birdNameMap[letter.birdName]
                      ? birdNameMap[letter.birdName]
                      : "default";

                  // console.log(
                  //   "birdName:",
                  //   letter.birdName,
                  //   "-> birdKey:",
                  //   birdKey
                  // );

                  return (
                    <div
                      key={letter.letterStatusSeq}
                      onClick={() =>
                        router.push(`/letter-detail/${letter.letterStatusSeq}`)
                      }
                      className={`rounded-[16px] w-[167px] h-[182px] bg-white flex flex-col flex-1 p-4 ${
                        !letter.read && letter.nickname !== "익명새"
                          ? "border border-[#84A667] rounded-[16px] "
                          : "none"
                      } `}
                    >
                      <div className="flex justify-between">
                        <Image
                          src={`/images/birds/${birdKey}_60.svg`}
                          alt="보관함 새 프로필"
                          width={60}
                          height={60}
                        />
                        <div onClick={(e) => e.stopPropagation()}>
                          <BookMarkIcon
                            handleShowToast={handleShowToast}
                            bookMarkToast={letter.saved}
                            letterStatusSeq={letter.letterStatusSeq}
                            fill={letter.saved ? "#84A667" : "none"}
                            stroke={letter.saved ? "#84A667" : "#C7C7CC"}
                          />
                        </div>
                      </div>
                      <div className="text-[#292D32] text-[14px] font-normal leading-[22px]">
                        {letter.nickname}
                      </div>
                      <div className="text-[#292D32] text-[16px] font-bold leading-[24px] overflow-hidden text-ellipsis whitespace-nowrap">
                        {letter.title}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
            <div ref={ref} className="h-1 bg-black" />
          </main>
        )}
        {/* 책갈피 토스트 메세지 */}
        <div className="fixed flex flex-col items-center translate-x-1/2 bottom-10 right-1/2">
          {showToast && (
            <div className="fixed text-sm text-white rounded-xl  bg-[rgba(100,100,100,0.8)] flex w-[323px] h-[56px] px-5 py-[19px] justify-center items-center shadow-lg bottom-10 animate-bounce">
              책갈피는 &apos;저장한 편지&apos;에서 확인할 수 있어요!
            </div>
          )}
        </div>
      </div>
    </QueryClientProvider>
  );
};

export default YouthLetterStorage;

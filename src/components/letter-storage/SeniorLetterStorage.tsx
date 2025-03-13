"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import BookMarkIcon from "../Icons/Bookmark_icon";
import { useRouter } from "next/navigation";
import { useBookMarkStore } from "@/store/bookMarkStore";
import { Letter } from "@/app/(footershare)/letter-storage/page";
import BirdyTip from "./BirdyTip";
import {
  QueryClient,
  QueryClientProvider,
  useInfiniteQuery,
} from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import { useLetterInfoStore } from "@/store/letterInfoStore";
import {
  getLetterAll,
  getLetterSaved,
  getLetterWait,
} from "@/services/letterStorage";
import { birdNameMap } from "@/constants/birdNameMap"; // ✅ birdName 변환 맵 추가

const queryClient = new QueryClient();

const SeniorLetterStorage: React.FC = () => {
  const category = ["전체", "답장 해야하는 편지", "저장한 편지"];
  const router = useRouter();
  const [cateNum, setCateNum] = useState<number>(1);
  // eslint-disable-next-line
  const [showToast, setShowToast] = useState(false);
  const { bookMark } = useBookMarkStore();
  const { setBirdName, setLetterStatusSeq, setNickname } = useLetterInfoStore();

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
  const [shouldApplyCondition, setShouldApplyCondition] =
    useState<boolean>(false);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
    }
    // ✅ "저장한 편지"일 경우만 데이터 유무를 확인하여 비활성화 처리
    setShouldApplyCondition(
      cateNum === 3 ? data?.pages[0]?.totalPage !== 0 : true
    );
  }, [data, cateNum]);

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, isFetchingNextPage, inView]);

  const handleShowToast = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  if (isLoading) {
    return <div className="mt-10 text-center">로딩 중...</div>;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <div className="mb-[60px]">
        <header className="fixed top-0 flex gap-1 h-[115px] py-[11px] items-end bg-[#F9F8F3]">
          {category.map((title, idx) => (
            <span
              key={idx}
              onClick={() => setCateNum(idx + 1)} // ✅ 저장한 편지가 비어 있어도 다른 카테고리로 이동 가능하도록 수정
              className={`px-3.5 py-1.5 rounded-[20px] min-w-[53px] text-center ${
                cateNum === idx + 1
                  ? "bg-[#292D32] text-[#FFF]"
                  : "bg-[#F9F8F3] border border-[#E5E5EA] text-[#C7C7CC]"
              }`}
            >
              {title}
            </span>
          ))}
        </header>
        {shouldApplyCondition ? (
          <main className="overflow-y-auto mt-[120px] min-h-[calc(100vh)]">
            <div className="grid w-full min-w-[343px] grid-cols-2 gap-2">
              {data?.pages.map((page) =>
                page.dataList.map((letter: Letter) => {
                  const birdKey =
                    letter.birdName && birdNameMap[letter.birdName]
                      ? birdNameMap[letter.birdName]
                      : "default";

                  return (
                    <div
                      key={letter.letterStatusSeq}
                      onClick={() => {
                        if (letter.read) {
                          router.push(
                            `/letter-detail/${letter.letterStatusSeq}`
                          );
                        } else {
                          setNickname(letter.nickname);
                          setBirdName(birdKey);
                          setLetterStatusSeq(letter.letterStatusSeq);
                          router.push(`/letter-open`);
                        }
                      }}
                      className="rounded-[16px] h-[182px] bg-white flex flex-col flex-1 p-4"
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
                            bookMarkToast={letter.saved}
                            handleShowToast={handleShowToast}
                            letterStatusSeq={letter.letterStatusSeq}
                            fill={letter.saved ? "#84A667" : "none"}
                            stroke={letter.saved ? "#84A667" : "#C7C7CC"}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
            <div ref={ref} className="h-10" />
          </main>
        ) : (
          <BirdyTip />
        )}
      </div>
    </QueryClientProvider>
  );
};

export default SeniorLetterStorage;

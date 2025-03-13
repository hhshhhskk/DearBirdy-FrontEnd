import api from "@/lib/api";

// 편지 상세보기
export const getLetterDetail = async (letterStatusSeq: string | string[]) => {
  try {
    const response = await api.get(
      `/letter/details?letterStatusSeq=${letterStatusSeq}`
    );
    return response.data.data;
  } catch (error) {
    console.error("❌ 편지 상세보기 요청 실패:", error);
    return null;
  }
};

// 편지 고마움 전달
export const getThanks = async (letterSeq: number, type: string) => {
  try {
    const response = await api.get(
      `/letter/thanks?letterSeq=${letterSeq}&type=${type}`
    );
    return response.data.data;
  } catch (error) {
    console.error("❌ 편지 고마움 전달 요청 실패:", error);
    return null;
  }
};

// 편지 넘기기
export const getThrow = async (letterStatusSeq: number) => {
  try {
    const response = await api.get(
      `/letter/throw?letterStatusSeq=${letterStatusSeq}`
    );
    return response.data;
  } catch (error) {
    console.error("❌ 편지 넘기기 요청 실패:", error);
    return null;
  }
};

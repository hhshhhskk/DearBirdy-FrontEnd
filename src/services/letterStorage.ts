import api from "@/lib/api";

// 편지 보관함 전체
export const getLetterAll = async (pageNum: number) => {
  try {
    const response = await api.get(`letter/list/all?pageNumber=${pageNum}`, {
      withCredentials: true,
    });

    // console.log("편지 전체 데이터:", response.data);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching user info:", error);
    return null;
  }
};

// 편지 보관함 답장 기다리는 편지
export const getLetterWait = async (pageNum: number) => {
  try {
    const response = await api.get(
      `letter/list/pending?pageNumber=${pageNum}`,
      {
        withCredentials: true,
      }
    );
    return response.data.data;
  } catch (error) {
    console.error("Error fetching user info:", error);
    return null;
  }
};

// 편지 보관함 저장한 편지
export const getLetterSaved = async (pageNum: number) => {
  try {
    const response = await api.get(
      `letter/list/archive?pageNumber=${pageNum}`,
      {
        withCredentials: true,
      }
    );

    return response.data.data;
  } catch (error) {
    console.error("Error fetching user info:", error);
    return null;
  }
};

// 편지 보관함 저장
export const LetterSave = async (letterStatusSeq: number) => {
  try {
    // console.log("letterStatusSeq: ", letterStatusSeq);

    const response = await api.get(
      `letter/archive?letterStatusSeq=${letterStatusSeq}`,
      {
        withCredentials: true,
      }
    );
    // console.log("저장", response.data);

    return response.data;
  } catch (error) {
    console.error("Error fetching user info:", error);
    return null;
  }
};

// 버디팁
export const birdyTip = async () => {
  try {
    const response = await api.get(`birdy/tip`, {
      withCredentials: true,
    });
    // console.log(response.data);

    return response.data;
  } catch (error) {
    console.error("Error fetching user info:", error);
    return null;
  }
};

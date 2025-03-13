"use client";

import api from "@/lib/api";
import { useAuthStore } from "@/store/authStore";

// 닉네임 체크
export const checkNickname = async (nickname: string): Promise<boolean> => {
  try {
    const accessToken = useAuthStore.getState().accessToken;

    // 토큰이 없으면 API 호출 중단
    if (!accessToken) {
      console.error("❌ 닉네임 중복 확인 API 호출 실패: 액세스 토큰이 없음");
      return false;
    }

    // console.log("✅ 액세스 토큰:", accessToken ? "토큰 있음" : "토큰 없음");

    const response = await api.get(`user/check-nickname?nickname=${nickname}`, {
      headers: {
        access: accessToken, // 토큰을 헤더에 추가
      },
    });

    // console.log("✅ 닉네임 중복 확인 응답:", response.data);

    // API 응답 구조를 확인하고 적절히 처리
    if (response.data.code === 200) {
      // data가 false면 중복이 없다는 의미 (사용 가능)
      // data가 true면 중복이 있다는 의미 (사용 불가)
      return !response.data.data; // 중복이 없으면 true 반환 (available)
    }

    return false; // 응답 코드가 200이 아니면 중복으로 처리
  } catch (error) {
    console.error("❌ 닉네임 중복 확인 실패:", error);
    return false; // 오류 발생 시 중복된 것으로 처리
  }
};

/** ✅ 편지 작성시 버디 유형 조회 API */
// 📌 API 응답 타입 정의
export interface Bird {
  birdName: string;
  traits: string;
  explanation: string;
}

export interface BirdApiResponse {
  code: number;
  status: string;
  message: string;
  data: {
    birdyList: Bird[];
  };
}

// ✅ API 호출 함수의 반환 타입을 명확하게 지정
export const getBirdyInfo = async (): Promise<BirdApiResponse> => {
  // console.log("✅ 사용자 정보 요청 시작");

  try {
    const accessToken = useAuthStore.getState().accessToken;
    if (!accessToken) {
      throw new Error("❌ access_token이 없음. 로그인 필요");
    }

    const response = await api.get<BirdApiResponse>(`/birdy/letter/birdy`, {
      headers: {
        access: `{${accessToken}}`,
      },
    });

    // console.log("✅ 사용자 정보 조회 성공:", response.data);
    return response.data; // ✅ response.data를 반환하여 활용 가능
  } catch (error) {
    console.error("❌ 사용자 정보 조회 실패:", error);
    throw error;
  }
};

/** ✅ 편지 전송 API */
export interface LetterPayload {
  birdName: string;
  categoryName: string;
  title: string;
  letter: string;
}

export const postLetter = async (payload: LetterPayload) => {
  try {
    const accessToken = useAuthStore.getState().accessToken;
    if (!accessToken) {
      throw new Error("❌ access_token이 없음. 로그인 필요");
    }

    const response = await api.post(`/letter/send`, payload, {
      headers: {
        access: accessToken,
      },
    });

    // console.log("✅ 편지 전송 성공:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ 편지 전송 실패:", error);
    throw error;
  }
};

// 마이페이지 - 버디 유형 모두 보기
export const getMyPageBirdy = async () => {
  try {
    const accessToken = useAuthStore.getState().accessToken;

    const response = await api.get(`/birdy/myPage/birdy`, {
      headers: {
        access: accessToken,
      },
    });
    // console.log("마이페이지 api 테스트 중", response.data);

    return response.data;
  } catch (error) {
    console.error("Error fetching user info:", error);
    return null;
  }
};

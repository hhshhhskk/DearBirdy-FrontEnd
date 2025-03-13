import { useAuthStore } from "@/store/authStore";

/** ✅ 액세스 토큰을 가져오는 함수 */
export const getAuthToken = () => {
  return useAuthStore.getState().accessToken;
};

/** ✅ 액세스 토큰을 업데이트하는 함수 */
export const setAuthToken = (token: string) => {
  useAuthStore.getState().updateAccessToken(token);
};

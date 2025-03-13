import api from "@/lib/api";

// 홈 유저 정보 (마이페이지 포함)
export const getUserInfo = async () => {
  try {
    const response = await api.get(`/user/info`);
    return response.data;
  } catch (error) {
    console.error("Error fetching userInfo:", error);
    return null;
  }
};

// 홈화면 실시간 알림
export const getNotification = async () => {
  try {
    const response = await api.get(`/notification/subscribe`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching notifications:", error);
    return null;
  }
};

// 홈화면 전체 알림 리스트
export const getNotificationList = async () => {
  try {
    const response = await api.get(`/notification/list`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching notification list:", error);
    return null;
  }
};

import api from "@/lib/api";

export const postReply = async (formData: {
  letterStatusSeq?: number;
  categoryName?: string;
  title?: string;
  letter?: string;
}) => {
  try {
    const response = await api.post("/letter/reply", formData);
    return response.data;
  } catch (error) {
    console.error("답장 실패:", error);
    return null;
  }
};

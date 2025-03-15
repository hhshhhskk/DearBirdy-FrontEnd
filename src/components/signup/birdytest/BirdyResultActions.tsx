import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSignupStore } from "@/store/useSignupStore";
import { postAdditionalInfo } from "@/services/authService";
import NextButton from "@/components/common/NextButton";

interface BirdyResultActionsProps {
  birdData: { birdName: string } | null;
}

const BirdyResultActions = ({ birdData }: BirdyResultActionsProps) => {
  const router = useRouter();
  const { formData, resetSignup } = useSignupStore();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNext = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      const userData = {
        birdName: birdData?.birdName || formData.birdName,
        nickname: formData.nickname,
        userRole: formData.userRole,
        userCategory:
          formData.userRole === "MENTEE"
            ? {
                career: false,
                mental: false,
                relationship: false,
                love: false,
                life: false,
                finance: false,
                housing: false,
                other: false,
              }
            : formData.userCategory,
      };

      await postAdditionalInfo(userData);
      resetSignup();

      sessionStorage.removeItem("signup-storage");
      sessionStorage.removeItem("birdytest-storage");
      sessionStorage.removeItem("userData");

      router.replace("/home");
    } catch (error) {
      console.error("❌ 추가 정보 전송 실패:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="absolute bottom-[44px] flex justify-center">
      <NextButton
        text="환영해, 나의 버디!"
        onClick={handleNext}
        disabled={isSubmitting}
      />
    </div>
  );
};

export default BirdyResultActions;

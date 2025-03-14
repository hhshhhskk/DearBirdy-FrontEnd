import Image from "next/image";

interface RoleCardProps {
  role: "MENTEE" | "MENTOR";
  selectedRole: "MENTEE" | "MENTOR" | null;
  onSelect: (role: "MENTEE" | "MENTOR") => void;
  imageSrc: string;
  title: string;
  description1: string;
  description2: string;
}

const RoleCard: React.FC<RoleCardProps> = ({
  role,
  selectedRole,
  onSelect,
  imageSrc,
  title,
  description1,
  description2,
}) => {
  return (
    <div
      onClick={() => onSelect(role)}
      className={`w-[168px] h-[224px] bg-[#FFF] select-none flex flex-col items-center justify-center px-4 border-2 cursor-pointer rounded-[20px] transition-all ${
        selectedRole === role ? "border-[#84A667]" : "border-none"
      }`}
    >
      {/* ✅ 캐릭터 이미지 */}
      <Image src={imageSrc} alt={title} width={100} height={100} />

      {/* ✅ 텍스트 박스 */}
      <p className="mt-2 text-sm text-center text-[#6B7178]">
        {description1}
        <br />
        {description2}
      </p>
      <p
        className={`text-[16px] font-bold ${
          selectedRole === role ? "text-[#292D32]" : "text-[#6B7178]"
        }`}
      >
        {title}
      </p>
    </div>
  );
};

export default RoleCard;

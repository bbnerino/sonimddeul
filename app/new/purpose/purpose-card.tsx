import { LucideIcon } from "lucide-react";

interface PurposeCardProps {
  purpose: {
    id: number;
    name: string;
    description: string;
    icon: LucideIcon;
    color: string;
  };
  selected: boolean;
  onClick: () => void;
}

const PurposeCard = ({ purpose, selected, onClick }: PurposeCardProps) => {
  const Icon = purpose.icon;

  const colorClasses: Record<string, { bg: string; text: string; border: string }> = {
    blue: {
      bg: "bg-blue-50",
      text: "text-blue-600",
      border: "border-blue-500",
    },
    purple: {
      bg: "bg-purple-50",
      text: "text-purple-600",
      border: "border-purple-500",
    },
    green: {
      bg: "bg-green-50",
      text: "text-green-600",
      border: "border-green-500",
    },
    orange: {
      bg: "bg-orange-50",
      text: "text-orange-600",
      border: "border-orange-500",
    },
    pink: {
      bg: "bg-pink-50",
      text: "text-pink-600",
      border: "border-pink-500",
    },
    yellow: {
      bg: "bg-yellow-50",
      text: "text-yellow-600",
      border: "border-yellow-500",
    },
    red: {
      bg: "bg-red-50",
      text: "text-red-600",
      border: "border-red-500",
    },
    gray: {
      bg: "bg-gray-50",
      text: "text-gray-600",
      border: "border-gray-500",
    },
  };

  const colors = colorClasses[purpose.color] || colorClasses.blue;

  return (
    <div
      onClick={onClick}
      className={`flex flex-col w-[45%] items-center gap-3 rounded-xl p-6 cursor-pointer border-2 transition-all hover:shadow-md ${
        selected
          ? `${colors.border} ${colors.bg}`
          : "border-gray-300 bg-white hover:border-gray-400"
      }`}
    >
      <div className={`w-12 h-12 rounded-lg ${colors.bg} flex items-center justify-center`}>
        <Icon className={`w-6 h-6 ${colors.text}`} />
      </div>
      <div className="flex flex-col gap-1 items-center">
        <div className={`font-bold ${selected ? colors.text : "text-gray-900"}`}>
          {purpose.name}
        </div>
        <div className="text-sm text-gray-500 text-center">
          {purpose.description}
        </div>
      </div>
    </div>
  );
};

export default PurposeCard;


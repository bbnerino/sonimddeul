import { LucideIcon } from "lucide-react";

interface ToneCardProps {
  tone: {
    id: number;
    name: string;
    description: string;
    icon: LucideIcon;
    color: string;
  };
  selected: boolean;
  onClick: () => void;
}

const ToneCard = ({ tone, selected, onClick }: ToneCardProps) => {
  const Icon = tone.icon;

  const colorClasses: Record<string, { bg: string; text: string; border: string }> = {
    orange: {
      bg: "bg-orange-50",
      text: "text-orange-600",
      border: "border-orange-500",
    },
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
    green: {
      bg: "bg-green-50",
      text: "text-green-600",
      border: "border-green-500",
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

  const colors = colorClasses[tone.color] || colorClasses.gray;

  return (
    <div
      onClick={onClick}
      className={`flex flex-col gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all hover:shadow-md ${
        selected
          ? `${colors.border} ${colors.bg}`
          : "border-gray-200 bg-white hover:border-gray-300"
      }`}
    >
      <div className={`w-10 h-10 rounded-lg ${colors.bg} flex items-center justify-center`}>
        <Icon className={`w-6 h-6 ${colors.text}`} />
      </div>
      <div className="flex flex-col gap-1">
        <div className="font-bold text-gray-900">{tone.name}</div>
        <div className="text-sm text-gray-600">{tone.description}</div>
      </div>
    </div>
  );
};

export default ToneCard;


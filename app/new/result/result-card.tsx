import { RecommandMessage } from "@/app/types/reccomand-message";
import { BarChart3, Brain } from "lucide-react";

interface ResultCardProps {
  result: RecommandMessage;
}

const ResultCard = ({ result }: ResultCardProps) => {
  const colorClasses: Record<
    string,
    { border: string; bg: string; text: string; topBg: string }
  > = {
    aspirational_dreamer: {
      border: "border-pink-500",
      bg: "bg-pink-50",
      text: "text-pink-600",
      topBg: "bg-pink-500",
    },
    empathetic_supporter: {
      border: "border-blue-500",
      bg: "bg-blue-50",
      text: "text-blue-600",
      topBg: "bg-blue-500",
    },
    playful_entertainer: {
      border: "border-red-500",
      bg: "bg-red-50",
      text: "text-red-600",
      topBg: "bg-red-500",
    },
    rational_advisor: {
      border: "border-gray-200",
      bg: "bg-purple-50",
      text: "text-purple-600",
      topBg: "bg-purple-500",
    },
  };

  const colors =
    colorClasses[result.message_type] || colorClasses.aspirational_dreamer;

  const mapTypeToTitle = (type: string) => {
    switch (type) {
      case "aspirational_dreamer":
        return "열망 자극형";
      case "empathetic_supporter":
        return "공감 지원형";
      case "playful_entertainer":
        return "즐거움 엔터테이너형";
      case "rational_advisor":
        return "이성적 조언자형";
      default:
        return type;
    }
  };

  return (
    <div
      className={`bg-gray-50 rounded-lg border-2 transition-all hover:shadow-lg border-gray-200 w-[400px]`}
    >
      <div className={`h-1 ${colors.topBg} rounded-t-lg`} />

      {/* 카드 내용 */}
      <div className="p-6">
        <div className="mb-4">
          <div
            className={`text-xs border w-fit ${colors.border} rounded-full px-4 py-1 font-semibold ${colors.text}`}
          >
            {mapTypeToTitle(result.message_type)}
          </div>
        </div>

        <div className="bg-white w-[340px] rounded-xl p-4 shadow-lg m-auto">
          <div className="text-md font-bold mb-2">{result.title}</div>
          <div className="mb-6">
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
              {result.content}
            </p>
          </div>
        </div>

        <div className="mt-4 flex flex-col gap-2">
          <div className="flex items-center gap-2 py-2">
            <BarChart3 className="w-4 h-4 text-purple-500" />
            <div className="text-md font-bold text-gray-600">
              {" "}
              평가(Estimation)
            </div>
          </div>
          <div>{result.estimation}</div>
        </div>

        <div className="mt-4 flex flex-col gap-2">
          <div className="flex items-center gap-2 py-2">
            <Brain className="w-4 h-4 text-purple-500" />
            <div className="text-md font-bold text-gray-600">
              {" "}
              설명(Conclusion)
            </div>
          </div>
          <div className="text-gray-700 leading-relaxed whitespace-pre-line">
            {result.conclusion}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultCard;

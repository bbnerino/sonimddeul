interface ResultCardProps {
  result: {
    id: number;
    type: string;
    content: string;
    openRate: number;
    conversionRate: number;
    color: string;
  };
  selected: boolean;
  onSelect: () => void;
}

const ResultCard = ({ result, selected, onSelect }: ResultCardProps) => {
  const colorClasses: Record<string, { border: string; bg: string; text: string; topBg: string }> = {
    pink: {
      border: "border-pink-500",
      bg: "bg-pink-50",
      text: "text-pink-600",
      topBg: "bg-pink-500",
    },
    blue: {
      border: "border-blue-500",
      bg: "bg-blue-50",
      text: "text-blue-600",
      topBg: "bg-blue-500",
    },
    red: {
      border: "border-red-500",
      bg: "bg-red-50",
      text: "text-red-600",
      topBg: "bg-red-500",
    },
    purple: {
      border: "border-purple-500",
      bg: "bg-purple-50",
      text: "text-purple-600",
      topBg: "bg-purple-500",
    },
  };

  const colors = colorClasses[result.color] || colorClasses.blue;

  return (
    <div
      onClick={onSelect}
      className={`bg-white rounded-lg border-2 cursor-pointer transition-all hover:shadow-lg ${
        selected ? `${colors.border} ${colors.bg}` : "border-gray-200"
      }`}
    >
      {/* 상단 색상 테두리 */}
      <div className={`h-1 ${colors.topBg} rounded-t-lg`} />

      {/* 카드 내용 */}
      <div className="p-6">
        {/* 제목 */}
        <div className="mb-4">
          <h3 className={`text-lg font-bold ${colors.text}`}>{result.type}</h3>
        </div>

        {/* 메시지 내용 */}
        <div className="mb-6">
          <p className="text-gray-700 leading-relaxed whitespace-pre-line">
            {result.content}
          </p>
        </div>

        {/* 성과 지표 */}
        <div className="flex gap-6">
          <div className="flex-1">
            <div className="text-sm text-gray-500 mb-1">예상 오픈율</div>
            <div className={`text-2xl font-bold ${colors.text}`}>
              {result.openRate}%
            </div>
          </div>
          <div className="flex-1">
            <div className="text-sm text-gray-500 mb-1">전환율</div>
            <div className={`text-2xl font-bold ${colors.text}`}>
              {result.conversionRate}%
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultCard;


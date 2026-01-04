"use client";
import NewTitle from "@/app/components/new-title";
import DatePicker from "@/app/components/date-picker";
import {
  BarChart3,
  Calendar,
  Flag,
  FileText,
  Megaphone,
  Repeat,
  Calendar as CalendarIcon,
} from "lucide-react";
import StepNavigation from "@/app/components/step-navigation";
import Stepper from "@/app/components/stepper";
import { useRouter } from "next/navigation";
import PurposeCard from "./purpose-card";
import { useMessageStore, Purpose } from "@/app/store/message-store";

const PurposePage = () => {
  const purposes = [
    {
      id: 1,
      name: "정보 전달",
      description: "공지사항, 뉴스레터",
      icon: FileText,
      color: "blue",
    },
    {
      id: 2,
      name: "홍보 목적",
      description: "이벤트, 할인, 신제품 소식",
      icon: Megaphone,
      color: "purple",
    },
    {
      id: 3,
      name: "재구매 유도",
      description: "쿠폰 발송, 혜택 알림",
      icon: Repeat,
      color: "green",
    },
    {
      id: 4,
      name: "이벤트 안내",
      description: "시즌 이벤트, 행사 초청",
      icon: CalendarIcon,
      color: "orange",
    },
  ];

  const { purpose, setPurpose, kpi, setKpi } = useMessageStore();

  const availableKpis = [
    {
      id: 1,
      acronym: "CPC",
      fullName: "Cost Per Click",
      description: "클릭당 비용 효율성 중시",
    },
    {
      id: 2,
      acronym: "ROAS",
      fullName: "Return on Ad Spend",
      description: "광고비 대비 매출 성과",
    },
    {
      id: 3,
      acronym: "CPM",
      fullName: "Cost Per Mille",
      description: "브랜드 노출 극대화",
    },
    {
      id: 4,
      acronym: "CTR",
      fullName: "Click-Through Rate",
      description: "클릭률 중심의 반응도",
    },
  ];

  const router = useRouter();
  const onNext = () => {
    if (!purpose) {
      return;
    }
    router.push("/new/tone");
  };

  const handlePurposeChange = (purposeItem: Purpose) => {
    if (purpose?.id === purposeItem.id) {
      setPurpose(null);
    } else {
      setPurpose({
        id: purposeItem.id,
        name: purposeItem.name,
        description: purposeItem.description,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 pb-24 flex flex-col items-center">
      <Stepper currentStep={2} />
      <NewTitle
        title="어떤 메시지를 보내시나요?"
        description="AI가 목적에 맞는 최적의 메시지 톤앤매너를 제안합니다."
      />
      <div className="flex flex-col gap-4 w-full max-w-3xl">
        {/* 메시지 발송 목적 */}
        <div className="flex flex-col gap-4">
          <div className="text-xl font-bold text-gray-600 flex items-center gap-2">
            <Flag className="w-5 h-5 text-main" fill="currentColor" />
            메시지 발송 목적 <span className="text-main">*</span>
          </div>
          <div className="flex flex-wrap gap-4 justify-center mt-4">
            {purposes.map((purposeItem) => (
              <PurposeCard
                key={purposeItem.id}
                purpose={purposeItem}
                selected={purpose?.id === purposeItem.id}
                onClick={() => handlePurposeChange(purposeItem)}
              />
            ))}
          </div>
        </div>

        {/* 주요 성과 지표 (복수 선택 가능) */}
        <div className="flex flex-col gap-4 mt-8">
          <div className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-main" />
            <div className="text-xl font-bold text-gray-600">
              주요 성과 지표 (KPI)
            </div>
            <span className="text-sm text-gray-400">복수 선택 가능</span>
          </div>
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="grid grid-cols-2 gap-4">
              {availableKpis.map((kpiItem) => {
                const isSelected = kpi?.id === kpiItem?.id;
                return (
                  <div
                    key={kpiItem?.id}
                    className="flex items-start gap-3 p-4 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                    onClick={() => {
                      if (isSelected) {
                        setKpi(null);
                      } else {
                        setKpi(kpiItem);
                      }
                    }}
                  >
                    {/* 체크박스 */}
                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center border-2 transition-colors ${
                        isSelected
                          ? "bg-main border-main"
                          : "bg-white border-gray-300"
                      }`}
                    >
                      {isSelected && (
                        <svg
                          className="w-3 h-3 text-white"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path d="M5 13l4 4L19 7"></path>
                        </svg>
                      )}
                    </div>
                    {/* 텍스트 */}
                    <div className="flex flex-col gap-1 mt-[-2px]">
                      <div className="font-semibold text-gray-600">
                        {kpiItem?.acronym} ({kpiItem?.fullName})
                      </div>
                      <div className="text-sm text-gray-500">
                        {kpiItem?.description}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <StepNavigation
        onPrevious={() => router.push("/new/persona")}
        onNext={onNext}
        nextDisabled={!purpose}
      />
    </div>
  );
};

export default PurposePage;

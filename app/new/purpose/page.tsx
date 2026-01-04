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
import React, { useState } from "react";
import StepNavigation from "@/app/components/step-navigation";
import { useRouter } from "next/navigation";
import PurposeCard from "./purpose-card";

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

  const [selectedPurposeId, setSelectedPurposeId] = useState<number | null>(
    null
  );

  const kpis = [
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

  const [selectedKpiIds, setSelectedKpiIds] = useState<number[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);

  const router = useRouter();
  const onNext = () => {
    if (!selectedPurposeId) {
      return;
    }
    router.push("/new/tone");
  };

  return (
    <div className="min-h-screen bg-gray-100 pb-24 flex flex-col items-center">
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
            {purposes.map((purpose) => (
              <PurposeCard
                key={purpose.id}
                purpose={purpose}
                selected={selectedPurposeId === purpose.id}
                onClick={() =>
                  selectedPurposeId === purpose.id
                    ? setSelectedPurposeId(null)
                    : setSelectedPurposeId(purpose.id)
                }
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
              {kpis.map((kpi) => {
                const isSelected = selectedKpiIds.includes(kpi.id);
                return (
                  <div
                    key={kpi.id}
                    className="flex items-start gap-3 p-4 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                    onClick={() => {
                      if (isSelected) {
                        setSelectedKpiIds(
                          selectedKpiIds.filter((id) => id !== kpi.id)
                        );
                      } else {
                        setSelectedKpiIds([...selectedKpiIds, kpi.id]);
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
                        {kpi.acronym} ({kpi.fullName})
                      </div>
                      <div className="text-sm text-gray-500">
                        {kpi.description}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* 발송 예정일  */}
        <div className="flex flex-col gap-4 mt-8">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-main" />
            <div className="text-xl font-bold text-gray-600">
              발송 예정일 (선택)
            </div>
          </div>
          <div>
            <DatePicker selected={selectedDate} onSelect={setSelectedDate} />
          </div>
        </div>
      </div>
      <StepNavigation
        onPrevious={() => router.push("/new/persona")}
        onNext={onNext}
        nextDisabled={!selectedPurposeId}
      />
    </div>
  );
};

export default PurposePage;

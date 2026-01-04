"use client";

import NewTitle from "@/app/components/new-title";
import {
  MapPlus,
  Palette,
  Smile,
  Briefcase,
  Sparkles,
  Heart,
  Zap,
  Leaf,
  Clock,
  Shield,
} from "lucide-react";
import { useState } from "react";
import ToneCard from "./tone-card";
import StepNavigation from "@/app/components/step-navigation";
import { useRouter } from "next/navigation";

const TonePage = () => {
  const router = useRouter();
  const tones = [
    {
      id: 1,
      name: "친근한",
      description: "고객님 안녕하세요! 오늘 날씨 참 좋죠? 😊",
      icon: Smile,
      color: "orange",
    },
    {
      id: 2,
      name: "전문적인",
      description: "최적의 비즈니스 효율을 위한 솔루션을 제안합니다.",
      icon: Briefcase,
      color: "blue",
    },
    {
      id: 3,
      name: "재치있는",
      description: "이거 놓치면 후회할지도 몰라요! 😲",
      icon: Sparkles,
      color: "purple",
    },
    {
      id: 4,
      name: "감성적인",
      description: "당신의 일상에 따뜻한 위로가 되어드릴게요.",
      icon: Heart,
      color: "pink",
    },
    {
      id: 5,
      name: "활기찬",
      description: "지금 바로 시작해보세요! 파이팅! 💪",
      icon: Zap,
      color: "yellow",
    },
    {
      id: 6,
      name: "차분한",
      description: "조용하고 아늑한 휴식을 선물합니다.",
      icon: Leaf,
      color: "green",
    },
    {
      id: 7,
      name: "긴급/강조",
      description: "마감 임박! 50% 할인 혜택을 잡으세요.",
      icon: Clock,
      color: "red",
    },
    {
      id: 8,
      name: "조심스러운",
      description: "조심스러운 말투로 고객을 보호합니다.",
      icon: Shield,
      color: "gray",
    },
  ];
  const onNext = () => {
    if (!selectedToneId) {
      return;
    }
    router.push("/new/submit");
  };

  const [selectedToneId, setSelectedToneId] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-gray-100 pb-24 flex flex-col items-center">
      <NewTitle
        title="브랜드 톤앤 매너 선택"
        description="브랜드 이미지에 맞는 말투를 선택해주시면 AI가 맞춤형 메시지를 생성해드립니다."
      />

      <div className="flex flex-col gap-16 w-full max-w-6xl px-4">
        {/* 브랜드 톤앤 매너 선택 */}
        <div className="flex flex-col gap-4">
          <div className="text-xl font-bold text-gray-600 flex items-center gap-2">
            <Palette className="w-5 h-5 text-main" />
            브랜드 톤앤 매너 선택 <span className="text-main">*</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {tones.map((tone) => (
              <ToneCard
                key={tone.id}
                tone={tone}
                selected={selectedToneId === tone.id}
                onClick={() =>
                  selectedToneId === tone.id
                    ? setSelectedToneId(null)
                    : setSelectedToneId(tone.id)
                }
              />
            ))}
          </div>
        </div>

        {/* 추가 요청 사항 */}
        <div className="flex flex-col gap-4">
          <div className="text-xl font-bold text-gray-600 flex items-center gap-2">
            <MapPlus className="w-5 h-5 text-main" />
            추가 요청 사항
            <span className="text-sm font-normal text-gray-400 ml-2">
              선택사항
            </span>
          </div>
          <div>
            <textarea
              placeholder="메시지에 꼭 포함되어야 하는 키워드나, 제외하고 싶은 표현이 있다면 적어주세요. (예: '최대 30% 할인' 문구 필수 포함, 너무 딱딱한 표현 지양)"
              className="w-full h-32 p-4 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-main focus:border-transparent"
            />
          </div>
        </div>
      </div>
      <StepNavigation
        onPrevious={() => router.push("/new/purpose")}
        onNext={onNext}
        nextDisabled={!selectedToneId}
      />
    </div>
  );
};

export default TonePage;

"use client";
import NewTitle from "@/app/components/new-title";
import PersonaCard from "@/app/new/persona/persona-card";
import StepNavigation from "@/app/components/step-navigation";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { personas } from "./_data";

export default function PersonaPage() {
  const title = "페르소나 선택";
  const description = `AI가 분석할 타겟 고객의 페르소나를 선택해주세요. \n 선택된 페르소나를 기반으로 가장 효과적인 마케팅 메시지를 생성합니다`;

  const [selectedPersonaId, setSelectedPersonaId] = useState<number | null>(
    null
  );

  const router = useRouter();

  const onNext = () => {
    if (selectedPersonaId === null) {
      return;
    }
    router.push(`/new/purpose`);
  };

  return (
    <div className="min-h-screen bg-gray-100 pb-24">
      <NewTitle title={title} description={description} />
      <div className="flex flex-wrap justify-center gap-8 px-20 pb-8">
        {personas.map((persona) => (
          <PersonaCard
            key={persona.idx}
            persona={persona}
            onClick={() =>
              selectedPersonaId === persona.idx
                ? setSelectedPersonaId(null)
                : setSelectedPersonaId(persona.idx)
            }
            selected={selectedPersonaId === persona.idx || false}
          />
        ))}
      </div>
      <StepNavigation
        onPrevious={() => router.push("/")}
        onNext={onNext}
        nextDisabled={!selectedPersonaId}
      />
    </div>
  );
}

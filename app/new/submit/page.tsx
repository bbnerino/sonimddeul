"use client";
import NewTitle from "@/app/components/new-title";
import "../../design/loading.css";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LoadingPage() {
  const description = `AI 에이전트가 고객 데이터를 분석하여 \n 최적의 CRM 마케팅 메시지를 작성하고 있습니다.`;

  const router = useRouter();
  useEffect(() => {
    setTimeout(() => {
      router.push("/new/result");
    }, 5000);
  }, []);
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="relative">
        <div className="spinner" />
      </div>

      <NewTitle
        title="메시지 생성 및 성과 예측 중..."
        description={description}
      />
    </div>
  );
}

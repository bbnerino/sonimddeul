"use client";
import NewTitle from "@/app/components/new-title";
import Stepper from "@/app/components/stepper";
import "../../design/loading.css";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useMessageStore } from "@/app/store/message-store";
import { useResponseStore, MessageResponse } from "@/app/store/response-store";
import { adkApi } from "@/api/adk.api";

export default function LoadingPage() {
  const description = `AI 에이전트가 고객 데이터를 분석하여 \n 최적의 CRM 마케팅 메시지를 작성하고 있습니다.`;

  const router = useRouter();
  const { persona, purpose, tone, kpi, date, additionalRequests } =
    useMessageStore();
  const { setMessageResponse } = useResponseStore();
  const hasRequested = useRef(false);

  const postMessage = async () => {
    const config: Record<string, string | null> = {
      persona_id: persona?.persona_id || null,
      message_purpose: purpose ? `${purpose.name}${purpose.description}` : null,
      brand_tone: tone?.name || null,
      key_marketing_achievements: kpi?.acronym || null,
      message_sending_datetime: date ? new Date(date).toISOString() : null,
      additional_request: additionalRequests || null,
      // product_info: null,
      // current_event_info: null,
    };

    // 빈 문자열을 null로 변환하고, null 값 제거
    Object.keys(config).forEach((key) => {
      const value = config[key];
      if (value === null || value === "") {
        delete config[key];
      }
    });

    try {
      await adkApi.postMessage(
        config,
        (data) => {
          // SSE 메시지 수신 처리
          console.log("SSE Message:", data);

          // content가 있는 경우 메시지 추가
          if (data.content?.parts?.[0]?.text) {
            try {
              const textContent = JSON.parse(data.content.parts[0].text);
              const message = `[${data.author}] ${JSON.stringify(
                textContent,
                null,
                2
              )}`;
              setMessageList((prev) => [...prev, message]);
            } catch {
              // JSON 파싱 실패 시 원본 텍스트 사용
              const message = `[${data.author}] ${data.content.parts[0].text}`;
              setMessageList((prev) => [...prev, message]);
            }
          } else if (data.event_status) {
            // 이벤트 상태만 있는 경우
            const message = `[${data.author || "system"}] ${
              data.event_status
            } - ${data.branch || ""}`;
            setMessageList((prev) => [...prev, message]);
          }

          // 완료 상태 확인
          if (data.event_status === "complete") {
            console.log("complete", data);
          }
        },
        (error) => {
          console.error("API Error:", error);
          setMessageList((prev) => [...prev, `[Error] ${error.message}`]);
        }
      );
    } catch (error) {
      console.error("API Error:", error);
      setMessageList((prev) => [
        ...prev,
        `[Error] ${error instanceof Error ? error.message : "Unknown error"}`,
      ]);
    }
  };

  const postMessage2 = async () => {
    const config = {
      persona_id: persona?.persona_id || null,
      message_purpose: purpose ? `${purpose.name}${purpose.description}` : null,
      brand_tone: tone?.name || null,
      key_marketing_achievements: kpi?.acronym || null,
      message_sending_datetime: date ? new Date(date).toISOString() : null,
      additional_request: additionalRequests || null,
    };
    try {
      const response = await adkApi.postMessage2(config);
      console.log("response", response);
      // 응답을 스토어에 저장
      setMessageResponse(response as MessageResponse);
      // 성공 시 결과 페이지로 이동
      setTimeout(() => {
        router.push("/new/result");
      }, 2000);
    } catch (error) {
      console.error("API Error:", error);
    }
  };

  useEffect(() => {
    // 이미 요청을 보냈으면 중복 실행 방지
    if (hasRequested.current) {
      return;
    }

    hasRequested.current = true;

    postMessage2();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [messageList, setMessageList] = useState<string[]>([]);

  return (
    <div className="flex min-h-screen flex-col">
      <Stepper currentStep={5} />
      <div className="flex flex-col items-center justify-center flex-1">
        <div className="relative">
          <div className="spinner" />
        </div>

        <NewTitle
          title="메시지 생성 및 성과 예측 중..."
          description={description}
        />
      </div>
      {messageList.length > 0 && (
        <div className="w-full max-w-4xl mx-auto px-6 py-4 mt-8">
          <div className="bg-white rounded-lg border border-gray-200 p-4 max-h-96 overflow-y-auto">
            <h3 className="text-lg font-bold text-gray-900 mb-4">진행 상황</h3>
            <div className="space-y-2">
              {messageList.map((message, index) => (
                <div
                  key={index}
                  className="text-sm text-gray-700 bg-gray-50 p-3 rounded border border-gray-200 font-mono whitespace-pre-wrap wrap-break-word"
                >
                  {message}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

interface SSEMessage {
  event_status?: string;
  user_id?: string;
  session_id?: string;
  branch?: string | null;
  author?: string | null;
  timestamp?: number;
  is_final_response?: boolean;
  ui_status?: unknown;
  content?: {
    role?: string;
    parts?: Array<{
      text?: string;
      [key: string]: unknown;
    }>;
  };
  error?: unknown;
}

import { MessageResponse } from "@/app/store/response-store";

export const adkApi = {
  postMessage: async (
    config: unknown,
    onMessage: (data: SSEMessage) => void,
    onError?: (error: Error) => void
  ) => {
    const data = {
      user_id: "test_user",
      config: config,
    };

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/messages/run_sse`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const error = new Error(
        `API Error: ${response.status} - ${JSON.stringify(errorData)}`
      );
      onError?.(error);
      throw error;
    }

    if (!response.body) {
      throw new Error("Response body is null");
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let buffer = "";

    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() || "";

        for (const line of lines) {
          if (line.startsWith("data: ") || line.startsWith("ta: ")) {
            const jsonStr = line.replace(/^(data|ta): /, "").trim();
            if (jsonStr) {
              try {
                const jsonData = JSON.parse(jsonStr);
                onMessage(jsonData);
              } catch (e) {
                console.error("Failed to parse SSE data:", jsonStr, e);
              }
            }
          }
        }
      }
    } finally {
      reader.releaseLock();
    }
  },

  postMessage2: async (config: unknown): Promise<MessageResponse> => {
    // const response = await fetch(
    //   `${process.env.NEXT_PUBLIC_API_URL}/messages/run_sse`,
    //   {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(config),
    //   }
    // );
    return {
      results: [
        {
          message_type: "aspirational_dreamer",
          title: "지민님, 숏폼 속 언니 피부? 필터빨 NO!",
          content:
            "지민님, 숏폼 속 그 언니 피부, 혹시 필터빨이라고 생각했나요? 놉! 사실은 똑똑한 루틴빨이랍니다. 바쁜 지민님을 위한 5분 컷 미니멀 루틴으로 시간은 아끼고, 피부는 플렉스해보세요! 까다로운 성분러 지민님도 OK할 크루얼티프리 고기능 성분으로 피부 고민은 싹- 날려버릴 기회! 과대광고 걱정 없이 진짜 변화를 선사할 특별한 이벤트에 지민님을 초대해요.",
          estimation: "예상 오픈율: 28% | 전환율: 5.2%",
          conclusion:
            "이상적인 미래 모습을 그리며 동기부여하는 메시지로, 숏폼 콘텐츠에 익숙한 페르소나의 라이프스타일을 반영했습니다.",
        },
        {
          message_type: "empathetic_supporter",
          title: "지민님, 뷰티 신상에 선택장애 오셨나요?",
          content:
            "매일 쏟아지는 숏폼 속 '이건 사야 해!' 신상들, '성분 덕후' 지민님도 이쯤 되면 '피부 명탐정' 역할에 지치실 때 아닌가요? 과대광고는 쏙 빼고, 진짜배기만 찾는 똑똑한 고민, 저희도 격하게 공감합니다! 이런 지민님을 위해 특별히 준비한 '고기능+착한 성분 라인' 런칭 기념! 전 제품 최대 30% 할인 & 샘플 증정 이벤트에 지민님을 초대합니다.",
          estimation: "예상 오픈율: 32% | 전환율: 6.8%",
          conclusion:
            "고객의 고민과 페인 포인트를 공감하며 해결책을 제시하는 메시지로, 신뢰감과 소속감을 제공합니다.",
        },
        {
          message_type: "playful_entertainer",
          title: "성분 탐정 그만! 고기능 특가 왔어요",
          content:
            "지민님, 쏟아지는 신상 속 '내돈내산' 성분 탐정 노릇, 이제 그만! 릴스보다 빠르게, 화해 앱 켜기 전에! 고기능 레티놀/펩타이드 제품을 투명한 성분 공개와 함께 '현명하게' 득템할 기회예요. 소용량/미니멀 패키징은 기본, 크루얼티프리 철학까지 완벽! 올리브영 세일만 기다리다 지쳤다면? 지금 바로 고민 끝! 똑똑한 소비 패턴 저격, 이번 시즌 특가로 피부도 지갑도 즐겁게 채워보세요.",
          estimation: "예상 오픈율: 35% | 전환율: 7.5%",
          conclusion:
            "재치있고 유머러스한 톤으로 고객의 관심을 끌며, 트렌디한 표현을 활용해 친근함을 더했습니다.",
        },
        {
          message_type: "rational_advisor",
          title: "지민님, 성분 분석 끝났어요. 결론은?",
          content:
            "지민님, 레티놀과 펩타이드 성분이 피부 개선에 효과적이라는 건 알고 계시죠? 하지만 어떤 제품이 진짜 효과가 있는지 판단하기 어려우실 거예요. 저희는 성분을 투명하게 공개하고, 실제 효과를 입증한 제품만을 선별했습니다. 미니멀 패키징과 크루얼티프리 철학을 지키면서도 고기능 성분을 담았습니다. 올리브영 세일 기간보다 더 좋은 조건으로, 지금 바로 확인해보세요.",
          estimation: "예상 오픈율: 24% | 전환율: 4.8%",
          conclusion:
            "논리적이고 전문적인 접근으로 신뢰를 구축하며, 성분과 효과에 대한 명확한 정보를 제공합니다.",
        },
      ],
    };
  },
};

// aspirational_dreamer|  empathetic_supporter| playful_entertainer| rational_advisor

// {
//   results : [
//     { message_type:” aspirational_dreamer|  empathetic_supporter| playful_entertainer| rational_advisor”,title :”” , cotent : “”, estimation : “평가”, conclusion : “설명”}
//   ]
//   }

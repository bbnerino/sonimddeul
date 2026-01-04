"use client";

import { Check } from "lucide-react";
import { useRouter } from "next/navigation";

const steps = [
  { number: 1, label: "페르소나 선정", path: "/new/persona" },
  { number: 2, label: "메시지 목적", path: "/new/purpose" },
  { number: 3, label: "메시지 톤 및 매너", path: "/new/tone" },
  { number: 4, label: "메시지 정보 입력", path: "/new/info" },
  { number: 5, label: "메시지 생성", path: "/new/submit" },
];

interface StepperProps {
  currentStep: number; // 1부터 시작하는 현재 단계
}

export default function Stepper({ currentStep }: StepperProps) {
  const router = useRouter();

  const getStepStatus = (stepNumber: number) => {
    if (stepNumber < currentStep) {
      return "completed";
    }
    if (stepNumber === currentStep) {
      return "active";
    }
    return "disabled";
  };

  const handleStepClick = (stepNumber: number, stepPath: string) => {
    const status = getStepStatus(stepNumber);
    // 완료된 단계만 클릭 가능
    if (status === "completed") {
      router.push(stepPath);
    }
  };

  return (
    <div className="bg-white border-b border-gray-200 px-6 py-4 w-full">
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        {steps.map((step) => {
          const status = getStepStatus(step.number);
          const isCompleted = status === "completed";
          const isActive = status === "active";
          const isClickable = isCompleted;

          return (
            <div
              key={step.number}
              className={`flex flex-col items-center flex-1 ${
                isClickable ? "cursor-pointer" : "cursor-default"
              }`}
              onClick={() => handleStepClick(step.number, step.path)}
            >
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center font-semibold transition-colors ${
                  isCompleted
                    ? "bg-green-500 text-white hover:bg-green-600"
                    : isActive
                    ? "bg-purple-600 text-white"
                    : "bg-gray-200 text-gray-400"
                }`}
              >
                {isCompleted ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <span className="text-xs">{step.number}</span>
                )}
              </div>
              <span
                className={`mt-2 text-xs font-medium ${
                  isCompleted
                    ? "text-green-600 hover:text-green-700"
                    : isActive
                    ? "text-purple-600"
                    : "text-gray-400"
                }`}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

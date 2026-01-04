import { create } from "zustand";

export interface MessageResult {
  message_type: "aspirational_dreamer" | "empathetic_supporter" | "playful_entertainer" | "rational_advisor";
  title: string;
  content: string;
  estimation: string;
  conclusion: string;
}

export interface MessageResponse {
  results: MessageResult[];
}

interface ResponseStore {
  messageResponse: MessageResponse | null;
  setMessageResponse: (response: MessageResponse | null) => void;
  reset: () => void;
}

export const useResponseStore = create<ResponseStore>((set) => ({
  messageResponse: null,
  setMessageResponse: (response) => set({ messageResponse: response }),
  reset: () => set({ messageResponse: null }),
}));


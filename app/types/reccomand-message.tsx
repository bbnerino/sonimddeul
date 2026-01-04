export interface RecommandMessage {
  message_type:
    | "aspirational_dreamer"
    | "empathetic_supporter"
    | "playful_entertainer"
    | "rational_advisor";
  title: string;
  content: string;
  estimation: string;
  conclusion: string;
}

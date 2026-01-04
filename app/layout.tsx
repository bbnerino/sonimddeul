import type { Metadata } from "next";
import "./design/globals.css";

export const metadata: Metadata = {
  title: "Sonimddeul",
  description: "Sonimddeul App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="antialiased">{children}</body>
    </html>
  );
}

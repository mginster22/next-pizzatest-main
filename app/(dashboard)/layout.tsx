import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import Header from "@/shared/components/shared/Header";
import "../globals.css";

const nunito = Nunito({
  subsets: ["cyrillic"],
  variable: "--font-nunito",
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Next Pizza",
};

export default function DashBoardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={nunito.className}>
        <main className="min-h-screen">
          <Header/>
          {children}
        </main>
      </body>
    </html>
  );
}

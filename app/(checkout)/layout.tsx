import type { Metadata } from "next";
import Header from "@/shared/components/shared/Header";
import { Container } from "@/shared/components/shared/container";

export const metadata: Metadata = {
  title: "Next Pizza",
};

export default function CheckoutLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="min-h-screen ">
      <Container>
        <Header
          className="border-b-gray-200"
          hasSearch={false}
          hasCart={false}
        />
        {children}
      </Container>
    </main>
  );
}

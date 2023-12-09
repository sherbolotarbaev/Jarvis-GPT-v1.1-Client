"use client";

import Header from "@/lib/components/Header";

interface Props {
  children: React.ReactNode;
}

export default function LayoutClient({ children }: Props) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}

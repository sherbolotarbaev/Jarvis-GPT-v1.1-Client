"use client";

import { Toaster } from "sonner";

interface Props {
  children: React.ReactNode;
}

export default function RootLayoutClient({ children }: Props) {
  return (
    <main style={{ width: "100vw", height: "100vh", minWidth: "350px" }}>
      {children} <Toaster richColors />
    </main>
  );
}

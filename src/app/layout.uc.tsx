"use client";

import { Toaster } from "sonner";

interface Props {
  children: React.ReactNode;
}

export default function RootLayoutClient({ children }: Props) {
  return (
    <main>
      {children} <Toaster richColors />
    </main>
  );
}

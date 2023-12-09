import RootLayoutClient from "./layout.uc";
import type { Metadata } from "next";
import { UserProvider } from "@/lib/providers/UserProvider";
import { siteConfig } from "../../config/site";
import { Inter } from "next/font/google";
import "@/lib/styles/global.scss";

const font = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
};

interface Props {
  children: React.ReactNode;
}

export default async function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <body className={font.className}>
        <UserProvider>
          <RootLayoutClient>{children}</RootLayoutClient>
        </UserProvider>
      </body>
    </html>
  );
}

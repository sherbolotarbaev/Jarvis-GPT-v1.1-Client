import type { Metadata } from "next";
import DeactivatedClient from "./page.uc";

export const metadata: Metadata = {
  title: "Account Deactivated",
};

export default async function Deactivated() {
  return <DeactivatedClient />;
}

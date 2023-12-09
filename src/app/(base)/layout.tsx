import LayoutClient from "./layout.uc";

interface Props {
  children: React.ReactNode;
}

export default async function Layout({ children }: Props) {
  return <LayoutClient>{children}</LayoutClient>;
}

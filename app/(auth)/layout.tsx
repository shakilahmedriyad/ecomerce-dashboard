import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });
export default function authLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="flex justify-center items-center h-full">{children}</div>;
}

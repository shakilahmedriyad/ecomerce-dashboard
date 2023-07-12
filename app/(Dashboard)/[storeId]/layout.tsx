import NavBar from "@/components/NavBar/NavBar";
import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const { userId } = auth();
  if (!userId) {
    window.location.assign("/sign-in");
    return;
  }
  const store = await prismadb.store.findFirst({
    where: {
      userId,
    },
  });
  if (!store) {
    redirect("/");
  }
  return (
    <>
      <NavBar />
      {children}
    </>
  );
}

import { UserButton, auth } from "@clerk/nextjs";
import MainNav from "./MainNav";
import StoreSwithcer from "./Store-chooser";
import prismadb from "@/lib/prismadb";
import { redirect } from "next/navigation";

export default async function NavBar() {
  const { userId } = auth();
  if (!userId) {
    redirect("/sing-in");
  }
  const store = await prismadb.store.findMany({
    where: {
      userId,
    },
  });
  return (
    <div className="flex px-5 py-7 border-b  items-center">
      <StoreSwithcer items={store} />
      <MainNav className="mx-6" />
      <div className="flex ml-auto">
        <UserButton />
      </div>
    </div>
  );
}

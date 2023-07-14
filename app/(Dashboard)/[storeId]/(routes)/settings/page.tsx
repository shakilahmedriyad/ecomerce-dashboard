import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import SettingsFrom from "./components/SettingsForm";

interface SettingsProsp {
  params: {
    storeId: string;
  };
}

const Settings: React.FC<SettingsProsp> = async ({ params }) => {
  const { userId } = auth();
  if (!userId) {
    redirect("/sign-in");
  }

  const store = await prismadb.store.findFirst({
    where: {
      id: params.storeId,
      userId,
    },
  });

  if (!store) {
    redirect("/");
  }

  return (
    <div className="p-10">
      <SettingsFrom store={store} />
    </div>
  );
};

export default Settings;

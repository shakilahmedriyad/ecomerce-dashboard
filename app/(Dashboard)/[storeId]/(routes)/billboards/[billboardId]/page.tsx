import prismadb from "@/lib/prismadb";

import BillBoardsForm from "./components/BillBoardForm";
import { Separator } from "@/components/ui/separator";

const BillBoardsSetting = async ({
  params,
}: {
  params: { billboardId: string };
}) => {
  const billBoard = await prismadb.billboard.findFirst({
    where: {
      id: params.billboardId,
    },
  });
  return (
    <div className="flex-col p-8 pt-16">
      <BillBoardsForm billboard={billBoard} />
    </div>
  );
};

export default BillBoardsSetting;

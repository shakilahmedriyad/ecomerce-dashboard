import prismadb from "@/lib/prismadb";

import BillBoardsForm from "./components/BillBoardForm";

const BillBoardsSetting = async ({
  params,
}: {
  params: { billboardId: string };
}) => {
  const billBoard = await prismadb.billboard.findUnique({
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

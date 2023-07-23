import { Separator } from "@/components/ui/separator";
import ClientBillboard from "./components/client";
import prismadb from "@/lib/prismadb";

interface BillBoardProps {
  params: {
    storeId: string;
  };
}

const BillBoards: React.FC<BillBoardProps> = async ({ params }) => {
  const billboard = await prismadb.billboard.findMany({
    where: {
      storeId: params.storeId,
    },
  });
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ClientBillboard billboards={billboard} />
        
      </div>
    </div>
  );
};

export default BillBoards;

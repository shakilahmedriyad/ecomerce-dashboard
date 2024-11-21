import ClientCategoryBoard from "./components/client";
import prismadb from "@/lib/prismadb";

interface BillBoardProps {
  params: {
    storeId: string;
  };
}

const BillBoards: React.FC<BillBoardProps> = async ({ params }) => {
  const category = await prismadb.category.findMany({
    where: {
      storeId: params.storeId,
    },
    include: {
      billboard: true,
    },
    orderBy: {
      created_at: "desc",
    },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ClientCategoryBoard categories={category} />
      </div>
    </div>
  );
};

export default BillBoards;

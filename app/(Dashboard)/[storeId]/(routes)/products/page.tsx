import ClientBillboard from "./components/client";
import prismadb from "@/lib/prismadb";
import { format } from "date-fns";
interface BillBoardProps {
  params: {
    storeId: string;
  };
}

const BillBoards: React.FC<BillBoardProps> = async ({ params }) => {
  
  const products = await prismadb.product.findMany({
    where: {
      storeId: params.storeId,
    },
    include: {
      size: true,
      color: true,
      category: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  
  const formatedProductData = products?.map((item) => {
    return {
      id: item.id,
      name: item.name,
      price: item.price.toNumber(),
      archived: item.isArchived,
      featured: item.isFeatured,
      color: item.color.value,
      category: item.category.name,
      size: item.size.name,
      createdAt: format(item.createdAt, "MMMM do, yyyy"),
    };
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ClientBillboard products={formatedProductData} />
      </div>
    </div>
  );
};

export default BillBoards;

import ClientProduct from "./components/client";
import prismadb from "@/lib/prismadb";
import { format } from "date-fns";
interface ProductProps {
  params: {
    storeId: string;
  };
}

const Products: React.FC<ProductProps> = async ({ params }) => {
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
        <ClientProduct products={formatedProductData} />
      </div>
    </div>
  );
};

export default Products;

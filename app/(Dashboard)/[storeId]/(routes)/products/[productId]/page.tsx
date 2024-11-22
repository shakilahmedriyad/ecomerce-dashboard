import prismadb from "@/lib/prismadb";
import ProductsForm from "./components/ProductsForm";

const ProductsSetting = async ({
  params,
}: {
  params: { productId: string; storeId: string };
}) => {
  const product = await prismadb.product.findFirst({
    where: {
      id: params.productId,
    },
    include: {
      size: true,
      color: true,
      category: true,
      image: true,
    },
  });

  const category = await prismadb.category.findMany({
    where: { storeId: params.storeId },
  });
  const size = await prismadb.size.findMany({
    where: { storeId: params.storeId },
  });
  const color = await prismadb.color.findMany({
    where: { storeId: params.storeId },
  });

  return (
    <div className="flex-col p-8 pt-16">
      <ProductsForm
        product={product}
        category={category}
        size={size}
        color={color}
      />
    </div>
  );
};

export default ProductsSetting;

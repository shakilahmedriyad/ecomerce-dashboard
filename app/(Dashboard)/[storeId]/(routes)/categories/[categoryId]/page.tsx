import prismadb from "@/lib/prismadb";

import CategoryForm from "./components/CategoryForm";

const CategoryBoardSettings = async ({
  params,
}: {
  params: { categoryId: string; storeId: string };
}) => {
  const category = await prismadb.category.findFirst({
    where: {
      id: params.categoryId,
    },
  });
  const billboards = await prismadb.billboard.findMany({
    where: {
      storeId: params.storeId,
    },
  });
  return (
    <div className="flex-col p-8 pt-16">
      <CategoryForm category={category} billboards={billboards} />
    </div>
  );
};

export default CategoryBoardSettings;

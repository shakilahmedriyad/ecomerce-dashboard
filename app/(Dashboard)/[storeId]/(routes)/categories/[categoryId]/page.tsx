import prismadb from "@/lib/prismadb";

import CategoryForm from "./components/CategoryForm";

const CategoryBoardSettings = async ({
  params,
}: {
  params: { categoryId: string };
}) => {
  const category = await prismadb.category.findFirst({
    where: {
      id: params.categoryId,
    },
  });
  return (
    <div className="flex-col p-8 pt-16">
      <CategoryForm category={category} />
    </div>
  );
};

export default CategoryBoardSettings;

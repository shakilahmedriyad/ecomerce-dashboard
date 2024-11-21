import prismadb from "@/lib/prismadb";

import SizesForm from "./components/SizesForm";

const SizesSetting = async ({ params }: { params: { sizeId: string } }) => {
  const size = await prismadb.size.findFirst({
    where: {
      id: params.sizeId,
    },
  });
  return (
    <div className="flex-col p-8 pt-16">
      <SizesForm size={size} />
    </div>
  );
};

export default SizesSetting;

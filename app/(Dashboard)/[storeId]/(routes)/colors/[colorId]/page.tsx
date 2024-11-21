import prismadb from "@/lib/prismadb";

import ColorsForm from "./components/ColorForm";

const ColorsSetting = async ({ params }: { params: { colorId: string } }) => {
  const color = await prismadb.color.findFirst({
    where: {
      id: params.colorId,
    },
  });
  return (
    <div className="flex-col p-8 pt-16">
      <ColorsForm color={color} />
    </div>
  );
};

export default ColorsSetting;

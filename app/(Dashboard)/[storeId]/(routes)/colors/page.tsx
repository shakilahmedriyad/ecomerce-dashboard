import ClientColor from "./components/client";
import prismadb from "@/lib/prismadb";

interface ColorProps {
  params: {
    storeId: string;
  };
}

const Colors: React.FC<ColorProps> = async ({ params }) => {
  const colors = await prismadb.color.findMany({
    where: {
      storeId: params.storeId,
    },
  });
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ClientColor colors={colors} />
      </div>
    </div>
  );
};

export default Colors;

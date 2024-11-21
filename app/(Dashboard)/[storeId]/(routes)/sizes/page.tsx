import ClientSize from "./components/client";
import prismadb from "@/lib/prismadb";

interface sizeProps {
  params: {
    storeId: string;
  };
}

const sizes: React.FC<sizeProps> = async ({ params }) => {
  const size = await prismadb.size.findMany({
    where: {
      storeId: params.storeId,
    },
  });
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ClientSize sizes={size} />
      </div>
    </div>
  );
};

export default sizes;

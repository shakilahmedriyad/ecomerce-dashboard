import { Separator } from "@/components/ui/separator";
import ClientBillboard from "./components/client";

const BillBoards = () => {
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ClientBillboard />
        <Separator />
      </div>
    </div>
  );
};

export default BillBoards;

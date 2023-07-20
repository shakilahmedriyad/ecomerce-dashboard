"use client";
import { format } from "date-fns";
import HeadingComponent from "@/components/HeadingComponent/HeadingComponent";
import { Button } from "@/components/ui/button";
import { Billboard } from "@prisma/client";
import { Plus } from "lucide-react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { BillboardColumns, BillboardDataTableType } from "./column";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/Table/DataTable";

interface ClientBillboardProps {
  billboards: Billboard[];
}

const ClientBillboard: React.FC<ClientBillboardProps> = ({ billboards }) => {
  const param = useParams();
  const router = useRouter();

  const billboardsColumData: BillboardDataTableType[] = billboards.map(
    (item) => {
      return {
        id: item.id,
        label: item.label,
        createdAt: format(item.createdAt, "MMMM do, yyyy"),
      };
    }
  );

  return (
    <>
      <div className="flex justify-between items-center">
        <HeadingComponent
          title={`Billboards (${billboards.length})`}
          descriptons="Manage your shop products"
        />
        <Button
          size={"sm"}
          onClick={() => router.push(`/${param.storeId}/billboards/new`)}
        >
          <Plus className="mr-2 h-4 w-4 ml-0" />
          add new
        </Button>
      </div>
      <Separator />
      <DataTable columns={BillboardColumns} data={billboardsColumData} />
    </>
  );
};

export default ClientBillboard;

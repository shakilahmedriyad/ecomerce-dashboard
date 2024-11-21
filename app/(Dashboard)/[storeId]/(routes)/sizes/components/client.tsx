"use client";
import { format } from "date-fns";
import HeadingComponent from "@/components/HeadingComponent/HeadingComponent";
import { Button } from "@/components/ui/button";
import { Size } from "@prisma/client";
import { Plus } from "lucide-react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { SizeColumns, SizeDataTableType } from "./column";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/Table/DataTable";
import ApiAlertBar from "@/components/AlertBar/AlertBar";
import useOrigin from "@/hooks/use-Origin";

interface ClientSizeProps {
  sizes: Size[];
}

const ClientSize: React.FC<ClientSizeProps> = ({ sizes }) => {
  const param = useParams();
  const router = useRouter();
  const origin = useOrigin();

  const sizesColumData: SizeDataTableType[] = sizes.map((item) => {
    return {
      id: item.id,
      name: item.name,
      value: item.value,
      createdAt: format(item.createdAt, "MMMM do, yyyy"),
    };
  });

  return (
    <>
      <div className="flex justify-between items-center">
        <HeadingComponent
          title={`Sizes (${sizes.length})`}
          descriptons="Manage your shop products"
        />
        <Button
          size={"sm"}
          onClick={() => router.push(`/${param.storeId}/sizes/new`)}
        >
          <Plus className="mr-2 h-4 w-4 ml-0" />
          add new
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="name" columns={SizeColumns} data={sizesColumData} />
      <Separator />
      <ApiAlertBar
        variant="public"
        title="GET"
        descriptions={`${origin}/api/${param.storeId}/size`}
      />
      <ApiAlertBar
        variant="public"
        title="Get"
        descriptions={`${origin}/api/${param.storeId}/size/{sizeId}`}
      />
      <ApiAlertBar
        variant="admin"
        title="Post"
        descriptions={`${origin}/api/${param.storeId}/size`}
      />
      <ApiAlertBar
        variant="admin"
        title="delete"
        descriptions={`${origin}/api/${param.storeId}/size/{sizeId}`}
      />
      <ApiAlertBar
        variant="admin"
        title="patch"
        descriptions={`${origin}/api/${param.storeId}/size/{sizeId}`}
      />
    </>
  );
};

export default ClientSize;

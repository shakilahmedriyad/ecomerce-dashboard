"use client";
import { format } from "date-fns";
import HeadingComponent from "@/components/HeadingComponent/HeadingComponent";
import { Button } from "@/components/ui/button";
import { Billboard, Color } from "@prisma/client";
import { Plus } from "lucide-react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { ColorColumns, ColorDataTableType } from "./column";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/Table/DataTable";
import ApiAlertBar from "@/components/AlertBar/AlertBar";
import useOrigin from "@/hooks/use-Origin";

interface ClientColorProps {
  colors: Color[];
}

const ClientColor: React.FC<ClientColorProps> = ({ colors }) => {
  const param = useParams();
  const router = useRouter();
  const origin = useOrigin();

  const colorsColumData: ColorDataTableType[] = colors?.map((item) => {
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
          title={`Colors (${colors?.length})`}
          descriptons="Manage your shop products"
        />
        <Button
          size={"sm"}
          onClick={() => router.push(`/${param.storeId}/colors/new`)}
        >
          <Plus className="mr-2 h-4 w-4 ml-0" />
          add new
        </Button>
      </div>
      <Separator />
      <DataTable
        searchKey="name"
        columns={ColorColumns}
        data={colorsColumData}
      />
      <Separator />
      <h2 className="text-3xl font-semibold">Api</h2>
      <p>Call for Colors Api </p>
      <ApiAlertBar
        variant="public"
        title="GET"
        descriptions={`${origin}/api/${param.storeId}/color`}
      />
      <ApiAlertBar
        variant="public"
        title="Get"
        descriptions={`${origin}/api/${param.storeId}/color/{colorId}`}
      />
      <ApiAlertBar
        variant="admin"
        title="Post"
        descriptions={`${origin}/api/${param.storeId}/color`}
      />
      <ApiAlertBar
        variant="admin"
        title="delete"
        descriptions={`${origin}/api/${param.storeId}/color/{colorId}`}
      />
      <ApiAlertBar
        variant="admin"
        title="patch"
        descriptions={`${origin}/api/${param.storeId}/color/{colorId}`}
      />
    </>
  );
};

export default ClientColor;

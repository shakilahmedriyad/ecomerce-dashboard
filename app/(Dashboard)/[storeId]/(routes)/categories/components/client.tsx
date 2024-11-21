"use client";
import { format } from "date-fns";
import HeadingComponent from "@/components/HeadingComponent/HeadingComponent";
import { Button } from "@/components/ui/button";
import { Billboard, Category } from "@prisma/client";
import { Plus } from "lucide-react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { BillboardColumns, BillboardDataTableType } from "./column";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/Table/DataTable";
import ApiAlertBar from "@/components/AlertBar/AlertBar";
import useOrigin from "@/hooks/use-Origin";

interface CategoryType extends Category {
  billboard: Billboard;
}

interface ClientCategoryProps {
  categories: CategoryType[];
}

const ClientCategoryBoard: React.FC<ClientCategoryProps> = ({ categories }) => {
  const param = useParams();
  const router = useRouter();
  const origin = useOrigin();

  const formatedCategory: BillboardDataTableType[] = categories.map((item) => {
    return {
      id: item.id,
      name: item.name,
      label: item.billboard.label,
      createdAt: format(item.created_at, "MMMM do, yyyy"),
    };
  });

  return (
    <>
      <div className="flex justify-between items-center">
        <HeadingComponent
          title={`Categories (${categories.length})`}
          descriptons="Manage your shop Category"
        />
        <Button
          size={"sm"}
          onClick={() => router.push(`/${param.storeId}/categories/new`)}
        >
          <Plus className="mr-2 h-4 w-4 ml-0" />
          add new
        </Button>
      </div>
      <Separator />
      <DataTable
        searchKey="label"
        columns={BillboardColumns}
        data={formatedCategory}
      />
      <Separator />
      <h2 className="text-3xl font-semibold">Api</h2>
      <p>Call for Category Api </p>
      <ApiAlertBar
        variant="public"
        title="GET"
        descriptions={`${origin}/api/${param.storeId}/category`}
      />
      <ApiAlertBar
        variant="public"
        title="Get"
        descriptions={`${origin}/api/${param.storeId}/category/{categoryId}`}
      />
      <ApiAlertBar
        variant="admin"
        title="Post"
        descriptions={`${origin}/api/${param.storeId}/category`}
      />
      <ApiAlertBar
        variant="admin"
        title="delete"
        descriptions={`${origin}/api/${param.storeId}/category/{categoryId}`}
      />
      <ApiAlertBar
        variant="admin"
        title="patch"
        descriptions={`${origin}/api/${param.storeId}/category/{categoryId}`}
      />
    </>
  );
};

export default ClientCategoryBoard;

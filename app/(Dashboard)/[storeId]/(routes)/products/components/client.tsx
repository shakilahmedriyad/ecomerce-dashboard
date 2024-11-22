"use client";
import HeadingComponent from "@/components/HeadingComponent/HeadingComponent";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { ProductColumns, ProductDataType } from "./column";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/Table/DataTable";
import ApiAlertBar from "@/components/AlertBar/AlertBar";
import useOrigin from "@/hooks/use-Origin";

interface ClientProductProps {
  products: {
    id: string;
    name: string;
    price: number;
    archived: boolean;
    featured: boolean;
    color: string;
    category: string;
    size: string;
    createdAt: string;
  }[];
}

const ClientProduct: React.FC<ClientProductProps> = ({ products }) => {
  const param = useParams();
  const router = useRouter();
  const origin = useOrigin();

  const productsColumnData: ProductDataType[] = products;

  return (
    <>
      <div className="flex justify-between items-center">
        <HeadingComponent
          title={`Products (${products.length})`}
          descriptons="Manage your shop products"
        />
        <Button
          size={"sm"}
          onClick={() => router.push(`/${param.storeId}/products/new`)}
        >
          <Plus className="mr-2 h-4 w-4 ml-0" />
          add new
        </Button>
      </div>
      <Separator />
      <DataTable
        searchKey="name"
        columns={ProductColumns}
        data={productsColumnData}
      />
      <Separator />
      <ApiAlertBar
        variant="public"
        title="GET"
        descriptions={`${origin}/api/${param.storeId}/product`}
      />
      <ApiAlertBar
        variant="public"
        title="Get"
        descriptions={`${origin}/api/${param.storeId}/product/{productId}`}
      />
      <ApiAlertBar
        variant="admin"
        title="Post"
        descriptions={`${origin}/api/${param.storeId}/product`}
      />
      <ApiAlertBar
        variant="admin"
        title="delete"
        descriptions={`${origin}/api/${param.storeId}/product/{productId}`}
      />
      <ApiAlertBar
        variant="admin"
        title="patch"
        descriptions={`${origin}/api/${param.storeId}/product/{productId}`}
      />
    </>
  );
};

export default ClientProduct;

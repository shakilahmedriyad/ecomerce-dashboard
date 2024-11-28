"use client";
import HeadingComponent from "@/components/HeadingComponent/HeadingComponent";
import { OrderColumns, OrderDataTableType } from "./column";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/Table/DataTable";

interface ClientOrdersProps {
  orders: OrderDataTableType[];
}

const ClientOrders: React.FC<ClientOrdersProps> = ({ orders }) => {
  return (
    <>
      <HeadingComponent
        title={`Orders (${orders.length})`}
        descriptons="Manage your shop orders"
      />
      <Separator />
      <DataTable searchKey="products" columns={OrderColumns} data={orders} />
    </>
  );
};

export default ClientOrders;

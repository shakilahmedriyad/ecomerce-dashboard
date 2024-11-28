import { ColumnDef } from "@tanstack/react-table";

export type OrderDataTableType = {
  id: string;
  products: string;
  totalPrice: number;
  isPaid: boolean;
  address: string;
  phone: string;
  createdAt: Date;
};

export const OrderColumns: ColumnDef<OrderDataTableType>[] = [
  {
    accessorKey: "products",
    header: "Products",
  },
  {
    accessorKey: "address",
    header: "Address",
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    accessorKey: "totalPrice",
    header: "Total Price",
  },
  {
    accessorKey: "isPaid",
    header: "Paid",
  },
  {
    accessorKey: "createdAt",
    header: "CreatedAt",
  },
];

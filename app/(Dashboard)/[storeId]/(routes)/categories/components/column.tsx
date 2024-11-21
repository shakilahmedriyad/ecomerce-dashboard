import { ColumnDef } from "@tanstack/react-table";
import Action from "./action";

export type CategoryDataTableType = {
  id: string;
  name: string;
  BillboardName: string;
  createdAt: string;
};

export const CategoryColumns: ColumnDef<CategoryDataTableType>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "BillboardName",
    header: "Billboard Name",
  },
  {
    accessorKey: "createdAt",
    header: "CreatedAt",
  },
  {
    id: "actions",
    cell: ({ row }) => <Action data={row.original} />,
  },
];

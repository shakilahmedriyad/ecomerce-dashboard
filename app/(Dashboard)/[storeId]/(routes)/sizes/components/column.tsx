import { ColumnDef } from "@tanstack/react-table";
import Action from "./action";

export type SizeDataTableType = {
  id: string;
  name: string;
  value: string;
  createdAt: string;
};

export const SizeColumns: ColumnDef<SizeDataTableType>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "value",
    header: "Value",
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

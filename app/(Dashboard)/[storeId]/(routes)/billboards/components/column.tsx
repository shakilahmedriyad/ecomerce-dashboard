import { ColumnDef } from "@tanstack/react-table";
import Action from "./action";

export type BillboardDataTableType = {
  id: string;
  label: string;
  createdAt: string;
};

export const BillboardColumns: ColumnDef<BillboardDataTableType>[] = [
  {
    accessorKey: "label",
    header: "Label",
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

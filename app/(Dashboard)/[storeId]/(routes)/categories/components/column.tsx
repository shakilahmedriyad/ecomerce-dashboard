import { ColumnDef } from "@tanstack/react-table";
import Action from "./action";

export type BillboardDataTableType = {
  id: string;
  name: string;
  label: string;
  createdAt: string;
};

export const BillboardColumns: ColumnDef<BillboardDataTableType>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "billboardlabel",
    header: "Billboard Label",
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

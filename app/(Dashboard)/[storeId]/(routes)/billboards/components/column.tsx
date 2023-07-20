import { ColumnDef } from "@tanstack/react-table";

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
];

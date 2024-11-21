import { ColumnDef } from "@tanstack/react-table";
import Action from "./action";

export type ColorDataTableType = {
  id: string;
  name: string;
  value: string;
  createdAt: string;
};

export const ColorColumns: ColumnDef<ColorDataTableType>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "value",
    header: "value",
    cell: ({ row }) => (
      <div className="flex items-center space-x-2 w-full">
        <p>{row.original.value}</p>
        <div
          className="w-6 rounded-full h-6 border"
          style={{ background: row.original.value }}
        />
      </div>
    ),
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

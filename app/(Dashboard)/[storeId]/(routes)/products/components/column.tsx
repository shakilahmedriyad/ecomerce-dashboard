import { ColumnDef } from "@tanstack/react-table";
import Action from "./action";

export type ProductDataType = {
  id: string;
  name: string;
  size: string;
  category: string;
  color: string;
  featured: boolean;
  archived: boolean;
  createdAt: string;
};

export const ProductColumns: ColumnDef<ProductDataType>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "size",
    header: "Size",
  },
  {
    accessorKey: "color",
    header: "Color",
    cell: ({ row }) => (
      <div className="flex items-center space-x-2">
        <p>{row.original.color}</p>
        <div
          className="w-6 h-6 rounded-full border"
          style={{ background: row.original.color }}
        />
      </div>
    ),
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "featured",
    header: "Featured",
  },
  {
    accessorKey: "archived",
    header: "Archived",
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

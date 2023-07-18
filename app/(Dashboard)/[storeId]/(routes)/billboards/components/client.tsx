"use client";

import HeadingComponent from "@/components/HeadingComponent/HeadingComponent";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";

const ClientBillboard = () => {
  const param = useParams();
  const router = useRouter();
  return (
    <div className="flex justify-between items-center">
      <HeadingComponent
        title="Billboards (0)"
        descriptons="Manage your shop products"
      />
      <Button
        size={"sm"}
        onClick={() => router.push(`/${param.storeId}/billboards/new`)}
      >
        <Plus className="mr-2 h-4 w-4 ml-0" />
        add new
      </Button>
    </div>
  );
};

export default ClientBillboard;

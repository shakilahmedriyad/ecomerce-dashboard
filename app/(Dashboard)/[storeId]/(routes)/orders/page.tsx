import ClientBillboard from "./components/client";
import prismadb from "@/lib/prismadb";
import { OrderDataTableType } from "./components/column";

interface BillBoardProps {
  params: {
    storeId: string;
  };
}

const Orders: React.FC<BillBoardProps> = async ({ params }) => {
  const order = await prismadb.order.findMany({
    where: {
      storeId: params.storeId,
    },
    include: {
      orderItems: {
        include: {
          product: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const orders: OrderDataTableType[] = order.map((orderItem) => {
    return {
      id: orderItem.id,
      address: orderItem.address,
      phone: orderItem.phone,
      isPaid: orderItem.isPaid,
      createdAt: orderItem.createdAt,
      products: orderItem.orderItems.reduce(
        (sum, item) => sum + "," + item.product.name,
        ""
      ),
      totalPrice: orderItem.orderItems.reduce(
        (sum, item) => sum + Number(item.product.price),
        0
      ),
    };
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ClientBillboard orders={orders} />
      </div>
    </div>
  );
};

export default Orders;

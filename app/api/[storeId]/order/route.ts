import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { address, phone } = body;

    if (!userId) {
      return new NextResponse("unauthorized request", { status: 401 });
    }
    if (!address) {
      return new NextResponse("Address is required", { status: 400 });
    }
    if (!phone) {
      return new NextResponse("phone number is required", { status: 400 });
    }
    if (!params.storeId) {
      return new NextResponse("store id needed", { status: 404 });
    }

    const store = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    });

    if (!store) {
      return new NextResponse("Store is not found!", { status: 404 });
    }

    const billboards = await prismadb.order.create({
      data: {
        address,
        phone,
        storeId: params.storeId,
      },
    });

    return NextResponse.json(billboards);
  } catch (error) {
    console.log("[Billboard create] " + error);
    return new NextResponse("Internel error", { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    if (!params.storeId) {
      return new NextResponse("store id is required", { status: 401 });
    }

    const billboards = await prismadb.billboard.findMany({
      where: {
        storeId: params.storeId,
      },
    });
    return NextResponse.json(billboards);
  } catch (error) {
    console.log("[billboards get error]" + error);
    return new NextResponse("internal error", { status: 500 });
  }
}

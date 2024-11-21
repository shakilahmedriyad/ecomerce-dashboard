import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string; colorId: string } }
) {
  try {
    const body = await req.json();
    const { name, value } = body;

    if (!name || !value) {
      return new NextResponse("Field must contain data", { status: 402 });
    }

    if (!params.storeId || !params.colorId) {
      return new NextResponse("invalid url", { status: 403 });
    }

    const storeById = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
      },
    });

    if (!storeById) {
      return new NextResponse("Invalid store", { status: 403 });
    }

    const color = await prismadb.color.updateMany({
      where: {
        id: params.colorId,
        storeId: params.storeId,
      },
      data: {
        name,
        value,
      },
    });
    return NextResponse.json(color);
  } catch (error) {
    console.log("[billboard update]", error);
    return new NextResponse("internal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string; colorId: string } }
) {
  try {
    if (!params.colorId) {
      return new NextResponse("invalid request", { status: 403 });
    }

    const color = await prismadb.color.deleteMany({
      where: {
        id: params.colorId,
        storeId: params.storeId,
      },
    });
    return NextResponse.json(color);
  } catch (error) {
    console.log("[deleting colors]", error);
    return new NextResponse("internal error", { status: 500 });
  }
}

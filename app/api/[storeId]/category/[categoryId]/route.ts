import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { storeId: string; categoryId: string } }
) {
  try {
    if (!params.storeId || !params.categoryId) {
      return NextResponse.json({
        status: 401,
        message: "storeId and categoryId required",
      });
    }
    const category = await prismadb.category.findFirst({
      where: { storeId: params.storeId, id: params.categoryId },
    });
    return NextResponse.json(category);
  } catch (err) {
    console.log(err);
  }
  return NextResponse.json("something went wrong");
}

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string; categoryId: string } }
) {
  try {
    const body = await req.json();
    const { name, billboardId } = body;

    if (!name || !billboardId) {
      return new NextResponse("Field must contain data", { status: 402 });
    }

    if (!params.storeId || !billboardId || !params.categoryId) {
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

    const category = await prismadb.category.updateMany({
      where: {
        id: params.categoryId,
        billboardId: billboardId,
        storeId: params.storeId,
      },
      data: {
        name,
        billboardId,
      },
    });
    return NextResponse.json(category);
  } catch (error) {
    console.log("[category update]", error);
    return new NextResponse("internal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string; categoryId: string } }
) {
  try {
    if (!params.storeId || !params.categoryId) {
      return new NextResponse("invalid request", { status: 403 });
    }

    const category = await prismadb.category.deleteMany({
      where: {
        id: params.categoryId,
        storeId: params.storeId,
      },
    });
    return NextResponse.json(category);
  } catch (error) {
    console.log("[deleting billboards]", error);
    return new NextResponse("internal error", { status: 500 });
  }
}

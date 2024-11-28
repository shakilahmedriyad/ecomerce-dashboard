import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { storeId: string; billboardId: string } }
) {
  try {
    if (!params.storeId || !params.billboardId) {
      return NextResponse.json({
        status: 401,
        message: "storeId and BillboardId required",
      });
    }
    const billboard = await prismadb.billboard.findFirst({
      where: { storeId: params.storeId, id: params.billboardId },
    });
    return NextResponse.json(billboard);
  } catch (err) {
    console.log(err);
  }
  return NextResponse.json("something went wrong");
}

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string; billboardId: string } }
) {
  try {
    const body = await req.json();
    const { label, imageUrl } = body;

    if (!label || !imageUrl) {
      return new NextResponse("Field must contain data", { status: 402 });
    }

    if (!params.storeId || !params.billboardId) {
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

    const billboard = await prismadb.billboard.updateMany({
      where: {
        id: params.billboardId,
        storeId: params.storeId,
      },
      data: {
        label,
        imageUrl,
      },
    });
    return NextResponse.json(billboard);
  } catch (error) {
    console.log("[billboard update]", error);
    return new NextResponse("internal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string; billboardId: string } }
) {
  try {
    if (!params.billboardId) {
      return new NextResponse("invalid request", { status: 403 });
    }

    const billboard = await prismadb.billboard.deleteMany({
      where: {
        id: params.billboardId,
        storeId: params.storeId,
      },
    });
    return NextResponse.json(billboard);
  } catch (error) {
    console.log("[deleting billboards]", error);
    return new NextResponse("internal error", { status: 500 });
  }
}

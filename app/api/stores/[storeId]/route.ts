import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { userId } = auth();
    const body = await req.json();

    if (!userId) {
      return new NextResponse("unauthorized request", { status: 401 });
    }
    if (!body.name) {
      return new NextResponse("name is required", { status: 400 });
    }

    if (!params.storeId) {
      return new NextResponse("store id needed", { status: 404 });
    }

    const store = await prismadb.store.updateMany({
      where: {
        id: params.storeId,
        userId,
      },
      data: {
        name: body.name,
      },
    });

    return NextResponse.json(store);
  } catch (error) {
    console.log("STORE PATCH " + error);
    return new NextResponse("Internel error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("unauthorized request", { status: 401 });
    }

    if (!params.storeId) {
      return new NextResponse("store id needed", { status: 404 });
    }

    const store = await prismadb.store.deleteMany({
      where: {
        id: params.storeId,
        userId,
      },
    });

    if (!store) {
      return new NextResponse("store not found ", { status: 404 });
    }
    return NextResponse.json(store);
  } catch (error) {
    console.log("STORE PATCH " + error);
    return new NextResponse("Internel error", { status: 500 });
  }
}

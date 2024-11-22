import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string; productId: string } }
) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const {
      name,
      price,
      size,
      isFeatured,
      isArchived,
      color,
      category,
      images,
    } = body;

    if (!userId) {
      return new NextResponse("unauthorized request", { status: 401 });
    }
    if (!name) {
      return new NextResponse("name is required", { status: 400 });
    }
    if (!price) {
      return new NextResponse("price is required", { status: 400 });
    }
    if (!size) {
      return new NextResponse("size is required", { status: 400 });
    }
    if (!color) {
      return new NextResponse("color is required", { status: 400 });
    }
    if (!category) {
      return new NextResponse("category is required", { status: 400 });
    }
    if (!images) {
      return new NextResponse("images are required", { status: 400 });
    }

    if (!params.storeId || !params.productId) {
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

    await prismadb.product.update({
      where: {
        id: params.productId,
        storeId: params.storeId,
      },
      data: {
        name,
        price,
        sizeId: size,
        isFeatured,
        isArchived,
        colorId: color,
        categoryId: category,

        image: {
          deleteMany: {},
        },
        storeId: params.storeId,
      },
    });
    const product = await prismadb.product.update({
      where: {
        id: params.productId,
        storeId: params.storeId,
      },
      data: {
        image: {
          createMany: { data: [...images.map((img: { url: string }) => img)] },
        },
      },
    });
    return NextResponse.json(product);
  } catch (error) {
    console.log("[product update]", error);
    return new NextResponse("internal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string; productId: string } }
) {
  try {
    if (!params.productId) {
      return new NextResponse("invalid request", { status: 403 });
    }

    const billboard = await prismadb.billboard.deleteMany({
      where: {
        id: params.productId,
        storeId: params.storeId,
      },
    });
    return NextResponse.json(billboard);
  } catch (error) {
    console.log("[product delete]", error);
    return new NextResponse("internal error", { status: 500 });
  }
}

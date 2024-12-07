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

    const products = await prismadb.product.create({
      data: {
        name,
        price,
        sizeId: size,
        isFeatured,
        isArchived,
        colorId: color,
        categoryId: category,

        image: {
          createMany: {
            data: [...images.map((img: { url: string }) => img)],
          },
        },
        storeId: params.storeId,
      },
    });

    return NextResponse.json(products);
  } catch (error) {
    console.log("[Products create] " + error);
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

    const product = await prismadb.product.findMany({
      where: {
        storeId: params.storeId,
      },
      include: {
        image: true,
        category: true,
      },
    });
    return NextResponse.json(product);
  } catch (error) {
    console.log("[product get error]" + error);
    return new NextResponse("internal error", { status: 500 });
  }
}

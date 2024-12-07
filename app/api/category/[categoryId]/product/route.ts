import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { categoryId: string } }
) {
  try {
    if (!params.categoryId) {
      return new NextResponse("store id is required", { status: 401 });
    }
    const product = await prismadb.product.findMany({
      where: {
        categoryId: params.categoryId,
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

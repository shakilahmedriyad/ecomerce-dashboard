import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function GET(_req: Request) {
  try {
    const product = await prismadb.product.findMany({
      where: {},
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

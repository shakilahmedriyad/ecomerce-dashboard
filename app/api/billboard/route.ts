import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const billboards = await prismadb.billboard.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return NextResponse.json(billboards);
  } catch (error) {
    console.log("[billboards get error]" + error);
    return new NextResponse("internal error", { status: 500 });
  }
}

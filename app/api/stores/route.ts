import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET(_req: Request) {
  try {
    const store = await prismadb.store.findMany({});
    return NextResponse.json(store);
  } catch (err) {
    console.log(err);
    return NextResponse.json(err);
  }
}

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("unauthorized attempts", { status: 401 });
    }
    const body = await req.json();
    const { name } = body;
    if (!name) {
      return new NextResponse("Invalid attempt", { status: 401 });
    }
    const store = await prismadb.store.create({
      data: {
        name,
        userId,
      },
    });
    return NextResponse.json(store);
  } catch (error: any) {
    console.log("[Stores Error]" + error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

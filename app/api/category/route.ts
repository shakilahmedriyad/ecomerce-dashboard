import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";
export async function GET(_req: Request) {
  try {
    const category = await prismadb.category.findMany({});
    return NextResponse.json(category);
  } catch (err) {
    console.log(err);
    return NextResponse.json(err);
  }
}

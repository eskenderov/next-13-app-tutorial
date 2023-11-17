import { db } from "@/services/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const categories = await db.category.findMany();
    return NextResponse.json(categories, { status: 200 });
  } catch (error) {
    const errorMessage = "Something went wrong";
    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
}

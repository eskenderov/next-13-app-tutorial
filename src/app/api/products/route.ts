import { db } from "@/services/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const searchQuery = searchParams.get("q");
    const page = searchParams.get("page");
    const limit = searchParams.get("limit");
    const order = searchParams.get("order");

    let filters = {};
    const pagination = {};
    const orderOptions = ["createdAt", "price", "-createdAt", "-price"];
    let orderBy: any = {};
    if (order && orderOptions.includes(order)) {
      const isDesc = order.includes("-");
      const cleanedOrder = order.replace("-", "");
      orderBy[cleanedOrder] = isDesc ? "desc" : "asc";
    }

    // check filters
    if (searchQuery) {
      filters = {
        ...filters,
        title: {
          contains: searchQuery,
          mode: "insensitive",
        },
      };
    }

    const products = await db.product.findMany({
      where: filters,
      skip: Number(page) || 0,
      take: Number(limit) || 3,
      orderBy,
    });

    const totalItems = await db.product.count({
      where: filters,
    });
    const totalPages = Math.ceil(totalItems / Number(limit));

    return NextResponse.json(
      {
        items: products,
        pagination: { page, limit, count: totalItems, countPage: totalPages },
      },
      { status: 200 }
    );
  } catch (error) {
    const errorMessage = "Something went wrong";
    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
}

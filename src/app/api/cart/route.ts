import { db } from "@/services/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import * as z from "zod";
import { authConfig } from "../auth/[...nextauth]/options";

export async function GET() {
  try {
    const session = await getServerSession(authConfig);
    if (!session?.user) {
      return NextResponse.json({ message: "Unauthorised" }, { status: 401 });
    }

    const cart = await db.cart.findUnique({
      where: { userId: Number(session.user.id) },
    });

    if (!cart) {
      return NextResponse.json(
        { message: "Your cart not found" },
        { status: 400 }
      );
    }

    const items = await db.cartItem.findMany({
      where: {
        cartId: cart.id,
      },
      select: {
        id: true,
        product: true,
        quantity: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const productsIds: number[] = [];
    const totalPrice = items.reduce((total, item) => {
      const productCost = (item.product.price || 0) * item.quantity;
      productsIds.push(item.product.id);
      return total + productCost;
    }, 0);

    return NextResponse.json(
      { items, totalPrice, totalCount: items.length, productsIds },
      { status: 200 }
    );
  } catch (error) {
    const errorMessage = "Something went wrong";
    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
}

const cartShema = z.object({
  productId: z.number().min(1, "Email is required"),
});

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authConfig);

    if (!session?.user) {
      return NextResponse.json({ message: "Unauthorised" }, { status: 401 });
    }

    const cart = await db.cart.findUnique({
      where: { userId: Number(session.user.id) },
    });

    if (!cart) {
      return NextResponse.json(
        { message: "Your cart not found" },
        { status: 400 }
      );
    }

    const body = await req.json();
    const { productId } = cartShema.parse(body);

    const hasCartItem = await db.cartItem.findUnique({
      where: {
        cartId: cart.id,
        productId: productId,
      },
    });

    if (hasCartItem) {
      return NextResponse.json(
        { message: "Этот товар уже в корзине" },
        { status: 403 }
      );
    }

    await db.cartItem.create({
      data: {
        cartId: cart.id,
        productId: productId,
        quantity: 1,
      },
    });

    return NextResponse.json(
      { message: "Успешно добавлен в корзину" },
      { status: 201 }
    );
  } catch (error: any) {
    const errorMessage = error?.issues[0]?.message || "Something went wrong";
    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
}
export async function DELETE(req: Request) {
  try {
    const session = await getServerSession(authConfig);

    if (!session?.user) {
      return NextResponse.json({ message: "Unauthorised" }, { status: 401 });
    }

    const cart = await db.cart.findUnique({
      where: { userId: Number(session.user.id) },
    });

    if (!cart) {
      return NextResponse.json(
        { message: "Your cart not found" },
        { status: 400 }
      );
    }

    const body = await req.json();
    const { productId } = cartShema.parse(body);

    await db.cartItem.delete({
      where: {
        productId: productId,
      },
    });
    return NextResponse.json(
      { message: "Successfully removed from the basket" },
      { status: 201 }
    );
  } catch (error: any) {
    const errorMessage = error?.issues[0]?.message || "Something went wrong";
    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
}

const cartPatchShema = z.object({
  itemId: z.number().min(1, "itemId is required"),
  quantity: z.number().min(1, "quantity is required"),
});
export async function PATCH(req: Request) {
  try {
    const session = await getServerSession(authConfig);

    if (!session?.user) {
      return NextResponse.json({ message: "Unauthorised" }, { status: 401 });
    }

    const cart = await db.cart.findUnique({
      where: { userId: Number(session.user.id) },
    });

    if (!cart) {
      return NextResponse.json(
        { message: "Your cart not found" },
        { status: 400 }
      );
    }

    const body = await req.json();
    const { itemId, quantity } = cartPatchShema.parse(body);

    if (quantity < 1) {
      return NextResponse.json(
        { message: "quantity cannot be less than 1" },
        { status: 403 }
      );
    }
    await db.cartItem.update({
      where: {
        id: itemId,
      },
      data: {
        quantity,
      },
    });
    return NextResponse.json(
      { message: "Successfully updated cart item" },
      { status: 201 }
    );
  } catch (error: any) {
    const errorMessage = error?.issues[0]?.message || "Something went wrong";
    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
}

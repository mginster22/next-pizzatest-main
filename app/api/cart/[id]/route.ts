import { prisma } from "@/prisma/prisma-client";
import { updateCartTotalAmount } from "@/shared/lib/update-cart-total-amount";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest) {
  try {
    const url = req.nextUrl;
    const id = Number(url.pathname.split("/").pop()); // Получаем id из URL

    if (isNaN(id)) {
      return NextResponse.json({ error: "Invalid cart item ID" }, { status: 400 });
    }

    const data = (await req.json()) as { quantity: number };

    const token = req.cookies.get("cartToken")?.value;
    if (!token) {
      return NextResponse.json({ error: "Cart token not found" });
    }

    const cartItem = await prisma.cartItem.findFirst({ where: { id } });
    if (!cartItem) {
      return NextResponse.json({ error: "Cart item not found" });
    }

    await prisma.cartItem.update({
      where: { id },
      data: { quantity: data.quantity },
    });

    const updatedUserCart = await updateCartTotalAmount(token);

    return NextResponse.json(updatedUserCart);
  } catch (error) {
    console.error("[CART_PATCH] Server error", error);
    return NextResponse.json(
      { message: "Не удалось обновить корзину" },
      { status: 500 }
    );
  }
}
export async function DELETE(req: NextRequest) {
  try {
    const token = req.cookies.get("cartToken")?.value;
    if (!token) {
      return NextResponse.json({ error: "Cart token not found" });
    }

    const url = req.nextUrl;
    const id = Number(url.pathname.split("/").pop()); // Получаем id из URL

    if (isNaN(id)) {
      return NextResponse.json({ error: "Invalid cart item ID" }, { status: 400 });
    }

    const cartItem = await prisma.cartItem.findFirst({
      where: { id },
    });

    if (!cartItem) {
      return NextResponse.json({ error: "Cart item not found" });
    }

    await prisma.cartItem.delete({ where: { id } });

    const updatedUserCart = await updateCartTotalAmount(token);

    return NextResponse.json(updatedUserCart);
  } catch (error) {
    console.error("[CART_DELETE] Server error", error);
    return NextResponse.json(
      { message: "Не удалось удалить корзину" },
      { status: 500 }
    );
  }
}
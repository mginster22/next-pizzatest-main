"use client";
import React, { PropsWithChildren } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from "../ui/sheet";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import CartDrawerItem from "./CartDrawerItem";
import { getCartItemDetails } from "../../lib/get-cart-item-details";
import { PizzaSize, PizzaType } from "@/shared/constants/pizza";
import Image from "next/image";
import { Title } from "./Title";
import { useCart } from "@/shared/hooks/use-cart";

interface Props {
  className?: string;
}

const CartDrawer: React.FC<PropsWithChildren<Props>> = ({ children }) => {
  const [redirecting,setRedirecting] = React.useState(false)

  const { updateItemQuantity, totalAmount, items, removeCartItem } = useCart();
  const onClickCountButton = (
    id: number,
    quantity: number,
    type: "plus" | "minus"
  ) => {
    const newQuantity = type === "plus" ? quantity + 1 : quantity - 1;
    updateItemQuantity(id, newQuantity);
  };

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="flex flex-col justify-between pb-0 bg-[#F4F1EE]">
        {totalAmount > 0 && (
          <SheetHeader>
            <SheetTitle>
              В корзине <span className="font-bold">{items.length} товара</span>
            </SheetTitle>
          </SheetHeader>
        )}

        {!totalAmount && (
          <div className="flex flex-col items-center justify-center w-72 my-auto mx-auto">
            <Image
              src="/assets/empty-box.png"
              alt="Empty cart"
              width={120}
              height={120}
            />
            <Title
              size="sm"
              text="Корзина пустая"
              className="text-center font-bold my-2"
            />
            <p className="text-center text-neutral-500 mb-5">
              Добавьте хотя бы одну пиццу, чтобы совершить заказ
            </p>

            <SheetClose>
              <Button className="w-56 h-12 text-base" size="lg">
                <ArrowLeft className="w-5 mr-2" />
                Вернуться назад
              </Button>
            </SheetClose>
          </div>
        )}

        {totalAmount > 0 && (
          <>
            <div className="flex flex-col flex-1 scrollbar gap-[10px] overflow-y-auto">
              {items.map((item) => (
                <CartDrawerItem
                  key={item.id}
                  id={0}
                  imageUrl={item.imageUrl}
                  disabled={item.disabled}
                  details={getCartItemDetails(
                    item.ingredients,
                    item.pizzaType as PizzaType,
                    item.pizzaSize as PizzaSize
                  )}
                  name={item.name}
                  price={item.price}
                  quantity={item.quantity}
                  onClickCountButton={(type) =>
                    onClickCountButton(item.id, item.quantity, type)
                  }
                  onClickRemove={() => {
                    removeCartItem(item.id);
                  }}
                />
              ))}
            </div>
            <SheetFooter className=" bg-white p-8">
              <div className="w-full">
                <div className="flex mb-4">
                  <span className="flex flex-1 text-lg text-neutral-500">
                    Итого
                    <div className="flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2" />
                  </span>

                  <span className="font-bold text-lg">{totalAmount} ₽</span>
                </div>
                <Link href="/checkout">
                  <Button loading={redirecting} onClick={() => setRedirecting(true)} type="submit" className="w-full h-12 text-base">
                    Оформить заказ
                    <ArrowRight className="w-5 ml-2" />
                  </Button>
                </Link>
              </div>
            </SheetFooter>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartDrawer;

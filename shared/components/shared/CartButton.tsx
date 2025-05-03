"use client"
import React from "react";
import { Button } from "../ui/button";
import { ArrowRight, ShoppingCart } from "lucide-react";
import { cn } from "../../lib/utils";
import CartDrawer from "./CartDrawer";
import { useCartStore } from "@/shared/store/cart";

interface Props {
  className?: string;
}

const CartButton: React.FC<Props> = ({ className }) => {
  const loading = useCartStore((state) => state.loading);
  const totalAmount = useCartStore((state) => state.totalAmount);
  const  items = useCartStore((state) => state.items);
  return (
    <CartDrawer>
      <Button
        className={cn("group relative", className)}
        variant="default"
        loading={loading}
      >
        <b className="text-white">{totalAmount}грн</b>
        <div className="flex items-center gap-1 transition duration-300 group-hover:opacity-0">
          <ShoppingCart
            className="h-4 w-4 relative text-white flex items-center gap-2"
            strokeWidth={2}
          />
          <b className="text-white">{items.length}</b>
        </div>
        <ArrowRight className="w-5 absolute right-5 transition duration-300 -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0" />
      </Button>
    </CartDrawer>
  );
};

export default CartButton;

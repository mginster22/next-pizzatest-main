import React from "react";
import { WhiteBlock } from "./white-block";
import { ArrowRight, Package, Percent, Truck } from "lucide-react";
import CheckOutItemDetailts from "./CheckOutItemDetailts";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";
import { cn } from "@/shared/lib/utils";

const VAT = 2;
const DELIVERY_PRICE = 120;

interface Props {
  totalAmount: number;
  loading?: boolean;
  className?: string;
}

export const CheckoutSidebar: React.FC<Props> = ({ totalAmount, loading,className }) => {
  const vatPrice = (totalAmount * VAT) / 100;
  const totalPrice = totalAmount + DELIVERY_PRICE + vatPrice;

  return (
    <WhiteBlock className={cn("p-6 sticky top-4", className)}>
      <div className="flex flex-col gap-1">
        <span className="text-xl">Итого:</span>
        {loading ? (
          <Skeleton className="h-11 w-[220px] rounded-xl" />
        ) : (
          <span className="h-11 text-[34px] font-extrabold">{totalPrice}грн:</span>
        )}
      </div>
      <CheckOutItemDetailts
        title={
          <div className="flex items-center">
            <Package className="mr-1 text-gray-400 " size={18} />
            Стоимость корзины
          </div>
        }
        value={
          loading ? (
            <Skeleton className="h-6 w-[70px] rounded-xl " />
          ) : (
            `${totalAmount}грн`
          )
        }
      />
      <CheckOutItemDetailts
        title={
          <div className="flex items-center">
            <Percent className="mr-1 text-gray-400 " size={18} />
            Налоги
          </div>
        }
        value={
          loading ? (
            <Skeleton className="h-6 w-[70px] rounded-xl " />
          ) : (
            `${vatPrice}грн`
          )
        }
      />
      <CheckOutItemDetailts
        title={
          <div className="flex items-center">
            <Truck className="mr-1 text-gray-400 " size={18} />
            Доставка
          </div>
        }
        value={loading ? (
          <Skeleton className="h-6 w-[70px] rounded-xl " />
        ) : (
          `${DELIVERY_PRICE}грн`
        )}
      />
      <Button
        loading={loading}
        type="submit"
        className="w-full h-14 rounded-2xl mt-6 text-base font-bold"
      >
        Перейти к оплате
        <ArrowRight className="w-5 ml-2" />
      </Button>
    </WhiteBlock>
  );
};

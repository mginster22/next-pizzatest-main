import React from "react";
import { Button } from "@/shared/components/ui/button";
import { Plus } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { Title } from "./Title";
import Link from "next/link";
import { Ingredient } from "@/prisma/prisma/client";

interface Props {
  id: number;
  name: string;
  price: number;
  count?: number;
  imageUrl: string;
  className?: string;
  ingredients:Ingredient[]
}

export const ProductCard: React.FC<Props> = ({
  id,
  name,
  price,
  imageUrl,
  className,
  ingredients
}) => {
  return (
    <div  className={cn("", className)}>
      <Link href={`/product/${id}`} className="">
        <div className={cn("flex justify-center p-6 bg-secondary rounded-lg h-[260px]")}>
          <img
            src={imageUrl}
            className={cn("w-[215px]", "h-[215px]")}
            alt={name}
          />
        </div>
        <Title text={name} size="sm" className="mb-1 mt-3 font-bold" />
        <p className="text-sm text-gray-400">
         {ingredients.map((ingredient) => ingredient.name).join(", ")}
        </p>
        <div className="flex justify-between items-center mt-4">
          <span className="text-[20px]">
            от <b>{price} ₽</b>
          </span>

          <Button variant="secondary">
            <Plus className="w-4 h-4 mr-1" />
            Добавить
          </Button>
        </div>
      </Link>
    </div>
  );
};

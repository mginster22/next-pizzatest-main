"use client";
import React from "react";
import { ProductCard } from "./ProductCard";
import { Title } from "./Title";
import { cn } from "@/shared/lib/utils";
import { useCategoryStore } from "@/shared/store/category";
import { useIntersection } from "react-use";
import { ProductWithRelations } from "@/@types/prisma";

interface Props {
  title: string;
  items: ProductWithRelations[];
  listClassName?: string;
  categoryId: number;
  className?: string;
}

export const ProductsGroupList: React.FC<Props> = ({
  title,
  items,
  className,
  listClassName,
  categoryId,
}) => {
  const setActiveCategoryId = useCategoryStore((state) => state.setActiveId);

  const intersectionRef = React.useRef(null);
  const intersection = useIntersection(intersectionRef, {
    threshold: 0.4,
  });

  React.useEffect(() => {
    if (intersection?.isIntersecting) {
      setActiveCategoryId(categoryId);
    }
  }, [categoryId, intersection?.isIntersecting, title]);

  return (
    <div id={title} ref={intersectionRef} className={cn("", className)}>
      <Title text={title} size="lg" className="font-extrabold mb-5" />
      <div className={cn("grid grid-cols-3 gap-[50px]", listClassName)}>
        {items.map((product, i) => (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.name}
            imageUrl={product.imageUrl}
            price={product.items[0].price}
            count={i % 2}
            ingredients={product.ingredients}
          />
        ))}
      </div>
    </div>
  );
};

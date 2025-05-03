"use server";

import ChooseProductModal from "@/shared/components/shared/modals/ChooseProductModal";
import { prisma } from "@/prisma/prisma-client";
import { notFound } from "next/navigation";

// Remove the custom interface and use the correct typing pattern
export default async function ProductPage({params}: {params: Promise<{ id: string }>}){
  const { id } = await params;
  const product = await prisma.product.findFirst({
    where: { id: Number(id) },
    include: {
      ingredients: true,
      items: true,
    },
  });

  if (!product) {
    return notFound();
  }

  return <ChooseProductModal product={product} />;
}

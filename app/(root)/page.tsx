"use server";

import { Container } from "@/shared/components/shared/container";
import Filters from "@/shared/components/shared/Filters";
import { ProductsGroupList } from "@/shared/components/shared/products-group-list";
import { Title } from "@/shared/components/shared/Title";
import TopBar from "@/shared/components/shared/Top-bar";
import { Suspense } from "react";
import { findPizzas, GetSearchParams } from "@/shared/lib/find-pizzas";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<GetSearchParams>;
}) {
  const resolvedSearchParams = await searchParams;
  const categories = await findPizzas(resolvedSearchParams);

  return (
    <>
      <Container className="mt-10">
        <Title text="Все пиццы" size="lg" className="font-extrabold" />
      </Container>
      <TopBar
        categories={categories.filter(
          (category) => category.products.length > 0
        )}
      />
      <Container className="pb-14 mt-10 ">
        <div className="flex gap-[60px] ">
          {/* Фильтрация */}
          <div className="w-[250px]">
            <Suspense>
              <Filters />
            </Suspense>
          </div>

          {/*Список товаров */}
          <div className="flex-1">
            <div className="flex flex-col gap-16">
              {categories.map(
                (category) =>
                  category.products.length > 0 && (
                    <ProductsGroupList
                      key={category.id}
                      title={category.name}
                      categoryId={category.id}
                      items={category.products}
                    />
                  )
              )}
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}

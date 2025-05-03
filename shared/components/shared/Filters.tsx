'use client';
import * as React from "react";
import { Title } from "./Title";
import { Input } from "../ui/input";
import RangeSlider from "./RangeSlider";
import CheckBoxFiltersGroup from "./CheckBoxFiltersGroup";
import { useQueryFilters, useIngredients, useFilters } from "@/shared/hooks";

interface Filters {
  className?: string;
}

const Filters: React.FunctionComponent<Filters> = ({ className }) => {
  const { ingredients, loading } = useIngredients();
  const filters = useFilters();

  const updatePrice = (prices: number[]) => {
    filters.setPrices("priceFrom", prices[0]);
    filters.setPrices("priceTo", prices[1]);
  };

  const items = ingredients.map((item) => ({
    text: item.name,
    value: String(item.id),
  }));
  useQueryFilters(filters);
  if (!filters) return null;

  return (
    <div className={className}>
      <Title text="Фильрация" size="sm" className="mb-5 font-bold" />
      {/* Верхние чекбоксы */}

      <CheckBoxFiltersGroup
        title="Тип теста"
        name="pizzaTypes"
        className="mb-5"
        onClickCheckbox={filters.setPizzaTypes}
        selected={filters.pizzaTypes}
        items={[
          { text: "Тонкое", value: "1" },
          { text: "Традиционное", value: "2" },
        ]}
      />

      <CheckBoxFiltersGroup
        title="Размеры"
        name="sizes"
        className="mt-0"
        onClickCheckbox={filters.setSizes}
        selected={filters.sizes}
        items={[
          { text: "20 см", value: "20" },
          { text: "30 см", value: "30" },
          { text: "40 см", value: "40" },
        ]}
      />
      {/* фиьтр цен */}
      <div className="mt-5 border-y border-y-neutral-100 py-6 pb-7">
        <p className="font-bold mb-3">Цена от и до:</p>
        <div className="flex gap-3 mb-5">
          <Input
            type="number"
            placeholder="0"
            min={0}
            max={1000}
            value={String(filters.prices.priceFrom)}
            onChange={(e) =>
              filters.setPrices("priceFrom", Number(e.target.value))
            }
          />
          <Input
            type="number"
            min={100}
            max={1000}
            placeholder="1000"
            value={String(filters.prices.priceTo)}
            onChange={(e) =>
              filters.setPrices("priceTo", Number(e.target.value))
            }
          />
        </div>
        <RangeSlider
          min={0}
          max={1000}
          step={10}
          value={[
            filters.prices.priceFrom || 0,
            filters.prices.priceTo || 1000,
          ]}
          onValueChange={updatePrice}
        />
        <CheckBoxFiltersGroup
          title="Ингридиенты"
          className="mt-[90px]"
          limit={6}
          defaultItems={items.slice(0, 6)}
          items={items}
          loading={loading}
          onClickCheckbox={filters.setSelectedIngredients}
          name="ingredients"
          selected={filters.selectedIngredients}
        />
      </div>
    </div>
  );
};

export default Filters;

'use client';
import React, { } from "react";
import { FilterChecboxProps, FilterCheckbox } from "./FilterCheckbox";
import { Input } from "../ui/input";
import { Skeleton } from "../ui/skeleton";
import { cn } from "@/shared/lib/utils";

type Item = FilterChecboxProps;

interface CheckBoxFiltersGroup {
  className?: string;
  limit?: number;
  title: string;
  items: Item[];
  defaultItems?: Item[];
  loading?: boolean
  onClickCheckbox?: (id: string) => void;
  defaultValue?: string[];
  searchInputPlaceholder?: string;
  selected: Set<string>;
  name?: string
}

const CheckBoxFiltersGroup: React.FunctionComponent<CheckBoxFiltersGroup> = ({
  title,
  limit = 5,
  items,
  defaultItems,
  className,
  loading,
  onClickCheckbox,
  selected,
  name,
  searchInputPlaceholder = "Поиск...",
}) => {
  const [showAll, setShowAll] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState("");

if(loading){
  return <div className={className}>
    <p className="font-bold mb-3">{title}</p>
    {...Array(limit).fill(0).map((_, index) => (
      <Skeleton key={index} className="h-6 mb-4 rounded-xl" />
    ))}
    <Skeleton className="w-28 h-6 mb-4 rounded-xl" />
  </div>
}


  const list = showAll
    ? items.filter((item) => item.text.toLowerCase().includes(searchValue))
    : (defaultItems || items).slice(0, limit);

  const onChangeSearchInput = (value: string) => {
    setSearchValue(value);
  };
  return (
    <div className={cn("",className)}>
      <p className="font-bold mb-3">{title}</p>
      {showAll && (
        <div className="mb-5">
          <Input
            placeholder={searchInputPlaceholder}
            className="bg-gray-50 border-none"
            onChange={(e) => onChangeSearchInput(e.target.value)}
            value={searchValue}
          />
        </div>
      )}
      <div className="flex flex-col gap-4 max-h-96 pr-2  overflow-auto scrollbar">
        {list.map((item, index) => (
          <FilterCheckbox
            key={index}
            text={item.text}
            value={item.value}
            endAdornment={item.endAdornment}
            checked={selected.has(item.value)}
            onCheckedChange={() => onClickCheckbox?.(item.value)}
            name={name}
          />
        ))}
      </div>
      {items.length > limit && (
        <div className={showAll ? "border-t border-t-neutral-100 mt-4" : ""}>
          <button
            onClick={() => setShowAll(!showAll)}
            className="text-primary mt-3"
          >
            {showAll ? "Скрыть" : "+ Показать все"}
          </button>
        </div>
      )}
    </div>
  );
};

export default CheckBoxFiltersGroup;

import * as React from "react";
import Categories from "./Categories";
import SortPopup from "./Sort-popup";
import { Container } from "./container";
import { cn } from "@/shared/lib/utils";
import { Category } from "@/prisma/prisma/client";

interface TopBar {
  className?: string;
  categories:Category[]
}

const TopBar: React.FunctionComponent<TopBar> = ({categories, className }) => {
  return (
    <div className={cn("sticky top-0 bg-white py-5 shadow-lg shadow-black/5 z-10",className)}>
      <Container className="flex items-center justify-between">
        <Categories  items={categories}/>
        <SortPopup />
      </Container>
    </div>
  );
};

export default TopBar;

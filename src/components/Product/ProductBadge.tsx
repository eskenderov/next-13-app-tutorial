"use client";
import { selectCategoryByTab } from "@/redux-toolkit/features/categorySlice";
import { RootState } from "@/redux-toolkit/store";
import { Badge } from "@chakra-ui/react";
import React from "react";
import { useSelector } from "react-redux";

interface ProductBadgeProps {
  categoryTab?: string;
}
export const ProductBadge = ({ categoryTab }: ProductBadgeProps) => {
  const category = useSelector((state: RootState) =>
    selectCategoryByTab(state, categoryTab)
  );

  return (
    <Badge w="max-content" color="purple">
      {category?.title}
    </Badge>
  );
};

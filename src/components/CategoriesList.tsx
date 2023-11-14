"use client";
import { setItems } from "@/redux-toolkit/features/categorySlice";
import { CategoryType } from "@/types/product";
import { ListItem, Text } from "@chakra-ui/react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

interface CategoriesListProps {
  items: CategoryType[];
}

export const CategoriesList = ({ items }: CategoriesListProps) => {
  const dispatch = useDispatch();
  const searchParams = useSearchParams()!;
  const pathname = usePathname();
  const params = new URLSearchParams(searchParams);
  params.delete("category");
  const queryParams = params.toString();

  useEffect(() => {
    dispatch(setItems(items));
  }, []);

  return (
    <>
      <Link href={`${pathname}/?${queryParams}`}>
        <ListItem>
          <Text fontSize="lg">Все</Text>
        </ListItem>
      </Link>
      {items?.map(({ id, title, tab }) => (
        <Link key={id} href={`${pathname}/?${queryParams}&category=${tab}`}>
          <ListItem>
            <Text fontSize="lg">{title}</Text>
          </ListItem>
        </Link>
      ))}
    </>
  );
};

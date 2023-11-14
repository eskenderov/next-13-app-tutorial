import React from "react";
import { Text, UnorderedList } from "@chakra-ui/react";
import { CategoryType } from "@/types/product";
import { CategoriesList } from "@comps/CategoriesList";

async function getCategories() {
  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/categories`, {
      next: { revalidate: 180 },
    });
    if (!res.ok) {
      throw new Error("Failed to fetch images from Pexels");
    }
    const responseJson = await res.json();
    return responseJson;
  } catch (error) {
    console.log("getCategories", error);
  }
}

export const ShopSitebar = async () => {
  const categories: CategoryType[] = await getCategories();
  return (
    <UnorderedList sx={{ p: 6 }}>
      <Text fontSize="2xl" mb={4}>
        Категории
      </Text>
      <CategoriesList items={categories} />
    </UnorderedList>
  );
};

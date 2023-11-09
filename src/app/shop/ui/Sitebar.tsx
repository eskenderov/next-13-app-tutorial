import React from "react";
import { ListItem, Text, UnorderedList } from "@chakra-ui/react";
import Link from "next/link";

export const ShopSitebar = () => {
  return (
    <UnorderedList sx={{ p: 6 }}>
      <Text fontSize="2xl" mb={4}>
        Категории
      </Text>
      <Link href={`/shop?category=${"kids"}`}>
        <ListItem>
          <Text fontSize="lg">Детские</Text>
        </ListItem>
      </Link>
    </UnorderedList>
  );
};

import React from "react";
import { Grid, GridItem } from "@chakra-ui/react";
import { ProductCard } from "./Card";
import { ProductType } from "@/types/product";
import { CardSkeleton } from "./CardSkeleton";
interface ProductListProps {
  items: ProductType[];
  isLoading: boolean;
}
export const ProductList = ({ items, isLoading }: ProductListProps) => {
  return (
    <Grid templateColumns="repeat(4, 1fr)" gap={6}>
      {isLoading && (
        <>
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
        </>
      )}
      {!isLoading &&
        items?.map((item) => (
          <GridItem key={item.id}>
            <ProductCard data={item} />
          </GridItem>
        ))}
    </Grid>
  );
};

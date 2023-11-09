import React from "react";
import { Grid, GridItem } from "@chakra-ui/react";
import { ProductCard } from "./Card";
export const ProductList = () => {
  return (
    <Grid templateColumns="repeat(4, 1fr)" gap={6}>
      <GridItem>
        <ProductCard />
      </GridItem>
      <GridItem>
        <ProductCard />
      </GridItem>
      <GridItem>
        <ProductCard />
      </GridItem>
      <GridItem>
        <ProductCard />
      </GridItem>
      <GridItem>
        <ProductCard />
      </GridItem>
    </Grid>
  );
};

import { Box, Flex, Spacer } from "@chakra-ui/react";
import { Pagination } from "@comps/Pagination";
import { ProductList } from "@comps/Product/List";
import { RowPerPage } from "@comps/RowPerPage";
import { SearchField } from "@comps/SearchField";
import { Sorting } from "@comps/Sorting";

export const ShopContent = () => {
  return (
    <Box sx={{ p: 6 }}>
      <Flex sx={{ mb: 7 }}>
        <SearchField />
        <Spacer />
        <RowPerPage />
        <Sorting />
      </Flex>

      <ProductList />
      <Pagination />
    </Box>
  );
};

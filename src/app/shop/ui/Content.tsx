"use client";
import { ProductType } from "@/types/product";
import { Box, Flex, Spacer } from "@chakra-ui/react";
import { Pagination } from "@comps/Pagination";
import { ProductList } from "@comps/Product/List";
import { RowPerPage } from "@comps/RowPerPage";
import { SearchField } from "@comps/SearchField";
import { Sorting } from "@comps/Sorting";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ReadonlyURLSearchParams, useSearchParams } from "next/navigation";
import { useState } from "react";

interface ExtendedURLSearchParams extends ReadonlyURLSearchParams {
  q?: string;
  category?: string;
  limit?: number;
  page?: number;
}
interface DataResponseType {
  items: ProductType[];
  pagination: {
    page?: number;
    limit?: number;
    count?: number;
    countPage: number;
  };
}

export const ShopContent = () => {
  const params: ExtendedURLSearchParams = useSearchParams();
  const searchParam = params?.get("q");
  const pageParam = params?.get("page");
  const limitParam = params?.get("limit");
  const orderParam = params?.get("order");
  const categoryParam = params?.get("category");

  const [search, setSearch] = useState(searchParam || "");
  const [page, setPage] = useState(Number(pageParam) || 0);
  const [limit, setLimit] = useState(Number(limitParam) || 3);
  const [order, setOrder] = useState(orderParam || "-createdAt");

  const { data, isLoading } = useQuery({
    queryKey: ["categories", search, limit, page, order],
    queryFn: async () => {
      // cюда добавить filterOptions ...
      const res = await axios.get(
        `/api/products?q=${search}&page=${page}&limit=${limit}&order=${order}`
      );
      return res.data;
    },
  });
  return (
    <Box sx={{ p: 6 }}>
      <Flex sx={{ mb: 7 }}>
        <SearchField value={search} onChange={setSearch} />
        <Spacer />
        <RowPerPage value={limit} onChange={setLimit} />
        <Sorting value={order} onChange={setOrder} />
      </Flex>

      <ProductList items={data?.items} isLoading={isLoading} />
      {!isLoading && data?.pagination?.countPage !== 1 && (
        <Pagination
          count={data?.pagination?.countPage}
          activePage={page}
          onPageChange={setPage}
        />
      )}
    </Box>
  );
};

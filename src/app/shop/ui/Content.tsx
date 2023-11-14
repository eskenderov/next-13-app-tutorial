"use client";
import { objectNotEmpty } from "@/services/utils";
import { ProductType } from "@/types/product";
import { Box, Flex, Spacer } from "@chakra-ui/react";
import { Pagination } from "@comps/Pagination";
import { ProductList } from "@comps/Product/List";
import { RowPerPage } from "@comps/RowPerPage";
import { SearchField } from "@comps/SearchField";
import { Sorting } from "@comps/Sorting";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import {
  ReadonlyURLSearchParams,
  redirect,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { useState } from "react";

interface ExtendedURLSearchParams extends ReadonlyURLSearchParams {
  q?: string;
  category?: string;
  limit?: number;
  page?: number;
  order?: string;
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

  const router = useRouter();
  const pathname = usePathname();

  const { data, isLoading } = useQuery({
    queryKey: ["categories", search, limit, page, order, categoryParam],
    queryFn: async () => {
      let queryParams = "";
      const queryObject: any = {};

      if (search) queryObject.q = search;
      if (page) queryObject.page = page + 1;
      if (limit) queryObject.limit = limit;
      if (order) queryObject.order = order;
      if (categoryParam) queryObject.category = categoryParam;

      if (objectNotEmpty(queryObject)) {
        queryParams += "?" + new URLSearchParams(queryObject).toString();
      }
      const res = await axios.get(`/api/products/${queryParams}`);

      router.push(`${pathname}/${queryParams}`);

      return res.data;
    },
  });

  const handleChange = (
    value: any,
    tab: "page" | "limit" | "search" | "order"
  ) => {
    if (tab === "page") setPage(value);
    else if (tab === "limit") {
      setLimit(value);
      setPage(0);
    } else if (tab === "search") {
      setSearch(value);
      setPage(0);
    } else if (tab === "order") setOrder(value);
  };
  return (
    <Box sx={{ p: 6 }}>
      <Flex sx={{ mb: 7 }}>
        <SearchField
          value={search}
          onChange={(value) => handleChange(value, "search")}
        />
        <Spacer />
        <RowPerPage
          value={limit}
          onChange={(value) => handleChange(value, "limit")}
        />
        <Sorting
          value={order}
          onChange={(value) => handleChange(value, "order")}
        />
      </Flex>

      <ProductList items={data?.items} isLoading={isLoading} />
      {!isLoading && data?.pagination?.countPage !== 1 && (
        <Pagination
          count={data?.pagination?.countPage}
          activePage={page}
          onPageChange={(value) => handleChange(value, "page")}
        />
      )}
    </Box>
  );
};

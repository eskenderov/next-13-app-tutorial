"use client";
import { setCart } from "@/redux-toolkit/features/cartSlice";
import { Badge, Box, Spinner, Text } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";
import { useDispatch } from "react-redux";

export const HeaderCart = () => {
  const dispatch = useDispatch();
  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ["cart"],
    queryFn: async () => {
      const res = await axios(`/api/cart/`);
      dispatch(setCart(res.data));
      return res.data;
    },
    retry: 1,
    retryDelay: 30000,
  });

  if (isLoading) {
    return <Spinner color="blue.600" />;
  }
  if (!isSuccess) {
    return null;
  }

  return (
    <Link href="/cart">
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          opacity: 1,
          cursor: "pointer",
          "&:hover": { opacity: 0.8 },
        }}
      >
        <Text fontWeight={700}>${data.totalPrice}</Text>
        <img
          src="/images/cart.png"
          alt="cart-image"
          style={{ width: "32px", height: "32px" }}
        />
        <Badge colorScheme="green">{data.totalCount}</Badge>
      </Box>
    </Link>
  );
};

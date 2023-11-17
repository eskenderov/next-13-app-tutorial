"use client";
import { selectCart } from "@/redux-toolkit/features/cartSlice";
import {
  Badge,
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Text,
} from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import React from "react";
import { useSelector } from "react-redux";

const CartPage = () => {
  const { items, totalCount, totalPrice } = useSelector(selectCart);
  const queryClient = useQueryClient();
  const mutationRemove = useMutation({
    mutationFn: (data: { productId: number }) => {
      return axios.request({
        method: "DELETE",
        url: `/api/cart`,
        data: { productId: data?.productId },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
  const mutationUpdateQuantity = useMutation({
    mutationFn: (data: { itemId: number; quantity: number }) => {
      return axios.request({
        method: "PATCH",
        url: `/api/cart`,
        data: { itemId: data?.itemId, quantity: data?.quantity },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
  return (
    <main className="page">
      <div className="container">
        <Card sx={{ m: "0 auto", mt: 5 }} maxW={800} minH={500}>
          <CardHeader>
            <Text align="center" fontSize="4xl">
              Корзина
            </Text>
          </CardHeader>
          <CardBody>
            {items.length === 0 && (
              <Box>
                <Text align="center" fontSize="2xl">
                  Корзина пуста:(
                </Text>
              </Box>
            )}
            {items?.map(({ id, product, quantity }, idx) => (
              <Box
                key={id}
                sx={{ display: "flex", gap: 5, mb: 4, position: "relative" }}
              >
                <Image
                  src={product.image}
                  alt={product.title}
                  width={100}
                  height={100}
                />
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <Text fontSize="xl">{product.title}</Text>
                  <Box sx={{ display: "flex", gap: 4 }}>
                    <Button
                      isDisabled={
                        quantity < 2 || mutationUpdateQuantity.isPending
                      }
                      fontSize="xl"
                      onClick={() =>
                        mutationUpdateQuantity.mutate({
                          itemId: id,
                          quantity: quantity - 1,
                        })
                      }
                    >
                      -
                    </Button>
                    <Button sx={{ pointerEvents: "none" }}>{quantity}</Button>
                    <Button
                      isDisabled={mutationUpdateQuantity.isPending}
                      fontSize="xl"
                      onClick={() =>
                        mutationUpdateQuantity.mutate({
                          itemId: id,
                          quantity: quantity + 1,
                        })
                      }
                    >
                      +
                    </Button>
                  </Box>

                  <Button
                    isLoading={mutationRemove.isPending}
                    sx={{
                      display: "flex",
                      position: "absolute",
                      top: 4,
                      right: 4,
                    }}
                    colorScheme="red"
                    size="sm"
                    onClick={() =>
                      mutationRemove.mutate({ productId: product.id })
                    }
                  >
                    Delete
                  </Button>
                </Box>
              </Box>
            ))}
          </CardBody>
          <CardFooter>
            <Box sx={{ display: "flex", alignItems: "center", gap: 5 }}>
              <Text fontSize="xl">Всего:</Text>
              <Text fontWeight={600} fontSize="xl">
                ${totalPrice}
              </Text>
            </Box>
          </CardFooter>
        </Card>
      </div>
    </main>
  );
};

export default CartPage;

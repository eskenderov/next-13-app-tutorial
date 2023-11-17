"use client";
import { ProductType } from "@/types/product";
import {
  Badge,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Heading,
  Stack,
  Text,
} from "@chakra-ui/react";
import Image from "next/image";
import React from "react";
import { ProductBadge } from "./ProductBadge";
import { truncateText } from "@/services/utils";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useSelector } from "react-redux";
import { selectCartProductsIds } from "@/redux-toolkit/features/cartSlice";

interface ProductCardProps {
  data: ProductType;
}

export const ProductCard = ({ data }: ProductCardProps) => {
  const productsIds = useSelector(selectCartProductsIds);
  const truncatedText = truncateText(data?.description, 60);
  const session: any = useSession();
  const router = useRouter();
  const blockingAddToCard = session?.status === "unauthenticated";
  const queryClient = useQueryClient();

  const mutationAdd = useMutation({
    mutationFn: (data: { productId: number }) => {
      return axios.post("/api/cart/", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });

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

  const handleAddClick = ({ productId }: { productId: number }) => {
    if (blockingAddToCard) {
      router.push("/auth/sign-in");
    } else {
      mutationAdd.mutate({ productId });
    }
  };

  return (
    <Card maxW="sm" height={600}>
      <CardBody>
        <Image width={320} height={320} alt={data.title} src={data.image} />
        <Stack mt="6" spacing="3">
          <Heading size="md">{data.title}</Heading>
          <Text>{truncatedText}</Text>
          <Text color="blue.600" fontSize="2xl">
            ${data?.price || "none"}
          </Text>
        </Stack>
      </CardBody>
      <ProductBadge categoryTab={data?.categoryTab} />
      <Badge colorScheme="purple">{data?.category}</Badge>

      <Divider />
      <CardFooter>
        <ButtonGroup spacing="2">
          {productsIds.includes(data.id) ? (
            <Button
              isLoading={mutationRemove.isPending}
              variant="solid"
              colorScheme="red"
              onClick={() =>
                mutationRemove.mutate({
                  productId: data?.id,
                })
              }
              size="sm"
            >
              Удалить из корзины
            </Button>
          ) : (
            <Button
              isLoading={mutationAdd.isPending}
              variant="solid"
              colorScheme="blue"
              onClick={() =>
                handleAddClick({
                  productId: data?.id,
                })
              }
              size="sm"
            >
              Add to cart
            </Button>
          )}
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
};

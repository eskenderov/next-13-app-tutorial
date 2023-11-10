import { ProductType } from "@/types/product";
import {
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

interface ProductCardProps {
  data: ProductType;
}
export const ProductCard = ({ data }: ProductCardProps) => {
  return (
    <Card maxW="sm">
      <CardBody>
        <Image width={520} height={520} alt={data.title} src={data.image} />
        <Stack mt="6" spacing="3">
          <Heading size="md">{data.title}</Heading>
          <Text>{data.description}</Text>
          <Text color="blue.600" fontSize="2xl">
            ${data?.price || "none"}
          </Text>
        </Stack>
      </CardBody>
      <Divider />
      <CardFooter>
        <ButtonGroup spacing="2">
          <Button variant="solid" colorScheme="blue">
            Add to cart
          </Button>
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
};

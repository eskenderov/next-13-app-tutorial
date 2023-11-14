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

interface ProductCardProps {
  data: ProductType;
}

export const ProductCard = ({ data }: ProductCardProps) => {
  const truncatedText = truncateText(data?.description, 60);
  const session = useSession();
  const router = useRouter();
  const blockingAddToCard = session?.status === "unauthenticated";
  const handleAddClick = () => {
    if (blockingAddToCard) {
      router.push("/auth/sign-in");
    }
  };
  return (
    <Card maxW="sm" height={580}>
      <CardBody>
        <Image width={520} height={520} alt={data.title} src={data.image} />
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
          <Button variant="solid" colorScheme="blue" onClick={handleAddClick}>
            Add to cart
          </Button>
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
};

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

export const ProductCard = () => {
  return (
    <Card maxW="sm">
      <CardBody>
        <Image
          width={520}
          height={520}
          alt="product-card"
          src="https://cs1.livemaster.ru/storage/e2/13/899a6290329fc8f999045fa7f2pc--odezhda-detskaya-detskij-komplekt-iz-muslina-rubashka-detskay.jpg"
        />
        <Stack mt="6" spacing="3">
          <Heading size="md">Living room Sofa</Heading>
          <Text>
            This sofa is perfect for modern tropical spaces, baroque inspired
            spaces, earthy toned spaces and for people who love a chic design
            with a sprinkle of vintage design.
          </Text>
          <Text color="blue.600" fontSize="2xl">
            $450
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

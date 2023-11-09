import React from "react";
import { ShopSitebar } from "./ui/Sitebar";
import { Box, HStack } from "@chakra-ui/react";
import { ShopContent } from "./ui/Content";

const ShopPage = () => {
  return (
    <main className="page" style={{ marginTop: "10px" }}>
      <HStack spacing="24px" align="flex-start">
        <Box w="300px" h="500px" bg="white">
          <ShopSitebar />
        </Box>
        <Box w="100%" minH="calc(100vh - 80px)" bg="white">
          <ShopContent />
        </Box>
      </HStack>
    </main>
  );
};

export default ShopPage;

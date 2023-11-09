import { Box, Select, Text } from "@chakra-ui/react";
import React from "react";

export const RowPerPage = () => {
  return (
    <Box
      sx={{ w: "280px", display: "flex", alignItems: "center", gap: 2, mr: 4 }}
    >
      <Text fontSize="md">Показывать по: </Text>
      <Select maxW={70} defaultValue="price">
        <option value={5}>5</option>
        <option value={10}>10</option>
        <option value={30}>30</option>
      </Select>
    </Box>
  );
};

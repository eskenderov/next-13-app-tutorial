import { Box, Select, Text } from "@chakra-ui/react";
import React from "react";

interface RowPerPageProps {
  value: number;
  onChange: (value: number) => void;
}
export const RowPerPage = ({ value, onChange }: RowPerPageProps) => {
  return (
    <Box
      sx={{ w: "280px", display: "flex", alignItems: "center", gap: 2, mr: 4 }}
    >
      <Text fontSize="md">Показывать по: </Text>
      <Select
        maxW={70}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      >
        <option value={3}>3</option>
        <option value={10}>10</option>
        <option value={30}>30</option>
      </Select>
    </Box>
  );
};

import { Select } from "@chakra-ui/react";
import React from "react";

export const Sorting = () => {
  return (
    <Select maxW={280} defaultValue="price">
      <option value="date">По возврастании даты</option>
      <option value="-date">По убывании даты</option>
      <option value="price">По возврастании цены</option>
      <option value="-price">По убывании цены</option>
    </Select>
  );
};

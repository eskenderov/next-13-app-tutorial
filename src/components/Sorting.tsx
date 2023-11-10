import { Select } from "@chakra-ui/react";
import React from "react";

interface SortingProps {
  value: string;
  onChange: (value: string) => void;
}
export const Sorting = ({ value, onChange }: SortingProps) => {
  return (
    <Select maxW={280} value={value} onChange={(e) => onChange(e.target.value)}>
      <option value="createdAt">По возврастании даты</option>
      <option value="-createdAt">По убывании даты</option>
      <option value="price">По возврастании цены</option>
      <option value="-price">По убывании цены</option>
    </Select>
  );
};

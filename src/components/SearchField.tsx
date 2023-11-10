import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import React from "react";
import Image from "next/image";
import SearchImage from "@imgs/search.png";
interface SearchFieldProps {
  value: string;
  onChange: (value: string) => void;
}
export const SearchField = ({ value, onChange }: SearchFieldProps) => {
  return (
    <InputGroup maxW={520}>
      <InputLeftElement pointerEvents="none">
        <Image width={15} height={15} src={SearchImage} alt="search-image" />
      </InputLeftElement>
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        type="text"
        sx={{ pl: 12 }}
        placeholder="Поиск товара"
      />
    </InputGroup>
  );
};

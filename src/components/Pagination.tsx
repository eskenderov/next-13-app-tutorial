import { Box, Button } from "@chakra-ui/react";
import React from "react";

interface PaginationProps {
  count: number;
  activePage: number;
  onPageChange: (value: number) => void;
}
export const Pagination = ({
  count,
  onPageChange,
  activePage,
}: PaginationProps) => {
  const paginationButtons = [];

  for (let page = 1; page <= count; page++) {
    paginationButtons.push(
      <Button
        key={page}
        variant={activePage + 1 === page ? "solid" : "outline"}
        colorScheme={activePage + 1 === page ? "blue" : "gray"}
        borderRadius={0}
        onClick={() => onPageChange(page - 1)}
      >
        {page}
      </Button>
    );
  }

  return (
    <Box
      sx={{
        m: "30px 0",
        w: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box display="flex" justifyContent="center" mt={4}>
        {paginationButtons}
      </Box>
    </Box>
  );
};

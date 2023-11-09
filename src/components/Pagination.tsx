import { Box, Button } from "@chakra-ui/react";
import React from "react";

export const Pagination = () => {
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
        <Button
          variant={"solid"}
          colorScheme={"blue"}
          borderRadius={0}
          // onClick={() => onPageChange(number)}
        >
          1
        </Button>
        <Button
          variant={"outline"}
          colorScheme={"gray"}
          borderRadius={0}
          // onClick={() => onPageChange(number)}
        >
          2
        </Button>
        {/* <Button
          key={1}
          variant={1 === 1 ? "solid" : "outline"}
          colorScheme={1 === 1 ? "teal" : "gray"}
          // onClick={() => onPageChange(number)}
        >
          1
        </Button> */}
      </Box>
    </Box>
  );
};

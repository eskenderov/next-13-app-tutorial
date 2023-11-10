import { Card, Skeleton, Stack } from "@chakra-ui/react";
import React from "react";

export const CardSkeleton = () => {
  return (
    <Card sx={{ height: "max-content" }}>
      <Stack padding={5} spacing={1}>
        <Skeleton height="240px" mb={1} />
        <Skeleton height="30px" />
        <Skeleton height="80px" mb={1} />
        <Skeleton w="100px" height="33px" mb={2} />
        <Skeleton w="118px" height="40px" />
      </Stack>
    </Card>
  );
};

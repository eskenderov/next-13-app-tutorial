"use client";

import { Button } from "@chakra-ui/react";
import { signOut } from "next-auth/react";

export const HeaderAccount = () => {
  return (
    <Button
      onClick={() =>
        signOut({
          redirect: true,
          callbackUrl: `${window.location.origin}/auth/sign-in`,
        })
      }
      variant="solid"
      colorScheme="red"
    >
      Sign out
    </Button>
  );
};

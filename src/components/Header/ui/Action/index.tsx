"use client";

import { Button } from "@chakra-ui/react";
import Link from "next/link";

export const HeaderAction = () => {
  return (
    <div>
      <Link href='/auth/sign-in'><Button variant="outline">Sign in</Button></Link>
    </div>
  );
};

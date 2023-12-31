import { authConfig } from "@/app/api/auth/[...nextauth]/options";
import { Box, Button } from "@chakra-ui/react";
import { getServerSession } from "next-auth";
import Link from "next/link";
import React from "react";

export async function HeaderAction({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authConfig);
  return (
    <div>
      {session?.user ? (
        <Box sx={{ display: "flex", alignItems: "center", gap: 5 }}>
          {children}
        </Box>
      ) : (
        <Link href="/auth/sign-in">
          <Button variant="outline">Sign in</Button>
        </Link>
      )}
    </div>
  );
}

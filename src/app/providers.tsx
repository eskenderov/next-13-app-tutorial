"use client";

import { store } from "@/redux-toolkit/store";
import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import { Provider } from "react-redux";

export function Providers({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient();

  return (
    <CacheProvider>
      <QueryClientProvider client={queryClient}>
        <ChakraProvider>
          <SessionProvider>
            <Provider store={store}>{children}</Provider>
          </SessionProvider>
        </ChakraProvider>
      </QueryClientProvider>
    </CacheProvider>
  );
}

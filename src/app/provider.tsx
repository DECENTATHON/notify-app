
"use client";
import { ReactNode } from "react";
import { ConfigProvider } from "antd";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/shared/setup/query/queryClient";

interface Props {
  children: ReactNode;
}

export function Providers({ children }: Props) {
  return (
      <ConfigProvider>
        <QueryClientProvider client={queryClient}>
                      {children}
        </QueryClientProvider>
      </ConfigProvider>
  );
}

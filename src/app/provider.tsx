
"use client";
import { ReactNode } from "react";
import { ConfigProvider } from "antd";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/shared/query/queryClient";

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

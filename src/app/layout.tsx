
import { ReactNode } from "react";
import "@/shared/styles/globals.css";
import { Providers } from "./provider";
import MainLayout from "@/shared/layout/layout";


export default function RootLayout({ children }: { children: ReactNode }) {
  return (
      <html lang="en">
      <body>
      <Providers>
          <MainLayout>
              {children}
          </MainLayout>
      </Providers>
      </body>
      </html>
  );
}

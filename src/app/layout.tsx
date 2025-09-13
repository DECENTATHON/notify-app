import type { Metadata } from "next";
import { ReactNode } from "react";
import "@/shared/styles/globals.css";
import { Providers } from "./provider";

export const metadata: Metadata = {
  title: "Hypers",
  description: "Hypers",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover"
        />
        <link rel="icon" href="./logowithout.svg" />
        <meta property="og:type" content="article" />
        <meta property="og:title" />
        <meta property="og:description" />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

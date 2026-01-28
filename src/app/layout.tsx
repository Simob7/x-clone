import "./globals.css";
import React from "react";
import { ClerkProvider } from "@clerk/nextjs";
import QueryProvider from "@/providers/QueryProvider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <QueryProvider>
        <html lang="en">
          <body>{children}</body>
        </html>
      </QueryProvider>
    </ClerkProvider>
  );
}

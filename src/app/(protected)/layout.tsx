import type { Metadata } from "next";

import ResponsiveLayout from "@/components/ResponsiveLayout";

export const metadata: Metadata = {
  title: " X platform - Clone",
  description: "Next.js x social media application project",
};

export default function AppLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <ResponsiveLayout>
      {children}
      {modal}
    </ResponsiveLayout>
  );
}

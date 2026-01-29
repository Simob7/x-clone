// src/app/layout.tsx (or a specific route layout)
import ResponsiveLayout from "@/components/ResponsiveLayout";
import LeftBar from "@/components/LeftBar";
import RightBar from "@/components/RightBar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ResponsiveLayout leftBar={<LeftBar />} rightBar={<RightBar />}>
          {children}
        </ResponsiveLayout>
      </body>
    </html>
  );
}

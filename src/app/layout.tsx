import LeftBar from "@/components/LeftBar";
import "./globals.css";
import RightBar from "@/components/RightBar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {/* the responsive flexbox for the left and right bars */}
        <div className="max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl xxl:max-w-screen-xxl mx-auto flex justify-between">
          <div className="px-2 xsm:px-2 xxl:px-8">
            <LeftBar />
          </div>
          <div className="lg:min-w-[600px] border-x-[1px] border-borderGray flex-1">
            {children}
          </div>
          <div className="px-2 hidden lg:flex ml-5 md:ml-8 flex-1 ">
            <RightBar />
          </div>
        </div>
      </body>
    </html>
  );
}

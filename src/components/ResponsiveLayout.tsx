"use client";
import { useState } from "react";
import LeftBar from "./LeftBar";
import RightBar from "./RightBar";
import CustomImage from "./Image";
export default function ResponsiveLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl xxl:max-w-screen-xxl mx-auto flex justify-between min-h-screen relative">
      {/* 1. MOBILE OVERLAY */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-[60] sm:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* 2. LEFTBAR / DRAWER */}
      {/* sm:w-20 targets Tablet (icons only) | xl:w-72 targets Desktop (full menu) */}
      <div
        className={`
    fixed inset-y-0 left-0 z-[70] bg-black w-72 transform transition-transform duration-300 ease-in-out
    /* Use dvh to fix the mobile browser UI glitch */
    h-[100dvh] 
    ${isOpen ? "translate-x-0" : "-translate-x-full"}
    sm:static sm:h-auto sm:translate-x-0 sm:flex-[0.1] xl:flex-[0.2] xxl:flex-[0.25] 
    sm:z-auto sm:px-2 xxl:px-8 sm:w-auto
  `}>
        <LeftBar onClose={() => setIsOpen(false)} />
      </div>

      {/* 3. MAIN CONTENT */}
      {/* lg:min-w-[600px] ensures the feed stays the center of attention */}
      <div className="flex-[1] lg:flex-[0.5] border-x-[1px] border-borderGray min-h-screen">
        {/* MOBILE TOP HEADER */}
        <div className="sm:hidden flex items-center justify-between p-4 sticky top-0 bg-black/80 backdrop-blur-md z-30 border-b border-borderGray">
          <div
            className="w-8 h-8 rounded-full overflow-hidden cursor-pointer"
            onClick={() => setIsOpen(true)}>
            <CustomImage
              src={"/general/avatar.png"}
              alt="avatar"
              className="w-full h-full object-cover"
              width={24}
              height={24}
            />
          </div>
          <CustomImage
            src={"icons/logo.svg"}
            alt="icon"
            className="w-6 h-6"
            width={24}
            height={24}
          />
          <div className="w-8" />
        </div>

        {children}
      </div>

      {/* 4. RIGHTBAR */}
      {/* Hidden on mobile/tablet, appears at 1024px (lg) */}
      <div className="hidden lg:flex flex-[0.3] sticky top-0 h-screen ml-4 xxl:ml-8">
        <RightBar />
      </div>
    </div>
  );
}

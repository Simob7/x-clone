"use client";
import { useState } from "react";
import CustomImage from "./Image";

interface ResponsiveLayoutProps {
  children: React.ReactNode;
  leftBar: React.ReactNode; // New slot
  rightBar: React.ReactNode; // New slot
}

export default function ResponsiveLayout({
  children,
  leftBar,
  rightBar,
}: ResponsiveLayoutProps) {
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
      <div
        className={`
        fixed inset-y-0 left-0 z-[70] bg-black w-72 transform transition-transform duration-300 ease-in-out
        h-[100dvh] 
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        sm:static sm:h-auto sm:translate-x-0 sm:flex-[0.1] xl:flex-[0.2] xxl:flex-[0.25] 
        sm:z-auto sm:px-2 xxl:px-8 sm:w-auto
      `}>
        {/* Pass a way to close the bar if needed, or wrap leftBar in a client wrapper */}
        {leftBar}
      </div>

      {/* 3. MAIN CONTENT */}
      <div className="flex-[1] lg:flex-[0.5] border-x-[1px] border-borderGray min-h-screen">
        <div className="sm:hidden flex items-center justify-between p-4 sticky top-0 bg-black/80 backdrop-blur-md z-30 border-b border-borderGray">
          <div
            className="w-8 h-8 rounded-full overflow-hidden cursor-pointer"
            onClick={() => setIsOpen(true)}>
            <CustomImage
              src={"/general/avatar.png"}
              alt="avatar"
              width={24}
              height={24}
              className="w-full h-full object-cover"
            />
          </div>
          <CustomImage
            src={"icons/logo.svg"}
            alt="icon"
            width={24}
            height={24}
            className="w-6 h-6"
          />
          <div className="w-8" />
        </div>
        {children}
      </div>

      {/* 4. RIGHTBAR */}
      {/* 4. RIGHTBAR */}
      {/* 4. RIGHTBAR */}
      <div className="hidden lg:flex flex-[0.3] ml-4 xxl:ml-8 h-fit">
        {rightBar}
      </div>
    </div>
  );
}

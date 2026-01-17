import React from "react";
import CustumImage from "./Image";

function TodayNews() {
  return (
    <div className="flex flex-col relative border-[1px] border-borderGray rounded-lg p-4 gap-4">
      <h1 className="font-bold ">Today’s News</h1>

      <div className="flex flex-col gap-2">
        {/* News Text */}
        <p className="text-sm font-semibold leading-tight">
          Reza Pahlavi Outlines Vision for Free Iran Amid Deadly Protests
        </p>

        {/* Avatars Container */}
        <div className="flex items-center -space-x-2 overflow-hidden">
          <div className="relative inline-block">
            <CustumImage
              src="/general/avatar.png"
              width={24}
              height={24}
              className="rounded-full ring-2 ring-black object-cover"
            />
          </div>
          <div className="relative inline-block">
            <CustumImage
              src="/general/avatar.png"
              width={24}
              height={24}
              className="rounded-full ring-2 ring-black object-cover"
            />
          </div>
          <div className="relative inline-block">
            <CustumImage
              src="/general/avatar.png"
              width={24}
              height={24}
              className="rounded-full ring-2 ring-black object-cover"
            />
          </div>

          {/* Optional: Number of people mentioned */}
          <span className="text-xs text-textGray pl-4">
            2 days ago · News · 500.1K posts
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        {/* News Text */}
        <p className="text-sm font-semibold leading-tight">
          Iranian Regime Imposes Internet Blackout and Kills Over 12,000
          Protesters in Tehran
        </p>

        {/* Avatars Container */}
        <div className="flex items-center -space-x-2 overflow-hidden">
          <div className="relative inline-block">
            <CustumImage
              src="/general/avatar.png"
              width={24}
              height={24}
              className="rounded-full ring-2 ring-black object-cover"
            />
          </div>
          <div className="relative inline-block">
            <CustumImage
              src="/general/avatar.png"
              width={24}
              height={24}
              className="rounded-full ring-2 ring-black object-cover"
            />
          </div>
          <div className="relative inline-block">
            <CustumImage
              src="/general/avatar.png"
              width={24}
              height={24}
              className="rounded-full ring-2 ring-black object-cover"
            />
          </div>

          {/* Optional: Number of people mentioned */}
          <span className="text-xs text-textGray pl-4">
            3 days ago · News · 444.6K posts
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        {/* News Text */}
        <p className="text-sm font-semibold leading-tight">
          Iran Protests Rage Amid Internet Blackout and Deadly Crackdown
        </p>

        {/* Avatars Container */}
        <div className="flex items-center -space-x-2 overflow-hidden">
          <div className="relative inline-block">
            <CustumImage
              src="/general/avatar.png"
              width={24}
              height={24}
              className="rounded-full ring-2 ring-black object-cover"
            />
          </div>
          <div className="relative inline-block">
            <CustumImage
              src="/general/avatar.png"
              width={24}
              height={24}
              className="rounded-full ring-2 ring-black object-cover"
            />
          </div>
          <div className="relative inline-block">
            <CustumImage
              src="/general/avatar.png"
              width={24}
              height={24}
              className="rounded-full ring-2 ring-black object-cover"
            />
          </div>

          {/* Optional: Number of people mentioned */}
          <span className="text-xs text-textGray pl-4">
            2 hours ago · News · 54.3K posts
          </span>
        </div>
      </div>
    </div>
  );
}

export default TodayNews;

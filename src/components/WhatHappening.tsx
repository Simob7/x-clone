import React from "react";

function WhatHappening() {
  return (
    <div className="flex flex-col border-[1px] border-borderGray rounded-2xl p-4 gap-1">
      <h1 className="font-bold text-xl px-2 mb-2">What&apos;s happening</h1>

      {/* Trending Item */}
      <div className="flex gap-4 justify-between items-center cursor-pointer hover:bg-white/5 p-2 px-3 rounded-lg transition-colors duration-200">
        <div className="flex flex-col">
          <span className="text-textGray text-sm">
            Business & finance · Trending
          </span>
          <span className="font-bold text-md">#CryptoNews</span>
          <span className="text-textGray text-xs">10.5K posts</span>
        </div>

        {/* The "More" icon wrapper */}
        <div className="hover:bg-blue-400/10 hover:text-blue-400 p-2 rounded-full transition-colors">
          <span className="font-bold text-xl leading-none">...</span>
        </div>
      </div>

      {/* Trending Item */}
      <div className="flex gap-4 justify-between items-center cursor-pointer hover:bg-white/5 p-2 px-3 rounded-lg transition-colors duration-200">
        <div className="flex flex-col">
          <span className="text-textGray text-sm">Trending in Morocco</span>
          <span className="font-bold text-md">al mada</span>
        </div>

        {/* The "More" icon wrapper */}
        <div className="hover:bg-blue-400/10 hover:text-blue-400 p-2 rounded-full transition-colors">
          <span className="font-bold text-xl leading-none">...</span>
        </div>
      </div>

      {/* Trending Item */}
      <div className="flex gap-4 justify-between items-center cursor-pointer hover:bg-white/5 p-2 px-3 rounded-lg transition-colors duration-200">
        <div className="flex flex-col">
          <span className="text-textGray text-sm">Trending in Morocco</span>
          <span className="font-bold text-md w-full">الامراض العقليه</span>
        </div>

        {/* The "More" icon wrapper */}
        <div className="flex justify-center items-center max-w-fit hover:bg-blue-400/10 hover:text-blue-400 p-2 rounded-full transition-colors">
          <span className="font-bold text-xl leading-none ">...</span>
        </div>
      </div>

      {/* Trending Item */}
      <div className="flex gap-4 justify-between items-center cursor-pointer hover:bg-white/5 p-2 px-3 rounded-lg transition-colors duration-200">
        <div className="flex flex-col">
          <span className="text-textGray text-sm">
            Business & finance · Trending
          </span>
          <span className="font-bold text-md">#CryptoNews</span>
          <span className="text-textGray text-xs">10.5K posts</span>
        </div>

        {/* The "More" icon wrapper */}
        <div className="hover:bg-blue-400/10 hover:text-blue-400 p-2 rounded-full transition-colors">
          <span className="font-bold text-xl leading-none">...</span>
        </div>
      </div>

      <span className="text-iconBleu capitalize hover:bg-blue-400/10 hover:text-blue-400 p-2 rounded-full transition-colors cursor-pointer">
        see more
      </span>
    </div>
  );
}

export default WhatHappening;

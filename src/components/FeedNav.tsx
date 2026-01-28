"use client";

import React, { useState } from "react";

function FeedNav() {
  // 1. Initialize state with the default active tab
  const [activeTab, setActiveTab] = useState("For You");

  const tabs = ["For You", "Following", "Next.js", "TailwindCSS"];

  return (
    <div className="flex w-full justify-around text-textGray font-bold border-b border-borderGray sticky top-0 bg-black z-10 px-4 pt-1">
      {tabs.map((tab) => {
        const isActive = activeTab === tab;

        return (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`
              pb-3 flex items-center transition-colors duration-200
              ${
                tab === "Next.js" || tab === "TailwindCSS"
                  ? "hidden md:flex"
                  : "flex"
              }
              ${
                isActive
                  ? "border-b-4 border-iconBleu text-white"
                  : "border-b-4 border-transparent hover:text-white hover:border-iconBleu"
              }
            `}>
            {tab}
          </button>
        );
      })}
    </div>
  );
}

export default FeedNav;

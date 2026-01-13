"use client";

import Feed from "@/components/Feed";
import FeedNav from "@/components/FeedNav";

import Share from "@/components/Share";

// import Image from "next/image";

const Homepage = () => {
  return (
    <div className="relative w-[600px] h-[600px] ">
      <FeedNav />
      <Share />
      <Feed />
    </div>
  );
};

export default Homepage;

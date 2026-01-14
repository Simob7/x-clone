import Link from "next/link";
import React from "react";

function FeedNav() {
  return (
    <div className="flex w-full gap-2 justify-between text-textGray font-bold border-[1px]  border-borderGray sticky top-0 bg-black z-10 px-4 pt-4">
      <Link
        href="/"
        className="pb-3 flex items-center border-b-4 border-iconBleu text-iconBleu">
        For You
      </Link>
      <Link href="/" className="pb-3 flex items-center  ">
        following
      </Link>
      <Link href="/" className="pb-3 flex items-center  ">
        next.js
      </Link>
      <Link href="/" className="pb-3 flex items-center  ">
        tailwindcss
      </Link>
    </div>
  );
}

export default FeedNav;

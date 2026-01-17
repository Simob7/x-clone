import React from "react";

function Subscribe() {
  return (
    <div className="flex  p-4 flex-col items-start border-[1px] rounded-lg border-borderGray max-w-fit">
      <h1 className="px-2 font-bold text-xl ">Subscribe to Premium</h1>
      <p className="px-2  text-md">
        Subscribe to unlock new features and if eligible, receive a share of
        revenue.
      </p>
      <button className="bg-iconBleu max-w-fit py-2 px-4 mt-1 ml-2 rounded-full hover:opacity-90 font-bold">
        Subscribe
      </button>
    </div>
  );
}

export default Subscribe;

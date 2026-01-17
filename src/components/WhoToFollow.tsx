import React from "react";
import CustumImage from "./Image";

const followSuggestions = [
  {
    id: 1,
    name: "Sportsman Channel",
    handle: "@SportsmanChannel",
    avatar: "/general/avatar.png",
  },
  {
    id: 2,
    name: "Outside Magazine",
    handle: "@OutsideMagazine",
    avatar: "/general/avatar.png",
  },
  {
    id: 3,
    name: "nodeJs",
    handle: "@Nodejs",
    avatar: "/general/avatar.png",
  },
];

function WhoToFollow() {
  return (
    <div className="flex flex-col border-[1px] border-borderGray rounded-2xl overflow-hidden">
      <h1 className="font-bold text-xl p-4 pb-2">Who to follow</h1>

      {followSuggestions.map((user) => (
        <div
          key={user.id}
          className="flex items-center justify-between w-full p-4 hover:bg-white/5 cursor-pointer transition-colors">
          {/* LEFT: Avatar + Names */}
          <div className="flex items-center gap-3 min-w-0">
            <div className="relative w-10 h-10 flex-shrink-0">
              <CustumImage
                src={user.avatar}
                width={40}
                height={40}
                className="rounded-full object-cover"
              />
            </div>
            <div className="flex flex-col min-w-0">
              <h2 className="font-bold text-md truncate leading-tight hover:underline">
                {user.name}
              </h2>
              <span className="text-sm text-textGray truncate">
                {user.handle}
              </span>
            </div>
          </div>

          {/* RIGHT: Follow Button */}
          <button className="bg-white text-black px-5 py-1.5 font-bold rounded-full text-sm hover:bg-zinc-200 transition-all flex-shrink-0 ml-2">
            Follow
          </button>
        </div>
      ))}

      {/* FOOTER */}
      <div className="p-4 pt-2">
        <button className="text-blue-400 text-sm hover:underline">
          Show more
        </button>
      </div>
    </div>
  );
}

export default WhoToFollow;

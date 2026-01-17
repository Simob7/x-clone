import React from "react";
import PostInfo from "./PostInfo";
import CustumImage from "./Image";
import PostIntercations from "./PostIntercations";

function Comments() {
  return (
    <div className="p-1 border-y-[1px] border-borderGray w-full">
      {/* OWNER OF THE POST  */}
      <form className="flex gap-2">
        {/* AVATAR */}
        <div className="relative w-6 h-6 rounded-full overflow-hidden">
          <CustumImage
            src={"/general/avatar.png"}
            width={100}
            height={100}
            alt="post"
            tr={true}
            className="cursor-pointer"
          />
        </div>
        {/* content */}
        <div className="flex-1 min-w-0 mb-1 ">
          {/* top */}
          <div className="flex justify-between items-center gap-2">
            <div className="flex items-center gap-1  flex-wrap">
              {/* USER INFO */}
              <h1 className="text-md  cursor-pointer">mohamed bouayaben</h1>
              <span className="text-textGray cursor-pointer text-sm">
                @bouayaben9
              </span>
              <span className="text-textGray text-sm">1 day ago</span>
            </div>
            <PostInfo />
          </div>
          {/* TEXT AND MEDIA */}
          <div className="flex w-full flex-col  mt-1">
            <p className="pb-1 text-sm md:text-base">
              {" "}
              {/* Adjusted font sizes */}
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias
            </p>
          </div>
        </div>
      </form>

      {/* USER INTERACTIONS */}
      <PostIntercations />
    </div>
  );
}

export default Comments;

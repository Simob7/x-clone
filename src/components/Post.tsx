import React from "react";
import CustumImage from "./Image";
import PostInfo from "./PostInfo";
import PostIntercations from "./PostIntercations";

function Post() {
  return (
    <div className="p-4 border-y-[1px] border-borderGray w-full">
      {/* POST TYPE */}
      <div className="flex items-center gap-2 text-sm  text-textGray  mb-2">
        <div
          className={`w-4 h-4 bg-textGray  transition-colors`}
          style={{
            maskImage: `url(/svg/repost.svg)`,
            maskRepeat: "no-repeat",
            maskSize: "contain",
            WebkitMaskImage: `url(/svg/repost.svg)`,
            WebkitMaskRepeat: "no-repeat",
            WebkitMaskSize: "contain",
          }}
        />
        <span className="text-[12px]">mohamed bouayaben reposted</span>
      </div>
      {/* OWNER OF THE POST  */}
      <div className="flex   gap-4">
        {/* AVATAR */}
        <div className="relative w-10 h-10 rounded-full overflow-hidden">
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
        <div className="flex-1 mb-2 ">
          {/* top */}
          <div className="flex justify-between items-center gap-2">
            <div className="flex items-center gap-2  flex-wrap">
              {/* USER INFO */}
              <h1 className="text-md  cursor-pointer">mohamed bouayaben</h1>
              <span className="text-textGray cursor-pointer text-sm">
                @bouayaben9
              </span>
              <span className="text-textGray text-sm">1 day ago</span>
            </div>
            <PostInfo />
          </div>
          <div className="flex flex-col gap-4 mt-2">
            <p className="pb-4">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo
              animi, odit ipsa dignissimos excepturi aliquid? Lorem ipsum dolor
              sit amet consectetur adipisicing elit. Nemo animi, odit ipsa
              dignissimos excepturi aliquid?Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Nemo animi, odit ipsa dignissimos
              excepturi aliquid?
            </p>
            <CustumImage
              src="/general/post.jpeg"
              alt="post"
              width={600}
              height={600}
            />
          </div>
        </div>
      </div>
      {/* TEXT AND MEDIA */}
      {/* USER INTERACTIONS */}
      <PostIntercations />
    </div>
  );
}

export default Post;

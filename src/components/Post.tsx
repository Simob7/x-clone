import React from "react";
import CustumImage from "./Image";
import PostInfo from "./PostInfo";
import PostIntercations from "./PostIntercations";

function Post() {
  return (
    <div className="p-4 border-y-[1px] border-borderGray">
      {/* POST TYPE */}
      <div className="flex items-center gap-2 text-sm  text-textGray font-bold mb-2 ">
        <CustumImage
          src={"/svg/repost.svg"}
          width={16}
          height={16}
          alt="repost"
          className="text-red-600 bg-white"
        />
        <span>mohamed bouayaben reposted</span>
      </div>
      {/* OWNER OF THE POST  */}
      <div className="flex gap-4">
        {/* AVATAR */}
        <div className="relative w-10 h-10 rounded-full overflow-hidden">
          <CustumImage
            src={"/general/avatar.png"}
            width={100}
            height={100}
            alt="post"
            tr={true}
          />
        </div>
        {/* content */}
        <div className="flex-1 mb-2 ">
          {/* top */}
          <div className="flex justify-between items-center gap-2">
            <div className="flex items-center gap-2  flex-wrap">
              {/* USER INFO */}
              <h1 className="text-md font-bold">mohamed bouayaben</h1>
              <span className="text-textGray">@bouayaben9</span>
              <span className="text-textGray">1 day ago</span>
            </div>
          </div>
          <PostInfo />
        </div>
      </div>
      {/* TEXT AND MEDIA */}
      <div className="flex flex-col gap-4 mt-2">
        <p className="pb-4">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo animi,
          odit ipsa dignissimos excepturi aliquid? Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Nemo animi, odit ipsa dignissimos
          excepturi aliquid?Lorem ipsum dolor sit amet consectetur adipisicing
          elit. Nemo animi, odit ipsa dignissimos excepturi aliquid?
        </p>
        <CustumImage
          src="/general/post.jpeg"
          alt="post"
          width={600}
          height={600}
        />
      </div>
      {/* USER INTERACTIONS */}
      <PostIntercations />
    </div>
  );
}

export default Post;

import Comments from "@/components/Comments";
import CustumImage from "@/components/Image";
import Post from "@/components/Post";
import Link from "next/link";
import React from "react";

function PostPage() {
  return (
    <div className="mb-4">
      <div className="flex items-center gap-8 sticky top-0 backdrop-blur-md p-4 z-10 bg-[#00000084]">
        <Link href={"/"}>
          <CustumImage src="icons/back.svg" width={24} height={24} alt="back" />
        </Link>
        <h1 className="font-bold text-lg">Post</h1>
      </div>
      <Post />
      {/* INPUT */}
      <div className="flex items-center m-4">
        {/* AVATAR */}
        <div className="relative  rounded-full overflow-hidden">
          <CustumImage
            src={"/general/avatar.png"}
            width={50}
            height={50}
            alt="post"
            tr={true}
            className="cursor-pointer"
          />
        </div>
        <input
          className="bg-transparent px-2  p-2 w-full outline-none "
          type="text"
          placeholder="comment"
        />
        <button
          className="px-4 py-2 bg-iconBleu text-white capitalize rounded-full hover:opacity-70 "
          type="submit">
          post
        </button>
      </div>
      <Comments />
      <Comments />
      <Comments />
      <Comments />
    </div>
  );
}

export default PostPage;

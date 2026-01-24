import Feed from "@/components/Feed";
import FeedNav from "@/components/FeedNav";
import CustumImage from "@/components/Image";
import Link from "next/link";
import React from "react";

function page() {
  return (
    <div className="flex flex-col gap-4">
      {/* PROFILE TITLE */}
      <div className="flex items-center gap-8 sticky top-0 backdrop-blur-md p-4 z-10 bg-[#00000084]">
        <Link href={"/"}>
          <CustumImage src="icons/back.svg" width={24} height={24} alt="back" />
        </Link>
        <h1 className="font-bold text-lg">bouayaben9</h1>
      </div>
      {/* INFO */}
      <div>
        {/* COVER AND AVATAR */}
        <div className="relative w-full">
          {/* COVER */}
          <div className="w-full aspect-[3/1] relative">
            <CustumImage src="general/cover.jpg " width={800} height={200} />
          </div>
          {/* PROFILE PICTURE */}
          <div className="w-1/6 aspect-square  rounded-full overflow-hidden border-[4px] border-black bg-gray-400 absolute left-4 -translate-y-1/2">
            <CustumImage
              src="general/avatar.png "
              width={100}
              height={100}
              tr={true}
              className=" absolute top-0"
            />
          </div>
        </div>
        {/* ICONS && BUTTON */}
        <div className=" flex items-center justify-end m-2 gap-2">
          <div className="w-9 h-9 flex items-center justify-center rounded-full border-[1px] border-gray-500 cursor-pointer">
            <CustumImage
              src="icons/more.svg"
              alt="more"
              width={20}
              height={20}
            />
          </div>
          <div className="w-9 h-9 flex items-center justify-center rounded-full border-[1px] border-gray-500 cursor-pointer">
            <CustumImage
              src="icons/explore.svg"
              alt="more"
              width={20}
              height={20}
            />
          </div>
          <div className="w-9 h-9 flex items-center justify-center rounded-full border-[1px] border-gray-500 cursor-pointer">
            <CustumImage
              src="icons/message.svg"
              alt="more"
              width={20}
              height={20}
            />
          </div>
          <button className="max-w-fit bg-white py-2 px-4 text-black font-bold rounded-full">
            Follow
          </button>
        </div>
        {/* INFOS */}
        <div className="flex flex-col gap-2">
          <div className="p-2 flex items-start flex-col">
            {/* FULL NAME */}
            <h1 className="text-lg font-bold capitalize">mohamed bouayaben</h1>
            {/* USERNAME */}
            <span className="text-sm text-textGray">@bouayaben9</span>
          </div>
          {/* BIO */}
          <div className="pl-2 ">
            <p className="text-sm">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius
              quisquam deleniti quis dignissimos, fugit ipsam aliquid ratione!
            </p>
          </div>
          {/* FEATURES */}
          <div className="flex gap-2 items-center flex-wrap  mt-2 p-2">
            <div className="flex justify-center items-center text-textGray gap-1">
              <CustumImage src="icons/job.svg" width={20} height={20} />
              <span className="capitalize">community</span>
            </div>

            <div className="flex justify-center items-center text-textGray gap-1">
              <CustumImage
                src="icons/userLocation.svg"
                width={20}
                height={20}
              />
              <span className="capitalize">morocco</span>
            </div>

            <div className="flex justify-center items-center text-textGray gap-1">
              <CustumImage src="icons/date.svg" width={20} height={20} />
              <span className="capitalize">Joined August 2015</span>
            </div>
          </div>
          {/* following and followers */}
          <div className="p-2 flex gap-4 ">
            <div className="flex items-center justify-center gap-1">
              <span className="font-bold ">61</span>
              <span className="text-textGray ">Following</span>
            </div>
            <div className="flex items-center justify-center gap-1">
              <span className="font-bold">331.6K</span>
              <span className="text-textGray ">Followers</span>
            </div>
          </div>
          <span className="text-textGray px-2 capitalize text-sm">
            Not followed by anyone you’re following
          </span>
        </div>
      </div>
      <FeedNav />
      <Feed />
    </div>
  );
}

export default page;

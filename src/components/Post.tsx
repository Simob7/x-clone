// "use server";
import React from "react";
import CustumImage from "./Image";
import PostInfo from "./PostInfo";
import PostIntercations from "./PostIntercations";

import { imagekit } from "@/util/imageKit";
import VideoKit from "./VideoKit";

interface FileDetailsResponse {
  width: number;
  height: number;
  filePath: string;
  url: string;
  fileType: string;
}

async function Post() {
  const getFileDetails = async (
    fileId: string
  ): Promise<FileDetailsResponse> => {
    return new Promise((resolve, reject) => {
      // 1. Pass the variable fileId, NOT the string "file_id"
      imagekit.getFileDetails(fileId, function (error, result) {
        if (error) {
          console.log(error);
          reject(error); // 2. Tell the promise it failed
        } else if (result) {
          resolve(result as FileDetailsResponse); // 3. Return the actual data
        } else {
          reject(new Error("No file details found"));
        }
      });
    });
  };
  const fileDetails = await getFileDetails("696a61b95c7cd75eb8b79e44");

  console.log(fileDetails);
  return (
    <div className="p-1 border-y-[1px] border-borderGray w-full">
      {/* POST TYPE */}
      <div className="flex items-center gap-2 text-sm  text-textGray  mb-1">
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
      <div className="flex gap-2">
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
              facere aliquid culpa neque perspiciatis iste repellat impedit quam
              animi quasi obcaecati suscipit architecto nemo, possimus quos
              dolorem fuga voluptatibus. Natus, tempore voluptatum quidem quod
              sequi illum laboriosam, adipisci quaerat laborum aperiam eos
              exercitationem numquam facere recusandae quibusdam rem. Itaque
              exercitationem praesentium vero laudantium eius commodi eveniet
              temporibus odit placeat amet ut aut nemo, dolores sunt voluptatum
              debitis necessitatibus, cupiditate id, obcaecati odio consequatur
              minus optio unde! Quasi!
            </p>

            {/* Add a wrapper div here to control the width */}
            <div className="w-full">
              {fileDetails && fileDetails.fileType === "image" ? (
                <CustumImage
                  src={fileDetails.filePath}
                  width={fileDetails.width}
                  height={fileDetails.height}
                  alt="post"
                  tr={true}
                  className="w-full h-auto rounded-xl"
                />
              ) : (
                <VideoKit
                  videoSrc={fileDetails.filePath}
                  className="w-full aspect-video rounded-xl"
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* USER INTERACTIONS */}
      <PostIntercations />
    </div>
  );
}

export default Post;

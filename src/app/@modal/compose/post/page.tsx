"use client";
import CustumImage from "@/components/Image";
import Share from "@/components/Share";
import { useRouter } from "next/navigation";
import React from "react";

function PostModal() {
  const router = useRouter();

  const closeModal = () => {
    router.back();
  };
  return (
    <div className="absolute w-screen h-screen top-0 left-0 z-20 bg-[#293139a6] flex justify-center ">
      <div className="py-4 px-8 rounded-xl bg-black w-[600px] h-max mt-12  flex flex-col gap-4">
        TOP
        <div className="flex items-center justify-between">
          <div onClick={closeModal} className="cursor-pointer ">
            X
          </div>
          <div className=" text-iconBleu font-bold">Draft</div>
        </div>
        {/* CENTER */}
        <div className="py-8 flex items-center gap-4">
          <div className="relative w-10 h-10 rounded-full overflow-hidden">
            <CustumImage
              src="general/avatar.png"
              width={100}
              height={100}
              alt="profil avatar"
              tr={true}
            />
          </div>
          <input
            className="flex-1 bg-transparent outline-none text-lg"
            type="text"
            placeholder="what is happening"
          />
        </div>
        {/* BOTTOM */}
        <div className="flex items-center justify-between gap-2 flex-wrap border-t border-borderGray pt-4">
          <div className="flex items-center gap-2">
            <CustumImage
              src={"/icons/image.svg"}
              alt={"icon"}
              width={20}
              height={20}
              className="cursor-pointer"
            />
            <CustumImage
              src={"icons/gif.svg"}
              alt={"icon"}
              width={20}
              height={20}
              className="cursor-pointer"
            />
            <CustumImage
              src={"icons/poll.svg"}
              alt={"icon"}
              width={20}
              height={20}
              className="cursor-pointer"
            />
            <CustumImage
              src={"icons/emoji.svg"}
              alt={"icon"}
              width={20}
              height={20}
              className="cursor-pointer"
            />
            <CustumImage
              src={"icons/schedule.svg"}
              alt={"icon"}
              width={20}
              height={20}
              className="cursor-pointer"
            />
            <CustumImage
              src={"/icons/location.svg"}
              alt={"icon"}
              width={20}
              height={20}
              className="cursor-pointer"
            />
          </div>
          <button
            className="px-4 py-2 bg-iconBleu text-white capitalize rounded-full hover:opacity-70 "
            type="submit">
            post
          </button>
        </div>
      </div>
    </div>
  );
}

export default PostModal;

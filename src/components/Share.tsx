import React from "react";
import CustumImage from "./Image";

function Share() {
  return (
    <div className="p-4 flex gap-4">
      {/* AVATAR */}
      <div className="relative w-10 h-10 overflow-hidden rounded-full ">
        <CustumImage
          src={"/general/avatar.png"}
          width={100}
          height={100}
          alt="share"
          className="cursor-pointer rounded-full "
        />
      </div>
      {/* OTHERS */}
      <div className="flex flex-1 flex-col gap-4">
        <input type="text" placeholder="what is happning?!" />
        <div className="">
          <div className="">
            <CustumImage
              src={"/icons/image.svg"}
              alt={""}
              width={20}
              height={20}
              className="cursor-pointer"
            />
            <CustumImage
              src={"icons/gif.svg"}
              alt={""}
              width={20}
              height={20}
              className="cursor-pointer"
            />
            <CustumImage
              src={"icons/poll.svg"}
              alt={""}
              width={20}
              height={20}
              className="cursor-pointer"
            />
            <CustumImage
              src={"icons/emoji.svg"}
              alt={""}
              width={20}
              height={20}
              className="cursor-pointer"
            />
            <CustumImage
              src={"icons/schedule.svg"}
              alt={""}
              width={20}
              height={20}
              className="cursor-pointer"
            />
            <CustumImage
              src={"/icons/location.svg"}
              alt={""}
              width={20}
              height={20}
              className="cursor-pointer"
            />
          </div>
          <button className="px-4 py-2 bg-white text-textGray ">post</button>
        </div>
      </div>
    </div>
  );
}

export default Share;

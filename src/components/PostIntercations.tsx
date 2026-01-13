import React from "react";
import CustumImage from "./Image";

function PostIntercations() {
  return (
    <div className="flex justify-between my-2 text-textGray px-2">
      <div className="flex gap-2 items-center">
        <div>
          {/* <CustumImage
            src={"/svg/comment.svg"}
            width={20}
            height={20}
            alt="comment"
            className="text-textGrayLight"
          /> */}
          
        </div>
        <span>comments</span>
      </div>
      <div className="flex gap-2">linke</div>
      <div className="flex gap-2">linke</div>
      <div className="flex gap-2">linke</div>
    </div>
  );
}
export default PostIntercations;

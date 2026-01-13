import React from "react";
import CustumImage from "./Image";

function PostInfo() {
  return (
    <div className="cursor-pointer w-4 h-4 relative">
      <CustumImage src="icons/infoMore.svg" alt="info" width={16} height={16} />
    </div>
  );
}

export default PostInfo;

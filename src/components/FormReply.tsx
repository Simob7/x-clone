"use client";

import React, { useRef } from "react";
import CustumImage from "./Image";
import { addComment } from "@/interaction.actions";

export default function ReplyForm({
  userImg,
  postId,
}: {
  userImg: string;
  postId: number;
}) {
  const formRef = useRef<HTMLFormElement>(null);

  const handleAction = async (formData: FormData) => {
    await addComment(postId, formData);
    formRef.current?.reset(); // Clears the text after reply
  };

  return (
    <form
      ref={formRef}
      action={handleAction}
      className="flex gap-3 p-4 border-b border-borderGray items-start">
      <div className="h-10 w-10 relative rounded-full overflow-hidden shrink-0">
        <CustumImage
          src={userImg || "/general/noAvatar.png"}
          width={40}
          height={40}
          alt="me"
          tr={true}
        />
      </div>
      <div className="flex-1">
        <textarea
          name="desc" // Must match formData.get("desc")
          className="bg-transparent text-xl w-full outline-none placeholder:text-textGray resize-none mt-1"
          placeholder="Post your reply"
          rows={1}
          required
        />
        <div className="flex justify-end mt-2">
          <button
            type="submit"
            className="px-5 py-2 bg-iconBlue text-white font-bold rounded-full hover:opacity-90 transition disabled:opacity-50">
            Reply
          </button>
        </div>
      </div>
    </form>
  );
}

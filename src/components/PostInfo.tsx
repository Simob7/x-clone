"use client";
import React, { useState } from "react";
import CustumImage from "./Image";

interface PostInfoProps {
  ownerId: string; // The username of post author
  currentUserId?: string | null; // The username of logged in user
  postId: number;
}

const PostInfo = ({ ownerId, currentUserId, postId }: PostInfoProps) => {
  const [open, setOpen] = useState(false);
  const isOwner = ownerId === currentUserId;

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this post?")) {
      console.log("Deleting post:", postId);
      // Add your delete action here
    }
  };

  return (
    <div className="relative">
      <button
        onClick={(e) => {
          e.stopPropagation();
          setOpen((prev) => !prev);
        }}
        className="p-2 hover:bg-blue-500/10 rounded-full transition group">
        <CustumImage
          src="/icons/infoMore.svg"
          width={18}
          height={18}
          alt="More"
        />
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-0 w-40 bg-black border border-borderGray rounded-xl shadow-lg z-20 overflow-hidden">
            {isOwner ? (
              <>
                <button className="w-full px-4 py-3 text-left text-sm hover:bg-white/10 transition">
                  Edit Post
                </button>
                <button
                  onClick={handleDelete}
                  className="w-full px-4 py-3 text-left text-sm text-red-500 hover:bg-red-500/10 transition">
                  Delete
                </button>
              </>
            ) : (
              <button className="w-full px-4 py-3 text-left text-sm hover:bg-white/10 transition">
                Not interested
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
};
export default PostInfo;

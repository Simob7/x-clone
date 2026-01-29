import React from "react";
import PostInfo from "./PostInfo";
import CustumImage from "./Image";
import PostIntercations from "./PostIntercations";
import { Post as PostType } from "../generated/prisma/client";
import { format } from "timeago.js";

// Export this so other files can use it for type safety
export type CommentsWithDetails = PostType & {
  author: {
    displayName: string | null; // Allow null
    username: string;
    UserImg: string | null; // Allow null
  };
  likes: { userId: string }[];
  rePosts: { userId: string }[];
  savedPosts: { userId: string }[];
  _count: { likes: number; comments: number; rePosts: number };
  hasLiked?: boolean;
  hasSaved?: boolean;
  hasReposted?: boolean;
};

async function Comments({
  comments,
}: {
  comments: CommentsWithDetails[];
  postId: number;
  username: string;
}) {
  return (
    <div className="flex flex-col">
      {comments.map((comment) => (
        <div
          key={comment.id}
          className="p-4 border-b border-borderGray w-full hover:bg-white/[0.02]">
          <div className="flex gap-3">
            {/* AVATAR */}
            <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0">
              <CustumImage
                src={comment.author.UserImg}
                width={100}
                height={100}
                alt="avatar"
                tr={true}
                className="object-cover"
              />
            </div>

            <div className="flex-1 min-w-0">
              {/* TOP ROW */}
              <div className="flex justify-between items-center gap-2">
                <div className="flex items-center gap-1 flex-wrap">
                  <h1 className="font-bold text-md hover:underline cursor-pointer">
                    {comment.author.displayName}
                  </h1>
                  <span className="text-textGray text-sm">
                    @{comment.author.username}
                  </span>
                  <span className="text-textGray text-sm">
                    · {format(comment.createdAt)}
                  </span>
                </div>
                <PostInfo />
              </div>

              {/* CONTENT */}
              <p className="text-sm md:text-base text-white mt-1">
                {comment.desc}
              </p>

              {/* INTERACTIONS: Pass props individually, NOT as PostInteractions={...} */}
              <div className="mt-2 -ml-2">
                <PostIntercations
                  isLiked={comment.hasLiked ?? false}
                  isSaved={comment.hasSaved ?? false}
                  isReposted={comment.hasReposted ?? false}
                  count={{
                    likes: comment._count.likes,
                    comments: comment._count.comments,
                    rePosts: comment._count.rePosts,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Comments;

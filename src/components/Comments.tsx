import React from "react";
import PostInfo from "./PostInfo";
import CustumImage from "./Image";
import PostIntercations from "./PostIntercations";
import { Post as PostType } from "../generated/prisma/client";
import { format } from "timeago.js";
import Link from "next/link";

export type CommentsWithDetails = PostType & {
  author: {
    displayName: string | null;
    username: string;
    UserImg: string | null;
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
  currentUserId,
}: {
  comments: CommentsWithDetails[];
  currentUserId?: string | null;
}) {
  return (
    <div className="flex flex-col">
      {comments.map((comment) => (
        <div
          key={comment.id}
          className="relative border-b border-borderGray w-full hover:bg-white/[0.02] transition">
          <Link
            href={`/${comment.author.username}/status/${comment.id}`}
            className="absolute inset-0 z-0"
          />
          <div className="p-4 flex gap-3 relative z-10 pointer-events-none">
            <Link
              href={`/${comment.author.username}`}
              className="relative w-10 h-10 rounded-full overflow-hidden shrink-0 pointer-events-auto">
              <CustumImage
                src={comment.author.UserImg || "/general/noAvatar.png"}
                width={100}
                height={100}
                alt="avatar"
                tr={true}
                className="object-cover"
              />
            </Link>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-center gap-2">
                <div className="flex items-center gap-1 flex-wrap pointer-events-auto text-sm">
                  <Link
                    href={`/${comment.author.username}`}
                    className="font-bold hover:underline text-white">
                    {comment.author.displayName || comment.author.username}
                  </Link>
                  <span className="text-textGray">
                    @{comment.author.username}
                  </span>
                  <span className="text-textGray">
                    · {format(comment.createdAt)}
                  </span>
                </div>
                <div className="pointer-events-auto">
                  <PostInfo
                    ownerId={comment.author.username}
                    currentUserId={currentUserId}
                    postId={comment.id}
                  />
                </div>
              </div>
              <p className="text-white mt-1">{comment.desc}</p>
              <div className="mt-2 -ml-2 pointer-events-auto">
                <PostIntercations
                  username={comment.author.username}
                  postId={comment.id}
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

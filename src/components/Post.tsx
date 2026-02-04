"use client";
import React from "react";
import CustumImage from "./Image";
import PostInfo from "./PostInfo";
import { Post as PostType } from "../generated/prisma/client";
import { format } from "timeago.js";
import PostInteractions from "./PostIntercations";
import Link from "next/link";
import CustomVideo from "./CustomVideo";
import { useRouter } from "next/navigation";

export type PostWithDetails = PostType & {
  user: {
    displayName: string | null;
    username: string;
    userImg: string | null;
    id: number;
  };
  rePost?:
    | (PostType & {
        user: {
          displayName: string | null;
          username: string;
          userImg: string | null;
        };
      })
    | null;
  hasLiked: boolean;
  hasSaved: boolean;
  hasReposted: boolean;
  likeCounts: number;
  commentCounts: number;
  rePostCounts: number;
};

const Post = ({
  post,
  currentUserId,
}: {
  post: PostWithDetails;
  currentUserId?: string | null;
}) => {
  const mainPost = post.rePost ? post.rePost : post;
  const router = useRouter();

  const handleCardClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    // Prevent navigation if clicking interactive elements
    if (
      target.closest("button") ||
      target.closest("a") ||
      target.closest("video") ||
      target.closest(".video-container")
    ) {
      return;
    }
    // Route based on the post's actual owner (the one who posted/reposted)
    router.push(`/${post.user.username}/status/${post.id}`);
  };

  return (
    <div
      onClick={handleCardClick}
      className="p-4 border-b border-borderGray w-full cursor-pointer hover:bg-white/[0.01]">
      {/* Repost Header */}
      {post.rePost && (
        <div className="flex items-center gap-2 text-sm text-textGray mb-2 ml-8 font-bold">
          <span>{post.user.displayName} reposted</span>
        </div>
      )}

      <div className="flex gap-3">
        {/* Avatar of Original Content Author */}
        <Link
          href={`/${mainPost.user.username}`}
          className="relative w-10 h-10 rounded-full overflow-hidden shrink-0">
          <CustumImage
            src={mainPost.user.userImg || "/general/noAvatar.png"}
            width={100}
            height={100}
            alt="avatar"
            tr={true}
            className="object-cover"
          />
        </Link>

        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-center">
            {/* User Info of Original Content Author */}
            <div className="flex items-center gap-1 text-sm">
              <Link
                href={`/${mainPost.user.username}`}
                className="font-bold hover:underline text-white">
                {mainPost.user.displayName}
              </Link>
              <span className="text-textGray">
                @{mainPost.user.username} · {format(mainPost.createdAt)}
              </span>
            </div>

            {/* PostInfo handles Edit/Delete for the post entry (repost or original) */}
            <PostInfo
              ownerId={post.user.username}
              currentUserId={currentUserId}
              postId={post.id}
            />
          </div>

          <p className="mt-1 text-white leading-normal">{mainPost.desc}</p>

          {/* Media Section */}
          {(mainPost.img || mainPost.video) && (
            <div
              className="mt-3 w-full video-container"
              onClick={(e) => e.stopPropagation()}>
              {mainPost.img ? (
                <CustumImage
                  src={mainPost.img}
                  width={600}
                  height={600}
                  alt="post"
                  className="rounded-xl border border-borderGray w-full h-auto"
                />
              ) : (
                <CustomVideo videoSrc={mainPost.video!} />
              )}
            </div>
          )}

          {/* Interactions */}
          <div className="mt-2 -ml-2">
            <PostInteractions
              postId={post.id}
              username={post.user.username}
              isLiked={post.hasLiked}
              isSaved={post.hasSaved}
              isReposted={post.hasReposted}
              count={{
                likes: post.likeCounts,
                comments: post.commentCounts,
                rePosts: post.rePostCounts,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;

// "use server";
import React from "react";
import CustumImage from "./Image";
import PostInfo from "./PostInfo";

// Update the import path to match your actual Prisma client output location
import { Post as PostType } from "../generated/prisma/client";
import { format } from "timeago.js";
import PostInteractions from "./PostIntercations";
import Link from "next/link";
import CustomVideo from "./CustomVideo";

export type PostWithDetails = PostType & {
  user: {
    displayName: string | null;
    username: string;
    userImg: string | null;
  };
  // The nested repost has a similar structure
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

function Post({ post }: { post: PostWithDetails }) {
  // Determine if we should show the original content
  // If it's a repost, 'mainPost' becomes the original source
  const mainPost = post.rePost ? post.rePost : post;
  return (
    <div className="p-1 border-y-[1px] border-borderGray w-full">
      {/* 1. REPOST HEADER: Link to the person who clicked "Repost" */}
      {post.rePostId && (
        <Link
          href={`/${post.user.username}`}
          className="flex items-center gap-2 text-sm text-textGray  ml-8 hover:underline">
          <div
            className="w-4 h-4 bg-textGray"
            style={{
              maskImage: `url(/svg/repost.svg)`,
              maskRepeat: "no-repeat",
              maskSize: "contain",
              WebkitMaskImage: `url(/svg/repost.svg)`,
            }}
          />
          <span className="text-[12px] font-bold">
            {post.user.displayName} reposted
          </span>
        </Link>
      )}

      {/* 2. MAIN POST LAYOUT */}
      <div className="flex gap-2">
        {/* AVATAR: Links to the Original Author (mainPost) */}
        <Link
          href={`/${mainPost.user.username}`}
          className="relative w-10 h-10 rounded-full overflow-hidden shrink-0">
          <CustumImage
            src={mainPost.user.userImg || "general/noAvatar.png"}
            width={100}
            height={100}
            alt={`${mainPost.user.username}'s avatar`}
            tr={true}
            className="cursor-pointer object-cover"
          />
        </Link>

        {/* CONTENT AREA */}
        <div className="flex-1 min-w-0 mb-1">
          {/* USER INFO & TIME: Links to the Original Author (mainPost) */}
          <div className="flex justify-between items-center gap-2">
            <Link
              href={`/${mainPost.user.username}`}
              className="flex items-center gap-1 flex-wrap">
              <h1 className="text-md font-bold cursor-pointer hover:underline">
                {mainPost.user.displayName}
              </h1>
              <span className="text-textGray cursor-pointer text-sm">
                @{mainPost.user.username}
              </span>
              <span className="text-textGray text-sm">
                · {format(mainPost.createdAt)}
              </span>
            </Link>
            <PostInfo />
          </div>

          {/* TEXT AND MEDIA: Displays original content (mainPost) */}
          <div className="flex w-full flex-col mt-1">
            <p className="pb-1 text-sm md:text-base leading-normal">
              {mainPost.desc}
            </p>

            <div className="w-full">
              {mainPost.img ? (
                <CustumImage
                  src={mainPost.img}
                  width={600}
                  height={600}
                  alt="post image"
                  tr={true}
                  className="w-full h-auto rounded-xl border border-borderGray"
                />
              ) : mainPost.video ? (
                <CustomVideo
                  videoSrc={mainPost.video}
                  // className="w-full aspect-video rounded-xl"
                />
              ) : null}
            </div>
          </div>
        </div>
      </div>

      {/* 3. INTERACTIONS */}
      <PostInteractions
        // postId={post.id} // Usually you want interactions to count toward the repost record ID
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
  );
}

export default Post;

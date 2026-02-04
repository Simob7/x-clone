"use client";

import React, { use, useOptimistic } from "react";
import { savePost, toggleLike, toggleRepost } from "@/interaction.actions";
import Link from "next/link";

interface PostInteractionsProps {
  count: {
    comments?: string | number;
    rePosts: string | number;
    likes: string | number;
  };
  isLiked: boolean;
  isSaved: boolean;
  isReposted: boolean;
  postId: number;
  username: string;
}

interface InteractionButtonProps {
  iconPath: string;
  count?: string | number;
  hoverColor?: string;
  textColor?: string;
  isActive?: boolean;
  activeColor?: string;
  href?: string;
}

const InteractionButton: React.FC<InteractionButtonProps> = ({
  iconPath,
  count,
  hoverColor = "group-hover:bg-IconPink",
  textColor = "group-hover:text-IconPink",
  isActive,
  activeColor = "bg-IconPink",
  href, // Destructure href
}) => {
  const content = (
    <>
      <div
        className={`w-5 h-5 ${isActive ? activeColor : "bg-textGray"} ${hoverColor} transition-colors`}
        style={{
          maskImage: `url(${iconPath})`,
          WebkitMaskImage: `url(${iconPath})`,
          maskRepeat: "no-repeat",
          WebkitMaskRepeat: "no-repeat",
          maskSize: "contain",
          WebkitMaskSize: "contain",
        }}
      />
      {count !== undefined && (
        <span
          className={`text-sm transition-colors ${
            isActive ? activeColor.replace("bg-", "text-") : "text-textGray"
          } ${textColor}`}>
          {count}
        </span>
      )}
    </>
  );

  const className =
    "group flex gap-1 pb-1 items-center cursor-pointer bg-transparent border-none";

  // If href is provided, render a Link
  if (href) {
    return (
      <Link href={href} className={className}>
        {content}
      </Link>
    );
  }

  // Otherwise, render the button
  return (
    <button type="submit" className={className}>
      {content}
    </button>
  );
};

const PostInteractions: React.FC<PostInteractionsProps> = ({
  count,
  isLiked,
  isSaved,
  isReposted,
  postId,
  username,
}) => {
  const [optimisticState, addOptimisticUpdate] = useOptimistic(
    {
      likes: Number(count.likes),
      rePosts: Number(count.rePosts),
      isLiked,
      isReposted,
      isSaved,
    },
    (state, type: "like" | "repost" | "save") => {
      switch (type) {
        case "like":
          return {
            ...state,
            likes: state.isLiked ? state.likes - 1 : state.likes + 1,
            isLiked: !state.isLiked,
          };
        case "repost":
          return {
            ...state,
            rePosts: state.isReposted ? state.rePosts - 1 : state.rePosts + 1,
            isReposted: !state.isReposted,
          };
        case "save":
          return { ...state, isSaved: !state.isSaved };
        default:
          return state;
      }
    },
  );

  //  addOptimisticUpdate in the form action
  const handleLike = async (formData: FormData) => {
    addOptimisticUpdate("like");
    await toggleLike(postId);
  };
  // handle repost
  const handleRepost = async (formData: FormData) => {
    addOptimisticUpdate("repost");
    await toggleRepost(postId);
  };
  const handleSave = async (formData: FormData) => {
    addOptimisticUpdate("save");
    await savePost(postId);
  };
  return (
    <div className="flex justify-around items-center text-textGray px-6 pt-4 border-borderGray">
      <div className="flex justify-between w-3/4">
        {/* Comments */}
        <InteractionButton
          iconPath="/svg/comment.svg"
          count={count?.comments}
          href={`/${username}/status/${postId}`}
        />

        {/* Reposts */}
        <form action={handleRepost}>
          <InteractionButton
            iconPath="/svg/repost.svg"
            count={optimisticState.rePosts}
            isActive={optimisticState.isReposted}
            activeColor="bg-green-500"
            hoverColor="group-hover:bg-green-500"
            textColor="group-hover:text-green-500"
          />
        </form>

        {/* Likes */}
        <form action={handleLike}>
          <InteractionButton
            iconPath="/svg/like.svg"
            count={optimisticState.likes}
            isActive={optimisticState.isLiked}
            activeColor="bg-red-500"
            hoverColor="group-hover:bg-red-500"
            textColor="group-hover:text-red-500"
          />
        </form>
      </div>

      <div className="flex items-center gap-4">
        {/* Save */}
        <form action={handleSave}>
          <InteractionButton
            iconPath="/svg/save.svg"
            isActive={optimisticState.isSaved}
            activeColor="bg-blue-400"
            hoverColor="group-hover:bg-blue-400"
          />
        </form>

        {/* Share */}
        <InteractionButton
          iconPath="/svg/share.svg"
          hoverColor="group-hover:bg-blue-400"
        />
      </div>
    </div>
  );
};

export default PostInteractions;

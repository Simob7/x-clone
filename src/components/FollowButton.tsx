"use client";
import { followUser } from "@/interaction.actions";
import React, { useOptimistic, useTransition } from "react";

export default function FollowButton({
  isFollowed,
  isSelf,
  userId,
}: {
  isFollowed: boolean;
  isSelf?: boolean;
  userId: string;
}) {
  // useTransition helps manage the pending state of the server action
  const [isPending, startTransition] = useTransition();

  // 1. If it's the user's own profile, show Edit Button
  if (isSelf) {
    return (
      <button className="bg-transparent border border-gray-500 py-2 px-4 text-white font-bold rounded-full hover:bg-[#181818] transition">
        Edit profile
      </button>
    );
  }

  // 2. Optimistic logic: Base it directly on the prop 'isFollowed'
  const [optimisticFollow, addOptimisticFollow] = useOptimistic(
    isFollowed,
    (state, newState: boolean) => newState,
  );

  const handleFollow = async () => {
    // Start the transition
    startTransition(async () => {
      // Toggle the UI immediately
      addOptimisticFollow(!optimisticFollow);
      try {
        await followUser(userId);
        // Page revalidates here, 'isFollowed' prop updates,
        // and useOptimistic resets to the new 'isFollowed' value.
      } catch (error) {
        console.error("Failed to follow:", error);
      }
    });
  };

  return (
    <form action={handleFollow}>
      <button
        disabled={isPending}
        className={`py-2 px-6 font-bold rounded-full transition h-max group ${
          optimisticFollow
            ? "bg-transparent border border-gray-500 text-white hover:border-red-600 hover:text-red-600 hover:bg-red-600/10"
            : "bg-white text-black hover:bg-gray-200"
        } ${isPending ? "opacity-70" : ""}`}>
        {optimisticFollow ? (
          <span className="flex items-center">
            <span className="group-hover:hidden">Following</span>
            <span className="hidden group-hover:inline">Unfollow</span>
          </span>
        ) : (
          "Follow"
        )}
      </button>
    </form>
  );
}

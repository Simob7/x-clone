import React from "react";

export default function FollowButton({
  isFollowed,
  isSelf,
}: {
  isFollowed: boolean;
  isSelf?: boolean;
}) {
  // 1. If it's the user's own profile, show Edit Button
  if (isSelf) {
    return (
      <button className="bg-transparent border border-gray-500 py-2 px-4 text-white font-bold rounded-full hover:bg-[#181818] transition">
        Edit profile
      </button>
    );
  }

  // 2. Otherwise, show Follow/Following logic
  return (
    <button
      className={`py-2 px-6 font-bold rounded-full transition h-max group ${
        isFollowed
          ? "bg-transparent border border-gray-500 text-white hover:border-red-600 hover:text-red-600 hover:bg-red-600/10"
          : "bg-white text-black hover:bg-gray-200"
      }`}>
      {isFollowed ? (
        <span className="flex items-center">
          {/* Default state when followed */}
          <span className="group-hover:hidden">Following</span>
          {/* Hover state when followed */}
          <span className="hidden group-hover:inline">Unfollow</span>
        </span>
      ) : (
        "Follow"
      )}
    </button>
  );
}

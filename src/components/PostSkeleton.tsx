import React from "react";

const PostSkeleton = () => {
  return (
    <div className="p-1 border-y-[1px] border-borderGray w-full animate-pulse">
      {/* 1. REPOST HEADER PLACEHOLDER */}
      <div className="flex items-center gap-2 mb-2 ml-8">
        <div className="w-4 h-4 bg-gray-700 rounded-sm" />
        <div className="w-32 h-3 bg-gray-700 rounded" />
      </div>

      <div className="flex gap-2">
        {/* AVATAR PLACEHOLDER */}
        <div className="w-10 h-10 rounded-full bg-gray-700 shrink-0" />

        {/* CONTENT AREA */}
        <div className="flex-1 min-w-0">
          {/* USER INFO PLACEHOLDER */}
          <div className="flex items-center gap-2 mb-2">
            <div className="w-24 h-4 bg-gray-700 rounded" />
            <div className="w-20 h-3 bg-gray-700 rounded" />
            <div className="w-12 h-3 bg-gray-700 rounded" />
          </div>

          {/* TEXT LINES */}
          <div className="space-y-2 mb-3">
            <div className="w-full h-3 bg-gray-700 rounded" />
            <div className="w-5/6 h-3 bg-gray-700 rounded" />
          </div>

          {/* MEDIA BOX */}
          <div className="w-full aspect-video bg-gray-700 rounded-xl" />

          {/* INTERACTIONS PLACEHOLDER */}
          <div className="flex justify-between items-center mt-4 px-2">
            <div className="w-12 h-4 bg-gray-700 rounded" />
            <div className="w-12 h-4 bg-gray-700 rounded" />
            <div className="w-12 h-4 bg-gray-700 rounded" />
            <div className="w-12 h-4 bg-gray-700 rounded" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostSkeleton;

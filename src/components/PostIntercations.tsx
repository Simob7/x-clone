import React from "react";

interface PostInteractionsProps {
  count: {
    comments?: string | number;
    rePosts: string | number;
    likes: string | number;
  };
  isLiked: boolean;
  isSaved: boolean;
  isReposted: boolean;
}

interface InteractionButtonProps {
  iconPath: string;
  count?: string | number;
  hoverColor?: string;
  textColor?: string;
  className?: string;
  // --- ADDED ---
  isActive?: boolean;
  activeColor?: string;
}

const InteractionButton: React.FC<InteractionButtonProps> = ({
  iconPath,
  count,
  hoverColor = "group-hover:bg-IconPink",
  textColor = "group-hover:text-IconPink",
  isActive,
  activeColor = "bg-IconPink",
}) => {
  return (
    <div className="group flex gap-1 pb-1 items-center cursor-pointer">
      <div
        // If isActive is true, use activeColor. Otherwise, use default bg-textGray
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
          // Apply active text color logic here
          className={`text-sm transition-colors ${isActive ? activeColor.replace("bg-", "text-") : "text-textGray"} ${textColor}`}>
          {count}
        </span>
      )}
    </div>
  );
};
const PostInteractions: React.FC<PostInteractionsProps> = ({
  count,
  isLiked,
  isSaved,
  isReposted,
}) => {
  return (
    <div className="flex justify-around items-center text-textGray px-6 pt-4 border-borderGray">
      <div className="flex justify-between w-3/4">
        {/* Comments */}
        <InteractionButton
          iconPath="/svg/comment.svg"
          count={count?.comments}
        />

        {/* Reposts */}
        <InteractionButton
          iconPath="/svg/repost.svg"
          count={count.rePosts}
          isActive={isReposted}
          activeColor="bg-green-500"
          hoverColor="group-hover:bg-green-500"
          textColor="group-hover:text-green-500"
        />

        {/* Likes */}
        <InteractionButton
          iconPath="/svg/like.svg"
          count={count.likes}
          isActive={isLiked}
          activeColor="bg-red-500"
          hoverColor="group-hover:bg-red-500"
          textColor="group-hover:text-red-500"
        />
      </div>

      <div className="flex items-center gap-4">
        {/* Save/Bookmark */}
        <InteractionButton
          iconPath="/svg/save.svg"
          isActive={isSaved}
          activeColor="bg-blue-400"
          hoverColor="group-hover:bg-blue-400"
        />
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

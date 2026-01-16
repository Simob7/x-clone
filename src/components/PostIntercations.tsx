import React from "react";

interface InteractionButtonProps {
  iconPath: string;
  count?: string | number; // Made optional because Save/Share often don't show numbers
  hoverColor?: string;
  textColor?: string;
}

const InteractionButton: React.FC<InteractionButtonProps> = ({
  iconPath,
  count,
  hoverColor = "group-hover:bg-IconPink",
  textColor = "group-hover:text-IconPink",
}) => {
  return (
    <div className="group flex gap-1 pb-1 items-center cursor-pointer">
      <div
        className={`w-5 h-5 bg-textGray ${hoverColor} transition-colors`}
        style={{
          maskImage: `url(${iconPath})`,
          maskRepeat: "no-repeat",
          maskSize: "contain",
          WebkitMaskImage: `url(${iconPath})`,
          WebkitMaskRepeat: "no-repeat",
          WebkitMaskSize: "contain",
        }}
      />
      {count !== undefined && (
        <span
          className={`text-textGray ${textColor} text-sm transition-colors`}>
          {count}
        </span>
      )}
    </div>
  );
};

const PostInteractions: React.FC = () => {
  return (
    <div className="flex justify-between items-center text-textGray px-2 pt-4 border-t border-borderGray">
      {/* LEFT & CENTER: Main Interactions */}
      <div className="flex justify-between w-3/4">
        <InteractionButton iconPath="/svg/comment.svg" count={177} />
        <InteractionButton
          iconPath="/svg/repost.svg"
          count={12}
          hoverColor="group-hover:bg-green-500"
          textColor="group-hover:text-green-500"
        />
        <InteractionButton
          iconPath="/svg/like.svg"
          count="1.5k"
          hoverColor="group-hover:bg-red-500"
          textColor="group-hover:text-red-500"
        />
        {/* <InteractionButton
          iconPath="/svg/original.svg"
          count="10k"
          hoverColor="group-hover:bg-blue-500"
          textColor="group-hover:text-blue-500"
        /> */}
      </div>

      {/* RIGHT: Save and Share */}
      <div className="flex items-center gap-4">
        <InteractionButton
          iconPath="/svg/save.svg" // or save.svg
          hoverColor="group-hover:bg-blue-400"
        />
        <InteractionButton
          iconPath="/svg/share.svg"
          hoverColor="group-hover:bg-blue-400"
        />
      </div>
    </div>
  );
};

export default PostInteractions;

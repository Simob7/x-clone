import Feed from "@/components/Feed";
import FeedNav from "@/components/FeedNav";
import FollowButton from "@/components/FollowButton";
import CustumImage from "@/components/Image";
import { prisma } from "@/prisma";
import { auth, currentUser } from "@clerk/nextjs/server";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";
type Props = {
  params: Promise<{ username: string }>;
};
async function page({ params }: Props) {
  const userId = await auth().then((res) => res.userId);
  if (!userId) notFound();

  const { username } = await params;
  const user = await prisma.user.findUnique({
    where: { username: username },
    include: {
      _count: { select: { followers: true, following: true, posts: true } },
      // WE WANT: Does this profile have a follower where followerId is ME?
      followers: userId ? { where: { followerId: userId } } : undefined,
    },
  });

  if (!user) return notFound();
  // clerk user hook to get user data
  const CurrentUser = await currentUser();
  // CHECK IDENTITY: Is this MY profile or someone else's?
  const isSelf = userId === user.id;
  const isFollowing = user.followers && user.followers.length > 0;
  return (
    <div className="flex flex-col  w-full max-w-2xl mx-auto">
      {/* PROFILE TITLE */}
      <div className="flex items-center gap-8 sticky top-0 backdrop-blur-md p-4 z-10 bg-[#00000084]">
        <Link href={"/"}>
          <CustumImage src="icons/back.svg" width={24} height={24} alt="back" />
        </Link>
        <div className="flex flex-col">
          <h1 className="font-bold text-lg">
            {user?.displayName || user?.username}
          </h1>
          {/* OPTIONAL: Show post count if you add it to prisma query */}
          <span className="text-xs text-textGray">
            {user._count.posts} posts
          </span>
        </div>
      </div>

      {/* INFO */}
      <div>
        <div className="relative w-full">
          {/* COVER: Smart fallback for null cover */}
          <div className="w-full aspect-[3/1] relative bg-gray-800">
            <CustumImage
              src={user.userCover || "general/cover.jpg"}
              width={400}
              height={100}
              className="object-cover w-full h-full"
            />
          </div>
          {/* PROFILE PICTURE: Smart fallback for null image */}
          <div className="w-24 h-24 rounded-full overflow-hidden border-[4px] border-black bg-gray-400 absolute left-4 -translate-y-1/2">
            <CustumImage
              src={user.UserImg || "general/noAvatar.png"}
              width={100}
              height={100}
              tr={true}
              className="object-cover w-full h-full"
            />
          </div>
        </div>

        {/* ACTIONS */}
        <div className="flex items-center justify-end m-2 gap-2 h-12">
          {/* Only show interaction icons if it's NOT your own profile */}
          {!isSelf && (
            <>
              <div className="icon-button">
                <CustumImage src="icons/more.svg" width={20} height={20} />
              </div>
              <div className="icon-button">
                <CustumImage src="icons/message.svg" width={20} height={20} />
              </div>
            </>
          )}

          {/* SMART BUTTON: Edit Profile vs Follow/Unfollow */}
          <FollowButton
            // userId={user.id}
            isFollowed={isFollowing}
            isSelf={isSelf}
          />
        </div>

        {/* PROFILE DETAILS */}
        <div className="flex flex-col gap-2 p-2">
          <div>
            <h1 className="text-lg font-bold capitalize">
              {user.displayName || user.username}
            </h1>
            <span className="text-sm text-textGray">@{user.username}</span>
          </div>

          {/* BIO: Handling empty state */}
          <p className="text-sm">{user.bio || "No bio yet."}</p>

          <div className="flex gap-4 items-center flex-wrap mt-2 text-textGray text-sm">
            {user.location && (
              <div className="flex items-center gap-1">
                <CustumImage
                  src="icons/userLocation.svg"
                  width={18}
                  height={18}
                />
                <span>{user.location}</span>
              </div>
            )}
            {user.job && (
              <div className="flex items-center gap-1">
                <CustumImage src="icons/job.svg" width={18} height={18} />
                <span>{user.job}</span>
              </div>
            )}
            <div className="flex items-center gap-1">
              <CustumImage src="icons/date.svg" width={18} height={18} />
              <span>
                Joined{" "}
                {new Date(user.createdAt).toLocaleDateString("en-US", {
                  month: "long",
                  year: "numeric",
                })}
              </span>
            </div>
          </div>

          {/* FOLLOW COUNTS: Using real DB numbers */}
          <div className="flex gap-4 text-sm mt-2">
            <div className="flex items-center gap-1 cursor-pointer hover:underline">
              <span className="font-bold">{user._count.following}</span>
              <span className="text-textGray">Following</span>
            </div>
            <div className="flex items-center gap-1 cursor-pointer hover:underline">
              <span className="font-bold">{user._count.followers}</span>
              {/* <span className="text-textGray">Followers</span> */}
            </div>
          </div>
        </div>
      </div>

      <FeedNav />
      <Feed userProfileId={user.id} />
    </div>
  );
}

export default page;

import React from "react";
import Post from "./Post";
import { prisma } from "@/prisma";
import { auth } from "@clerk/nextjs/server";
import InfiniteFeed from "./InfiniteFeed";

async function Feed({ userProfileId }: { userProfileId: string }) {
  // fetch posts from the current user and the following from mysql prisma ORM database
  const userId = (await auth()).userId;
  if (!userId) return null;

  const whereCondition = userProfileId
    ? { userId: userProfileId }
    : {
        parentPostId: null,
        userId: {
          in: [
            userId,
            ...(
              await prisma.follow.findMany({
                where: { followerId: userId },
                select: { followingId: true },
              })
            ).map((follow) => follow.followingId),
          ],
        },
      };
  const posts = await prisma.post.findMany({
    where: whereCondition,
    include: {
      author: { select: { displayName: true, username: true, UserImg: true } },
      // get the repost
      rePost: {
        include: {
          author: {
            select: { displayName: true, username: true, UserImg: true },
          },
        },
      },
      // 1. Get the actual likes (to check if current user liked it)
      likes: {
        where: { userId: userId },
        select: { userId: true },
      },
      rePosts: {
        where: { userId: userId },
        select: { userId: true },
        take: 1,
      },
      // 2. Get counts for the UI labels
      _count: {
        select: {
          likes: true,
          comments: true,
          rePosts: true,
        },
      },
      savedPosts: {
        where: { userId: userId },
        select: { userId: true },
      },
    },
    take: 3,
    skip: 0,
    orderBy: { createdAt: "desc" },
  });
  const formattedPosts = posts.map((post) => ({
    ...post,
    user: {
      displayName: post.author.displayName ?? "",
      username: post.author.username,
      userImg: post.author.UserImg,
    },
    rePostId: post.rePostId,
    rePost: post.rePost
      ? {
          ...post.rePost,
          user: {
            displayName: post.rePost.author.displayName ?? "",
            username: post.rePost.author.username,
            userImg: post.rePost.author.UserImg,
          },
        }
      : null,
    hasLiked: post.likes.length > 0,
    hasSaved: post.savedPosts.length > 0,
    likeCounts: post._count.likes,
    hasReposted: post.rePosts.length > 0,
    commentCounts: post._count.comments,
    rePostCounts: post._count.rePosts,
  }));
  console.log("formattedPosts:", formattedPosts);
  return (
    <div className="flex flex-col ">
      {formattedPosts.length > 0 ? (
        formattedPosts.map((post) => (
          <div key={post.id}>
            <Post post={post} />
          </div>
        ))
      ) : (
        <p className="text-gray-500 text-center">
          Nothing to see here... go follow someone!
        </p>
      )}
      <InfiniteFeed userProfileId={userProfileId} />
    </div>
  );
}

export default Feed;

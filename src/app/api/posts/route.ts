// src/app/api/posts/route.ts
import { prisma } from "@/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const { userId } = await auth();

  if (!userId) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
    });
  }

  const url = new URL(request.url);
  const userProfileId = url.searchParams.get("userProfileId");
  const page = url.searchParams.get("cursor") || 0;
  const limt = 3;

  const whereCondition =
    userProfileId !== null
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
    take: limt,
    skip: (Number(page) - 1) * limt,
    include: {
      // 1. Get the actual likes (to check if current user liked it)
      author: { select: { displayName: true, username: true, UserImg: true } },
      // get the repost
      rePost: {
        include: {
          author: {
            select: { displayName: true, username: true, UserImg: true },
          },
        },
      },
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
    orderBy: { createdAt: "desc" },
  });
  const formattedPosts = posts.map((post) => ({
    ...post,
    user: {
      displayName: post.author.displayName ?? "",
      username: post.author.username,
      userImg: post.author.UserImg,
    },
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
    hasReposted: post.rePosts.length > 0,
    likeCounts: post._count.likes,
    commentCounts: post._count.comments,
    rePostCounts: post._count.rePosts,
  }));
  const totalPosts = await prisma.post.count({ where: whereCondition });
  const hasMore = Number(page) * limt < totalPosts;

  // await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate network delay

  return Response.json({ posts: formattedPosts, hasMore });
}

import Comments from "@/components/Comments";
import CustumImage from "@/components/Image";
import Link from "next/link";
import React from "react";
import PostInteractions from "@/components/PostIntercations";
import CustomVideo from "@/components/CustomVideo";
import { prisma } from "@/prisma";
import { auth } from "@clerk/nextjs/server";
import { notFound } from "next/navigation";

async function PostPage({
  params,
}: {
  params: Promise<{ username: string; postId: string }>;
}) {
  const { userId } = await auth();
  if (!userId) return null;

  const { postId, username } = await params;

  // Fetch post with all necessary relations
  const p = await prisma.post.findFirst({
    where: { id: Number(postId) },
    include: {
      author: { select: { displayName: true, username: true, UserImg: true } },
      likes: { where: { userId }, select: { userId: true } },
      rePosts: { where: { userId }, select: { userId: true }, take: 1 },
      savedPosts: { where: { userId }, select: { userId: true } },
      _count: { select: { likes: true, comments: true, rePosts: true } },
      // comments with their relations
      comments: {
        include: {
          author: {
            select: { displayName: true, username: true, UserImg: true },
          },
          likes: { where: { userId }, select: { userId: true } },
          rePosts: { where: { userId }, select: { userId: true }, take: 1 },
          savedPosts: { where: { userId }, select: { userId: true } },
          _count: { select: { likes: true, comments: true, rePosts: true } },
        },
      },
    },
  });

  // Security & Existence Checks
  if (!p || p.author.username !== username) return notFound();

  // Clean Formatting logic
  const postDetails = {
    ...p,
    hasLiked: p.likes.length > 0,
    hasSaved: p.savedPosts.length > 0,
    hasReposted: p.rePosts.length > 0,
  };
  const commentsWidthDetails = p.comments.map((comment) => ({
    ...comment,
    hasLiked: comment.likes.length > 0,
    hasSaved: comment.savedPosts.length > 0,
    hasReposted: comment.rePosts.length > 0,
  }));

  return (
    <div className="flex flex-col w-full border-x border-borderGray min-h-screen bg-black text-white">
      {/* 1. NAVIGATION HEADER */}
      <header className="flex items-center gap-8 sticky top-0 backdrop-blur-md p-4 z-20 bg-black/60 border-b border-borderGray">
        <Link
          href="/"
          className="hover:bg-white/10 p-2 rounded-full transition">
          <CustumImage src="icons/back.svg" width={24} height={24} alt="back" />
        </Link>
        <h1 className="font-bold text-xl">Post</h1>
      </header>

      {/* 2. MAIN CONTENT AREA */}
      <article className="px-4 py-3 flex flex-col gap-4">
        {/* User Profile Info */}
        <section className="flex items-center gap-3">
          <Link
            href={`/${p?.author?.username}`}
            className="h-12 w-12 relative rounded-full overflow-hidden shrink-0">
            <CustumImage
              src={p?.author?.UserImg || "/general/noAvatar.png"}
              width={100}
              height={100}
              alt="avatar"
              tr={true}
              className="object-cover"
            />
          </Link>
          <div className="flex flex-col min-w-0">
            <Link
              href={`/${p?.author?.username}`}
              className="font-bold hover:underline truncate">
              {p?.author?.displayName || p?.author?.username}
            </Link>
            <span className="text-textGray truncate">
              @{p?.author?.username}
            </span>
          </div>
        </section>

        {/* Post Text Body */}
        <p className="text-[20px] md:text-[23px] leading-relaxed break-words">
          {p?.desc}
        </p>

        {/* Media Section: Handles Image or Video */}
        {(p?.img || p?.video) && (
          <div className="w-full">
            {p?.img ? (
              <div className="rounded-2xl border border-borderGray overflow-hidden w-full bg-neutral-900">
                <CustumImage
                  src={p?.img}
                  width={1200}
                  height={1200}
                  alt="post content"
                  className="w-full h-auto max-h-[70vh] object-contain"
                />
              </div>
            ) : (
              <div className="rounded-2xl border border-borderGray overflow-hidden w-full bg-black">
                <CustomVideo videoSrc={p?.video!} />
              </div>
            )}
          </div>
        )}

        {/* Timestamp & Metadata */}
        <footer className="mt-2">
          <div className="py-4 border-y border-borderGray text-textGray text-sm md:text-base flex flex-wrap gap-2 items-center">
            <time className="hover:underline cursor-pointer">
              {p?.createdAt.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </time>
            <span>•</span>
            <time className="hover:underline cursor-pointer">
              {p?.createdAt.toLocaleDateString([], {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </time>
            <span>•</span>
          </div>

          {/* Engagement Icons */}
          <div className="py-2 border-b border-borderGray">
            <PostInteractions
              isLiked={postDetails?.hasLiked}
              isSaved={postDetails?.hasSaved}
              isReposted={postDetails?.hasReposted}
              count={{
                likes: p?._count.likes,
                comments: p?._count.comments,
                rePosts: p?._count.rePosts,
              }}
            />
          </div>
        </footer>
      </article>

      {/* 3. REPLY INPUT SECTION */}
      <section className="flex gap-3 p-4 border-b border-borderGray items-start">
        <div className="h-10 w-10 relative rounded-full overflow-hidden shrink-0">
          <CustumImage
            src={"/general/avatar.png"}
            width={40}
            height={40}
            alt="me"
            tr={true}
          />
        </div>
        <div className="flex-1">
          <textarea
            className="bg-transparent text-xl w-full outline-none placeholder:text-textGray resize-none mt-1"
            placeholder="Post your reply"
            rows={1}
          />
          <div className="flex justify-end mt-2">
            <button className="px-5 py-2 bg-iconBlue text-white font-bold rounded-full hover:opacity-90 transition">
              Reply
            </button>
          </div>
        </div>
      </section>

      {/* 4. COMMENTS LISTING */}
      <section className="flex flex-col">
        <Comments
          comments={commentsWidthDetails} // This is the formatted array from your map logic
          postId={p?.id}
          username={p?.author?.username}
        />
      </section>
    </div>
  );
}

export default PostPage;

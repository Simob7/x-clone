import Comments from "@/components/Comments";
import CustumImage from "@/components/Image";
import Link from "next/link";
import React from "react";
import PostInteractions from "@/components/PostIntercations";
import CustomVideo from "@/components/CustomVideo";
import { prisma } from "@/prisma";
import { notFound } from "next/navigation";
import { auth, currentUser } from "@clerk/nextjs/server";
import ReplyForm from "@/components/FormReply";
import PostInfo from "@/components/PostInfo";

async function PostPage({
  params,
}: {
  params: Promise<{ username: string; postId: string }>;
}) {
  const { userId } = await auth();
  if (!userId) return null;

  const { postId, username } = await params;
  const user = await currentUser();

  const p = await prisma.post.findFirst({
    where: { id: Number(postId) },
    include: {
      author: { select: { displayName: true, username: true, UserImg: true } },
      rePost: {
        include: {
          author: {
            select: { displayName: true, username: true, UserImg: true },
          },
        },
      },
      likes: { where: { userId }, select: { userId: true } },
      rePosts: { where: { userId }, select: { userId: true }, take: 1 },
      savedPosts: { where: { userId }, select: { userId: true } },
      _count: { select: { likes: true, comments: true, rePosts: true } },
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
        orderBy: { createdAt: "desc" },
      },
    },
  });

  if (!p || p.author.username !== username) return notFound();

  const isRepost = !!p.rePost;
  const source = isRepost ? p.rePost! : p;

  const commentsWidthDetails = p.comments.map((comment) => ({
    ...comment,
    hasLiked: comment.likes.length > 0,
    hasSaved: comment.savedPosts.length > 0,
    hasReposted: comment.rePosts.length > 0,
  }));

  return (
    <div className="flex flex-col w-full border-x border-borderGray min-h-screen bg-black text-white">
      <header className="flex items-center gap-8 sticky top-0 backdrop-blur-md p-4 z-20 bg-black/60 border-b border-borderGray">
        <Link
          href="/"
          className="hover:bg-white/10 p-2 rounded-full transition">
          <CustumImage src="icons/back.svg" width={24} height={24} alt="back" />
        </Link>
        <h1 className="font-bold text-xl">Post</h1>
      </header>

      {isRepost && (
        <Link
          href={`/${p.author.username}`}
          className="px-4 py-2 text-textGray text-sm font-bold border-b border-borderGray flex items-center gap-2">
          <span>{p.author.displayName} reposted</span>
        </Link>
      )}

      <article className="px-4 py-3 flex flex-col gap-4">
        <section className="flex justify-between items-start">
          <div className="flex items-center gap-3">
            <Link
              href={`/${source.author.username}`}
              className="h-12 w-12 relative rounded-full overflow-hidden shrink-0">
              <CustumImage
                src={source.author.UserImg || "/general/noAvatar.png"}
                width={100}
                height={100}
                alt="avatar"
                tr={true}
                className="object-cover"
              />
            </Link>
            <div className="flex flex-col">
              <Link
                href={`/${source.author.username}`}
                className="font-bold hover:underline">
                {source.author.displayName || source.author.username}
              </Link>
              <span className="text-textGray">@{source.author.username}</span>
            </div>
          </div>
          <PostInfo
            ownerId={p.author.username}
            currentUserId={user?.username}
            postId={p.id}
          />
        </section>

        <p className="text-[20px] md:text-[23px] leading-relaxed break-words">
          {source.desc}
        </p>

        {(source.img || source.video) && (
          <div className="w-full">
            {source.img ? (
              <div className="rounded-2xl border border-borderGray overflow-hidden w-full bg-neutral-900">
                <CustumImage
                  src={source.img}
                  width={1200}
                  height={1200}
                  alt="post content"
                  className="w-full h-auto max-h-[70vh] object-contain"
                />
              </div>
            ) : (
              <div className="rounded-2xl border border-borderGray overflow-hidden w-full bg-black">
                <CustomVideo videoSrc={source.video!} />
              </div>
            )}
          </div>
        )}

        <div className="text-textGray text-sm border-b border-borderGray pb-4">
          {source.createdAt.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}{" "}
          ·{" "}
          {source.createdAt.toLocaleDateString([], {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </div>

        <footer className="py-1 border-b border-borderGray">
          <PostInteractions
            username={p.author.username}
            postId={p.id}
            isLiked={p.likes.length > 0}
            isSaved={p.savedPosts.length > 0}
            isReposted={p.rePosts.length > 0}
            count={{
              likes: p._count.likes,
              comments: p._count.comments,
              rePosts: p._count.rePosts,
            }}
          />
        </footer>
      </article>

      {user && <ReplyForm userImg={user.imageUrl} postId={p.id} />}

      <section className="flex flex-col">
        <Comments
          comments={commentsWidthDetails}
          currentUserId={user?.username}
        />
      </section>
    </div>
  );
}
export default PostPage;

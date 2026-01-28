"use client";
import { useInfiniteQuery } from "@tanstack/react-query";
// infinite scrolling feed component
import InfiniteScroll from "react-infinite-scroll-component";
import React from "react";
import Post from "./Post";
import PostSkeleton from "./PostSkeleton";
// TODO: implement fetchPosts function
const fetchPosts = async (pageParam: number, userProfileId?: string) => {
  const res = await fetch(
    `/api/posts?cursor=${pageParam}&user=${userProfileId}`,
  );
  return res.json();
};
// TODO: implement InfiniteFeed component
function InfiniteFeed({ userProfileId }: { userProfileId?: string }) {
  const { data, error, status, hasNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey: ["posts"],
    queryFn: ({ pageParam = 2 }) => fetchPosts(pageParam, userProfileId),
    initialPageParam: 2,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.hasMore) {
        return allPages.length + 2;
      }
      return undefined;
    },
  });
  if (error) return "An error occurred: " + (error as Error).message;
  if (status === "pending") {
    return (
      <div className="flex flex-col gap-2">
        <PostSkeleton />
        <PostSkeleton />
        <PostSkeleton />
      </div>
    );
  }
  console.log(data);
  const allPosts = data?.pages.flatMap((page) => page.posts) || [];
  return (
    <InfiniteScroll
      dataLength={allPosts.length}
      next={fetchNextPage}
      hasMore={!!hasNextPage}
      loader={
        <div className="mt-4">
          <PostSkeleton />{" "}
        </div>
      }
      endMessage={
        <p className="text-center p-4 text-textGray">No more posts to show</p>
      }>
      {allPosts.map((post) => (
        <div key={post?.id}>
          <Post post={post} />
        </div>
      ))}
    </InfiniteScroll>
  );
}

export default InfiniteFeed;

import React from "react";
import Post from "./Post";

function Feed() {
  return (
    <div className="flex flex-col w-full items-center">
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
    </div>
  );
}

export default Feed;

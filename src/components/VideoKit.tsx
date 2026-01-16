import React from "react";
import { Video } from "@imagekit/next";
const urlEndpoint = process.env.NEXT_PUBLIC_URL_ENDPOINT;
type videoType = {
  videoSrc: string;
  className?: string;
};
function VideoKit({ videoSrc, className }: videoType) {
  return (
    <Video
      urlEndpoint={urlEndpoint}
      src={videoSrc}
      className={className}
      controls
      width={800}
      height={1000}
      transformation={[
        {
          width: "1920",
          height: "1000",
          quality: 90,
          overlay: {
            type: "text",
            text: "bouayaben",
          },
        },
      ]}
    />
  );
}

export default VideoKit;

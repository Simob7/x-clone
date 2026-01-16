"use client";
import { Image, ImageKitProvider } from "@imagekit/next";
import React from "react";
const urlEndpoint = process.env.NEXT_PUBLIC_URL_ENDPOINT;
type imageProps = {
  src: string;
  width?: number;
  height?: number;
  alt?: string;
  className?: string;
  tr?: boolean;
};
function CustumImage({ src, width, height, alt, className, tr }: imageProps) {
  return (
    <ImageKitProvider urlEndpoint={urlEndpoint!}>
      <Image
        src={src}
        width={width}
        height={height}
        alt={alt || "image"}
        className={className || ""}
        {...(tr
          ? { transformation: [{ width: width, height: height }] }
          : { width: width, height: height })}
        loading="eager"
      />
    </ImageKitProvider>
  );
}

export default CustumImage;

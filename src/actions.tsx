"use server";

import { imagekit } from "./util/imageKit";

export async function sharePost(data: FormData) {
  const file = data.get("file") as File;
  const settingsStr = data.get("settings") as string;
  const settings = settingsStr ? JSON.parse(settingsStr) : null;

  if (!file || file.size === 0) throw new Error("No file provided");

  try {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Build transformation string
    // 'fo-auto' ensures the crop focuses on the most important part of the image
    let tr = "w-600";
    if (settings?.type === "square") tr += ",ar-1-1,fo-auto";
    if (settings?.type === "wide") tr += ",ar-16-9,fo-auto";

    const response = await imagekit.upload({
      file: buffer,
      fileName: file.name || "post.jpg",
      folder: "/posts",
      // Use the 'transformation' object correctly for the Node SDK
      ...(file.type.includes("image")
        ? {
            transformation: {
              pre: tr,
            },
          }
        : {}),
    });

    console.log("Upload Success:", response);
    // Serialize and Deserialize to ensure it's a plain object
    const plainResponse = JSON.parse(JSON.stringify(response));
    return { success: true, res: plainResponse };
  } catch (error) {
    // THIS LOGS THE REAL ERROR FROM IMAGEKIT IN YOUR TERMINAL
    console.error("IMAGEKIT API ERROR:", error);
    throw new Error(
      error instanceof Error ? error.message : "Failed to share post",
    );
  }
}

export async function getFileInfo(fileId: string) {
  try {
    return await new Promise((resolve, reject) => {
      imagekit.getFileDetails(fileId, (err, res) => {
        if (err) reject(err);
        else resolve(res);
      });
    });
  } catch (error) {
    console.error("IK Fetch Error:", error);
    return null;
  }
}

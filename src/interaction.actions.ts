"use server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "./prisma";
import { revalidatePath } from "next/cache";
import * as z from "zod";
import { imagekit } from "./util/imageKit";
import { UploadResponse } from "@imagekit/next";
import { error } from "console";

export const toggleLike = async (postId: number) => {
  const { userId } = await auth();
  if (!userId) throw new Error("User not found");

  try {
    const existingLike = await prisma.like.findFirst({
      where: {
        userId: userId,
        postId: postId,
      },
    });

    if (existingLike) {
      await prisma.like.delete({ where: { id: existingLike.id } });
    } else {
      await prisma.like.create({ data: { userId, postId } });
    }

    // 1. Revalidate Home Page
    revalidatePath("/");

    // 2. Revalidate Profile Pages
    // This covers any path starting with /username
    revalidatePath("/[username]", "layout");

    // 3. Revalidate the specific Post Status page
    // Using "page" here makes it much faster than "layout"
    revalidatePath("/[username]/status/[postId]", "page");
  } catch (err) {
    console.error("Like error:", err);
    throw new Error("Could not toggle like");
  }
};
// Toggle Repost
export const toggleRepost = async (postId: number) => {
  const { userId } = await auth();
  // Ensure the user is authenticated
  if (!userId) throw new Error("User not found");
  try {
    // Check if the repost already exists
    const existingRepost = await prisma.post.findFirst({
      where: {
        userId: userId,
        rePostId: postId,
      },
    });
    // If repost exists, delete it. Otherwise, create a new repost.
    if (existingRepost) {
      await prisma.post.delete({ where: { id: existingRepost.id } });
    } else {
      // Create a new repost
      await prisma.post.create({
        data: { userId, rePostId: postId },
      });
    }
    // finally, revalidate the necessary paths
    revalidatePath("/");
    revalidatePath("/[username]", "layout");
    revalidatePath("/[username]/status/[postId]", "page");
  } catch (error) {
    // Log the error and throw a new error
    console.error("Repost error:", error);
    throw new Error("Could not toggle repost");
  }
};

// Save Post
export const savePost = async (postId: number) => {
  // Ensure the user is authenticated
  const { userId } = await auth();

  if (!userId) throw new Error("User not found");
  // Check if the post is already saved
  try {
    const existingSave = await prisma.savedPosts.findFirst({
      where: {
        userId: userId,
        postId: postId,
      },
    });
    // If saved, remove it; if not, save it
    if (existingSave) {
      await prisma.savedPosts.delete({ where: { id: existingSave.id } });
    } else {
      // Save the post
      await prisma.savedPosts.create({
        data: { userId: userId, postId: postId },
      });
    }
    // Revalidate necessary paths
    revalidatePath("/");
    revalidatePath("/[username]", "layout");
    revalidatePath("/[username]/status/[postId]", "page");
  } catch (err) {
    console.error("Save error:", err);
    throw new Error("Could not toggle save");
  }
};
//  add comments

export const addComment = async (postId: number, formData: FormData) => {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  // 1. Define Schema
  const CommentSchema = z.object({
    desc: z
      .string()
      .min(1, "Comment is required")
      .max(280, "Comment is too long"),
  });

  // 2. Validate data
  const validatedFields = CommentSchema.safeParse({
    desc: formData.get("desc"),
  });

  // 3. Handle validation failure
  if (!validatedFields.success) {
    console.error(
      "Validation failed:",
      validatedFields.error.flatten().fieldErrors,
    );
    return { error: "Invalid input data" };
  }

  const { desc } = validatedFields.data;

  try {
    await prisma.post.create({
      data: {
        desc,
        userId,
        parentPostId: postId,
      },
    });

    revalidatePath(`/[username]/status/${postId}`, "page");
    return { success: true };
  } catch (err) {
    console.error("Database Error:", err);
    return { error: "Something went wrong while saving the comment" };
  }
};

// add post
export const addPost = async (prevState: any, formData: FormData) => {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  // Extract form data
  const desc = formData.get("desc") as string;
  const file = formData.get("file") as File;
  const isSensitiveRaw = formData.get("isSensitive");
  const imgType = formData.get("imgType") as string;

  // 1. Define Zod Schema
  const PostSchema = z.object({
    desc: z
      .string()
      .min(1, "Comment is required")
      .max(280, "Comment is too long"),
    isSensitive: z.boolean().optional(),
  });

  // 2. Validate
  const validatedFields = PostSchema.safeParse({
    desc,
    isSensitive: isSensitiveRaw === "true" || isSensitiveRaw === "on",
  });

  if (!validatedFields.success) {
    // Return errors to the client to display them if needed
    return {
      success: false,
      error: true,
      message: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { desc: validatedDesc, isSensitive: validatedSensitive = false } =
    validatedFields.data;

  // 3. File upload handler (Internal Helper)
  const uploadFile = async (file: File): Promise<UploadResponse> => {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    let tr = "w-600";
    if (imgType === "square") tr += ",ar-1-1,fo-auto";
    if (imgType === "wide") tr += ",ar-16-9,fo-auto";

    return new Promise((resolve, reject) => {
      imagekit.upload(
        {
          file: buffer,
          fileName: file.name || "post.jpg",
          folder: "/posts",
          ...(file.type.includes("image")
            ? { transformation: { pre: tr } }
            : {}),
        },
        function (error, result) {
          if (error) reject(error);
          else resolve(result as unknown as UploadResponse);
        },
      );
    });
  };

  let img: string | null = null;
  let imgHeight = 0;
  let video: string | null = null;

  // 4. Handle File Upload
  if (file && file.size > 0) {
    try {
      const result = await uploadFile(file);
      if (result.fileType === "image") {
        img = result.filePath || null;
        imgHeight = result.height || 0;
      } else {
        video = result.filePath || null;
      }
    } catch (uploadErr) {
      console.error("Upload failed:", uploadErr);
      return { success: false, error: true, message: "Upload failed" };
    }
  }
  console.log({
    data: {
      desc: validatedDesc,
      isSensitive: validatedSensitive,
      userId,
      img,
      imgHeight,
      video,
    },
  });
  // 5. Database Interaction
  try {
    await prisma.post.create({
      data: {
        desc: validatedDesc,
        isSensitive: validatedSensitive,
        userId,
        img,
        imgHeight,
        video,
      },
    });

    revalidatePath("/");
    return { success: true, error: false };
  } catch (err) {
    console.error("Database error:", err);
    return { success: false, error: true, message: "Database creation failed" };
  }
};

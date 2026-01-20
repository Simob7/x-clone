import { PrismaClient } from "../src/generated/prisma/client";
const prisma = new PrismaClient();

async function main() {
  console.log("🚀 Starting seed...");

  // 1. Clean up old interactions (Order matters to avoid Foreign Key errors)
  await prisma.like.deleteMany({});
  await prisma.savedPosts.deleteMany({}); // Ensure this matches your model name!
  await prisma.follow.deleteMany({});
  await prisma.post.deleteMany({});

  // 2. UPSERT USERS (Keeps IDs consistent)
  const users = [];
  for (let i = 1; i <= 5; i++) {
    const user = await prisma.user.upsert({
      where: { id: `user${i}` },
      update: {},
      create: {
        id: `user${i}`,
        email: `user${i}@example.com`,
        username: `user${i}`,
        displayName: `User ${i}`,
        bio: `Professional X Clone User ${i}`,
      },
    });
    users.push(user);
  }
  console.log("✅ Users synced.");

  // 3. CREATE POSTS
  const postData = users.flatMap((user) =>
    Array.from({ length: 3 }).map((_, j) => ({
      desc: `Hello world! This is post ${j + 1} from ${user.username}`,
      userId: user.id,
      video: "", // Adding empty string if your schema requires it
    })),
  );
  await prisma.post.createMany({ data: postData });
  const allPosts = await prisma.post.findMany();
  console.log(`✅ ${allPosts.length} Posts created.`);

  // 4. CREATE LIKES
  // Let's make everyone like the first post
  await prisma.like.createMany({
    data: users.map((user) => ({
      userId: user.id,
      postId: allPosts[0].id,
    })),
  });
  console.log("✅ Likes created.");

  // 5. CREATE SAVED POSTS (Bookmarks)
  await prisma.savedPosts.createMany({
    data: [
      { userId: users[0].id, postId: allPosts[1].id },
      { userId: users[1].id, postId: allPosts[2].id },
    ],
  });
  console.log("✅ Saved Posts created.");
}

main()
  .catch((e) => {
    console.error("❌ Seed Error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
